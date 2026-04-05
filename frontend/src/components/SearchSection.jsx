function SearchSection() {
  return (
    <section className="search-section">
      <div className="search-container">
        <input type="text" placeholder="Search courses..." className="search-input" />
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </div>
    </section>
  );
}

export default SearchSection;
