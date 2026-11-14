
import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const getId = (value) => {
  if (!value) return "";
  return String(value._id || value.id || value);
};

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || "");
  const [busy, setBusy] = useState(false);

  const postOwner = getId(post.user);
  const currentUser = getId(user);
  const isOwner = postOwner === currentUser;

  const likes = post.likes || [];
  const isLiked = likes.some(
    (like) => getId(like) === currentUser
  );

  const authorName =
    post.user?.name || post.author?.name || "Noctra member";

  useEffect(() => {
    loadComments();
  }, [post._id]);

  const loadComments = async () => {
    try {
      const response = await API.get(`/comments/${post._id}`);
      setComments(
        Array.isArray(response.data)
          ? response.data
          : response.data.comments || []
      );
    } catch (error) {
      console.error("Could not load comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await API.put(`/posts/${post._id}/like`);
      onUpdate(response.data.post || response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to like post.");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      await API.post(`/comments/${post._id}`, {
        content: commentText.trim(),
      });

      setCommentText("");
      loadComments();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add comment.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!editContent.trim()) return;

    try {
      setBusy(true);

      const response = await API.put(`/posts/${post._id}`, {
        content: editContent.trim(),
      });

      onUpdate(response.data.post || response.data);
      setEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update post.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await API.delete(`/posts/${post._id}`);
      onDelete(post._id);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete post.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments((previous) =>
        previous.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete comment.");
    }
  };

  return (
    <article className="glass-card post-card">
      <div className="post-header">
        <div className="avatar">
          {authorName.charAt(0).toUpperCase()}
        </div>

        <div className="post-author">
          <h3>{authorName}</h3>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>

        {isOwner && (
          <div className="post-menu">
            <button
              className="icon-button"
              onClick={() => {
                setEditContent(post.content || "");
                setEditing(!editing);
              }}
              title="Edit post"
            >
              ✎
            </button>

            <button
              className="icon-button danger-icon"
              onClick={handleDelete}
              title="Delete post"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <form className="edit-form" onSubmit={handleEdit}>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            maxLength={2000}
          />

          <div className="edit-actions">
            <button className="primary-button" disabled={busy}>
              {busy ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="post-content">{post.content}</p>
      )}

      <div className="post-stats">
        <span>{likes.length} likes</span>
        <span>{comments.length} comments</span>
      </div>

      <div className="post-actions">
        <button
          className={`post-action ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <span>{isLiked ? "♥" : "♡"}</span>
          Like
        </button>

        <button
          className="post-action"
          onClick={() =>
            document
              .getElementById(`comment-${post._id}`)
              ?.focus()
          }
        >
          <span>▤</span>
          Comment
        </button>
      </div>

      <div className="comments-section">
        <form className="comment-form" onSubmit={handleComment}>
          <input
            id={`comment-${post._id}`}
            type="text"
            placeholder="Write a thoughtful comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <button type="submit" disabled={!commentText.trim()}>
            Send
          </button>
        </form>

        {comments.map((comment) => {
          const commentOwner = getId(comment.user);
          const canDelete = commentOwner === currentUser;

          return (
            <div className="comment-item" key={comment._id}>
              <div className="comment-avatar">
                {(comment.user?.name || "U").charAt(0).toUpperCase()}
              </div>

              <div className="comment-body">
                <strong>{comment.user?.name || "Member"}</strong>
                <p>{comment.content}</p>
              </div>

              {canDelete && (
                <button
                  className="comment-delete"
                  onClick={() => handleDeleteComment(comment._id)}
                  title="Delete comment"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {comments.length === 0 && (
          <p className="empty-comments">Be the first to comment.</p>
        )}
      </div>
    </article>
  );
};

export default PostCard;
