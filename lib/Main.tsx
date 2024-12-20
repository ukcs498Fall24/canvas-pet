// https://www.freepik.com/free-vector/nature-roadside-background-scene_40169781.htm#fromView=keyword&page=1&position=29&uuid=aba69c23-0aa3-46c8-a02a-3c9e16651311
import BGimage from "data-base64:~/assets/bg.jpg"; // Background image

// Import the image and log it
import flowerImage from "data-base64:~/assets/flower.jpg";
// Import assets
import happyDog from "data-base64:~/assets/happydog.gif"; // Main graphic

import iconImage from "data-base64:~/assets/icon.png";
import sadDog from "data-base64:~/assets/saddog.gif";
import React, { useEffect, useState } from "react";

import { getAssignmentGroups, getCourses, getTodoList } from "~lib/api";
import type { Assignment, Course } from "~lib/types";
import { useData } from "~lib/useData";

import { MAX_FOOD } from "./Pet";
import usePetController from "./PetController";
import { StorageManager } from "./StorageManager";

export default function Main() {
  const { tasksToday } = useData();

  const { autoFeed, notificationQueue, pet, feedWithAvailableFood } =
    usePetController();

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
          flexDirection: "column", // Split into vertical sections
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
            overflow: "hidden",
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
              zIndex: 1,
            }}
            title={`You have ${tasksToday} tasks today`}
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
              objectFit: "contain",
            }}
          />
          {/* Animal Name */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "calc(100% - 16px)",
              padding: "8px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              zIndex: 3,
              textAlign: "center",
            }}>
            {pet?.name}
          </div>
        </div>

        {/* Bottom section (20% height) */}
        <div
          style={{
            width: "100%",
            height: "20%", // 20% of the container
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
          onMouseEnter={(event) => {
            if (event.shiftKey && event.altKey && event.ctrlKey) {
              if (confirm("Canvas Pet Reset")) {
                StorageManager.saveCanvasPet(null);
                window.location.reload();
              }
            }
          }}>
          <div
            style={{
              fontSize: "10px",
              textAlign: "center",
              marginRight: "8px",
            }}>
            Available Food: {(pet?.storedFood ?? 0).toFixed(0)}
          </div>
          <button
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => feedWithAvailableFood()}
            disabled={!pet || pet.storedFood < 1}>
            Feed
          </button>
          <div
            style={{
              fontSize: "10px",
              textAlign: "center",
              marginLeft: "8px",
            }}>
            Pet Happiness: {(pet?.currentHappiness ?? 0).toFixed(2)}%
            <br />
            Pet Hunger: {(MAX_FOOD - (pet?.foodInBelly ?? 0)).toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
