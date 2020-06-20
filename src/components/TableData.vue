<template>
  <div>
    <b-table
      :data="data"
      :columns="columns"
      :paginated="data.length > 5"
      :per-page="5"
    ></b-table>
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
};
</script>

<style></style>
