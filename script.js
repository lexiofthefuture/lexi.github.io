//alert("script.js is connected");

const trip = {
  country: "Tanzania",
  city: "Zanzibar",
  vsxmonth: "October",
  year: 2025,
  purpose: "Vacation",
  rating: 5
};

function renderStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  return stars;
}

const tripList = document.getElementById("trip-list");

tripList.innerHTML = `
  <div class="trip-card">
    <h2>${trip.city}, ${trip.country}</h2>
    <p><strong>Period:</strong> ${trip.month} ${trip.year}</p>
    <p><strong>Purpose:</strong> ${trip.purpose}</p>
    <p><strong>Rating:</strong> ${renderStars(trip.rating)}</p>
  </div>
`;

