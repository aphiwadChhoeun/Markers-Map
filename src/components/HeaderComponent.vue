<template>
  <header class="map__header">
    <figure class="image is-32x32">
      <img class="is-rounded" src="../assets/logo.png" />
    </figure>
    <h1 class="title is-size-3">Markers Map</h1>
  </header>
</template>

<style lang="scss">
header.map__header {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding-top: 2rem;

  .image {
    display: inline-block !important;
  }

  .title {
    display: inline-block;
    padding-left: 0.5rem;
  }
}
</style>

<script>
export default {};
</script>
