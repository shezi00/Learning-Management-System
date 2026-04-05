import SearchSection from "./SearchSection";
import Hero from "./Hero";
import Features from "./Features";
import Courses from "./Courses";

function Home({ user }) {
  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Welcome back, {user}!</h1>
        <p>Ready to continue your learning journey?</p>
      </div>
      <SearchSection />
      <Hero />
      <Features />
      <Courses />
    </div>
  );
}

export default Home;