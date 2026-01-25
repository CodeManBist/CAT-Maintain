import express from "express";
import {
    createEquipment,
    getEquipments,
    getEquipmentById,
    updateEquipment,
    deleteEquipment
} from "../controllers/equipmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getEquipments);
router.get("/:id", protect, getEquipmentById);

router.post("/", protect, adminOnly, createEquipment);
router.put("/:id", protect, adminOnly, updateEquipment);
router.delete("/:id", protect, adminOnly, deleteEquipment);

export default router;