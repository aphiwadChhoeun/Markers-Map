<template>
  <div id="app">
    <div class="container">
      <Header />
      <section class="section">
        <ImportComponent />
      </section>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ImportComponent from "./components/ImportComponent.vue";

export default {
  name: "App",
  components: {
    Header,
    ImportComponent,
  },
};
</script>
