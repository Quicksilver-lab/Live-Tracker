const socket = io();

if (navigator.geolocation) {
}

L.map("map").setView([0, 0], 10);

L.tyleLayer("htts://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
