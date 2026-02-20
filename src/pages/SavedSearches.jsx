import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedSearches() {
  const [searches, setSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("savedSearches")) || [];
    setSearches(saved);
  }, []);

  const deleteSearch = (id) => {
    const updated = searches.filter((s) => s.id !== id);
    localStorage.setItem("savedSearches", JSON.stringify(updated));
    setSearches(updated);
  };

  if (!searches.length) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p
          data-testid="no-saved-searches"
          style={{ fontSize: "18px", color: "#666" }}
        >
          No saved searches yet
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "auto"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Saved Searches</h2>

      {searches.map((s) => (
        <div
          key={s.id}
          data-testid={`saved-search-${s.id}`}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            <strong>Radius:</strong> {s.radius} km
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              data-testid={`load-search-${s.id}`}
              onClick={() => navigate("/search", { state: s })}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Load
            </button>

            <button
              data-testid={`delete-search-${s.id}`}
              onClick={() => deleteSearch(s.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                background: "#ff4d4f",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedSearches;
