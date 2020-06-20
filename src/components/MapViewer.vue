<template>
  <div class="mapviewer__container">
    <div id="map-container"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "MapViewer",

  data() {
    return {
      map: null,
      center: {
        lat: 40,
        lng: -74.5,
      },
    };
  },

  watch: {
    center(location) {
      this.map.panTo([location.lng, location.lat], { duration: 500 });
    },
  },

  mounted() {
    this.initMap();
    this.fetchCurrentLocation();
  },

  methods: {
    initMap() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY;
      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [this.center.lng, this.center.lat], // starting position [lng, lat]
        zoom: 10, // starting zoom
      });

      this.map = map;
    },

    fetchCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
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
