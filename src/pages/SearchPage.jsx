import { useState, useEffect } from "react";
import properties from "../data/properties.json";
import { getDistance } from "../utils/distance";
import { useLocation, useNavigate } from "react-router-dom";


function SearchPage() {
  const [radius, setRadius] = useState(50);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setRadius(location.state.radius);
      setMinPrice(location.state.minPrice);
      setMaxPrice(location.state.maxPrice);
      setBedrooms(location.state.bedrooms);
    }
  }, [location.state]);

  useEffect(() => {
    if (!query) return;

    const fetchLocations = async () => {
      const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`
      );

      const data = await res.json();
      setSuggestions(data.features || []);
    };

    fetchLocations();
  }, [query]);

  const centerLat = 37.7749;
  const centerLng = -122.4194;

  const filtered = properties.filter((p) => {
    const distance = getDistance(centerLat, centerLng, p.latitude, p.longitude);

    return (
      distance <= radius &&
      (!minPrice || p.price >= minPrice) &&
      (!maxPrice || p.price <= maxPrice) &&
      (!bedrooms || p.bedrooms === parseInt(bedrooms))
    );
  });

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Advanced Search</h2>

      {/* Location search */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          data-testid="location-autocomplete"
          placeholder="Search location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        {suggestions.length > 0 && (
          <div
            style={{
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              marginTop: "5px",
              maxHeight: "200px",
              overflowY: "auto",
              position: "absolute",
              width: "100%",
              zIndex: 10
            }}
          >
            {suggestions.map((s, i) => (
              <p
                key={i}
                data-testid={`autocomplete-suggestion-${i}`}
                style={{
                  padding: "8px",
                  margin: 0,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setQuery(s.place_name);
                  setSuggestions([]);

                  if (window.updateMapCenter) {
                    window.updateMapCenter(s.center[0], s.center[1]);
                  }
                }}
              >
                {s.place_name}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Filters row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <input
          type="range"
          min="1"
          max="500"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          data-testid="search-radius-slider"
        />

        <input
          placeholder="Min Price"
          data-testid="price-min-input"
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px" }}
        />

        <input
          placeholder="Max Price"
          data-testid="price-max-input"
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px" }}
        />

        <select
          data-testid="bedrooms-select"
          onChange={(e) => setBedrooms(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px" }}
        >
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <button
          data-testid="draw-boundary-button"
          onClick={() =>
            navigate("/properties", {
              state: { radius, minPrice, maxPrice, bedrooms }
            })
          }
        >
          Draw Boundary
        </button>


        <button data-testid="apply-filters-button">
          Apply Filters
        </button>

        <button
          data-testid="save-search-button"
          onClick={() => {
            const search = {
              radius,
              minPrice,
              maxPrice,
              bedrooms,
              id: Date.now()
            };

            const existing =
              JSON.parse(localStorage.getItem("savedSearches")) || [];

            localStorage.setItem(
              "savedSearches",
              JSON.stringify([...existing, search])
            );

            alert("Search saved!");
          }}
        >
          Save Search
        </button>
      </div>

      {/* Results count */}
      <p data-testid="results-count" style={{ fontWeight: "bold" }}>
        {filtered.length} Results
      </p>
    </div>
  );
}

export default SearchPage;
