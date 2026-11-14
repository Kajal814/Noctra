import express from "express";

import {
    getComments,
    createComment,
    deleteComment
} from "../controllers/commentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get comments of a post
router.get("/:postId", getComments);

// Add a comment
router.post("/:postId", authMiddleware, createComment);

// Delete a comment
router.delete("/:id", authMiddleware, deleteComment);

export default router;