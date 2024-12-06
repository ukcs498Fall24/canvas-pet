import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  AutoFeedNotification,
  Notification,
  StorageNotification,
} from "./Notification";
import { HUNGER_THRESHOLD, MAX_FOOD, Pet } from "./Pet";
import { usePet, useSetPet } from "./PetContext";
import { StorageManager } from "./StorageManager";
import { useData } from "./useData";

const HAPPINESS_THRESHOLD: number = 800;

const usePetController = () => {
  const pet = usePet();
  const setPet = useSetPet();
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>(
    []
  );
  const { assignments } = useData();

  useEffect(() => {
    if (pet) setPet(pet.setAssignments(assignments));
  }, [assignments]);

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

  // Notification function to handle notifications
  const notify = () => {
    setNotificationQueue((prevQueue) => {
      const [firstNotif, ...rest] = prevQueue;
      if (firstNotif && !firstNotif.announced) {
        // Add code to better handle showing notifications
        alert(firstNotif.text);
      }
      return rest;
    });
  };

  // Function to automatically feed the pet
  const autoFeed = (incFood: number, assignmentName: string) => {
    if (!pet) {
      throw new Error("Pet not initialized");
    }

    setPet(pet.eatAndStore(incFood));
  };

  const feedWithAvailableFood = () => {
    if (!pet) {
      throw new Error("Pet not initialized");
    }
    setPet(pet.eatStored(1));
  };

  return {
    pet,
    autoFeed,
    notificationQueue,
    feedWithAvailableFood,
  };
};

export default usePetController;

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
