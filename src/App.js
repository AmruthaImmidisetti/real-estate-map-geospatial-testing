import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetail from "./pages/PropertyDetail";
import SearchPage from "./pages/SearchPage";
import SavedSearches from "./pages/SavedSearches";

function Navbar() {
  return (
    <nav
      style={{
        padding: "12px",
        background: "#222",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        Home
      </Link>

      <Link style={{ color: "white", textDecoration: "none" }} to="/properties">
        Properties
      </Link>

      <Link style={{ color: "white", textDecoration: "none" }} to="/search">
        Search
      </Link>

      <Link
        style={{ color: "white", textDecoration: "none" }}
        to="/saved-searches"
      >
        Saved Searches
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<PropertiesPage />} />c
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/saved-searches" element={<SavedSearches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
