import express from "express";
import { getDueSoon, getOverdue } from "../controllers/maintenanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/due-soon", protect, getDueSoon);
router.get("/overdue", protect, getOverdue);

export default router;
