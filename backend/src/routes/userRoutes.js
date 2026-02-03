import express from "express";
import { getUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOrManager } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOrManager, (req, res, next) => {
    console.log("USER ROUTE HIT BY:", req.user.role);
    next();
}, getUsers);

export default router;