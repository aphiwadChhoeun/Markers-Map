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

    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import Papa from "papaparse";
import { mapMutations } from "vuex";

export default {
  name: "ImportComponent",

  data() {
    return {
      file: null,
      isLoading: false,
    };
  },

  watch: {
    file(f) {
      this.isLoading = true;

      Papa.parse(f, {
        header: true,
        complete: (results) => {
          let fields = [];
          let data = [];

          results.meta.fields.forEach((element) => {
            fields.push({
              field: element.toLowerCase(),
              label: element,
            });
          });

          results.data.forEach((element) => {
            let t = {};
            let keys = Object.keys(element);
            let values = Object.values(element);

            for (let i = 0; i < values.length; i++) {
              if (values[i].length > 0) {
                t[keys[i].toLowerCase()] = values[i];
              }
            }

            if (Object.keys(t).length > 0) {
              data.push(t);
            }
          });

          this.setData({
            headers: fields,
            entries: data,
          });
          this.isLoading = false;
        },
      });
    },
  },

  methods: {
    ...mapMutations(["setData"]),
  },
};
</script>

<style lang="scss" scoped>
.import__container {
  padding-top: 2rem;
}
</style>
