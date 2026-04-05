import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import TopIcon from "./components/TopIcon";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutPage from "./components/AboutPage";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import CourseDetails from "./components/CourseDetails";
import BlogDetails from "./components/BlogDetails";
import AdminDashboard from "./components/AdminDashboard";
import "./lms.css";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    
    const storedName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedName) {
      setUser(storedName);
      setRole(storedRole);
    }
    
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
  };

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Study<span>Nest</span></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <TopIcon />

        
        {user && <Navbar user={user} role={role} onLogout={handleLogout} />}

        <Routes>
         
          <Route 
            path="/login" 
            element={!user ? <Login setUser={setUser} setRole={setRole} /> : <Navigate to="/" />} 
          />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

      
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/about" element={user ? <AboutPage /> : <Navigate to="/login" />} />
          <Route path="/blog" element={user ? <Blog /> : <Navigate to="/login" />} />
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/course/:id" element={user ? <CourseDetails /> : <Navigate to="/login" />} />
          <Route path="/blog/:id" element={user ? <BlogDetails /> : <Navigate to="/login" />} />

         
          <Route 
            path="/admin" 
            element={user && role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} 
          />

         
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>

        {user && <Footer />}
      </div>
    </Router>
  );
}

export default App;