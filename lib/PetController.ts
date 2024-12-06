import { useEffect, useRef, useState } from "react"

import {
  AutoFeedNotification,
  Notification,
  StorageNotification
} from "./Notification"
import { HUNGER_THRESHOLD, MAX_FOOD, MAX_HAPPY, Pet } from "./Pet"
import { usePet } from "./PetContext"
import { StorageManager } from "./StorageManager"
import { useData } from "./useData"

const HAPPINESS_THRESHOLD: number = 800

const usePetController = () => {
  const pet = usePet()
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([])
  const { assignments } = useData()
  const scheduledUpdateRef = useRef(new Date())

  // Initialize the pet data

  // This function simulates the update called on every render (is this what we actually want?)
  // useEffect(() => {
  //   const update = () => {
  //     if (!pet) {
  //       throw new Error("Pet not initialized")
  //     }
  //     const notif = new AutoFeedNotification(pet, 9, "testing")
  //     setNotificationQueue((prevQueue) => [...prevQueue, notif])
  //   }
  //   update()
  // })

  // fixedUpdate logic with health checks and notification handling
  useEffect(() => {
    const interval = setInterval(() => {
      notify()
      if (new Date() > scheduledUpdateRef.current) {
        scheduledUpdateRef.current = healthCheck()
      }
    }, 1000) // Adjust as needed for the interval duration
    return () => clearInterval(interval)
  }, [notificationQueue])

  // Notification function to handle notifications
  const notify = () => {
    setNotificationQueue((prevQueue) => {
      const [firstNotif, ...rest] = prevQueue
      if (firstNotif && !firstNotif.announced) {
        // Add code to better handle showing notifications
        alert(firstNotif.text)
      }
      return rest
    })
  }

  const calculateStress = (): number => {
    if (!pet) {
      return 0
    }

    //calculates % of  happiness is lost by comparing how many points of assignments are due in the next 24 hours compared to all published assignments
    var stress: number = 0
    var total: number = 0
    var duesoon: number = 0
    if (pet.pendingAssignmentIds != null) {
      var now: Date = new Date()
      for (const id of pet.pendingAssignmentIds) {
        const pending = assignments.get(id)
        if (!pending) {
          continue
        }
        if (pending.due_at.getTime() - now.getTime() < 24 * 3600000) {
          //within 24hrs
          duesoon += pending.points_possible
        }
        total += pending.points_possible
      }
    }

    stress = duesoon / total

    return stress
  }

  const updateHappiness = () => {
    if (!pet) {
      return
    }
    // half of happiness (500pts) comes from food, half from how stressed
    var happiness: number = 0
    var hungerCheck: number = MAX_HAPPY / 2
    if (pet.isHungry()) {
      hungerCheck = hungerCheck * (pet.currentFood / HUNGER_THRESHOLD)
    }

    var stressCheck: number = MAX_HAPPY / 2
    stressCheck = stressCheck * calculateStress()
    happiness = hungerCheck + stressCheck
    pet.currentHappiness = happiness
  }

  // Health check method
  const healthCheck = (): Date => {
    const currentTime = new Date()
    // this.notifWall.SetHungerFlag(this.pet.isHungry());
    //this.notifWall.SetSadFlag(this.pet.calculateHappiness()>HAPPINESS_THRESHOLD);

    return new Date(currentTime.getTime() + 30 * 60000) // Adds 30 minutes
  }

  // Function to automatically feed the pet
  const autoFeed = (incFood: number, assignmentName: string): number => {
    if (!pet) {
      throw new Error("Pet not initialized")
    }
    if (pet.getCurrentFood() < MAX_FOOD) {
      const diff = MAX_FOOD - pet.getCurrentFood()
      if (diff > incFood) {
        pet.addFood(incFood)
        setNotificationQueue((prevQueue) => [
          ...prevQueue,
          new AutoFeedNotification(pet, incFood, assignmentName)
        ])
        return incFood
      } else {
        pet.addFood(diff)
        pet.storeFood(incFood - diff)
        setNotificationQueue((prevQueue) => [
          ...prevQueue,
          new AutoFeedNotification(pet, incFood, incFood - diff, assignmentName)
        ])
        return diff
      }
    } else {
      pet.storeFood(incFood)
      setNotificationQueue((prevQueue) => [
        ...prevQueue,
        new StorageNotification(pet, incFood, assignmentName)
      ])
      return 0
    }
  }

  const forceUpdate = () => {
    pet?.forceUpdate()
  }

  return {
    pet,
    autoFeed,
    forceUpdate,
    notificationQueue
  }
}

export default usePetController

// J -> below here is what I have written on my end for pet controller. I have no idea what anything above this does and
// at this point I am scared to touch it.

/* import { AutoFeedNotification, Notification, StorageNotification } from "./Notification";
import { Pet } from "./Pet";
import { Queue } from "~lib/Queue";
import { NotificationWall } from "./NotificationWall";

const HAPPINESS_THRESHOLD: number = 800;

export class PetController {
    private pet: Pet;
    private notificationQueue: Queue<Notification>;
    private scheduledUpdate: Date;
    public notifWall: NotificationWall;

    constructor() {
        this.pet = new Pet();
        this.notificationQueue = new Queue<Notification>();
        this.scheduledUpdate = new Date();
    
    }
    // Start is called before the first frame update
    start(): void {
        this.pet = new Pet();
        this.notificationQueue = new Queue<Notification>();
        this.pet.setState("idle"); // Set pet state to idle for testing
    }

    // Placeholder update method for idle state
    isIdle(): boolean {
        return true; // Always returns true for testing purposes
    }

    // Additional methods kept for uniformity with other group members
    update(): void {
        const notif = new AutoFeedNotification(this.pet, 9, "testing");
        this.notificationQueue.enqueue(notif);
    }

    fixedUpdate(): void {
        if (this.notificationQueue) {
            this.notify();
        }

        if (new Date() > this.scheduledUpdate) {
            this.scheduledUpdate = this.healthCheck();
        }
    }

    autoFeed(incFood: number, assignmentName: string): number {
        if (this.pet.getCurrentFood() < this.pet.MAX_FOOD) {
            const diff = this.pet.MAX_FOOD - this.pet.getCurrentFood();
            if (diff > incFood) {
                this.pet.addFood(incFood);
                this.notificationQueue.enqueue(new AutoFeedNotification(this.pet, incFood, assignmentName));
                return incFood;
            } else {
                this.pet.addFood(diff);
                this.pet.storeFood(incFood - diff);
                this.notificationQueue.enqueue(new AutoFeedNotification(this.pet, incFood, incFood - diff, assignmentName));
                return diff;
            }
        } else {
            this.pet.storeFood(incFood);
            this.notificationQueue.enqueue(new StorageNotification(this.pet, incFood, assignmentName));
            return 0;
        }
    }

    forceUpdate(): void {
        this.pet?.forceUpdate();
    }

    notify(): void {
        if (this.notificationQueue && this.notificationQueue.size() > 0) {
            const notif = this.notificationQueue.peek();
            if (notif && !notif.announced) {
                // this.notifWall.addNotification(notif);
            }
            this.notificationQueue.dequeue();
        }
    }

    healthCheck(): Date {
        const currentTime = new Date();
        this.notifWall.SetHungerFlag(this.pet.isHungry());
        this.notifWall.SetSadFlag(this.pet.calculateHappiness()>HAPPINESS_THRESHOLD);
        return new Date(currentTime.getTime() + 30 * 60000); // Add 30 minutes
        
    }
}

export default PetController; */
