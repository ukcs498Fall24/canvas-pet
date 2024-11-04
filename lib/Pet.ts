import { Assignment } from "./Assignment";
import { CanvasIntegrator } from "./CanvasIntegrator";

export class Pet {
    public name: string | null = null;
    private currentFood: number;
    public readonly MAX_FOOD: number = 100;
    public readonly HUNGER_THRESHOLD: number = 80;
    private numCoins: number;
    private graduationDate: Date;
    private hat: Hat;
    private readonly birthday: Date;
    private storedFood: number;

    private ci: CanvasIntegrator;
    public pendingAssignments: Assignment[];

    private static readonly MAX_HAPPY: number = 1000;
    private currentHappiness: number;
    public isVisiblyHappy: boolean;

    constructor(currentHappiness: number = 0, name: string = "TEST", currentFood: number = 0, storedFood: number = 0) {
        this.currentHappiness = currentHappiness;
        this.name = name;
        this.currentFood = currentFood;
        this.storedFood = storedFood;
    }

    public getCurrentFood(): number {
        return this.currentFood;
    }

    public addFood(food: number): void {
        if (food + this.currentFood <= this.MAX_FOOD) {
            this.currentFood += food;
        } else {
            console.error("Error: invalid food amount");
        }
    }

    public storeFood(food: number): void {
        this.storedFood += food;
    }

    public isHungry(): boolean {
        this.isVisiblyHappy = this.isVisiblyHappy && this.currentFood > this.HUNGER_THRESHOLD;
        return this.currentFood < this.HUNGER_THRESHOLD;
    }

    public forceUpdate(): void {
        this.ci.pullUpdates();
    }
}

export class Hat {
    private location: string;
}

