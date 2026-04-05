import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("courses");
  const [messages, setMessages] = useState([]);
  const [viewMode, setViewMode] = useState("inbox"); 
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Form States - Syncing with your phpMyAdmin columns
  const [newCourse, setNewCourse] = useState({ title: "", price: "", description: "", thumbnail: "", category: "Web Development" });
  const [newBlog, setNewBlog] = useState({ title: "", category: "Latest News", image_url: "", description: "" });

  useEffect(() => {
    fetchData();
  }, [activeTab, viewMode]);

  const fetchData = () => {
    if (activeTab === "messages") {
      axios.get(`http://localhost:5000/api/admin/messages?archived=${viewMode === "archived" ? 1 : 0}`).then(res => setMessages(res.data));
    } else if (activeTab === "enrollments") {
      axios.get("http://localhost:5000/api/admin/enrollments").then(res => setEnrollments(res.data));
    } else if (activeTab === "courses") {
      axios.get("http://localhost:5000/api/admin/courses").then(res => setCourses(res.data));
    } else if (activeTab === "blogs") {
      axios.get("http://localhost:5000/api/admin/blogs").then(res => setBlogs(res.data));
    }
  };

  // --- ACTIONS ---
  const handleAddCourse = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/admin/add-course", newCourse);
    alert("Course Published!");
    setNewCourse({ title: "", price: "", description: "", thumbnail: "", category: "Web Development" });
    fetchData();
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
        // Sending description instead of content to match your database
        await axios.post("http://localhost:5000/api/admin/add-blog", newBlog);
        alert("Blog Post Published!");
        setNewBlog({ title: "", category: "Latest News", image_url: "", description: "" });
        fetchData();
    } catch (err) {
        alert("Error publishing blog. Check console.");
    }
  };

  const deleteItem = async (endpoint, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      await axios.delete(`http://localhost:5000/api/admin/${endpoint}/${id}`);
      fetchData();
    }
  };

  const toggleArchive = async (id, currentStatus) => {
    const action = currentStatus === 0 ? 'archive' : 'unarchive';
    await axios.put(`http://localhost:5000/api/admin/messages/${action}/${id}`);
    fetchData();
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <button className={activeTab === "courses" ? "active" : ""} onClick={() => setActiveTab("courses")}>Manage Courses</button>
        <button className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>Manage Blogs</button>
        <button className={activeTab === "enrollments" ? "active" : ""} onClick={() => setActiveTab("enrollments")}>Enrollments</button>
        <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>Inquiry Messages</button>
      </div>

      <div className="admin-content">
        
        {/* --- MANAGE COURSES --- */}
        {activeTab === "courses" && (
          <div className="admin-courses-layout">
            <div className="admin-form-card">
              <h3>🚀 Add New Course</h3>
              <form onSubmit={handleAddCourse} className="admin-form">
                <input type="text" placeholder="Course Title" value={newCourse.title} onChange={(e)=>setNewCourse({...newCourse, title: e.target.value})} required />
                <div className="form-row">
                    <input type="text" placeholder="Price" value={newCourse.price} onChange={(e)=>setNewCourse({...newCourse, price: e.target.value})} required />
                    <select value={newCourse.category} onChange={(e)=>setNewCourse({...newCourse, category: e.target.value})}>
                        <option value="Web Development">Web Development</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                    </select>
                </div>
                <input type="text" placeholder="Thumbnail Image URL" value={newCourse.thumbnail} onChange={(e)=>setNewCourse({...newCourse, thumbnail: e.target.value})} required />
                <textarea placeholder="Course Description..." rows="4" value={newCourse.description} onChange={(e)=>setNewCourse({...newCourse, description: e.target.value})} required></textarea>
                <button type="submit" className="admin-submit-btn">Publish Course</button>
              </form>

              <h3 style={{marginTop: '40px'}}>Existing Courses</h3>
              <table className="heavy-table">
                <thead><tr><th>Title</th><th>Price</th><th>Action</th></tr></thead>
                <tbody>
                  {courses.map(c => (
                    <tr key={c.id}><td>{c.title}</td><td>${c.price}</td><td><button onClick={()=>deleteItem('courses', c.id)} className="delete-btn">Delete</button></td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-preview-section">
              <h3>👀 Live Preview</h3>
              <div className="course-card">
                <img src={newCourse.thumbnail || "https://via.placeholder.com/300x180"} alt="Preview" />
                <div className="course-content">
                  <h3>{newCourse.title || "Course Title"}</h3>
                  <p>${newCourse.price || "0.00"}</p>
                  <p style={{fontSize: '0.8rem', color: '#666'}}>{newCourse.description || "Description..."}</p>
                  <button className="enroll-btn" type="button">Enroll Now</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MANAGE BLOGS --- */}
        {activeTab === "blogs" && (
          <div className="admin-blogs-layout">
            <div className="admin-form-card">
                <h3>✍️ Create Blog Post</h3>
                <form onSubmit={handleAddBlog} className="admin-form">
                    <input type="text" placeholder="Blog Title" value={newBlog.title} onChange={(e)=>setNewBlog({...newBlog, title: e.target.value})} required />
                    <div className="form-row">
                        <select value={newBlog.category} onChange={(e)=>setNewBlog({...newBlog, category: e.target.value})}>
                            <option value="News">News</option>
                            <option value="Tutorial">Tutorial</option>
                            <option value="Update">Update</option>
                        </select>
                        <input type="text" placeholder="Main Image URL" value={newBlog.image_url} onChange={(e)=>setNewBlog({...newBlog, image_url: e.target.value})} required />
                    </div>
                    <textarea placeholder="Blog Content (Description)..." rows="6" value={newBlog.description} onChange={(e)=>setNewBlog({...newBlog, description: e.target.value})} required></textarea>
                    <button type="submit" className="admin-submit-btn">Post Blog</button>
                </form>
            </div>

            <div className="admin-table-container" style={{marginTop: '30px'}}>
                <h3>Published Blogs</h3>
                <table className="heavy-table">
                    <thead><tr><th>Title</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                        {blogs.map(b => (
                            <tr key={b.id}>
                                <td>{b.title}</td>
                                <td>{new Date(b.created_at).toLocaleDateString()}</td>
                                <td><button onClick={()=>deleteItem('blogs', b.id)} className="delete-btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        )}

        {/* --- ENROLLMENTS --- */}
        {activeTab === "enrollments" && (
          <div className="admin-table-container">
            <table className="heavy-table">
              <thead><tr><th>Student</th><th>Course</th><th>Date</th></tr></thead>
              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id}>
                    <td>{e.student_name}<br/><small>{e.student_email}</small></td>
                    <td>{e.course_title}</td>
                    <td>{new Date(e.enrolled_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- MESSAGES --- */}
        {activeTab === "messages" && (
          <div className="admin-messages-page">
            <div className="folder-toggle" style={{marginBottom: '20px'}}>
              <button className={viewMode === "inbox" ? "active" : ""} onClick={() => setViewMode("inbox")}>Inbox</button>
              <button className={viewMode === "archived" ? "active" : ""} onClick={() => setViewMode("archived")}>Archive</button>
            </div>
            {messages.map((msg) => (
              <div className="inbox-card" key={msg.id} style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px'}}>
                <h4>{msg.name} - {msg.subject}</h4>
                <div className="msg-body" style={{background: '#f9f9f9', padding: '10px', margin: '10px 0'}}>{msg.message}</div>
                <div className="inbox-actions" style={{display: 'flex', gap: '10px'}}>
                  <a href={`mailto:${msg.email}`} className="reply-btn" style={{padding: '5px 15px', background: '#28a745', color: '#fff', borderRadius: '4px', textDecoration: 'none'}}>Reply</a>
                  <button onClick={() => toggleArchive(msg.id, msg.is_archived)}>{viewMode === "inbox" ? "Archive" : "Restore"}</button>
                  <button className="delete-btn" onClick={() => deleteItem('messages', msg.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;