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
    public bool longTerm = false;
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
        if (death == null)
        {
            death = now.AddMinutes(ttl);
        } 
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
        longTerm = true;
        text = "Stored " + added.ToString() + " food from " + assignmentName + " for " + petName + "\n";
    }
}
public class DeadlineNotification : Notification
{
    private DateTime dueTime;
    public DeadlineNotification(string asName,  DateTime dueDate)
    {
        assignmentName = asName;
        dueTime = dueDate;
        TimeSpan temp = dueTime - DateTime.Now;
        text = assignmentName + " is due in " + temp.TotalHours.ToString() + " hours.\n";
        death = dueTime;
    }
}
public class CoinNotification : Notification
{
    private int coinNum;
    private double grade;
    public CoinNotification(Pet pet, int num, string asName, double gradeNum)
    {
        coinNum = num;
        assignmentName = asName;
        grade = gradeNum;
        coinNum = num;
        text = petName.ToString() + " got " + coinNum.ToString() + " coins from getting a grade of " + grade.ToString() + " on assignment " + assignmentName + ".\n";
    }
}