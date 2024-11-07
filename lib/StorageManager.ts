import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { Pet, type PetJSON } from "./Pet"

const CANVAS_PET_STORAGE_KEY = "uky-canvas-pet-data"
const storage = new Storage({
  area: "sync"
})

export class StorageManager {
  static async getCanvasPetFromBg(): Promise<PetJSON | undefined> {
    const data = await storage.getItem<PetJSON>(CANVAS_PET_STORAGE_KEY)
    return data
  }

  static async saveCanvasPetFromBg(pet: PetJSON): Promise<void> {
    await storage.setItem(CANVAS_PET_STORAGE_KEY, pet)
  }

  static async getCanvasPet(): Promise<Pet | undefined> {
    return sendToBackground({
      name: "getPet",
      body: undefined,
      extensionId: "neamefkbhhakifchhckmlekhinobaocf" // find this in chrome's extension manager
    })
  }

  static async saveCanvasPet(pet: Pet): Promise<void> {
    await sendToBackground({
      name: "savePet",
      body: pet,
      extensionId: "neamefkbhhakifchhckmlekhinobaocf" // find this in chrome's extension manager
    })
  }
}
