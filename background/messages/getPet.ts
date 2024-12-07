import type { PlasmoMessaging } from "@plasmohq/messaging";

import { Pet, type PetJSON } from "~lib/Pet";
import { StorageManager } from "~lib/StorageManager";

const handler: PlasmoMessaging.MessageHandler<
  undefined,
  PetJSON | undefined
> = async (req, res) => {
  res.send(await StorageManager.getCanvasPetFromBg());
};

export default handler;
