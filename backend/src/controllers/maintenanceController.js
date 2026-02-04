import Equipment from "../models/Equipment.js";

const MAINTENANCE_INTERVAL = 30; // days
const DUE_SOON_WINDOW = 7; // days

const daysBetween = (from, to) =>
  Math.floor((to - from) / (1000 * 60 * 60 * 24));

export const getDueSoon = async (req, res) => {
  const equipments = await Equipment.find({
    status: "active",
    lastServiceDate: { $ne: null },
  });

  const today = new Date();

  const dueSoon = equipments.filter((eq) => {
    const daysPassed = daysBetween(eq.lastServiceDate, today);
    const daysLeft = MAINTENANCE_INTERVAL - daysPassed;

    return daysLeft <= DUE_SOON_WINDOW && daysLeft > 0;
  });

  res.json(dueSoon);
};

export const getOverdue = async (req, res) => {
  const equipments = await Equipment.find({
    status: "active",
    lastServiceDate: { $ne: null },
  });

  const today = new Date();

  const overdue = equipments.filter((eq) => {
    const daysPassed = daysBetween(eq.lastServiceDate, today);
    return daysPassed > MAINTENANCE_INTERVAL;
  });

  res.json(overdue);
};
