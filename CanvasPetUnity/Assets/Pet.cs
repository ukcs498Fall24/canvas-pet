using System;


public class Pet
{
    public string name;
    private int currentFood;
    public readonly int MAX_FOOD = 100;
    private int numCoins;
    private DateTime graduationDate;
    private Hat hat;
    private readonly DateTime birthday;
    private int storedFood;

    private CanvasIntegrator ci;
    public Assignment[] pendingAssignments;

    private static readonly int MAX_HAPPY = 1000;
    private int currentHappiness;


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


    public void ForceUpdate()
    {
        ci.PullUpdates();
    }

}

public class Hat
{
    private string location;
}