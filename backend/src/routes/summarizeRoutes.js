import express from "express";
import { summarizeController } from "../controllers/summarizeController.js";

const router = express.Router();


router.post("/summarize", summarizeController);

export default router;
