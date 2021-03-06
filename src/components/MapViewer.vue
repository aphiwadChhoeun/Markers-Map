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
      markers: [],
    };
  },

  watch: {
    data() {
      this.markers.forEach((marker) => {
        marker.remove();
      });
      this.convertAddressesToMarkers();
    },
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
        // queue requests for converting addresses to locations
        promises.push(GeoService.search(item.address));
      });

      // resolve all requests
      Promise.all(promises).then((results) => {
        let rawResults = results.map((res) => res.data);
        console.log(rawResults);

        rawResults.forEach((res, index) => {
          let lnglat = res.features[0].geometry.coordinates;

          // creating marker
          let el = document.createElement("div");
          el.classList.add("custom__marker");
          let marker = new mapboxgl.Marker({
            element: el,
            anchor: "bottom",
          })
            .setLngLat(lnglat)
            .setPopup(
              new mapboxgl.Popup({
                closeButton: false,
                anchor: "bottom",
                className: "custom__popup",
              }).setHTML(`<div>${this.data[index].company}</div>`)
            )
            .addTo(this.map);
          this.markers.push(marker);

          // making sure bounds contains all markers to fit the map
          bounds.extend(lnglat);
        });

        this.map.fitBounds(bounds, {
          padding: { top: 65, bottom: 25, left: 45, right: 45 },
        });

        this.$emit("canvas-ready", this.map.getCanvas());
      });
    },
  },
};
</script>

<style lang="scss">
$markerColor: #e23e57;
$markerSize: 30px;

.mapviewer__container {
  padding-top: 2rem;

  #map-container {
    width: 100%;
    min-height: 450px;
  }

  .custom__marker {
    position: absolute;
    top: -$markerSize / 2;
    width: $markerSize;
    height: $markerSize;
    border-radius: 50%;
    background: $markerColor;

    &:before {
      position: absolute;
      top: $markerSize - 6;
      left: $markerSize / 2;
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-top: $markerSize / 2 solid $markerColor;
      border-left: $markerSize / 2.5 solid transparent;
      border-right: $markerSize / 2.5 solid transparent;
      transform: translateX(-50%);
    }
  }

  .custom__popup {
    top: -($markerSize + $markerSize / 2);
  }
}
</style>
