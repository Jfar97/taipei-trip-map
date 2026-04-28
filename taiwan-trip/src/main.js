import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

const index = [
    "chiang-kai-shek-memorial-hall.geojson",
    "guang-hua-digital-plaza.geojson",
    "jiufen-old-street.geojson",
    "kua-kua.geojson",
    "national-palace-museum.geojson",
    "pokemon-center-taipei.geojson",
    "shilin-night-market.geojson",
    "syntrend-creative-park.geojson",
    "taipei-city-mall.geojson",
    "ximending-shopping-district.geojson",  
]

const map = L.map('map', {
  center: [25.033964, 121.564468],
  zoom: 13,
})

// Base map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

for (const file of index) {
  console.log(`Loading ${file}...`);
  const filePath = `${import.meta.env.BASE_URL}places/${file}`;
  fetch(filePath)
    .then(response => response.json())
    .then((places) => {
      L.geoJSON(places, {
        coordsToLatLng: coords => L.latLng(coords[0], coords[1]),
        pointToLayer: (feature, latlng) => {
          const marker = L.marker(latlng, {riseOnHover:true});
          marker.bindPopup(`
            <b>${feature.properties.name.toUpperCase()}</b>
            <br>
            <i>${feature.properties.address}</i>
            <br>
            <br>
            ${feature.properties.description}
          `);
          return marker;
        }
      }).addTo(map);
    })
    console.log(`Finished loading ${file}.`);
};


console.log('Hello, Taipei Trip Map! 2.0');

