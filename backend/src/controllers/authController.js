import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
    console.log(req.body);

    const { name, username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        return res.status(400).json({ message: "User already exists" });
    }   

    const newUser = await User.create({
        name,
        username,
        email,
        password,
        role: role || "technician"
    });

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username, 
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id)
    });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
};

export const getMe = async (req, res) => {
    res.json(req.user);
};