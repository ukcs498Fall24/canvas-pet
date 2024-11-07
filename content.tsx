import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React, { useEffect, useState } from "react"

import { getAssignmentGroups, getCourses } from "~lib/api"
import type { Assignment, Course } from "~lib/types"

export const config: PlasmoCSConfig = {
  // This will show up on canvas's pages
  //   matches: ["https://uk.instructure.com/*","https://uk.instructure.com/"],
  world: "MAIN",
  run_at: "document_idle"
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("#header")!
export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const interval = setInterval(() => {
    updatePosition()
  }, 5000)

  // Clear the interval when unmounted
  return () => {
    clearInterval(interval)
  }
}

export default function Main() {
  const [assignments, setAssignments] = useState<Assignment[]>()
  const [courses, setCourses] = useState<Course[]>()
  const [selectedCourse, selectCourse] = useState<Course>()

  useEffect(() => {
    getCourses().then(setCourses).catch(console.error)
  }, [])
  useEffect(() => {
    if (selectedCourse) {
      getAssignmentGroups(selectedCourse.id)
        .then((groups) =>
          groups.reduce<Assignment[]>(
            (assignments, group) => [...assignments, ...group.assignments],
            []
          )
        )
        .then(setAssignments)
        .catch(console.error)
    }
  }, [selectedCourse])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        width: "98vw",
        height: "98vh",
        marginRight: "2vw",
        marginBottom: "2vw",
        overflow: "hidden"
      }}>
      <div
        style={{
          backgroundColor: "#ccc",
          borderRadius: "5px",
          width: "256px",
          height: "256px"
        }}>
        <p>Canvas Pet Goes Here!</p>
        <select
          onChange={(e) =>
            selectCourse(courses?.find((c) => c.id === e.target.value))
          }>
          <option value="">Select Course</option>
          {courses?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <ul>{assignments?.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
      </div>
    </div>
  )
}
