import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      headers: null,
      entries: null,
    },
  },
  mutations: {
    setData: (state, payload) => {
      state.data = payload;
    },
  },
  actions: {},
  modules: {},
});
