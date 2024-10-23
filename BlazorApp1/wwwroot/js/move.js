function createMap(mapElementId, centerCoordinates, zoom) {
    const map = L.map(mapElementId).setView(centerCoordinates, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(centerCoordinates).addTo(map);

    let currentCoordinates = centerCoordinates;
    function moveMarker() {
        currentCoordinates = [
            currentCoordinates[0] + 0.001,
            currentCoordinates[1] + 0.001
        ];
        marker.setLatLng(currentCoordinates);

        if (currentCoordinates[0] < 55.735 && currentCoordinates[1] < 52.401) {
            setTimeout(moveMarker, 1000);
        }
    }

    moveMarker();
}