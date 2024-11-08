
export class Notification
{
    protected petName: string;
    
    public announced: boolean;
    public  longTerm: boolean = false;
    protected text: string;
    protected assignmentName: string;
    protected death: Date;
    protected ttl: number = 1;
    constructor ()
    {
        this.announced = false;
        this.text = "This should not happen. An error has occured and notification data was lost.";
    }
    public  Announce(): string
    {
        if(this.announced) 
        {
            throw new Error("The incoming message has already been announced!");
        }
        this.announced = true;
        return this.text;
    }
    public AssignDeath(): void
    {
        const now = new Date();
        if (this.death == null)
        {
            this.death = new Date(now.getTime() + this.ttl * 60000);
        } 
    }
    public CheckDeath(): Date 
    {
        return this.death;
    }
    //how long notifications will stay
    public SetTimeToLive(mins: number): void 
    {
        this.ttl = mins;
    }
}
export class AutoFeedNotification extends Notification {
    private  food: number;
    private  stored: number;   
    
    constructor(pet: { name: string }, ate: number, asName: string); 
    constructor(pet: { name: string }, ate: number, store: number, asName: string);

    constructor(pet: { name: string }, ate: number, storeOrAsName: number | string, asName?: string) {
        super();
        this.announced = false;
        this.petName = pet.name;
        if (typeof storeOrAsName === 'number') {
            this.food = ate;
            this.stored = storeOrAsName;
            this.assignmentName = asName!;
            this.text = `${this.petName} ate ${this.food} food and stored ${this.stored} from ${this.assignmentName}!\n`;
        } 
        else 
        {
            this.food = ate;
            this.assignmentName = storeOrAsName;
            this.text = `${this.petName} ate ${this.food} food from ${this.assignmentName}!\n`;
        }

    }
}
export class StorageNotification extends Notification
{
    private added: number;
    constructor(pet: { name: string }, store: number, asName: string)
    {
        super();
        this.announced = false;
        this.added = store;
        this.assignmentName = asName;
        this.petName = pet.name;
        this.longTerm = true;
        this.text = "Stored " + this.added.toString() + " food from " + this.assignmentName + " for " + this.petName + "\n";
    }
}
export class DeadlineNotification extends Notification
{
    private dueTime: Date;
    constructor(asName: string, dueDate:Date)
    {
        super();
        this.assignmentName = asName;
        this.dueTime = dueDate;



        /// no clue how to fix this yet
        
        temp: Date = this.dueTime - new Date();
        this.text = this.assignmentName + " is due in " + temp.TotalHours.ToString() + " hours.\n";
        this.death = this.dueTime;
    }
}
export class CoinNotification extends Notification
{
    private coinNum: number;
    private grade:number ;
    public CoinNotification(pet: { name: string }, num: number, asName: string, gradeNum:number)
    {
        this.coinNum = num;
        this.assignmentName = asName;
        this.grade = gradeNum;
        this.coinNum = num;
        this.text = this.petName.toString() + " got " + this.coinNum.toString() + " coins from getting a grade of " + this.grade.toString() + " on assignment " + this.assignmentName + ".\n";
    }
}