import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
  // This will show up on canvas's pages
  //   matches: ["https://uk.instructure.com/*","https://uk.instructure.com/"],
  world: "MAIN",
  run_at: "document_idle"
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("#header")
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
      </div>
    </div>
  )
}
