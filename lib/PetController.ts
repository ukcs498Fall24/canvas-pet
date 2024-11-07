// class PetController {
//   private pet: Pet
//   private notificationQueue: Notification[]
//   private scheduledUpdate: Date

//   // public notifWall: NotificationWall;

//   constructor() {
//     this.pet = new Pet()
//     this.notificationQueue = []
//     this.scheduledUpdate = new Date()
//   }

//   // Start is called before the first frame update
//   async start(): Promise<void> {
//     this.pet = (await StorageManager.getCanvasPet()) ?? new Pet()
//     this.notificationQueue = []
//   }

//   // Update is called once per frame
//   update(): void {
//     // TESTING
//     const notif = new AutoFeedNotification(this.pet, 9, "testing")
//     this.notificationQueue.push(notif)
//   }

//   fixedUpdate(): void {
//     if (this.notificationQueue) {
//       this.notify()
//     }

//     if (new Date() > this.scheduledUpdate) {
//       this.scheduledUpdate = this.healthCheck()
//     }
//   }

//   autoFeed(incFood: number, assignmentName: string): number {
//     if (this.pet.getCurrentFood() < MAX_FOOD) {
//       const diff = MAX_FOOD - this.pet.getCurrentFood()
//       if (diff > incFood) {
//         this.pet.addFood(incFood)
//         this.notificationQueue.push(
//           new AutoFeedNotification(this.pet, incFood, assignmentName)
//         )
//         return incFood
//       } else {
//         this.pet.addFood(diff)
//         this.pet.storeFood(incFood - diff)
//         this.notificationQueue.push(
//           new AutoFeedNotification(
//             this.pet,
//             incFood,
//             incFood - diff,
//             assignmentName
//           )
//         )
//         return diff
//       }
//     } else {
//       this.pet.storeFood(incFood)
//       this.notificationQueue.push(
//         new StorageNotification(this.pet, incFood, assignmentName)
//       )
//       return 0
//     }
//   }

//   forceUpdate(): void {
//     this.pet?.forceUpdate()
//   }

//   notify(): void {
//     if (this.notificationQueue && this.notificationQueue.length > 0) {
//       const notif = this.notificationQueue[0]
//       if (notif && !notif.announced) {
//         // this.notifWall.addNotification(notif);
//       }
//       this.notificationQueue.shift()
//     }
//   }

//   healthCheck(): Date {
//     const currentTime = new Date()
//     return new Date(currentTime.getTime() + 30 * 60000) // Add 30 minutes
//   }
// }

import { useEffect, useRef, useState } from "react"

import {
  AutoFeedNotification,
  Notification,
  StorageNotification
} from "./Notification"
import { MAX_FOOD, Pet } from "./Pet"
import { StorageManager } from "./StorageManager"

const HAPPINESS_THRESHOLD: number = 800

const usePetController = () => {
  const [pet, setPet] = useState<Pet | null>(null)
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([])
  const scheduledUpdateRef = useRef(new Date())

  // Initialize the pet data
  useEffect(() => {
    const initializePet = async () => {
      const storedPet = await StorageManager.getCanvasPet()
      setPet(storedPet ? storedPet : new Pet())
      setNotificationQueue([])
    }
    initializePet()
  }, [])

  // This function simulates the update called on every render (is this what we actually want?)
  useEffect(() => {
    const update = () => {
      if (!pet) {
        throw new Error("Pet not initialized")
      }
      const notif = new AutoFeedNotification(pet, 9, "testing")
      setNotificationQueue((prevQueue) => [...prevQueue, notif])
    }
    update()
  })

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
        // Add code to handle notification display, e.g., notifWall.addNotification(firstNotif);
      }
      return rest
    })
  }

  // Health check method
  const healthCheck = (): Date => {
    const currentTime = new Date()
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
