# Real Estate Property Finder with Mapbox & Puppeteer

------------------------------------------------------------------------

## Project Overview

This project is a full-featured real estate web application built using
React and Mapbox GL JS.\
It enables users to explore properties geographically, apply advanced
filters, save searches, and validate all features using automated
Puppeteer integration tests.

The project fulfills all functional, geospatial, testing, and
containerization requirements specified in the assignment.

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React.js
-   React Router
-   Mapbox GL JS
-   Mapbox Geocoding API

### Testing

-   Jest
-   Puppeteer (Headless Browser Automation)

### Containerization

-   Docker
-   Docker Compose

------------------------------------------------------------------------

## Data Seeding

-   Contains **30+ property listings**
-   Properties distributed across:
    -   San Francisco
    -   Los Angeles
    -   New York
-   Each property follows the required schema (id, price, lat/lng,
    amenities, etc.)
-   Data is stored locally in `src/data/properties.json`

------------------------------------------------------------------------

## Application Routes

### Properties Page

-   `/`
-   `/properties`
-   Displays interactive Mapbox map
-   Shows property markers
-   Supports polygon boundary filtering
-   Marker click highlights property card

### Advanced Search

-   `/search`
-   Location autocomplete
-   Radius-based filtering
-   Price filtering
-   Bedroom filtering
-   Save search functionality

### Property Detail

-   `/property/:id`
-   Full property details
-   Map showing property location
-   Coordinates display
-   Nearby amenities with distance calculation (Haversine formula)

### Saved Searches

-   `/saved-searches`
-   View saved searches
-   Load previous filters
-   Delete saved searches
-   Empty state handling

------------------------------------------------------------------------

## Running Locally

### Install Dependencies

npm install

### Start Development Server

npm start

Application runs at:

http://localhost:3000

------------------------------------------------------------------------

## Running Integration Tests

Before running Puppeteer tests, ensure the React app is running.

### Step 1 --- Start App

npm start

Wait for: Compiled successfully\
Local: http://localhost:3000

Keep this terminal open.

### Step 2 --- Run Tests (New Terminal)

npm run test:integration

Test results will be generated in:

/test-results

Includes: - integration-report.json - geospatial-test-summary.json -
screenshots/

If the app is not running, tests will fail with:
net::ERR_CONNECTION_REFUSED

------------------------------------------------------------------------

## Docker Setup

### Build Containers

docker-compose build

### Run Containers

docker-compose up

Application will be available at:

http://localhost:3000

(The Docker setup exposes port 3006 as required by assignment
specifications.)

To run integration tests inside Docker:

docker-compose exec puppeteer-integration-tests npm run test:integration

Test results will be generated in:

/test-results

------------------------------------------------------------------------

## Environment Configuration

An `.env.example` file is provided with required variables:

MAPBOX_ACCESS_TOKEN=pk.test.mock-token-for-testing-purposes\
MAPBOX_STYLE=mapbox://styles/mapbox/streets-v11

For local development, create a `.env` file:

REACT_APP_MAPBOX_ACCESS_TOKEN=your_real_mapbox_token

------------------------------------------------------------------------

## Project Structure

    real-estate-map/
    │
    ├── src/
    │   ├── pages/
    │   │   ├── PropertiesPage.jsx
    │   │   ├── PropertyDetail.jsx
    │   │   ├── SearchPage.jsx
    │   │   └── SavedSearches.jsx
    │   │
    │   ├── data/
    │   │   └── properties.json
    │   │
    │   ├── utils/
    │   │   └── distance.js
    │   │
    │   └── tests/
    │       └── integration/
    │
    ├── Dockerfile
    ├── docker-compose.yml
    ├── .env.example
    └── README.md

------------------------------------------------------------------------

## Core Features Implemented

✔ Mapbox map initialization\
✔ Property markers with test IDs\
✔ Location autocomplete\
✔ Radius filtering\
✔ Polygon boundary filtering\
✔ Marker-to-card interaction\
✔ Save & load searches\
✔ Property detail with amenity distance calculation\
✔ Puppeteer integration tests\
✔ JSON test result generation\
✔ Docker containerization

------------------------------------------------------------------------

## Submission Checklist

The repository includes:

✔ README.md\
✔ docker-compose.yml\
✔ Dockerfile\
✔ Dockerfile.test\
✔ .env.example\
✔ src directory\
✔ tests/integration directory\
✔ test-results directory\
✔ 30+ seeded properties

------------------------------------------------------------------------

## Evaluation Notes

-   All required `data-testid` attributes are implemented.
-   Integration tests validate map interactions, filters, saving/loading
    searches, and geospatial logic.
-   The application is fully containerized for one-command setup.
-   Test results are automatically generated inside `/test-results`.

------------------------------------------------------------------------

## Final Status

The project satisfies all functional, geospatial, integration testing,
and Docker requirements as specified in the assignment.
