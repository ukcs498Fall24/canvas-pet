import { CanvasIntegrator } from "./CanvasIntegrator";
import type { Assignment } from "./types";

export interface PetJSON {
  name: string;
  storedFood: number;
  eatenFood: number;
  eatenAssignmentIds: string[];
  birthday: Date;
}

export const MAX_FOOD: number = 100;
export const HUNGER_THRESHOLD: number = 80;
export const HAPPY_THRESHOLD: number = 0.75;

export class Pet {
  constructor(
    public readonly name: string,

    public readonly storedFood: number,
    public readonly eatenFood: number,

    public readonly eatenAssignmentIds: Set<string>,

    public readonly birthday: Date,

    public readonly assignments: Map<string, Assignment>
  ) {}

  public get pendingAssignmentIds(): Set<string> {
    const now = new Date().getTime();
    return new Set(
      Array.from(this.assignments.values())
        .filter(
          (assignment) =>
            assignment.due_at &&
            assignment.due_at.getTime() > now &&
            assignment.due_at.getTime() - now < 24 * 3600000
        )
        .filter((assignment) => !this.eatenAssignmentIds.has(assignment.id))
        .map((assignment) => assignment.id)
    );
  }

  public get hunger(): number {
    console.log(this.birthday);
    const now = new Date();
    const age = now.getTime() - this.birthday.getTime();
    // We want 1 point of hunger every hour
    const hunger = age / 3600000;
    return hunger;
  }

  public get foodInBelly(): number {
    return this.eatenFood - this.hunger;
  }

  public get stress(): number {
    let total = 0;
    let dueSoon = 0;

    for (const id of this.pendingAssignmentIds) {
      const assignment = this.assignments.get(id);
      if (!assignment) {
        continue;
      }
      total += assignment.points_possible;
      const now = new Date();
      if (
        assignment.due_at &&
        assignment.due_at.getTime() - now.getTime() < 24 * 3600000
      ) {
        dueSoon += assignment.points_possible;
      }
    }

    if (total === 0) {
      return 0;
    }

    return dueSoon / total;
  }

  public get currentHappiness(): number {
    const hunger = this.foodInBelly / MAX_FOOD;
    const stress = this.stress;

    return (hunger + stress) / 2;
  }

  public get isVisiblyHappy() {
    return this.currentHappiness >= HAPPY_THRESHOLD;
  }

  public get isHungry(): boolean {
    return this.foodInBelly < HUNGER_THRESHOLD;
  }

  public store(food: number): Pet {
    return new Pet(
      this.name,
      this.storedFood + food,
      this.eatenFood,
      this.eatenAssignmentIds,
      this.birthday,
      this.assignments
    );
  }

  public eat(food: number): Pet {
    const foodToEat = Math.min(MAX_FOOD - this.foodInBelly, food);

    return new Pet(
      this.name,
      this.storedFood,
      this.eatenFood + foodToEat,
      this.eatenAssignmentIds,
      this.birthday,
      this.assignments
    );
  }

  public eatAndStore(food: number): Pet {
    const foodToEat = Math.min(MAX_FOOD - this.foodInBelly, food);

    return new Pet(
      this.name,
      this.storedFood + (food - foodToEat),
      this.eatenFood + foodToEat,
      this.eatenAssignmentIds,
      this.birthday,
      this.assignments
    );
  }

  public eatStored(food: number): Pet {
    if (this.storedFood < food) {
      return this;
    }

    const foodToEat = Math.min(MAX_FOOD - this.foodInBelly, food);

    return new Pet(
      this.name,
      this.storedFood - foodToEat,
      this.eatenFood + foodToEat,
      this.eatenAssignmentIds,
      this.birthday,
      this.assignments
    );
  }

  public setAssignments(assignments: Map<string, Assignment>): Pet {
    let newFood = 0;
    for (const newAssignment of assignments.values()) {
      if (
        newAssignment.has_submitted_submissions &&
        newAssignment.due_at &&
        newAssignment.due_at.getTime() > this.birthday.getTime() &&
        !this.eatenAssignmentIds.has(newAssignment.id)
      ) {
        newFood += newAssignment.points_possible;
      }
    }

    return new Pet(
      this.name,
      this.storedFood + newFood,
      this.eatenFood,
      this.eatenAssignmentIds,
      this.birthday,
      assignments
    );
  }

  public toJSON(): PetJSON {
    return {
      name: this.name,
      storedFood: this.storedFood,
      eatenFood: this.eatenFood,
      eatenAssignmentIds: Array.from(this.eatenAssignmentIds),
      birthday: this.birthday,
    };
  }

  public static fromJSON(json: PetJSON) {
    const pet = new Pet(
      json.name,
      json.storedFood,
      json.eatenFood,
      new Set(json.eatenAssignmentIds),
      new Date(json.birthday),
      new Map()
    );

    return pet;
  }
}

export interface HatJSON {
  location: string;
}

export class Hat {
  private location: string;

  public toJSON(): HatJSON {
    return {
      location: this.location,
    };
  }

  public static fromJSON(json: HatJSON) {
    const hat = new Hat(json.location);
    return hat;
  }

  constructor(location: string) {
    this.location = location;
  }
}
