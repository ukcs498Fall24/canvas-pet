// api.ts
import type { AssignmentGroup, Course } from "./types"

export async function getAssignmentGroups(
  courseId: string
): Promise<AssignmentGroup[]> {
  const result = await fetch(
    `https://uk.instructure.com/api/v1/courses/${courseId}/assignment_groups?exclude_assignment_submission_types%5B%5D=wiki_page&exclude_response_fields%5B%5D=description&exclude_response_fields%5B%5D=rubric&include%5B%5D=assignments&include%5B%5D=discussion_topic&include%5B%5D=assessment_requests&override_assignment_dates=true&per_page=50`,
    {
      headers: {
        Accept: "application/json+canvas-string-ids, application/json",
        "Accept-Language": "en-US,en;q=0.5",
        Priority: "u=4",
        Pragma: "no-cache",
        "Cache-Control": "no-cache"
      },
      method: "GET",
      mode: "cors",
      credentials: "include"
    }
  )
  return result.json()
}

export async function getCourses(): Promise<Course[]> {
  const result = await fetch(
    "https://uk.instructure.com/api/v1/users/self/favorites/courses?include[]=term&include[]=sections&sort=nickname",
    {
      headers: {
        accept: "application/json+canvas-string-ids, application/json",
        "accept-language": "en-US,en;q=0.9",
        priority: "u=1, i"
      },
      method: "GET",
      mode: "cors",
      credentials: "include"
    }
  )
  return result.json()
}
export async function getTodoList(): Promise<any[]> {
  const result = await fetch(
    "https://uk.instructure.com/api/v1/users/self/todo",
    {
      headers: {
        Accept: "application/json+canvas-string-ids, application/json",
        "Accept-Language": "en-US,en;q=0.5",
        Priority: "u=4",
        Pragma: "no-cache",
        "Cache-Control": "no-cache"
      },
      method: "GET",
      mode: "cors",
      credentials: "include"
    }
  )
  if (!result.ok) {
    console.error("Failed to fetch to-do list:", await result.text())
    throw new Error("Failed to fetch to-do list")
  }
  return result.json()
}
