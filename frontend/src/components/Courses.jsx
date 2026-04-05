import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-screen">Loading Courses...</div>;

  return (
    <section className="courses" id="popular-courses">
      <div className="container">
        <h2 className="section-title">Available Courses</h2>
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              {/* Added loading="lazy" to prevent scroll lag */}
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                loading="lazy" 
              />
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>${course.price}</p>
                <button 
                  className="enroll-btn" 
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Courses;