// alert("script.js is connected");

// Trips
const trips = [
  {
    country: "Tanzania",
    city: "Zanzibar",
    month: "October",
    year: 2025,
    purpose: "Vacation",
    rating: 5
  },
  {
    country: "Ireland",
    city: "Dublin, Galway, Cork",
    month: "February",
    year: 2023,
    purpose: "Vacation",
    rating: 5
  },
  {
    country: "Kenya",
    city: "*",
    month: "December",
    year: 2022,
    purpose: "Vacation",
    rating: 5
  },
  {
    country: "Italy",
    city: "Sardegna",
    month: "September",
    year: 2025,
    purpose: "Vacation",
    rating: 4
  },
  {
    country: "Luxembourg",
    city: "Luxembourg",
    month: "October",
    year: 2025,
    purpose: "Friends",
    rating: 5
  },
  {
    country: "Spain",
    city: "Alicante, Granada, Malaga",
    month: "July",
    year: 2025,
    purpose: "Vacation",
    rating: 5
  }
];

// Stars
function renderStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  return stars;
}

// Month mapping
const monthNumbers = {
  "January": 1, "February": 2, "March": 3, "April": 4,
  "May": 5, "June": 6, "July": 7, "August": 8,
  "September": 9, "October": 10, "November": 11, "December": 12
};

// Sort trips by year then month
trips.sort(function(a, b) {
  if (b.year !== a.year) return b.year - a.year;
  return monthNumbers[b.month] - monthNumbers[a.month];
});

// Group trips by year
const tripsByYear = {};
trips.forEach(function(trip) {
  if (!tripsByYear[trip.year]) {
    tripsByYear[trip.year] = [];
  }
  tripsByYear[trip.year].push(trip);
});

// Show trips
const tripList = document.getElementById("trip-list");
tripList.innerHTML = "";

// Loop over each year
for (let year in tripsByYear) {
  // Add year heading
  tripList.innerHTML += `<h2>${year}</h2>`;

  // Start a row container for trips
  tripList.innerHTML += `<div class="year-row" id="year-${year}"></div>`;

  // Select the container we just created
  const yearContainer = document.getElementById(`year-${year}`);

  // Add each trip inside the row
  tripsByYear[year].forEach(function(trip) {
    yearContainer.innerHTML += `
      <div class="trip-card">
        <h3>${trip.country}: ${trip.city}</h3>
        <p><strong>Period:</strong> ${trip.month} ${trip.year}</p>
        <p><strong>Purpose:</strong> ${trip.purpose}</p>
        <p><strong>Rating:</strong> <span class="stars">${renderStars(trip.rating)}</span></p>
      </div>
    `;
  }); // close inner forEach
} // close outer for loop

// Initialize Leaflet map
const map = L.map('map').setView([20, 0], 2); // center: somewhere in the world

// Add a tile layer (the map visuals)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example coordinates for your trips
const countryCoords = {
  "Tanzania": [-6.3690, 34.8888],
  "Ireland": [53.1424, -7.6921],
  "Kenya": [-1.2921, 36.8219],
  "Italy": [41.8719, 12.5674],
  "Luxembourg": [49.8153, 6.1296],
  "Spain": [40.4637, -3.7492]
};

// Add markers
trips.forEach(trip => {
  const coords = countryCoords[trip.country];
  if (coords) {
    L.circleMarker(coords, {
      radius: 8,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.7
    }).addTo(map)
    .bindPopup(`<strong>${trip.country}</strong><br>${trip.city}<br>Rating: ${renderStars(trip.rating)}`);
  }
});
