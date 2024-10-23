let map;

function initMap(latitude, longitude, zoom) {
    var map = L.map('map').setView([55.7318, 52.3963], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([55.7318, 52.3963]).addTo(map);

    var interval = setInterval(function () {
        var latlng = marker.getLatLng();
        latlng.lat += 0.0001;
        latlng.lng += 0.0001;
        marker.setLatLng(latlng);

        if (latlng.lat > 55.74 && latlng.lng > 52.41) {
            clearInterval(interval);
        }
    }, 800);
}

