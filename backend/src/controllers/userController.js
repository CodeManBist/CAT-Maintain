import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter).select("_id name role");

    res.status(200).json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error.message);
    res.status(500).json({
      message: "Failed to fetch users"
    });
  }
};
