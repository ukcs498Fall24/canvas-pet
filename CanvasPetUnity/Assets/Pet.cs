using System;


public class Pet
{
    public string name= "NULL";
    private int currentFood;
    public readonly int MAX_FOOD = 100;
    public readonly int HUNGER_THRESHOLD = 80;
    private int numCoins;
    private DateTime graduationDate;
    private Hat hat;
    private DateTime birthday;
    private int storedFood;

    private CanvasIntegrator ci;
    public Assignment[] pendingAssignments;

    private static readonly int MAX_HAPPY = 1000;
    private int currentHappiness;
    public bool isVisiblyHappy;


    public Pet()
    {
        currentHappiness = 0;
        name = "TEST_PET";
        currentFood = 0;
        storedFood = 0;
    }

    public int GetCurrentFood()
    {
        return currentFood;
    }
    public void AddFood(int food)
    {
        if (food + currentFood <= MAX_FOOD)
        {
            currentFood += food;
        }
        else
        {
            Console.WriteLine("Error: invalid food amount");
        }
    }
    public void StoreFood(int food)
    {
        storedFood += food;
    }
    public bool IsHungry()
    {
        isVisiblyHappy = isVisiblyHappy && currentFood > HUNGER_THRESHOLD;
        return currentFood < HUNGER_THRESHOLD;

    }

    public void ForceUpdate()
    {
        ci.PullUpdates();
    }

    public void SetBirthday(DateTime birth)
    {
        birthday = birth;
    }

    public void SetGraduation()
    { }
}

public class Hat
{
    private string location;
}