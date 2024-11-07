using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class NotificationWall : MonoBehaviour
{
    private TextMeshProUGUI textWall;
    private Queue<Notification> notificationDisplay;
    private List<Notification> longTermNotifications;
    private bool hungerFlag;
    private bool sadFlag;

    // Start is called before the first frame update
    void Start()
    {
        textWall = GetComponentInChildren<TextMeshProUGUI>();
        notificationDisplay = new Queue<Notification>();
        longTermNotifications = new List<Notification>();
        hungerFlag = false;
        sadFlag = false;
        
        
        RenderNotifications();
       
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        int temp = notificationDisplay.Count;
        int temp2 = longTermNotifications.Count;

        if (notificationDisplay != null && temp > 0)
        {
            Notification top = notificationDisplay.Peek();
            ShiftLongTerm();
            while (top != null && top.CheckDeath() < DateTime.Now)
            {

                notificationDisplay.Dequeue();
                if (notificationDisplay.Count > 0)
                {
                    top = notificationDisplay.Peek();
                    if (top.longTerm)
                        ShiftLongTerm();
                }
                else top = null;

            }
        }
        CullLongTerm();
        if (temp != notificationDisplay.Count || temp2 != longTermNotifications.Count)
        { 
             RenderNotifications();
        }
    }

    void RenderNotifications()
    {
        //Debug.Log("Attempted to notify");
        textWall.text = "";
        String notifText = string.Empty;

        if (hungerFlag)
            notifText = notifText + "Your pet is very hungry!\n";
        if (sadFlag)
            notifText = notifText + "Your pet is very sad! Do you have any assignments due soon?\n";
        if (longTermNotifications.Count > 0)
        {
            foreach (Notification notification in longTermNotifications)
            {
                notifText = notifText + notification.Announce();
            }
        }

        if (notificationDisplay.Count != 0)
        {
            foreach (Notification notif in notificationDisplay.ToArray())
            {
                notifText = notifText + notif.Announce();
            }
        }
        textWall.text = notifText;

    }
    public void AddNotification(Notification n)
    {
        n.AssignDeath();
        notificationDisplay.Enqueue(n);
    }
    public void ShiftLongTerm()
    {
        Notification top = notificationDisplay.Peek();
        while (top.longTerm)
        {
            longTermNotifications.Add(top);
            notificationDisplay.Dequeue();
            if (notificationDisplay.Count > 0)
                top = notificationDisplay.Peek();
            else top = null;
        }
    }

    public void CullLongTerm()
    {
        foreach(Notification n in longTermNotifications)
        {
            if (n.CheckDeath()<DateTime.Now)
            {
                longTermNotifications.Remove(n);
            }
        }
    }

    public void SetHungerFlag(bool hungry)
    {
        hungerFlag = hungry;
    }

    public void SetSadFlag(bool sad)
    {
        sadFlag = sad;
    }

}
