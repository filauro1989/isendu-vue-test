import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    SET_Posts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    loadPosts({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.data)
        .then((posts) => {
          console.log(posts);
          commit("SET_Posts", posts);
        });
    },
  },
  modules: {},
});
