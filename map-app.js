//--------------GET Map + GeoJson link-----------------

const map = L.map('map').setView([44.84, -0.58], 12.);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    id: 'mapbox/light-v9',
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

L.geoJson(mapData).addTo(map);



//----------------STYLE Color--------------------

const getColor = (d) => {
  return  d > 12.6  ? '#E70000' :
          d > 12  ? '#ff8000' :
          d > 11.6   ? '#FFBC00' :
          d > 11.1   ? '#FFF000' :
          d > 10.6   ? '#00FFCD' :
          d > 10.1   ? '#00BDED' :
                      '#00BDED';
};

const style = (feature) => {
  return {
      fillColor: getColor(feature.properties.prix),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.3
  }
};

L.geoJson(mapData, {style: style}).addTo(map);



//----------------STYLE Hover--------------------

const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
};

const resetHighlight = (e) => {
    geojson.resetStyle(e.target);
    info.update();
};

const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
};

const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(mapData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);



//----------------Layout--------------------

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Prix des loyers</h4>' +  (props ?
        '<b>' + props.nom + '</b><br />' + props.prix + ' € / m<sup>2</sup> par mois'
        : '');
};

info.addTo(map);

