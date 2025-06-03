import express from "express"
import { getLogsByCampaign } from "../controller/logController.js";

const router = express.Router();

router.get("/:campaignId", getLogsByCampaign);

export default router