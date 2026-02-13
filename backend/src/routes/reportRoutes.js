import express from "express";
import { getSummaryReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOrManager } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/summary", protect, adminOrManager, getSummaryReport);

export default router;
