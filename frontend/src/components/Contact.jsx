import React, { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSent, setIsSent] = useState(false); // For animation

  // Auto-hide the success animation after 4 seconds
  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => setIsSent(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setIsSent(true); // Trigger animation
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Error: Message could not be sent.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      {/* SUCCESS ANIMATION POPUP */}
      {isSent && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="checkmark-circle">
              <div className="checkmark draw"></div>
            </div>
            <h2>Message Sent!</h2>
            <p>Thank you, <strong>{formData.name}</strong>. We have received your inquiry and will get back to you soon.</p>
          </div>
        </div>
      )}

      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>Your questions matter to us. We usually respond within 24 hours.</p>
      </section>

      <div className="container contact-container">
        <div className="contact-wrapper">
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required ></textarea>
              </div>
              <button type="submit" className="contact-btn">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-item">
              <div className="icon">📍</div>
              <div><h4>Address</h4><p>CUST, Islamabad, Pakistan</p></div>
            </div>
            <div className="info-item">
              <div className="icon">📞</div>
              <div><h4>Phone</h4><p>+92 331 5378084</p></div>
            </div>
            <div className="info-item">
              <div className="icon">📧</div>
              <div><h4>Email</h4><p>chshezi105@gmail.com</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;