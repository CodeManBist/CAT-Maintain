import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    model: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "maintenance", "breakdown"],
      default: "active",
    },

    runningHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastServiceDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
