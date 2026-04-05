import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading Blogs...</div>;

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1>Knowledge Hub</h1>
          <p>Insightful articles from our expert community.</p>
        </div>
      </section>

      <div className="container">
        <div className="blog-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image_url} alt={post.title} />
                  <span className="blog-category">{post.category}</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <h3>{post.title}</h3>
                  {/* Updated to use description to match your database */}
                  <p>{post.description ? post.description.substring(0, 120) + "..." : "No description available."}</p>
                  <Link to={`/blog/${post.id}`} className="read-more-link">
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No blog posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;