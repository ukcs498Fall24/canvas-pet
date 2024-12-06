import { CanvasIntegrator } from "./CanvasIntegrator"

export interface PetJSON {
  name: string
  currentFood: number
  numCoins: number
  graduationDate: Date
  hat: HatJSON
  birthday: Date
  storedFood: number
  currentHappiness: number
  eatenAssignmentIds: string[]
  pendingAssignmentIds: string[]
}

export const MAX_FOOD: number = 100
export const HUNGER_THRESHOLD: number = 80
export const MAX_HAPPY: number = 1000
export const HAPPY_THRESHOLD: number = 750

export class Pet {
  private ci?: CanvasIntegrator

  public get isVisiblyHappy() {
    return (
      this.currentFood > HUNGER_THRESHOLD &&
      this.currentHappiness > HAPPY_THRESHOLD
    )
  }

  constructor(
    public name: string,

    public storedFood: number,
    public currentFood: number,

    public assignmentTotal: number,
    public pointTotal: number,

    public numCoins: number,

    public currentHappiness: number = 0,

    public eatenAssignmentIds: Set<string>,
    public pendingAssignmentIds: string[],

    public hat: Hat,

    public graduationDate: Date,
    public birthday: Date
  ) {}

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

  public checkHappiness(): number {
    return this.currentHappiness
  }

  public setBirthday(birth: Date): void {
    this.birthday = birth
  }

  public SetGraduation(gradDate: Date): void {
    this.graduationDate = gradDate
  }

  public toJSON(): PetJSON {
    return {
      name: this.name,
      currentFood: this.currentFood,
      numCoins: this.numCoins,
      graduationDate: this.graduationDate,
      hat: this.hat?.toJSON(),
      birthday: this.birthday,
      storedFood: this.storedFood,
      currentHappiness: this.currentHappiness,
      pendingAssignmentIds: this.pendingAssignmentIds,
      eatenAssignmentIds: [...this.eatenAssignmentIds]
    }
  }

  public static fromJSON(json: PetJSON) {
    const pet = new Pet(
      json.name,
      json.storedFood,
      json.currentFood,
      0,
      0,
      json.numCoins,
      json.currentHappiness,
      new Set(json.eatenAssignmentIds),
      json.pendingAssignmentIds,
      Hat.fromJSON(json.hat),
      json.graduationDate,
      json.birthday
    )

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
