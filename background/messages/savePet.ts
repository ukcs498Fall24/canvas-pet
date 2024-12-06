import type { PlasmoMessaging } from "@plasmohq/messaging"

import { Pet, type PetJSON } from "~lib/Pet"
import { StorageManager } from "~lib/StorageManager"

const handler: PlasmoMessaging.MessageHandler<PetJSON | null> = async (
  req,
  res
) => {
  await StorageManager.saveCanvasPetFromBg(req.body ?? null)
}

export default handler
