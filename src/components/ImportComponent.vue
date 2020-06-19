<template>
  <div class="import__container">
    <div class="columns is-multiline">
      <div class="column is-full">
        <span class="label">1. Import CSV file</span>
      </div>

      <div class="column">
        <b-field class="file">
          <b-upload v-model="file">
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">
            {{ file.name }}
          </span>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImportComponent",

  data() {
    return {
      file: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.import__container {
  padding-top: 2rem;
}
</style>
