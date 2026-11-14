import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


// GET ALL POSTS
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalPosts: posts.length,
            posts
        });

    } catch (error) {
        console.error("Get posts error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch posts"
        });
    }
};


// CREATE POST
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Post content cannot be empty"
            });
        }

        if (content.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Post cannot exceed 2000 characters"
            });
        }

        const post = await Post.create({
            user: req.user._id,
            content: content.trim()
        });

        await post.populate("user", "username");

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.error("Create post error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to create post"
        });
    }
};


// UPDATE POST
export const updatePost = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Post content cannot be empty"
            });
        }

        if (content.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Post cannot exceed 2000 characters"
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only edit your own posts"
            });
        }

        post.content = content.trim();

        await post.save();
        await post.populate("user", "username");

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        console.error("Update post error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to update post"
        });
    }
};


// DELETE POST
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own posts"
            });
        }

        await Comment.deleteMany({
            post: post._id
        });

        await post.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error("Delete post error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to delete post"
        });
    }
};


// LIKE / UNLIKE POST
export const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const userId = req.user._id.toString();

        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {
            post.likes.pull(req.user._id);
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Post unliked" : "Post liked",
            liked: !alreadyLiked,
            likesCount: post.likes.length
        });

    } catch (error) {
        console.error("Like post error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to like or unlike post"
        });
    }
};