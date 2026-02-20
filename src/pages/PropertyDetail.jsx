import { useParams } from "react-router-dom";
import properties from "../data/properties.json";
import { getDistance } from "../utils/distance";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ||
  "pk.test.mock-token-for-testing-purposes";

const amenities = [
  { name: "School", lat: 37.77, lng: -122.41 },
  { name: "Hospital", lat: 37.78, lng: -122.42 },
  { name: "Mall", lat: 37.76, lng: -122.43 }
];

function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(
    (p) => p.id === parseInt(id)
  );

  const mapContainer = useRef(null);
  const map = useRef(null);

  // ✅ Hook ALWAYS before any return
  useEffect(() => {
    if (!property || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [property.longitude, property.latitude],
      zoom: 12
    });

    new mapboxgl.Marker()
      .setLngLat([property.longitude, property.latitude])
      .addTo(map.current);

  }, [property]);

  // ✅ Early return AFTER hooks
  if (!property) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Property not found
      </div>
    );
  }

  return (
    <div
      data-testid="property-detail-container"
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px"
      }}
    >
      <h2 data-testid="property-title">
        {property.title}
      </h2>

      <p data-testid="property-price">
        ${property.price}
      </p>

      <p data-testid="property-full-address">
        {property.address}, {property.city}, {property.state}
      </p>

      <div
        ref={mapContainer}
        data-testid="property-map"
        style={{
          height: "350px",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "15px"
        }}
      />

      <p data-testid="property-coordinates">
        Coordinates: {property.latitude}, {property.longitude}
      </p>

      <h3>Nearby Amenities</h3>

      <div data-testid="nearby-amenities">
        {amenities.map((a, i) => {
          const distance = getDistance(
            property.latitude,
            property.longitude,
            a.lat,
            a.lng
          ).toFixed(2);

          return (
            <p key={i} data-testid={`amenity-distance-${i}`}>
              {a.name}: {distance} km
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default PropertyDetail;
