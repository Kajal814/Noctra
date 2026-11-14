import Comment from "../models/Comment.js";
import Post from "../models/Post.js";


// GET COMMENTS OF A POST
export const getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const comments = await Comment.find({
            post: req.params.postId
        })
            .populate("user", "username")
            .sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            totalComments: comments.length,
            comments
        });

    } catch (error) {
        console.error("Get comments error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch comments"
        });
    }
};


// CREATE COMMENT
export const createComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        if (text.trim().length > 1000) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot exceed 1000 characters"
            });
        }

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const comment = await Comment.create({
            post: post._id,
            user: req.user._id,
            text: text.trim()
        });

        await comment.populate("user", "username");

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error("Create comment error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to add comment"
        });
    }
};


// DELETE COMMENT
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own comments"
            });
        }

        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error("Delete comment error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to delete comment"
        });
    }
};