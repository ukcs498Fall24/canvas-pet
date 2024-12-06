// content.tsx

// https://www.freepik.com/free-vector/nature-roadside-background-scene_40169781.htm#fromView=keyword&page=1&position=29&uuid=aba69c23-0aa3-46c8-a02a-3c9e16651311
import BGimage from "data-base64:~/assets/bg.jpg" // Background image

// Import the image and log it
import flowerImage from "data-base64:~/assets/flower.jpg"
// Import assets
import happyDog from "data-base64:~/assets/happydog.gif" // Main graphic

import iconImage from "data-base64:~/assets/icon.png"
import sadDog from "data-base64:~/assets/saddog.gif"
import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoGetStyle,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React, { useEffect, useState } from "react"

import { getAssignmentGroups, getCourses, getTodoList } from "~lib/api"
import type { Assignment, Course } from "~lib/types"
import { useData } from "~lib/useData"

import PetController from "./lib/PetController"
import usePetController from "./lib/PetController"

console.log("happydog gif imported:", happyDog)

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

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = `
    #plasmo-overlay-0 {
      pointer-events: none;
    }
  `
  return style
}

export default function Main() {
  const { assignments, completedTasks, courses, selectCourse, tasksToday } =
    useData()

  const { autoFeed, forceUpdate, notificationQueue, pet } = usePetController()

  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        width: "98vw",
        height: "98vh",
        marginRight: "2vw",
        marginBottom: "2vw"
      }}>
      <div
        style={{
          backgroundColor: "#ccc",
          borderRadius: "5px",
          position: "relative",
          width: "256px",
          height: "256px",
          display: "flex",
          pointerEvents: "auto",
          flexDirection: "column" // Split into vertical sections
        }}>
        {/* Top section (80% height) */}
        <div
          style={{
            width: "100%",
            height: "80%", // 80% of the container
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
          {/* Background image */}
          <img
            src={BGimage}
            alt="Background"
            style={{
              position: "absolute", // Fills the top section
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1
            }}
          />
          {/* Animal image */}
          <img
            src={pet?.isVisiblyHappy ? happyDog : sadDog}
            alt="Your Canvas Pet"
            style={{
              position: "absolute", // Use absolute positioning within the parent
              bottom: "0", // to the bottom of the parent
              //             src={AnimImage}
              //             alt="Dog"
              //             style={{
              //               position: "absolute", // Use absolute positioning within the parent
              //               bottom: "0", // to the btm of the parent
              left: "50%", // Center
              transform: "translateX(-50%)", // Adjust for centering,
              zIndex: 2,
              width: "55%",
              height: "55%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Bottom section (20% height) */}
        <div
          style={{
            width: "100%",
            height: "20%", // 20% of the container
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <button
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
            Feed
          </button>
        </div>
      </div>
    </div>
  )
}
