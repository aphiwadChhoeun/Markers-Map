<template>
  <div class="footer">
    <div class="content has-text-centered">
      <p>
        Made with <b-icon icon="heart" type="is-heart" size="is-small" /> by
        Aphiwad Chhoeun
        {{ year }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",

  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style></style>
