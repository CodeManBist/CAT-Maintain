import express from "express";
import { getUsers, updateUserRole, deleteUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.put("/:id/role", protect, adminOnly, updateUserRole);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;