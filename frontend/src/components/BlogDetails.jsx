import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!post) return <div className="loading">Loading article...</div>;

  return (
    <div className="blog-details-page">
      <button className="back-btn" onClick={() => navigate("/blog")}>← Back to Blogs</button>
      
      <article className="blog-article">
        <img src={post.image_url} alt={post.title} className="full-blog-image" />
        <div className="blog-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date">{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <h1>{post.title}</h1>
        <div className="blog-full-text">
          <p>{post.description}</p>
          {/* You can add more columns to your DB for longer content later */}
        </div>
      </article>
    </div>
  );
}

export default BlogDetails;