import { createContext, useContext, useEffect, useState } from "react"

import { Hat, Pet } from "./Pet"
import { StorageManager } from "./StorageManager"

const PetContext = createContext<Pet | null>(null)

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [pet, setPet] = useState<Pet | null>(null)
  useEffect(() => {
    const initializePet = async () => {
      let storedPet: Pet | undefined

      try {
        storedPet = await StorageManager.getCanvasPet()
      } finally {
        setPet(
          storedPet
            ? storedPet
            : new Pet(
                prompt("What is your pet's name?") ?? "Bob",
                0,
                0,
                0,
                0,
                0,
                0,
                new Set(),
                [],
                new Hat(""),
                new Date(),
                new Date()
              )
        )
      }
    }
    initializePet()
  }, [])

  useEffect(() => {
    if (pet) {
      StorageManager.saveCanvasPet(pet)
    }
  }, [pet])
  return <PetContext.Provider value={pet}>{children}</PetContext.Provider>
}

export const usePet = () => useContext(PetContext)
