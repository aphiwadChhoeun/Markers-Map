<template>
  <div id="app" class="container">
    <section class="section">
      <h1 class="is-size-1">Markers Map</h1>
      <ImportComponent />
    </section>
  </div>
</template>

<script>
import ImportComponent from "./components/ImportComponent.vue";

export default {
  name: "App",
  components: {
    ImportComponent,
  },
};
</script>
