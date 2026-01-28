import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const workOrderSchema = new mongoose.Schema(
  {
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },

    issueType: {
      type: String,
      enum: ["breakdown", "preventive"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },

    description: {
      type: String,
      required: true,
    },

    comments: [commentSchema],

    downtimeHours: {
      type: Number,
      default: 0,
    },

    estimatedCost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WorkOrder", workOrderSchema);
