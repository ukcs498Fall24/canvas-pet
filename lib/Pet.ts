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
export const HAPPY_THRESHOLD: number = 750

export class Pet {
  public name: string | null = null
  private currentFood: number
  private numCoins?: number
  private graduationDate?: Date
  private hat?: Hat
  private birthday?: Date
  private storedFood: number
  private assignmentTotal: number
  private pointTotal: number

  private ci?: CanvasIntegrator
  private eatenAssignments?: Set<Assignment>
  public pendingAssignments?: Assignment[]

  private currentHappiness: number
  public get isVisiblyHappy() {
    return (
      this.currentFood > HUNGER_THRESHOLD &&
      this.currentHappiness > HAPPY_THRESHOLD
    )
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
    this.assignmentTotal = 0
    this.pointTotal = 0
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
  public calculateStress(): number {
    //calculates % of  happiness is lost by comparing how many points of assignments are due in the next 24 hours compared to all published assignments
    var stress: number = 0
    var total: number = 0
    var duesoon: number = 0
    if (this.pendingAssignments != null) {
      var now: Date = new Date()
      for (var i: number = 0; i < this.pendingAssignments.length; i++) {
        if (
          this.pendingAssignments[i].due_at.getTime() - now.getTime() <
          24 * 3600000
        ) {
          //within 24hrs
          duesoon += this.pendingAssignments[i].points_possible
        }
        total += this.pendingAssignments[i].points_possible
      }
    }

    stress = duesoon / total

    return stress
  }

  public calculateHappiness(): number {
    // half of happiness (500pts) comes from food, half from how stressed
    var happiness: number = 0
    var hungerCheck: number = MAX_HAPPY / 2
    if (this.isHungry()) {
      hungerCheck = hungerCheck * (this.currentFood / HUNGER_THRESHOLD)
    }

    var stressCheck: number = MAX_HAPPY / 2
    stressCheck = stressCheck * this.calculateStress()
    happiness = hungerCheck + stressCheck
    this.currentHappiness = happiness
    return happiness
  }

  public checkHappiness(): number {
    return this.currentHappiness
  }

  public setBirthday(birth: Date): void {
    this.birthday = birth
  }

  public SetGraduation(gradDate: Date): void {
    this.graduationDate = gradDate
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
