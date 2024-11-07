export interface Course {
  id: string
  name: string
  account_id: string
  uuid: string
  start_at: Date | null
  grading_standard_id: null | string
  is_public: boolean
  created_at: Date
  course_code: string
  default_view: string
  root_account_id: string
  enrollment_term_id: string
  license: string
  grade_passback_setting: null
  end_at: Date | null
  public_syllabus: boolean
  public_syllabus_to_auth: boolean
  storage_quota_mb: number
  is_public_to_auth_users: boolean
  homeroom_course: boolean
  course_color: null
  friendly_name: null
  term: Term
  apply_assignment_group_weights: boolean
  sections: Section[]
  locale?: string
  calendar: Calendar
  time_zone: string
  blueprint: boolean
  template: boolean
  enrollments: Enrollment[]
  hide_final_grades: boolean
  workflow_state: string
  course_format?: string
  restrict_enrollments_to_course_dates: boolean
}

export interface Calendar {
  ics: string
}

export interface Enrollment {
  type: string
  role: string
  role_id: string
  user_id: string
  enrollment_state: string
  limit_privileges_to_course_section: boolean
}

export interface Section {
  id: string
  name: string
  start_at: Date | null
  end_at: Date | null
  enrollment_role: string
}

export interface Term {
  id: string
  name: string
  start_at: null
  end_at: null
  created_at: Date
  workflow_state: string
  grading_period_group_id: null
}

export interface AssignmentGroup {
  id: string
  name: string
  position: number
  group_weight: number
  sis_source_id: null
  integration_data: IntegrationData
  rules: IntegrationData
  assignments: Assignment[]
  any_assignment_in_closed_grading_period: boolean
}

export interface Assignment {
  id: string
  due_at: Date
  unlock_at: Date
  lock_at: Date
  points_possible: number
  grading_type: GradingType
  assignment_group_id: string
  grading_standard_id: null
  created_at: Date
  updated_at: Date
  peer_reviews: boolean
  automatic_peer_reviews: boolean
  position: number
  grade_group_students_individually: boolean
  anonymous_peer_reviews: boolean
  group_category_id: null | string
  post_to_sis: boolean
  moderated_grading: boolean
  omit_from_final_grade: boolean
  intra_group_peer_reviews: boolean
  anonymous_instructor_annotations: boolean
  anonymous_grading: boolean
  graders_anonymous_to_graders: boolean
  grader_count: number
  grader_comments_visible_to_graders: boolean
  final_grader_id: null
  grader_names_visible_to_final_grader: boolean
  allowed_attempts: number
  annotatable_attachment_id: null
  hide_in_gradebook: boolean
  secure_params: string
  lti_context_id: string
  course_id: string
  name: string
  submission_types: SubmissionType[]
  has_submitted_submissions: boolean
  due_date_required: boolean
  max_name_length: number
  graded_submissions_exist: boolean
  is_quiz_assignment: boolean
  can_duplicate: boolean
  original_course_id: null
  original_assignment_id: null
  original_lti_resource_link_id: null
  original_assignment_name: null
  original_quiz_id: null
  workflow_state: WorkflowState
  important_dates: boolean
  muted: boolean
  html_url: string
  assessment_requests: any[]
  published: boolean
  only_visible_to_overrides: boolean
  visible_to_everyone: boolean
  locked_for_user: boolean
  submissions_download_url: string
  post_manually: boolean
  anonymize_students: boolean
  require_lockdown_browser: boolean
  restrict_quantitative_data: boolean
  in_closed_grading_period: boolean
  allowed_extensions?: string[]
  lock_info?: LockInfo
  quiz_id?: string
  anonymous_submissions?: boolean
  lock_explanation?: string
}

export enum GradingType {
  Points = "points"
}

export interface LockInfo {
  lock_at?: Date
  can_view?: boolean
  asset_string: string
  unlock_at?: Date
}

export enum SubmissionType {
  OnlineQuiz = "online_quiz",
  OnlineTextEntry = "online_text_entry",
  OnlineUpload = "online_upload"
}

export enum WorkflowState {
  Published = "published"
}

export interface IntegrationData {}
