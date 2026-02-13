import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import workOrderRoutes from "./routes/workOrderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/workorders", workOrderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server Error" });
})

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
