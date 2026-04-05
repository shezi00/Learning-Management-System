import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  
  // States
  const [showForm, setShowForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const [email, setEmail] = useState("");
  const [name, setName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    // Fetch course details from backend
    axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log("Error fetching course:", err));
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/enroll", {
        course_id: id,
        user_name: name,
        user_email: email
      });
      setIsSuccess(true); 
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Enrollment failed. Please try again.");
    }
  };

  if (!course) return <div className="loading-state">Loading...</div>;

  // SUCCESS VIEW WITH COURSE TITLE
  if (isSuccess) {
    return (
      <div className="success-overlay">
        <div className="success-card">
          <div className="checkmark-circle">
            <div className="checkmark draw"></div>
          </div>
          <h2>Successfully Enrolled!</h2>
          {/* Now showing the specific course name from the database state */}
          <p>You have joined: <strong>{course.title}</strong></p>
          <p>Confirmation sent to: <strong>{email}</strong></p>
          <p className="redirect-text">Soon we will reach you through email. Redirecting...</p>
        </div>
      </div>
    );
  }

  // STANDARD DETAILS VIEW
  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-image-section">
          <img src={course.thumbnail} alt={course.title} />
        </div>
        <div className="details-info-section">
          <h1>{course.title}</h1>
          <p className="details-description">{course.description}</p>
          <h2 className="details-price">Price: ${course.price}</h2>

          {!showForm ? (
            <button className="enroll-trigger-btn" onClick={() => setShowForm(true)}>
              Enroll Now
            </button>
          ) : (
            <div className="enrollment-form-box">
              <h3>Enrollment Form</h3>
              <form onSubmit={handleEnrollSubmit}>
                <div className="form-input-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-input-group">
                  <label>Your Email</label>
                  <input 
                    type="email" 
                    placeholder="example@mail.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="confirm-btn">Confirm Registration</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;