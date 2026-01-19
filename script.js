// alert("script.js is connected");

// Trips data
const trips = [
  { country: "Tanzania", city: "Zanzibar", month: "October", year: 2025, purpose: "Vacation", rating: 5 },
  { country: "Ireland", city: "Dublin, Galway, Cork", month: "February", year: 2023, purpose: "Vacation", rating: 5 },
  { country: "Kenya", city: "*", month: "December", year: 2022, purpose: "Vacation", rating: 5 },
  { country: "Italy", city: "Sardegna", month: "September", year: 2025, purpose: "Vacation", rating: 4 },
  { country: "Luxembourg", city: "Luxembourg", month: "October", year: 2025, purpose: "Friends", rating: 5 },
  { country: "Spain", city: "Alicante, Granada, Malaga", month: "July", year: 2025, purpose: "Vacation", rating: 5 }
];

// Month mapping for sorting
const monthNumbers = {
  "January": 1, "February": 2, "March": 3, "April": 4,
  "May": 5, "June": 6, "July": 7, "August": 8,
  "September": 9, "October": 10, "November": 11, "December": 12
};

// Function to render stars
function renderStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  return stars;
}

// Sort trips: newest year first, then newest month first
trips.sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year;
  return monthNumbers[b.month] - monthNumbers[a.month];
});

// Group trips by year
const tripsByYear = {};
trips.forEach(trip => {
  if (!tripsByYear[trip.year]) tripsByYear[trip.year] = [];
  tripsByYear[trip.year].push(trip);
});

// Display timeline
const tripList = document.getElementById("trip-list");
tripList.innerHTML = "";

// Loop over each year
for (let year in tripsByYear) {
  // Year heading
  const yearHeading = document.createElement("h2");
  yearHeading.textContent = year;
  tripList.appendChild(yearHeading);

  // Row container for this year's trips
  const yearRow = document.createElement("div");
  yearRow.className = "year-row";
  tripList.appendChild(yearRow);

  // Add each trip as a card
  tripsByYear[year].forEach(trip => {
    const card = document.createElement("div");
    card.className = "trip-card";
    card.innerHTML = `
      <h3>${trip.country}: ${trip.city}</h3>
      <p><strong>Period:</strong> ${trip.month} ${trip.year}</p>
      <p><strong>Purpose:</strong> ${trip.purpose}</p>
      <p><strong>Rating:</strong> <span class="stars">${renderStars(trip.rating)}</span></p>
    `;
    yearRow.appendChild(card);
  });
}

// --------------------
// Leaflet Map Section
// --------------------
document.addEventListener("DOMContentLoaded", function() {
    // 1. Initialize map
    const map = L.map('map').setView([20, 0], 2); 

    // 2. Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 3. Manual coordinates
    const countryCoords = {
        "Tanzania": [-6.3690, 34.8888],
        "Ireland": [53.1424, -7.6921],
        "Kenya": [-1.2921, 36.8219],
        "Italy": [41.8719, 12.5674],
        "Luxembourg": [49.8153, 6.1296],
        "Spain": [40.4637, -3.7492]
    };

    // 4. Add markers
   // Function to get coordinates and place marker
async function addMarkerForCountry(trip) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trip.country)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            L.circleMarker([lat, lon], {
                radius: 10,
                color: '#2c3e50',
                fillColor: '#e74c3c',
                fillOpacity: 0.8
            }).addTo(map)
              .bindPopup(`<strong>${trip.country}</strong><br>${trip.city}<br>${renderStars(trip.rating)}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates for:", trip.country, error);
    }
}

// Loop through trips and fetch coordinates automatically
trips.forEach(trip => {
    addMarkerForCountry(trip);
});

    // Helpful fix for rendering issues
    setTimeout(() => { map.invalidateSize(); }, 200);
});
