// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
// exports.register = async (req, res) => {
//   const { uname, email, phone, password, emergencyNo, emergencyMail, pincode } =
//     req.body;
//   console.log("Register Request Body:", req.body);
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       uid: uuidv4(),
//       uname, // ✅ fix: include full name
//       email,
//       password: hashedPassword,
//       phone,

//       emergencyNo,
//       emergencyMail,
//       pincode,
//     });

//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (err) {
//     console.error("Registration Error:", err); // Add this for easier debugging
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({ message: "Login successful", user, token });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  const {
    uname,
    email,
    phone,
    password,
    emergencyNo,
    emergencyMail,
    pincode,
    role,
  } = req.body;
  console.log("Register Request Body:", req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      uid: uuidv4(),
      uname,
      email,
      password: hashedPassword,
      phone,
      emergencyNo,
      emergencyMail,
      pincode,
      role:0, // Default to regular user (0)
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateUserController = async (req, res) => {
  try {
    const {
      uid, // custom field to identify user
      uname,
      email,
      phone,
      address,
      pincode,
      emergencyMail,
      emergencyNo,
      extraEmail1,
      extraEmail2,
      extraPhone1,
      extraPhone2,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { uid: uid }, // custom UID used for matching
      {
        uname,
        email,
        phone,
        address,
        pincode,
        emergencyMail,
        emergencyNo,
        extraEmail1,
        extraEmail2,
        extraPhone1,
        extraPhone2,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
