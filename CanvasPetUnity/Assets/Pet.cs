using System;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEngine.Assertions;


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
        birthday = DateTime.Now;
    }

    public Pet(string nameString, DateTime grad)
    {
        currentHappiness = 0;
        name = nameString;
        currentFood = 0;
        storedFood = 0;
        birthday = DateTime.Now;
        graduationDate = grad;
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

    public void SetGraduation(DateTime gradDate)
    {
        graduationDate = gradDate;
    }

    public void SaveBackup()
    {
        object[] objects = new object[8];
        objects[0] = name;
        objects[1] = MAX_FOOD;
        objects[2] = HUNGER_THRESHOLD;
        objects[3] = numCoins;
        objects[4] = graduationDate;
        objects[5] = birthday;
        objects[6] = storedFood;
        objects[7] = MAX_HAPPY;
        string filepath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
        StreamWriter sw = new StreamWriter(filepath + "/CanvasCritterBackup.txt");
        

        for(int i = 0; i< objects.Length; i ++)
        {
            sw.WriteLine(objects[i]);
        }
        sw.Close();

        if (File.Exists(filepath) && CheckBackupFile(filepath))
        {
            Console.WriteLine("Successfully saved backup to " + filepath +"\n");
        }
        else
        {
            Console.WriteLine("Backup failed\n");
        }
    }

    public bool CheckBackupFile(string filename)
    {
        string[] backupText = File.ReadAllLines(filename);
        if (backupText.Length != 8)
        {
            return false;
        }
        if (!Int32.TryParse(backupText[1], out int t) || t != MAX_FOOD)
        {
            return false;
        }
        if (!Int32.TryParse(backupText[2], out int u) || u != HUNGER_THRESHOLD)
        {
            return false;
        }
        if (!Int32.TryParse(backupText[3], out int v))
        {
            return false;
        }
        if (!Int32.TryParse(backupText[7], out int w) || w != MAX_HAPPY)
        {
            return false;
        }
        if (!Int32.TryParse(backupText[6], out int x))
        {
            return false;
        }
        if (!DateTime.TryParse(backupText[4], out DateTime y))
        {
            return false;
        }
        if (!DateTime.TryParse(backupText[5], out DateTime z))
        {
            return false;
        }
        else return true;
    }

    public void BuildFromBackup(string filename)
    {
        if (CheckBackupFile(filename))
        {
            string[] backupText = File.ReadAllLines(filename);
            numCoins = Int32.Parse(backupText[3]);
            name = backupText[0];
            graduationDate = DateTime.Parse(backupText[4]);
            birthday = DateTime.Parse(backupText[5]);
            storedFood = Int32.Parse(backupText[6]);
            Console.WriteLine("Built " + name + " from backup file.\n");
        }
        else
        {
            Console.WriteLine("Failed to build from backup.\n");
        }

    }
}

public class Hat
{
    private string location;
}