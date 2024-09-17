const socket = io();
let map;
const markers = {};

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's location:", { latitude, longitude });

        map = L.map("map").setView([latitude, longitude], 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.github.com/Quicksilver-lab">Quicksilver-lab</a> contributors',
        }).addTo(map);

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();

        setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log("Sending location:", { latitude, longitude });
              socket.emit("send-location", { lat: latitude, lng: longitude });
            },
            (error) => {
              console.error("Geolocation error:", error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
          );
        }, 5000);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        map = L.map("map").setView([0, 0], 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.github.com/Quicksilver-lab">Quicksilver-lab</a> QuickSilver',
        }).addTo(map);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    map = L.map("map").setView([0, 0], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.github.com/Quicksilver-lab">Quicksilver-lab</a> contributors',
    }).addTo(map);
  }
});

socket.on("receive-location", (data) => {
  const { id, lat, lng, text } = data;
  console.log("Received location:", { id, lat, lng });

  if (markers[id]) {
    markers[id].setLatLng([lat, lng]);
    markers[id].setPopupContent(text || "");
  } else {
    markers[id] = L.marker([lat, lng])
      .bindPopup(text || "")
      .addTo(map);
  }
});

socket.on("update-text", (data) => {
  const { id, text } = data;
  console.log("Received text/emoji:", { id, text });

  if (markers[id]) {
    markers[id].setPopupContent(text);
  }
});

socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

document.getElementById("submit-button").addEventListener("click", () => {
  const text = document.getElementById("text-input").value;
  console.log("Sending text/emoji:", text);
  socket.emit("update-text", { text });
  document.getElementById("text-input").value = "";
});
