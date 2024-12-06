import { createContext, useContext, useEffect, useState } from "react";

import { Pet } from "./Pet";
import { StorageManager } from "./StorageManager";

const PetContext = createContext<Pet | null>(null);

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  useEffect(() => {
    const initializePet = async () => {
      const storedPet = await StorageManager.getCanvasPet();
      setPet(storedPet ? storedPet : new Pet());
    };
    initializePet();
  }, []);
  return <PetContext.Provider value={pet}>{children}</PetContext.Provider>;
};

export const usePet = () => useContext(PetContext);
