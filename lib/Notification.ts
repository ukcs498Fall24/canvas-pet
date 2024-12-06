export class Notification {
  protected petName?: string;
  protected type?: string;
  public announced: boolean;
  protected text: string;
  protected assignmentName?: string;
  protected death?: Date;
  protected ttl: number = 1;

  constructor() {
    this.announced = false;
    this.text =
      "This should not happen. An error has occurred and notification data was lost.";
  }

  public Announce(): string {
    if (this.announced) {
      throw new Error("The incoming message has already been announced!");
    }
    this.announced = true;
    return this.text;
  }

  public AssignDeath(): void {
    const now = new Date();
    if (this.death == null) {
      // certain long term notifs will have preset death
      this.death = new Date(now.getTime() + this.ttl * 60000);
    }
  }

  public CheckDeath(): Date | undefined {
    return this.death;
  }

  public SetTimeToLive(mins: number): void {
    this.ttl = mins;
  }
}

export class AutoFeedNotification extends Notification {
  private food: number;
  private stored?: number;

  constructor(pet: { name: string | null }, ate: number, asName: string);
  constructor(
    pet: { name: string | null },
    ate: number,
    store: number,
    asName: string
  );
  constructor(
    pet: { name: string | null },
    ate: number,
    storeOrAsName: number | string,
    asName?: string
  ) {
    super();
    this.announced = false;
    this.petName = pet.name ?? "ERR";
    if (typeof storeOrAsName === "number") {
      this.food = ate;
      this.stored = storeOrAsName;
      this.assignmentName = asName!;
      this.text = `${this.petName} ate ${this.food} food and stored ${this.stored} from ${this.assignmentName}!\n`;
    } else {
      this.food = ate;
      this.assignmentName = storeOrAsName;
      this.text = `${this.petName} ate ${this.food} food from ${this.assignmentName}!\n`;
    }
  }
}

export class StorageNotification extends Notification {
  private added: number;

  constructor(pet: { name: string | null }, store: number, asName: string) {
    super();
    this.announced = false;
    this.added = store;
    this.assignmentName = asName;
    this.petName = pet.name ?? undefined;
    this.text = `Stored ${this.added} food from ${this.assignmentName} for ${this.petName}\n`;
  }
}

export class DeadlineNotification extends Notification {
  private dueTime: Date;
  constructor(asName: string, dueDate: Date) {
    super();
    this.assignmentName = asName;
    this.dueTime = dueDate;

    /// no clue how to fix this yet

    var temp: Number =
      (this.dueTime.getTime() - new Date().getTime()) / 3600000;

    this.text =
      this.assignmentName + " is due in " + temp.toString() + " hours.\n"; //this is ugly rn
    this.death = this.dueTime;
  }
}

export class CoinNotification extends Notification {
  private coinNum: number | undefined;
  private grade: number | undefined;
  public CoinNotification(
    pet: { name: string },
    num: number,
    asName: string,
    gradeNum: number
  ) {
    this.coinNum = num;
    this.assignmentName = asName;
    this.grade = gradeNum;
    this.coinNum = num;
    this.text =
      this.petName?.toString() +
      " got " +
      this.coinNum.toString() +
      " coins from getting a grade of " +
      this.grade.toString() +
      " on assignment " +
      this.assignmentName +
      ".\n";
  }
}
