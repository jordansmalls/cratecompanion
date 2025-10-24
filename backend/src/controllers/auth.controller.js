import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import validator from "validator";

const troubleErr = { message: "We're having trouble, please try again soon." };

/**
 * @desc    Register user
 * @route   POST /api/auth/
 * @access  PUBLIC
 */

export const register = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    // Check if email is already in use
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Email is already associated with another account." });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password,
    });

    if (!user) {
      return res.status(500).json({ message: "Invalid user data." });
    }

    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error("Registration error:", err);

    return res.status(500).json(troubleErr);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  PUBLIC
 */

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  try {
    // check if email is tied to an existing account
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(404)
        .json({
          message: "Email is not associated with a Crate Companion account.",
        });
    }

    if (user && user.active && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    console.error("There was an error logging in a user:", err);
    return res.status(500).json(troubleErr);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  PUBLIC
 */

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully!" });
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/me
 * @access  PRIVATE
 */

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      active: user.active,
      createdAt: user.createdAt,
    });
  }
};
