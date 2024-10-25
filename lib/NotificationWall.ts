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

    // Start is called before the first frame update
    void Start()
    {
        textWall = GetComponentInChildren<TextMeshProUGUI>();
        notificationDisplay = new Queue<Notification>();
        RenderNotifications();
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        int temp = notificationDisplay.Count;
        if (notificationDisplay != null && temp > 0)
        {
            Notification top = notificationDisplay.Peek();
            while (top != null && top.CheckDeath() < DateTime.Now)
            {

                notificationDisplay.Dequeue();
                if (notificationDisplay.Count > 0)
                    top = notificationDisplay.Peek();
                else top = null;

            }
            
                
        }
        if (temp != notificationDisplay.Count)
        { 
             RenderNotifications();
        }
    }

    void RenderNotifications()
    {
        //Debug.Log("Attempted to notify");
        textWall.text = "";
        String notifText = string.Empty;
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

}
