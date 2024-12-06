import { useEffect, useState } from "react"

import { getAssignmentGroups, getCourses, getTodoList } from "./api"
import type { Assignment, Course } from "./types"

export function useData() {
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

  return { assignments, courses, selectCourse, tasksToday, completedTasks }
}
