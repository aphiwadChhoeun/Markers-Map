<template>
  <div class="mapviewer__container">
    <div id="map-container"></div>
  </div>
</template>

<script>
import GeoService, { API_KEY } from "../services/GeoService";
import mapboxgl from "mapbox-gl";

export default {
  name: "MapViewer",

  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      map: null,
    };
  },

  mounted() {
    this.initMap();
    // this.fetchCurrentLocation();
  },

  methods: {
    initMap() {
      mapboxgl.accessToken = API_KEY;
      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-122.4726194, 37.7577627], // starting position [lng, lat]
        zoom: 10, // starting zoom
      });

      map.on("load", () => {
        this.convertAddressesToMarkers();
      });

      this.map = map;
    },

    fetchCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            this.$buefy.toast.open({
              message: "Unable to retrieve your location.",
              duration: 5000,
              type: "is-danger",
              position: "is-top",
            });
          }
        );
      }
    },

    convertAddressesToMarkers() {
      let promises = [];
      let bounds = new mapboxgl.LngLatBounds();

      this.data.forEach((item) => {
        promises.push(GeoService.search(item.address));
      });

      Promise.all(promises).then((results) => {
        let rawResults = results.map((res) => res.data);

        rawResults.forEach((res) => {
          let lnglat = res.features[0].geometry.coordinates;
          new mapboxgl.Marker().setLngLat(lnglat).addTo(this.map);
          bounds.extend(lnglat);
        });

        console.log(bounds);
        this.map.fitBounds(bounds, {
          padding: { top: 65, bottom: 25, left: 25, right: 25 },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mapviewer__container {
  padding-top: 2rem;

  #map-container {
    width: 100%;
    min-height: 450px;
  }
}
</style>
