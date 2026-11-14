import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SocialConnect backend is running!"
    });
});

// API routes
app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);

// Start server
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();