//import { List } from "~lib/List";
import { Notification } from "~lib/Notification";
import { Queue } from "~lib/Queue";

export class NotificationWall {
  //private TextMeshProUGUI textWall; <- unity artifact
  private notificationDisplay: Queue<Notification>;
  private longTermNotifications: Array<Notification>;
  private hungerFlag: boolean;
  private sadFlag: boolean;
  private textWall: string;

  // Start is called before the first frame update
  constructor() {
    this.notificationDisplay = new Queue<Notification>();
    this.longTermNotifications = new Array<Notification>();
    this.hungerFlag = false;
    this.sadFlag = false;
    this.textWall = "";

    this.RenderNotifications();
  }

  // Update is called once per frame
  FixedUpdate() {
    if (!this.notificationDisplay.isEmpty()) {
      var temp: number = this.notificationDisplay.size(); //this is an attempt to keep from rerendering notifications when there has been no change
      var temp2 = this.longTermNotifications.length;

      if (this.notificationDisplay != null && temp > 0) {
        var top: Notification = this.notificationDisplay.peek();
        this.ShiftLongTerm();
        while (top != null && top.CheckDeath().getDate < Date.now) {
          this.notificationDisplay.dequeue();
          if (this.notificationDisplay.size() > 0) {
            top = this.notificationDisplay.peek();
            if (top.longTerm) this.ShiftLongTerm();
          } else top = null;
        }
      }
      this.CullLongTerm();
      if (
        temp != this.notificationDisplay.size() ||
        temp2 != this.longTermNotifications.length
      ) {
        this.RenderNotifications();
      }
    }
  }

  RenderNotifications(): string {
    //Debug.Log("Attempted to notify");
    this.textWall = "";
    var notifText: string = "";

    if (this.hungerFlag) notifText = notifText + "Your pet is very hungry!\n";
    if (this.sadFlag)
      notifText =
        notifText +
        "Your pet is very sad! Do you have any assignments due soon?\n";
    if (this.longTermNotifications.length > 0) {
      for (var i = 0; i < this.longTermNotifications.length; i++) {
        notifText = notifText + this.longTermNotifications[i].Announce();
      }
    }

    if (this.notificationDisplay.size() != 0) {
      var tempQueue: Queue<Notification> = this.notificationDisplay;
      while (!tempQueue.isEmpty) {
        var notif: Notification = tempQueue.peek();
        notifText = notifText + notif.Announce();
        tempQueue.dequeue();
      }
    }
    this.textWall = notifText;
    return this.textWall;
  }
  AddNotification(n: Notification) {
    n.AssignDeath();
    this.notificationDisplay.enqueue(n);
  }
  ShiftLongTerm() {
    var top: Notification = this.notificationDisplay.peek();
    while (top.longTerm) {
      this.longTermNotifications.push(top);
      this.notificationDisplay.dequeue();
      if (this.notificationDisplay.size() > 0)
        top = this.notificationDisplay.peek();
      else top = null;
    }
  }

  CullLongTerm() {
    this.longTermNotifications.reverse;
    for (var i = this.longTermNotifications.length; i > 0; i--) {
      if (this.longTermNotifications[i].CheckDeath().getDate < Date.now) {
        this.longTermNotifications.splice(i, 1);
      }
    }
    this.longTermNotifications.reverse;
  }

  SetHungerFlag(hungry: boolean) {
    this.hungerFlag = hungry;
  }

  SetSadFlag(sad: boolean) {
    this.sadFlag = sad;
  }
}
