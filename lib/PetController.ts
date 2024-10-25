import { AutoFeedNotification, Notification, StorageNotification } from "./Notification";
import { Pet } from "./Pet";
import { Queue } from "./Queue";

class PetController {
    private pet: Pet;
    private notificationQueue: Queue<Notification>;
    private scheduledUpdate: Date;

    // public notifWall: NotificationWall;

    public HAPPINESS_THRESHOLD: number = 800;

    constructor() {
        this.pet = new Pet();
        this.notificationQueue = new Queue<Notification>();
        this.scheduledUpdate = new Date();
    }

    // Start is called before the first frame update
    start(): void {
        this.pet = new Pet();
        this.notificationQueue = new Queue<Notification>();
    }

    // Update is called once per frame
    update(): void {
        // TESTING
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
        return new Date(currentTime.getTime() + 30 * 60000); // Add 30 minutes
    }
}
