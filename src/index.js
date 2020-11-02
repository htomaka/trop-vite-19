let map;
let latLng = {lat: 50.6620989, lng: 3.067905};
let positionMarker;
let geofence;

function initMap() {
    drawMap();
    drawFence();
    setCurrentPosition();
    getLocationUpdates();
}

function drawFence() {
    geofence = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map,
        center: map.getCenter(),
        radius: 500,
    });
}

function drawPosition(position) {
    positionMarker.setPosition(toLatLng(position));
}

function getLocationUpdates() {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handlePositionUpdated, console.error, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        console.error('geolocation not supported');
    }
}

function toLatLng(position) {
    return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
}

function drawMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 15,
    });
}

function setCurrentPosition() {
    positionMarker = new google.maps.Marker({
        position: map.getCenter(),
        map,
    });
}

function notifyOutOfBounds() {
    console.log('out of bounds');
}

function isOutOfBounds(position) {
    const bounds = geofence.getBounds();
    return bounds.contains(toLatLng(position));
}

function handlePositionUpdated(position) {
    if (isOutOfBounds(position)) {
        notifyOutOfBounds();
    }
    drawPosition(position);
}

window.initMap = initMap;
