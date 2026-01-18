alert("script.js is connected");

const trip = {
  country: "Portugal",
  city: "Lisbon",
  year: 2023,
  purpose: "Vacation",
  liked: true
};

const tripList = document.getElementById("trip-list");

tripList.innerHTML = `
  <div class="trip-card">
    <h2>${trip.city}, ${trip.country}</h2>
    <p><strong>Year:</strong> ${trip.year}</p>
    <p><strong>Purpose:</strong> ${trip.purpose}</p>
    <p><strong>Liked it:</strong> ${trip.liked ? "❤️ Yes" : "😐 Not really"}</p>
  </div>
`;
