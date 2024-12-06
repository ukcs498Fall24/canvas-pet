import { useData } from "~lib/useData"

function IndexPopup() {
  const { assignments, completedTasks, courses, selectCourse, tasksToday } =
    useData()

  return (
    <div
      style={{
        padding: 16
      }}>
      {/* Display today's task progress */}
      <p>
        Today's Task Progress: {completedTasks}/{tasksToday} tasks completed
      </p>
      {tasksToday === 0 && <p>No tasks due today!</p>}
      {/* Course selection dropdown */}
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
      {/* Display assignments */}
      <ul>{assignments?.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
    </div>
  )
}

export default IndexPopup
