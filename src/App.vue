<template>
  <div id="app">
    <div class="container">
      <header-component />
      <section class="section body__content">
        <ImportComponent />
        <table-data
          v-if="data.entries"
          :data="data.entries"
          :columns="data.headers"
        />
        <map-viewer v-if="data.entries" />
      </section>
      <footer-component />
    </div>
  </div>
</template>

<style lang="scss">
$background: #f5f5f5;

#app {
  background: $background;
}
.body__content {
  min-height: 800px;
}
</style>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ImportComponent from "./components/ImportComponent.vue";
import TableData from "./components/TableData.vue";
import MapViewer from "./components/MapViewer.vue";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    HeaderComponent,
    FooterComponent,
    ImportComponent,
    TableData,
    MapViewer,
  },

  computed: mapState(["data"]),
};
</script>
