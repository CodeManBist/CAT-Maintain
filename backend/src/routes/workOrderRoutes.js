import express from "express";
import { 
    createWorkOrder,  
    getWorkOrders, 
    getWorkOrderById, 
    updateWorkOrderStatus, 
    addComment, 
    assignTechnician
} from "../controllers/workOrderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly, adminOrManager } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOrManager, createWorkOrder);
router.get("/", protect, getWorkOrders);
router.get("/:id", protect, getWorkOrderById);

router.put("/:id/status", protect, updateWorkOrderStatus);
router.post("/:id/comment", protect, addComment);
router.put("/:id/assign", protect, adminOrManager, assignTechnician);

export default router;