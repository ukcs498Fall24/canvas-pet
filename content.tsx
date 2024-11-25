import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React, { useEffect, useState } from "react"
import PetController from "./lib/PetController"
import iconImage from "data-base64:~/assets/icon.png";
import AnimImage from "data-base64:~/assets/saddog.gif";
// https://www.freepik.com/free-vector/nature-roadside-background-scene_40169781.htm#fromView=keyword&page=1&position=29&uuid=aba69c23-0aa3-46c8-a02a-3c9e16651311
import BGimage from "data-base64:~/assets/bg.jpg";
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
          position: "relative", // Enable positioning for child elements
          width: "256px",
          height: "256px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <img
          src={BGimage}
          alt="Background"
          style={{
            position: "absolute", // Make it fill the container
            top: 0,
            left: 0,
            width: "100%", // covers the parent dim
            height: "100%",
            objectFit: "cover", // Prevent distortion
            zIndex: 1 // Send it to the back
          }}
        />
        <img src={AnimImage} alt="Icon" style={{
          position: "relative", // Stacks on top of the background
          zIndex: 2,
          width: "75%",
          height: "75%",
          objectFit: "contain", // Maintain aspect ratio
          }} 
        />
        <p style={{
          position: "absolute", // Float above everything
          top: "10px",
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Fine-tune centering
          zIndex: 3,
        }}>Canvas Pet</p>
        
      </div>
    </div>
  );
}