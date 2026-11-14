
import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await API.get("/posts");
      const data = response.data;

      setPosts(
        Array.isArray(data) ? data : data.posts || []
      );
    } catch (error) {
      console.error("Unable to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts((previous) => [newPost, ...previous]);
  };

  const updatePost = (updatedPost) => {
    setPosts((previous) =>
      previous.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((previous) =>
      previous.filter((post) => post._id !== postId)
    );
  };

  return (
    <main className="page-container feed-page">
      <section className="feed-welcome">
        <div>
          <span className="eyebrow">YOUR COMMUNITY, YOUR SPACE</span>
          <h1>Good to see you, {user?.name?.split(" ")[0] || "there"}.</h1>
          <p>Discover conversations and share what matters.</p>
        </div>

        <div className="welcome-decoration">N.</div>
      </section>

      <div className="feed-layout">
        <section className="feed-main">
          <CreatePost onPostCreated={addPost} />

          <div className="section-heading">
            <div>
              <span className="eyebrow">THE COMMUNITY</span>
              <h2>Latest posts</h2>
            </div>
            <span className="live-label">
              <span className="live-dot"></span>
              Your feed
            </span>
          </div>

          {loading ? (
            <div className="glass-card empty-state">
              <div className="loader"></div>
              <p>Loading your feed...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card empty-state">
              <div className="empty-symbol">✳</div>
              <h3>Your feed starts here.</h3>
              <p>Share your first post and start a conversation.</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onUpdate={updatePost}
                onDelete={deletePost}
              />
            ))
          )}
        </section>

        <aside className="feed-sidebar">
          <div className="glass-card sidebar-card">
            <span className="eyebrow">A LITTLE REMINDER</span>
            <h3>Make space for good conversations.</h3>
            <p>
              Share ideas, appreciate others, and bring something
              meaningful to the community.
            </p>
            <div className="sidebar-decoration">✳</div>
          </div>

          <div className="sidebar-footer">
            <span>NOCTRA</span>
            <p>A space to connect and belong.</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Feed;
