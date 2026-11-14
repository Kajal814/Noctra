
import User from "../models/User.js";
import bcrypt from "bcryptjs";


// Register a new user
export const registerUser = async (req, res) => {
    try {
        // Get registration details from request body
        const { username, email, password } = req.body;

        // Check required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username, email and password"
            });
        }

        // Check minimum password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Check whether email already exists
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const user = await User.create({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        // Send success response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};



import jwt from "jsonwebtoken";

// Login an existing user
export const loginUser = async (req, res) => {
    try {
        // Get email and password
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        // Check whether user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Send successful response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

// GET CURRENT LOGGED-IN USER
export const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: {
                id: req.user._id.toString(),
                username: req.user.username,
                email: req.user.email,
                createdAt: req.user.createdAt
            }
        });

    } catch (error) {
        console.error("Get current user error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};