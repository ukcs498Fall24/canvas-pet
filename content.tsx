import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React, { useEffect, useState } from "react"

// Import the gif from the assets folder
import happyDogGif from "assets/happydog.gif"

import { getAssignmentGroups, getCourses, getTodoList } from "~lib/api"
import type { Assignment, Course } from "~lib/types"

export const config: PlasmoCSConfig = {
  world: "MAIN",
  run_at: "document_idle"
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("#header")!

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (updatePosition) => {
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
  const [tasksToday, setTasksToday] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const todoList = await getTodoList()
        
        // Log the entire to-do list for debugging
        console.log("Todo List:", todoList)

        const today = new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD

        let total = 0
        let completed = 0

        todoList.forEach((task) => {
          // Log each task's due date and completed status
          console.log("Task Due Date:", task.due_at)
          console.log("Task Completed:", task.completed)

          if (task.due_at && task.due_at.startsWith(today)) {
            total += 1
            if (task.completed) {
              completed += 1
            }
          }
        })

        console.log("Tasks Today:", total)
        console.log("Completed Tasks:", completed)

        setTasksToday(total)
        setCompletedTasks(completed)
      } catch (error) {
        console.error("Error fetching to-do list:", error)
      }
    }

    fetchTasks()
  }, [])

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
      }}
    >
      <div
        style={{
          backgroundColor: "#ccc",
          borderRadius: "5px",
          width: "256px",
          height: "256px",
          padding: "10px",
          textAlign: "center"
        }}
      >
        <p>Canvas Pet Goes Here!</p>

        {/* Display the gif */}
        <img
          src={happyDogGif}
          alt="Happy Dog"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "10px"
          }}
        />

        {/* Display today's task progress */}
        <p>
          Today's Task Progress: {completedTasks}/{tasksToday} tasks completed
        </p>
        {tasksToday === 0 && <p>No tasks due today!</p>}

        {/* Course selection dropdown */}
        <select
          onChange={(e) =>
            selectCourse(courses?.find((c) => c.id === e.target.value))
          }
        >
          <option value="">Select Course</option>
          {courses?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Display assignments */}
        <ul>
          {assignments?.map((a) => (
            <li key={a.id}>{a.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
