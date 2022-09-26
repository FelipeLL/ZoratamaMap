import { useControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const TOKEN =
  "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";

export default function GeocoderControl({ estacionesGeoJSON }) {
  function forwardGeocoder(query) {
    var matchingFeatures = [];
    for (var i = 0; i < estacionesGeoJSON.features.length; i++) {
      var feature = estacionesGeoJSON.features[i];

      if (feature.properties.toLowerCase().search(query.toLowerCase()) !== -1) {
        feature["place_name"] = "🌱 " + feature.properties;
        feature["center"] = feature.geometry.coordinates;
        feature["place_type"] = ["place"];
        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }
  useControl(() => {
    const ctrl = new MapboxGeocoder({
      accessToken: TOKEN,
      localGeocoder: forwardGeocoder,
      localGeocoderOnly: true,
      mapboxgl: mapboxgl,
      placeholder: "Busque aquí",
      marker: false,
      limit: 10,
      // enableGeolocation: true,
      clearOnBlur: true,
      clearAndBlurOnEsc: true,
      collapsed: true,
    });

    return ctrl;
  });

  return null;
}
