
import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const getId = (value) => {
  if (!value) return "";
  return String(value._id || value.id || value);
};

const Profile = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get("/posts");
        const data = response.data;
        const allPosts = Array.isArray(data) ? data : data.posts || [];

        setPosts(
          allPosts.filter(
            (post) => getId(post.user) === getId(user)
          )
        );
      } catch (error) {
        console.error("Unable to load profile posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchPosts();
  }, [user]);

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

  const totalLikes = posts.reduce(
    (total, post) => total + (post.likes?.length || 0),
    0
  );

  return (
    <main className="page-container profile-page">
      <section className="glass-card profile-hero">
        <div className="profile-cover"></div>

        <div className="profile-information">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="profile-details">
            <span className="eyebrow">YOUR NOCTRA SPACE</span>
            <h1>{user?.name || "Member"}</h1>
            <p>{user?.email}</p>
            <span className="member-label">Community member</span>
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <strong>{posts.length}</strong>
            <span>Posts</span>
          </div>
          <div>
            <strong>{totalLikes}</strong>
            <span>Likes received</span>
          </div>
        </div>
      </section>

      <div className="section-heading profile-post-heading">
        <div>
          <span className="eyebrow">YOUR ACTIVITY</span>
          <h2>Your posts</h2>
        </div>
      </div>

      {loading ? (
        <div className="glass-card empty-state">
          <div className="loader"></div>
          <p>Loading your profile...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-symbol">✳</div>
          <h3>No posts yet.</h3>
          <p>Your posts will appear here when you share them.</p>
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
    </main>
  );
};

export default Profile;
