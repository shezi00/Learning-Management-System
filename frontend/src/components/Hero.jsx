function Hero() {
  const scrollToCourses = (e) => {
    e.preventDefault();
    const section = document.getElementById("popular-courses");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>Learn Anytime, Anywhere</h1>
        <p>Empower your learning journey with interactive courses and expert instructors.</p>
        <div className="hero-buttons">
          {/* Clicking these will now scroll smoothly to the Courses section */}
         
          <a href="#popular-courses" onClick={scrollToCourses} className="btn-secondary">
            Explore Courses
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;