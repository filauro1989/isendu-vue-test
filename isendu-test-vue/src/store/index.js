import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    posts: [],
    cane: { message: "" },
  },
  mutations: {
    //funzione per pushare nell'array posts i dati
    SET_Posts(state, posts) {
      state.posts = posts;
    },
    // Cerco nell'array l'oggetto con lo stesso ID e lo elimino dallo state
    DELETE_Post(state, toBeDeleted) {
      const postToDelete = state.posts.find(
        (post) => toBeDeleted.id === post.id
      );
      state.posts.splice(postToDelete, 1);
    },
    // ciclo nell'array e cerco l'oggetto con lo stesso id per modificargli il titolo
    UPDATE_Title(state, { id, titleToPush }) {
      const posts = this.state.posts;
      for (const post of posts) {
        if (post.id === id) {
          post.title = titleToPush;
        }
      }
    },
    // ciclo nell'array e cerco l'oggetto con lo stesso id per modificargli il body
    UPDATE_Body(state, { id, bodyToPush }) {
      const posts = this.state.posts;
      for (const post of posts) {
        if (post.id === id) {
          post.body = bodyToPush;
        }
      }
    },
    // FILTER_ByTitle(state, text) {
    //   const filtered = this.state.posts.filter((post) =>
    //     post.title.includes(text)
    //   );
    //   console.log(filtered);
    // },
  },
  actions: {
    // richiamo dati dall'API e avvio la funzione SET_Posts
    loadPosts({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.data)
        .then((posts) => {
          // console.log(posts);
          commit("SET_Posts", posts);
        });
    },
    // filter({ commit, text }) {
    //   commit("FILTER_ByTitle", text);
    // },
  },
  modules: {},
});
