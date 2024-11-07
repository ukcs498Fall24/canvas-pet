import type { PlasmoMessaging } from "@plasmohq/messaging"

import { Pet, type PetJSON } from "~lib/Pet"
import { StorageManager } from "~lib/StorageManager"

const handler: PlasmoMessaging.MessageHandler<PetJSON> = async (req, res) => {
  if (req.body) await StorageManager.saveCanvasPetFromBg(req.body)
}

export default handler
