import React from "react";

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Empowering Minds Everywhere</h1>
          <p>We believe that education is a right, not a privilege. Our platform connects curious minds with world-class knowledge.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Expert Courses</p>
          </div>
          <div className="stat-item">
            <h3>150+</h3>
            <p>Verified Tutors</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-details">
        <div className="container">
          <div className="about-grid">
            <div className="about-card">
              <div className="icon">🚀</div>
              <h3>Our Mission</h3>
              <p>To provide a flexible and interactive learning environment where students can master new skills at their own pace.</p>
            </div>
            <div className="about-card">
              <div className="icon">💡</div>
              <h3>Our Vision</h3>
              <p>To be the world’s most student-centric learning platform, helping millions achieve their professional dreams.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;