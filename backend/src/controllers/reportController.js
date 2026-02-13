import Equipment from "../models/Equipment.js";
import WorkOrder from "../models/WorkOrder.js";
import User from "../models/User.js";

export const getSummaryReport = async (req, res) => {
  try {
    // Equipment count
    const equipments = await Equipment.countDocuments();

    // Work order stats
    const totalWorkOrders = await WorkOrder.countDocuments();
    const openWorkOrders = await WorkOrder.countDocuments({ status: "open" });
    const completedWorkOrders = await WorkOrder.countDocuments({ status: "completed" });

    // Maintenance types
    const breakdown = await WorkOrder.countDocuments({ issueType: "breakdown" });
    const preventive = await WorkOrder.countDocuments({ issueType: "preventive" });

    // Active technicians
    const technicians = await User.countDocuments({
      role: "technician",
      $or: [
        { isActive: true },
        { isActive: { $exists: false } }
    ]
    });

    res.json({
      equipments,
      workOrders: {
        total: totalWorkOrders,
        open: openWorkOrders,
        completed: completedWorkOrders
      },
      maintenance: {
        breakdown,
        preventive
      },
      technicians
    });

  } catch (error) {
    console.log("REPORT ERROR:", error);
    res.status(500).json({ message: "Failed to load reports" });
  }
};
