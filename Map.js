const mapboxAccessToken = {your access token here};
const map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: ...,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

L.geoJson(mapData).addTo(map);