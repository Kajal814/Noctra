
import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setSubmitting(true);

      const response = await API.post("/posts", {
        content: content.trim(),
      });

      onPostCreated(response.data.post || response.data);
      setContent("");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="glass-card create-post">
      <div className="composer-heading">
        <div className="avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div>
          <h3>Share something</h3>
          <p>Let your thoughts find their people.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={2000}
          required
        />

        <div className="composer-footer">
          <span>{content.length}/2000</span>

          <button
            type="submit"
            className="primary-button"
            disabled={submitting || !content.trim()}
          >
            {submitting ? "Publishing..." : "Publish post"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
