import express from "express";
import { getHistory, saveCampaign, viewAudience } from "../controller/segmentController.js";
const router = express.Router();

router.post("/view", viewAudience);
router.post("/save", saveCampaign);
router.get("/history", getHistory);

export default router;