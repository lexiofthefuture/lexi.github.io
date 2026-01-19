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

// ... (Keep your trips array and sorting code at the top as is) ...

// --------------------
// Leaflet Map Section
// --------------------

document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const travelIcon = L.divIcon({
        html: '<span style="font-size: 24px;">📍</span>',
        className: 'custom-div-icon', 
        iconSize: [30, 30],
        iconAnchor: [15, 30] 
    });

    async function addMarkersInOrder() {
        // Since 'trips' is already sorted (newest first), 
        // we loop through them in that exact order.
        for (const trip of trips) {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trip.country)}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;

                    L.marker([lat, lon], { icon: travelIcon })
                      .addTo(map)
                      .bindPopup(`
                        <strong>${trip.country}</strong><br>
                        ${trip.city}<br>
                        <small>${trip.month} ${trip.year}</small>
                      `);
                }
            } catch (error) {
                console.error("Error finding:", trip.country);
            }
        }
    }

    addMarkersInOrder();
    
    setTimeout(() => { map.invalidateSize(); }, 200);
});
