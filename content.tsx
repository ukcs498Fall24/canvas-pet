import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React, { useEffect, useState } from "react"
import PetController from "./lib/PetController"
import iconImage from "data-base64:~/assets/icon.png";
import AnimImage from "data-base64:~/assets/saddog.gif";

import { getAssignmentGroups, getCourses } from "~lib/api"
import type { Assignment, Course } from "~lib/types"

// Import the image and log it
import flowerImage from "data-base64:~/assets/flower.jpg"
// console.log("Flower image imported:", flowerImage)

export const config: PlasmoCSConfig = {
  matches: ["https://uk.instructure.com/*", "https://uk.instructure.com/"],
  world: "MAIN",
  run_at: "document_idle"
}

// Modified getOverlayAnchor to handle null case
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  const anchor = document.querySelector("#header")
  if (!anchor) {
    throw new Error("Could not find #header element for overlay anchor")
  }
  return anchor
}

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
          height: "256px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <p>Canvas Pet Goes Here!</p>
        <img src={AnimImage} alt="Icon" style={{ width: "128px", height: "128px", marginTop: "5px" }} />
      </div>
    </div>
  );
}