import Equipment from "../models/Equipment.js";
import WorkOrder from "../models/WorkOrder.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const totalEquipments = await Equipment.countDocuments();

    const openWorkOrders = await WorkOrder.countDocuments({ status: "open" });
    const inProgressWorkOrders = await WorkOrder.countDocuments({ status: "in-progress" });

    const completedThisMonth = await WorkOrder.countDocuments({
      status: "completed",
      updatedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    // overdue maintenance (same logic you already used)
    const equipments = await Equipment.find({ status: "active", lastServiceDate: { $ne: null } });
    const today = new Date();

    const overdue = equipments.filter(eq => {
      const diffDays = Math.floor((today - eq.lastServiceDate) / (1000*60*60*24));
      return diffDays > 30;
    });

    res.json({
      totalEquipments,
      openWorkOrders,
      inProgressWorkOrders,
      completedThisMonth,
      overdueMaintenance: overdue.length
    });

  } catch (error) {
    res.status(500).json({ message: "Dashboard error", error });
  }
};
