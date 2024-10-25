using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Unity.PlasticSCM.Editor.WebApi;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Assertions;

public class PetController : MonoBehaviour
{
    private Pet pet;
    private Queue<Notification> notificationQueue;
    private DateTime ScheduledUpdate;

    public NotificationWall notifWall;

    public int HAPPINESS_THRESHOLD = 800;

    // Start is called before the first frame update
    void Start()
    {
        pet = new Pet();
        notificationQueue = new Queue<Notification>();
    }

    // Update is called once per frame
    void Update()
    {
        //TESTING
        Notification notif = new AutoFeedNotification(pet, 9, "testing");
        notificationQueue.Enqueue(notif);
        //if (pet != null) {}

    }
    private void FixedUpdate()
    {
        if (notificationQueue != null)
        {
            Notify();
        }

        if (DateTime.Now >  ScheduledUpdate)
        {
            ScheduledUpdate = HealthCheck();
        }

       // if(pet.IsHungry())

    }

    int AutoFeed(int incFood, string assignmentName)
    {       
        if (pet.GetCurrentFood() < pet.MAX_FOOD)
        {
            int diff = pet.MAX_FOOD - pet.GetCurrentFood();
            if (diff > incFood) 
            {
                pet.AddFood(incFood);

                notificationQueue.Enqueue(new AutoFeedNotification(pet, incFood, assignmentName));
                return incFood;
            }
            else
            {
                pet.AddFood(diff);
                pet.StoreFood(incFood-diff);
                notificationQueue.Enqueue(new AutoFeedNotification(pet, incFood, incFood - diff, assignmentName));
                return diff;      
            }
        }
        else
        {
            pet.StoreFood(incFood);
            notificationQueue.Enqueue(new StorageNotification(pet, incFood, assignmentName));
            return 0;
        }
    }


    public void ForceUpdate()
    {
        pet?.ForceUpdate();
    }

    public void Notify()
    {
        if (notificationQueue != null && notificationQueue.Count > 0)
        {
            Notification notif = notificationQueue.Peek();
            if (notif != null && !notif.announced)
            {
                notifWall.AddNotification(notif);
            }
            notificationQueue.Dequeue();
        }
    }

    public DateTime HealthCheck()
    {
        DateTime currentTime = DateTime.Now;




        return currentTime.AddMinutes(30);
    }
}


