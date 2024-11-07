// @ts-nocheck

export class Assignment {
  private completed: boolean
  private grade?: number

  // the name of the assignment
  //  "name": "some assignment",
  private name?: string

  // the ID of the assignment
  //"id": 4,
  private id: number

  //  // The time at which this assignment was originally created
  //  "created_at": "2012-07-01T23:59:00-06:00",
  private created_at: Date

  //  // The time at which this assignment was last modified in any way
  //  "updated_at": "2012-07-01T23:59:00-06:00",
  private updated_at: Date

  //  the due date for the assignment. returns null if not present. NOTE: If this
  //  assignment has assignment overrides, this field will be the due date as it
  // applies to the user requesting information from the API.
  //  "due_at": "2012-07-01T23:59:00-06:00",
  private due_at: Date

  // the lock date (assignment is locked after this date). returns null if not
  //  present. NOTE: If this assignment has assignment overrides, this field will
  // be the lock date as it applies to the user requesting information from the
  // API.
  //  "lock_at": "2012-07-01T23:59:00-06:00",
  private lock_at: Date

  //  // the unlock date (assignment is unlocked after this date) returns null if not
  //  // present NOTE: If this assignment has assignment overrides, this field will be
  //  // the unlock date as it applies to the user requesting information from the
  //  // API.
  //  "unlock_at": "2012-07-01T23:59:00-06:00",
  private unlock_at: Date

  //  the ID of the course the assignment belongs to
  //  "course_id": 123,
  private course_id: string

  //  the maximum points possible for the assignment
  //  "points_possible": 12.0,
  private points_possible: number

  //  The type of grading the assignment receives; one of 'pass_fail', 'percent',
  //  'letter_grade', 'gpa_scale', 'points'
  //  "grading_type": "points",
  private grading_type: string

  //  Whether the assignment is published
  //  "published": true,
  private published: boolean

  //  Whether or not this is locked for the user.
  //  "locked_for_user": false,
  private locked_for_user: boolean

  //  // (Optional) If 'submission' is included in the 'include' parameter, includes a
  //  // Submission object that represents the current user's (user who is requesting
  //  // information from the api) current submission for the assignment. See the
  //  // Submissions API for an example response. If the user does not have a
  //  // submission, this key will be absent.
  //  "submission": null,
  private submission: boolean

  //  // (Optional) If true, the assignment will be omitted from the student's final
  //  // grade
  //  "omit_from_final_grade": true,
  private omit_from_final_grade: boolean

  //  // The number of submission attempts a student can make for this assignment. -1
  //  // is considered unlimited.
  //  "allowed_attempts": 2,
  private allowed_attempts: number

  //  // (Optional) If retrieving a single assignment and 'can_submit' is included in
  //  // the 'include' parameter, flags whether user has the right to submit the
  //  // assignment (i.e. checks enrollment dates, submission types, locked status,
  //  // attempts remaining, etc...). Including 'can submit' automatically includes
  //  // 'submission' in the include parameter. Not available when observed_users are
  //  // included.
  //  "can_submit": true,
  private can_submit: number

  //  // Boolean indicating whether this is a quiz lti assignment.
  //  "is_quiz_assignment": false,
  private is_quiz_assignment: number

  public assignment() {}

  public canSubmit(): boolean {
    return (
      this.can_submit &&
      !this.completed &&
      !this.locked_for_user &&
      this.published &&
      new Date() < this.lock_at
    )
  }
}
