<template>
  <div class="tabledata__container">
    <b-table :data="data" :paginated="data.length > 10" :per-page="10">
      <template slot-scope="props">
        <b-table-column field="company" label="Company">
          {{ props.row.company }}
        </b-table-column>
        <b-table-column field="address" label="Address">
          {{ props.row.address }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TableData",

  props: {
    data: {
      type: Array,
    },
    columns: {
      type: Array,
    },
  },

  methods: {
    markerStyle(index) {
      return {
        filter: `hue-rotate(${index * 25}deg)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$markerColor: #e23e57;
$markerSize: 20px;

.tabledata__container {
  padding-top: 2rem;
}
</style>
