using System;
using System.Collections;
using System.Collections.Generic;


public class CanvasIntegrator
{
    private string uuid;
    private string saveFile; //temp
    private bool initialized = false;
    private Assignment[] knownAssignments;
    private Assignment[] activeAssignments;

    

    // Start is called before the first frame update
    void Start()
    {
        if (!initialized)
        {
            OnFirstRun();
        }
        else
        {
            PullUpdates();
        }
        
           
        
    }


    public void PullUpdates()
    {
        
    }

    void OnFirstRun()
    {





        initialized = true;

    }

    private Assignment[] AssginmentChecker(Assignment[] newAssignments)
    {
        Assignment[] updates = newAssignments;
         foreach (Assignment assignment in updates)
        {
            
        }





        return updates;
    }


    private bool ValidAssignment(Assignment assignment)
    {
        bool valid = true;
        if (assignment == null)
        {
            valid = false;
        }
        else if (!assignment.CanSubmit())
        {
            valid = false;
        }




        return valid;
    }

}








































