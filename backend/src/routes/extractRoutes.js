import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { extractAndSummarizeController } from "../controllers/extractAndSummarizeController.js";

const router = express.Router();

router.post("/extract-and-summarize", upload.single("file"), extractAndSummarizeController);

export default router;
