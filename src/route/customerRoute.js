import express from "express"
import { createCustomer } from "../controller/customerController.js";

const router = express.Router();

router.post("/", createCustomer);

export default router;