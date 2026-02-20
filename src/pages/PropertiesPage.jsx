import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import properties from "../data/properties.json";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ||
  "pk.test.mock-token-for-testing-purposes";

function PropertiesPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283], // US center
      zoom: 4
    });

    // Map center update function (for autocomplete)
    window.updateMapCenter = (lng, lat) => {
      if (map.current) {
        map.current.flyTo({
          center: [lng, lat],
          zoom: 10
        });
      }
    };

    // Map loaded indicator for tests
    map.current.on("load", () => {
      const el = document.createElement("div");
      el.setAttribute("data-testid", "map-loaded");
      el.style.display = "none";
      document.body.appendChild(el);
    });

    // Map drawing controls
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    map.current.addControl(draw);

    // Draw polygon event
    map.current.on("draw.create", updateArea);
    map.current.on("draw.update", updateArea);

    // Clear polygon event
    map.current.on("draw.delete", () => {
      properties.forEach((p) => {
        const card = document.querySelector(
          `[data-testid="property-card-${p.id}"]`
        );
        if (card) card.style.display = "block";
      });
    });

    function updateArea() {
      const data = draw.getAll();
      if (!data.features.length) return;

      const polygon = data.features[0].geometry.coordinates[0];

      properties.forEach((p) => {
        const card = document.querySelector(
          `[data-testid="property-card-${p.id}"]`
        );
        if (!card) return;

        const inside = pointInPolygon(
          [p.longitude, p.latitude],
          polygon
        );

        card.style.display = inside ? "block" : "none";
      });

      // Boundary indicator (for automated tests)
      if (!document.querySelector('[data-testid="boundary-active"]')) {
        const el = document.createElement("div");
        el.setAttribute("data-testid", "boundary-active");
        el.style.display = "none";
        document.body.appendChild(el);
      }
    }

    function pointInPolygon(point, polygon) {
      let inside = false;
      for (
        let i = 0, j = polygon.length - 1;
        i < polygon.length;
        j = i++
      ) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        const intersect =
          yi > point[1] !== yj > point[1] &&
          point[0] <
            ((xj - xi) * (point[1] - yi)) /
              (yj - yi) +
            xi;

        if (intersect) inside = !inside;
      }
      return inside;
    }

    // Add property markers
    properties.forEach((p) => {
      const markerEl = document.createElement("div");
      markerEl.setAttribute("data-testid", `map-marker-${p.id}`);
      markerEl.style.background = "red";
      markerEl.style.width = "12px";
      markerEl.style.height = "12px";
      markerEl.style.borderRadius = "50%";
      markerEl.style.cursor = "pointer";

      markerEl.addEventListener("click", () => {
        const card = document.querySelector(
          `[data-testid="property-card-${p.id}"]`
        );
        if (card) {
          card.style.border = "3px solid blue";
          card.scrollIntoView({ behavior: "smooth" });
        }
      });

      new mapboxgl.Marker(markerEl)
        .setLngLat([p.longitude, p.latitude])
        .addTo(map.current);
    });
  }, []);

  return (
    <div data-testid="properties-container" style={{ padding: "20px" }}>
      <h1>Properties Page</h1>

      <div
        ref={mapContainer}
        data-testid="map-container"
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      />

      <button
        data-testid="draw-boundary-button"
        style={{ margin: "15px 0" }}
        onClick={() =>
          alert("Use polygon tool on map to draw boundary")
        }
      >
        Draw Boundary
      </button>

      <div data-testid="property-list">
        {properties.map((p) => (
          <div
            key={p.id}
            data-testid={`property-card-${p.id}`}
            data-latitude={p.latitude}
            data-longitude={p.longitude}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3 data-testid={`property-title-${p.id}`}>
              {p.title}
            </h3>
            <p data-testid={`property-price-${p.id}`}>
              ${p.price}
            </p>
            <p data-testid={`property-address-${p.id}`}>
              {p.address}
            </p>
            <button data-testid={`save-property-${p.id}`}>
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertiesPage;