import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo";
import React, { useEffect, useState } from "react";
import PetController from "./lib/PetController";

import { getAssignmentGroups, getCourses } from "~lib/api";
import type { Assignment, Course } from "~lib/types";

// Import assets
import happyDog from "data-base64:~/assets/happydog.gif"; // Main graphic
import BGimage from "data-base64:~/assets/bg.jpg"; // Background image

console.log("happydog gif imported:", happyDog);

export const config: PlasmoCSConfig = {
  matches: ["https://uk.instructure.com/*", "https://uk.instructure.com/"],
  world: "MAIN",
  run_at: "document_idle",
};

// Modified getOverlayAnchor to handle null case
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  const anchor = document.querySelector("#header");
  if (!anchor) {
    throw new Error("Could not find #header element for overlay anchor");
  }
  return anchor;
};

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const interval = setInterval(() => {
    updatePosition();
  }, 5000);

  // Clear the interval when unmounted
  return () => {
    clearInterval(interval);
  };
};

export default function Main() {
  const [assignments, setAssignments] = useState<Assignment[]>();
  const [courses, setCourses] = useState<Course[]>();
  const [selectedCourse, selectCourse] = useState<Course>();

  useEffect(() => {
    getCourses().then(setCourses).catch(console.error);
  }, []);
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
        .catch(console.error);
    }
  }, [selectedCourse]);

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
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#ccc",
          borderRadius: "5px",
          position: "relative",
          width: "256px",
          height: "256px",
          display: "flex",
          flexDirection: "column", // Split into vertical sections
        }}
      >
        {/* Top section (80% height) */}
        <div
          style={{
            width: "100%",
            height: "80%", // 80% of the container
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
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
              zIndex: 1,
            }}
          />
          {/* Animal image */}
          <img
            src={happyDog}
            alt="Happy Dog"
            style={{
              position: "absolute", // Use absolute positioning within the parent
              bottom: "0", // to the bottom of the parent
              left: "50%", // Center
              transform: "translateX(-50%)", // Adjust for centering,
              zIndex: 2,
              width: "55%",
              height: "55%",
              objectFit: "contain",
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
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Feed
          </button>
        </div>
      </div>
    </div>
  );
}
