import { CanvasIntegrator } from "./CanvasIntegrator"
import { type Assignment } from "./types"

export interface PetJSON {
  name: string
  currentFood: number
  numCoins: number
  graduationDate: Date
  hat: HatJSON
  birthday: Date
  storedFood: number
  currentHappiness: number
}

export const MAX_FOOD: number = 100
export const HUNGER_THRESHOLD: number = 80
export const MAX_HAPPY: number = 1000

export class Pet {
  public name: string | null = null
  private currentFood: number
  private numCoins?: number
  private graduationDate?: Date
  private hat?: Hat
  private birthday?: Date
  private storedFood: number

  private ci?: CanvasIntegrator
  public pendingAssignments?: Assignment[]

  private currentHappiness: number
  public get isVisiblyHappy() {
    return this.currentFood > HUNGER_THRESHOLD
  }

  constructor(
    currentHappiness: number = 0,
    name: string = "TEST",
    currentFood: number = 0,
    storedFood: number = 0
  ) {
    this.currentHappiness = currentHappiness
    this.name = name
    this.currentFood = currentFood
    this.storedFood = storedFood
  }

  public getCurrentFood(): number {
    return this.currentFood
  }

  public addFood(food: number): void {
    if (food + this.currentFood <= MAX_FOOD) {
      this.currentFood += food
    } else {
      console.error("Error: invalid food amount")
    }
  }

  public storeFood(food: number): void {
    this.storedFood += food
  }

  public isHungry(): boolean {
    return this.currentFood < HUNGER_THRESHOLD
  }

  public forceUpdate(): void {
    this.ci?.pullUpdates()
  }

  public toJSON() {
    return {
      name: this.name,
      currentFood: this.currentFood,
      numCoins: this.numCoins,
      graduationDate: this.graduationDate,
      hat: this.hat,
      birthday: this.birthday,
      storedFood: this.storedFood,
      currentHappiness: this.currentHappiness
    }
  }

  public static fromJSON(json: PetJSON) {
    const pet = new Pet()
    pet.name = json.name
    pet.currentFood = json.currentFood
    pet.numCoins = json.numCoins
    pet.graduationDate = json.graduationDate
    pet.hat = new Hat(json.hat.location)
    pet.birthday = json.birthday
    pet.storedFood = json.storedFood
    pet.currentHappiness = json.currentHappiness
    return pet
  }
}

export interface HatJSON {
  location: string
}

export class Hat {
  private location: string

  public toJSON(): HatJSON {
    return {
      location: this.location
    }
  }

  public static fromJSON(json: HatJSON) {
    const hat = new Hat(json.location)
    return hat
  }

  constructor(location: string) {
    this.location = location
  }
}
