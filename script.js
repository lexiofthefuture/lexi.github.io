//alert("script.js is connected");

//Trips
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

// Sort Trips
const monthNumbers = {
  "January": 1,
  "February": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "July": 7,
  "August": 8,
  "September": 9,
  "October": 10,
  "November": 11,
  "December": 12
};

trips.sort(function(a, b) {
  // Compare by year first
  if (b.year !== a.year) {
    return b.year - a.year; // newest year first
  }
  // If same year, compare month
  return monthNumbers[b.month] - monthNumbers[a.month]; // newest month first
});

// Group trips by year
const tripsByYear = {};

trips.forEach(function(trip) {
  if (!tripsByYear[trip.year]) {
    tripsByYear[trip.year] = [];
  }
  tripsByYear[trip.year].push(trip);
});

//Show Trips
const tripList = document.getElementById("trip-list");
tripList.innerHTML = "";

for (let year in tripsByYear) {
  tripList.innerHTML += `<h2>${year}</h2>`; // year heading

  tripsByYear[year].forEach(function(trip) {
    tripList.innerHTML += `
      <div class="trip-card">
        <h3>${trip.country}: ${trip.city}</h3>
        <p><strong>Period:</strong> ${trip.month} ${trip.year}</p>
        <p><strong>Purpose:</strong> ${trip.purpose}</p>
        <p><strong>Rating:</strong> ${renderStars(trip.rating)}</p>
      </div>
    `;
  });
}

