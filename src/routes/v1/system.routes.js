import { Router } from "express";

import {
  blockingTask,
  delegatedTask
} from "../../controllers/system.controller.js";

const router = Router();

// EVENT LOOP BLOCK
router.get("/blocking", blockingTask);

// CHILD PROCESS
router.get("/delegate", delegatedTask);

export default router;