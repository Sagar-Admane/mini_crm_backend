import express from "express"
import { generateMessage } from "../controller/aiController.js";

const router = express.Router();

router.post("/", generateMessage);

export default router