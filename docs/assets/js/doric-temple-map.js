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

const map = L.map("map", {
  layers: [tileLayer],
});

const getIcon = (feature) => {
  if (feature.properties.Group) {
    switch (feature.properties.Group) {
      case "I":
        return greenIcon;
      case "II":
        return blueIcon;
    }
  } else return greyIcon;
};

const getMarker = (feature, latlng) => {
  return L.marker(latlng, { icon: getIcon(feature) });
};

const getPopup = (layer) => {
  const props = layer.feature.properties;
  const group = props.Group;
  const altName = props["Alternative name"];
  const link = `<a href=${props.Wikipedia}>${props.Name}</a>`;
  return (
    link +
    (altName ? `<br>(${altName})` : "") +
    (group ? "<br>Group: " + props.Group : "")
  );
};

const sites = ["Paestum", "Agrigento", "Segesta", "Selinunte"];
const layerGroup = L.featureGroup();
const siteLayers = {};
const padding = [100, 100]

for (const site of sites) {
  // Add site to layer
  siteLayers[site] = L.geoJSON(data, {
    pointToLayer: (feature, latlng) => getMarker(feature, latlng),
    filter: (feature) => feature.properties.Site === site,
  })
    .bindPopup((layer) => getPopup(layer))
    .addTo(layerGroup);

  // Listen to site links
  const element = document.getElementById(site.toLowerCase() + "-link");
  element.addEventListener("click", () => {
    map.flyToBounds(siteLayers[site].getBounds(), { padding });
  });
}

layerGroup.addTo(map);
map.fitBounds(layerGroup.getBounds(), { padding });

// Listen to reset zoom link
document.getElementById("reset-link").addEventListener("click", () => {
  map.flyToBounds(layerGroup.getBounds(), { padding });
});
