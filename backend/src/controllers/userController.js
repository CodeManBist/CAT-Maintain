import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await User.find({
      ...filter,
      $or: [
        { isActive: true },
        { isActive: { $exists: false } }
      ]
    }).select("_id name role isActive");



    res.status(200).json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error.message);
    res.status(500).json({
      message: "Failed to fetch users"
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!["admin", "manager", "technician"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.log("Update Role Error:", error);
    res.status(500).json({ message: "Failed to update role" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "User deactivaated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate user" });
  }
};
