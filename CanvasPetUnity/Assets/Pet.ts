import { Assignment } from "./Assignment"; 
import { CanvasIntegrator } from "./CanvasIntegrator";

export class Pet {
    public name: string = "Pet";
    private currentFood: number;
    public readonly MAX_FOOD: number = 100;
    public readonly HUNGER_THRESHOLD: number = 80;
    public readonly MAX_HAPPY: number = 1000;
    public readonly HAPPY_THRESHOLD = 750;
    private assignmentTotal: number;
    private pointTotal: number;

    private numCoins: number;
    private graduationDate: Date;
    private hat: Hat;
    private birthday: Date;
    private storedFood: number;
    private state: string; // New property to track the pet's state

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
        this.state = "idle"; // Initialize state to "idle"
    }

    // Method to get the current state
    public getState(): string {
        return this.state;
    }

    // Method to set a new state
    public setState(newState: string): void {
        this.state = newState;
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

   public checkHappiness(): number {
        return this.currentHappiness
   }
   public setBirthday(birth: Date): void
    {
        this.birthday = birth;
    }

    public SetGraduation(gradDate: Date): void
    {
        this.graduationDate = gradDate;
    }

    // public SaveBackup() : void
    // {
    //     var objects: string[];
    //     objects[0] = this.name;
    //     objects[1] = this.MAX_FOOD.toString();
    //     objects[2] = this.HUNGER_THRESHOLD.toString();
    //     objects[3] = this.numCoins.toString();
    //     objects[4] = this.graduationDate.toDateString();
    //     objects[5] = this.birthday.toDateString();
    //     objects[6] = this.storedFood.toString();
    //     objects[7] = this.MAX_HAPPY.toString();
    //     objects[8] = this.assignmentTotal.toString();
    //     objects[9] = this.pointTotal.toString();
    //      var filepath: string = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
    //     StreamWriter sw = new StreamWriter(filepath + "/CanvasCritterBackup.txt");
        

    //     for(int i = 0; i< objects.Length; i ++)
    //     {
    //         sw.WriteLine(objects[i]);
    //     }
    //     sw.Close();

    //     if (File.Exists(filepath) && CheckBackupFile(filepath))
    //     {
    //         Console.WriteLine("Successfully saved backup to " + filepath +"\n");
    //     }
    //     else
    //     {
    //         Console.WriteLine("Backup failed\n");
    //     }
    // }

   /*  public  CheckBackupFile(filename: string): boolean
    {
         var backupText: string[] = File.ReadAllLines(filename);
        if (backupText.length != 10)
        {
            return false;
        }
        if (!parseInt(backupText[1]) || parseInt(backupText[1]) != this.MAX_FOOD)
        {
            return false;
        }
        if (!parseInt(backupText[2]) || parseInt(backupText[2])  != this.HUNGER_THRESHOLD)
        {
            return false;
        }
        if (!parseInt(backupText[3]))
        {
            return false;
        }
        if (!parseInt(backupText[7]) || parseInt(backupText[7]) != this.MAX_HAPPY)
        {
            return false;
        }
        if (!parseInt(backupText[6]))
        {
            return false;
        }
        if (!Date.parse(backupText[4]))
        {
            return false;
        }
        if (!Date.parse(backupText[5]))
        {
            return false;
        }
        if (!parseInt(backupText[8]))
        {
            return false;
        }
        if (!parseInt(backupText[9]))
        {
            return false;
        }
        else return true;
    }

    public  BuildFromBackup( filename: string[] ):void
    {
        if (CheckBackupFile(filename))
        {
            var backupText : string[] = File.ReadAllLines(filename);
            this.numCoins = +backupText[3];
            this.name = backupText[0];
            this.graduationDate = Date.parse(backupText[4]);
            this.birthday = Date.parse(backupText[5]);
            this.storedFood = +backupText[6];
            this.assignmentTotal = +backupText[8];
            this. pointTotal = +backupText[9];
            //Console.WriteLine("Built " + name + " from backup file.\n");
        }
        else
        {
            //Console.WriteLine("Failed to build from backup.\n");
        }

    } */

    public calculateStress() : number
    {
        var stress: number = 0;
        var total: number = 0;
        var duesoon: number = 0;
        for (var i = 0; i < this.pendingAssignments.length; i++)
        {
            if (this.pendingAssignments[i].DueSoon())
            {
                duesoon += this.pendingAssignments[i].GetPossiblePoints();
            }
            total += this.pendingAssignments[i].GetPossiblePoints();

        }

        stress = duesoon / total;

        return stress;
    }

    public calculateHappiness() : number
    {
        var happiness: number = 0;
        var hungerCheck: number = this.MAX_HAPPY / 2;
        if (this.isHungry())
        {
            hungerCheck = hungerCheck * (this.currentFood / this.HUNGER_THRESHOLD);
        }

        var stressCheck: number = this.MAX_HAPPY / 2;
        stressCheck = stressCheck * this.calculateStress();
        happiness = hungerCheck + stressCheck;
        this.currentHappiness = happiness;
        this.isVisiblyHappy = (happiness > this.HAPPY_THRESHOLD);
        return happiness;
    }
   
    public graduate(): void{}

}

export class Hat {
    private location: string;
}
