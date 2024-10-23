using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Assertions;

public class PetController : MonoBehaviour
{
    private Pet pet;
    private Queue<Notification> notificationQueue;
    private Queue<Notification> notificationDisplay;

    public int HAPPINESS_THRESHOLD = 800;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (pet != null)
        {

        }

    }
    private void FixedUpdate()
    {
        if (notificationQueue != null)
        {
            Notify();
        }


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
        Notification notif = notificationQueue.Peek();
        if (!notif.announced)
        {
            notif.Announce(); // print text to notification wall;
            notificationDisplay.Enqueue(notif);
        }
        notificationQueue.Dequeue();
    }
}


