import "/assets/js/leaflet/leaflet.js";
import {
  blueIcon,
  greenIcon,
  greyIcon,
} from "./leaflet-color-markers/leaflet-color-markers.js";

async function fetchJson(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const data = await fetchJson("/assets/geojson/the-doric-temple.geojson");

const tileLayer = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
);

const iconFunction = (feature) => {
  if (feature.properties.Group) {
    switch (feature.properties.Group) {
      case "I":
        return greenIcon;
      case "II":
        return blueIcon;
    }
  } else return greyIcon;
};

const makePopup = (layer) => {
  const props = layer.feature.properties;
  const group = props.Group;
  const altName = props["Alternative name"]
  const link = `<a href=${props.Wikipedia}>${props.Name}</a>`;
  return (
    link +
    (altName ? `<br>(${altName})` : "") +
    (group ? "<br>Group: " + props.Group : "")
  );
};

const getMarker = (feature, latlng) => {
  return L.marker(latlng, { icon: iconFunction(feature) });
};

const sites = ["Paestum", "Agrigento", "Segesta", "Selinunte"];

const layerGroup = L.featureGroup();

const siteLayers = {};

// Add sites
for (const site of sites) {
  siteLayers[site] = L.geoJSON(data, {
    pointToLayer: (feature, latlng) => getMarker(feature, latlng),
    filter: (feature) => feature.properties.Site === site,
  })
    .bindPopup((layer) => makePopup(layer))
    .addTo(layerGroup);
}

const map = L.map("map", {
  layers: [tileLayer, layerGroup],
}).fitBounds(layerGroup.getBounds(), { padding: [100, 100] });

// Zoom links to sites
for (const site of sites) {
  const element = document.getElementById(site.toLowerCase() + "-link");
  element.addEventListener("click", () => {
    map.flyToBounds(siteLayers[site].getBounds(), { padding: [100, 100] });
  });
}

// Reset zoom link
document.getElementById("reset-link").addEventListener("click", () => {
  map.flyToBounds(layerGroup.getBounds(), { padding: [100, 100] });
});
