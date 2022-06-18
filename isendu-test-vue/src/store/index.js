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
    //funzione per pushare nell'array posts i dati
    SET_Posts(state, posts) {
      state.posts = posts;
    },
    // funzione per cancellare il post dall'array. Cerco nell'array il post con lo stesso ID e lo elimino dallo state
    DELETE_Post(state, toBeDeleted) {
      const postToDelete = state.posts.find(
        (post) => toBeDeleted.id === post.id
      );
      state.posts.splice(postToDelete, 1);
    },
    // UPDATE_Title(state, title) {
    //   state.posts.title = title;
    // },

    // Funzione alternativa, fatta perché la prima non andava per errore di battitura(im retarded)
    // DELETE_Post(state, index) {
    //   const postIndex = state.posts.map((post) => post.id).indexOf(index.id);
    //   state.posts.splice(postIndex, 1);
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
  },
  modules: {},
});
