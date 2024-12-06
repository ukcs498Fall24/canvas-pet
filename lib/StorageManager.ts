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

  static async saveCanvasPetFromBg(pet: PetJSON | null): Promise<void> {
    await storage.setItem(CANVAS_PET_STORAGE_KEY, pet)
  }

  static async getCanvasPet(): Promise<Pet | undefined> {
    const petJson: PetJSON | undefined = await sendToBackground({
      name: "getPet",
      body: undefined,
      extensionId: "lfbkdpligjfgbmfihikogefekolkmhcb" // find this in chrome's extension manager
    })

    return petJson ? Pet.fromJSON(petJson) : undefined
  }

  static async saveCanvasPet(pet: Pet | null): Promise<void> {
    await sendToBackground({
      name: "savePet",
      body: pet && pet.toJSON(),
      extensionId: "lfbkdpligjfgbmfihikogefekolkmhcb" // find this in chrome's extension manager
    })
    console.log("Saved pet")
  }
}
