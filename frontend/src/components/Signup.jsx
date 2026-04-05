import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Error: Backend server is not running!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;