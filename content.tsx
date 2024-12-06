// content.tsx

import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoGetStyle,
  PlasmoWatchOverlayAnchor,
} from "plasmo";

import Main from "~lib/Main";
import { PetProvider } from "~lib/PetContext";

// console.log("Flower image imported:", flowerImage)

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

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = `
    #plasmo-overlay-0 {
      pointer-events: none;
    }
  `;
  return style;
};

export default function () {
  return (
    <PetProvider>
      <Main />
    </PetProvider>
  );
}
