import { createContext, useContext, useEffect, useState } from "react";

import { Hat, MAX_FOOD, Pet } from "./Pet";
import { StorageManager } from "./StorageManager";
import { useData } from "./useData";

const PetContext = createContext<[Pet | null, (pet: Pet) => void]>([
  null,
  () => {},
]);

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const { assignments } = useData();

  useEffect(() => {
    const initializePet = async () => {
      if (assignments) {
        let storedPet: Pet | undefined;
        try {
          storedPet = await StorageManager.getCanvasPet().then(
            (pet) => pet && pet.setAssignments(assignments)
          );
        } finally {
          setPet(
            storedPet
              ? storedPet
              : new Pet(
                  prompt("What is your pet's name?") ?? "Bob",
                  15,
                  MAX_FOOD / 2,
                  new Set(),
                  new Date(),
                  assignments
                )
          );
        }
      }
    };
    initializePet();
  }, [assignments]);

  useEffect(() => {
    if (pet) {
      StorageManager.saveCanvasPet(pet);
    }
  }, [pet]);
  return (
    <PetContext.Provider value={[pet, setPet]}>{children}</PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext)[0];
export const useSetPet = () => useContext(PetContext)[1];
