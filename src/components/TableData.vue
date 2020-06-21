<template>
  <div class="tabledata__container">
    <b-table :data="data" :paginated="data.length > 5" :per-page="5">
      <template slot-scope="props">
        <b-table-column field="company" label="Company">
          {{ props.row.company }}
        </b-table-column>
        <b-table-column field="address" label="Address">
          {{ props.row.address }}
        </b-table-column>
        <b-table-column field="marker" label="Indicator">
          <div
            class="marker__indicator"
            :style="markerStyle(props.index)"
          ></div>
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

.marker__indicator {
  position: relative;
  width: $markerSize;
  height: $markerSize;
  border-radius: 50%;
  background: $markerColor;
  // filter: hue-rotate(20deg);

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
</style>
