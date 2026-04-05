import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser, setRole }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      
      if (response.ok) {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("role", data.role);

       
        setUser(data.userName); 
        setRole(data.role);

       
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server is not running! Please check your backend.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              onChange={(e) => setValues({...values, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              onChange={(e) => setValues({...values, password: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;