import express from "express";

import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    toggleLike
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getPosts);

// Protected routes
router.post("/", authMiddleware, createPost);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

router.put("/:id/like", authMiddleware, toggleLike);

export default router;