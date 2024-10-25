using System;
using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;
using UnityEngine;

public class Notification
{
    protected string petName;
    protected string type;
    public bool announced;
    protected string text;
    protected string assignmentName;
    protected DateTime death;
    protected int ttl =1;
    public Notification()
    {
        announced = false;
        text = "This should not happen. An error has occured and notification data was lost.";
    }

    public string Announce()
    {
        Debug.Assert(announced, "The incoming message has already been announced!");
        announced = true;

        return text;
    }
    public void AssignDeath()
    {
        DateTime now = DateTime.Now;
        death = now.AddMinutes(ttl);
    }
    public DateTime CheckDeath()
    {
        return death;
    }
    
    //how long notifications will stay
    public void SetTimeToLive(int mins)
    {
        ttl = mins;
    }
}
public class AutoFeedNotification : Notification
{
    private int food;
    private int stored;
    


    public AutoFeedNotification(Pet pet, int ate, string asName)
    {
        
        announced = false;
        petName = pet.name;
        food = ate;
        assignmentName = asName;

        text = petName + " ate " + food.ToString() + " food from " + assignmentName + "!\n";
    }

    public AutoFeedNotification(Pet pet, int ate, int store, string asName)
    {
        
        announced = false;
        petName = pet.name;
        food = ate;
        stored = store;
        assignmentName = asName;

        text = petName + " ate " + food.ToString() + " food and stored " + stored.ToString() + "from " + assignmentName + "! \n";
    }

}
public class StorageNotification : Notification
{
    private int added;
    

    public StorageNotification(Pet pet, int store, string asName)
    {
        announced = false;
        added = store;
        assignmentName = asName;
        petName = pet.name;

        text = "Stored " + added.ToString() + " food from " + assignmentName + " for " + petName + "\n";
    }
}
