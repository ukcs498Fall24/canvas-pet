using System;

public class Assignment
{

    private bool completed;
    private double grade;
    public TimeSpan alertTime = new TimeSpan(24, 0, 0);

    // the name of the assignment
    //  "name": "some assignment",
    private string name;

    // the ID of the assignment
    //"id": 4, 
    private int id;

    //  // The time at which this assignment was originally created
    //  "created_at": "2012-07-01T23:59:00-06:00",
    private DateTime created_at;

    //  // The time at which this assignment was last modified in any way
    //  "updated_at": "2012-07-01T23:59:00-06:00",
    private DateTime updated_at;

    //  the due date for the assignment. returns null if not present. NOTE: If this
    //  assignment has assignment overrides, this field will be the due date as it
    // applies to the user requesting information from the API.
    //  "due_at": "2012-07-01T23:59:00-06:00",
    private DateTime due_at;

    // the lock date (assignment is locked after this date). returns null if not
    //  present. NOTE: If this assignment has assignment overrides, this field will
    // be the lock date as it applies to the user requesting information from the
    // API.
    //  "lock_at": "2012-07-01T23:59:00-06:00",
    private DateTime lock_at;

    //  // the unlock date (assignment is unlocked after this date) returns null if not
    //  // present NOTE: If this assignment has assignment overrides, this field will be
    //  // the unlock date as it applies to the user requesting information from the
    //  // API.
    //  "unlock_at": "2012-07-01T23:59:00-06:00",
    private DateTime unlock_at;

    //  the ID of the course the assignment belongs to
    //  "course_id": 123,
    private string course_id;

    //  the maximum points possible for the assignment
    //  "points_possible": 12.0, 
    private double points_possible;

    //  The type of grading the assignment receives; one of 'pass_fail', 'percent',
    //  'letter_grade', 'gpa_scale', 'points'
    //  "grading_type": "points",
    private string grading_type;

    //  Whether the assignment is published
    //  "published": true,
    private bool published;

    //  Whether or not this is locked for the user.
    //  "locked_for_user": false,
    private bool locked_for_user;


    //  // (Optional) If 'submission' is included in the 'include' parameter, includes a
    //  // Submission object that represents the current user's (user who is requesting
    //  // information from the api) current submission for the assignment. See the
    //  // Submissions API for an example response. If the user does not have a
    //  // submission, this key will be absent.
    //  "submission": null,
    private bool submission;

    //  // (Optional) If true, the assignment will be omitted from the student's final
    //  // grade
    //  "omit_from_final_grade": true,
    private bool omit_from_final_grade;

    //  // The number of submission attempts a student can make for this assignment. -1
    //  // is considered unlimited.
    //  "allowed_attempts": 2,
    private int allowed_attempts;


    //  // (Optional) If retrieving a single assignment and 'can_submit' is included in
    //  // the 'include' parameter, flags whether user has the right to submit the
    //  // assignment (i.e. checks enrollment dates, submission types, locked status,
    //  // attempts remaining, etc...). Including 'can submit' automatically includes
    //  // 'submission' in the include parameter. Not available when observed_users are
    //  // included.
    //  "can_submit": true,
    private bool can_submit;

    //  // Boolean indicating whether this is a quiz lti assignment.
    //  "is_quiz_assignment": false,
    private bool is_quiz_assignment;

    public Assignment() {}
   
    public bool CanSubmit()
    {
        return can_submit && !completed && !locked_for_user && published && ((DateTime.Now < lock_at));
    }

    public bool DueSoon()
    {
        return (!submission && CanSubmit() && (due_at - DateTime.Now).TotalHours <= alertTime.TotalHours);
    }

    public double GetPossiblePoints()
    {
        return points_possible;
    }

    
}
