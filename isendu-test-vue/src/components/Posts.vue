<template>
  <div class="container">
    <label for="titlesearchbox">Cerca nel titolo</label>
    <input class="m-2" id="titlesearchbox" type="text" v-model="searchTitle" />

    <label for="bodysearchbox">Cerca nel testo</label>
    <input class="m-2" id="bodysearchbox" type="text" v-model="searchBody" />

    <!-- ciclo sull'oggetto posts richiamato dalla computed -->
    <div class="wrapper d-flex flex-wrap">
      <div v-for="post in filteredArray" :key="post.id" class="card my-1 w-25">
        <div class="card-body">
          <div class="text-container">
            <h5 class="card-title">Post id n°{{ post.id }}</h5>
            <h5 class="card-title">User id n°{{ post.userId }}</h5>
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-text">{{ post.body }}</p>
          </div>
          <!-- link al post singolo passando come props l'id del post -->
          <div class="button-container d-flex justify-content-center">
            <router-link
              class="btn btn-primary mx-2"
              :to="{
                name: 'post',
                params: {
                  id: post.id,
                },
              }"
              >View</router-link
            >

            <b-button
              :id="'show-btn' + post.id"
              @click="$bvModal.show('modal' + post.id)"
              >Edit Post</b-button
            >

            <b-modal :id="'modal' + post.id" hide-footer>
              <template #modal-title> Edit Post </template>
              <div class="text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <label class="mx-3 w-25" for="title">Edit Title</label>
                  <textarea
                    class="my-2 w-50"
                    type="title"
                    name="title"
                    :id="'title' + post.id"
                    v-model="titleToUpdate"
                  />
                </div>
                <div class="d-flex align-items-center justify-content-center">
                  <label class="mx-3 w-25" for="body">Edit Body</label>
                  <textarea
                    class="my-2 w-50"
                    type="text"
                    name="body"
                    :id="'body' + post.id"
                    v-model="bodyToUpdate"
                  />
                </div>
              </div>
              <div
                class="btn-wrapper d-flex justify-content-center align-items-center"
              >
                <b-button
                  class="btn-danger mx-1 mt-3"
                  block
                  @click="$bvModal.hide('modal' + post.id)"
                  >Cancel</b-button
                >
                <b-button
                  class="mx-1 mt-3 btn btn-success"
                  block
                  @click="$bvModal.hide('modal' + post.id), updatePost(post.id)"
                  >Save Changes</b-button
                >
              </div>
            </b-modal>
            <!-- al click avvio la funzione di cancellazione -->
            <div @click="deletePost(post)" class="btn btn-danger mx-2">
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Posts",
  data() {
    return {
      titleToUpdate: null,
      bodyToUpdate: null,
      searchTitle: "",
      searchBody: "",
    };
  },
  methods: {
    // passo alla funzione il post e avvio la funzione nella mutation
    deletePost(post) {
      this.$store.commit("DELETE_Post", post);
    },
    // passo alla funzione l'id del post, avvio mutations inviando dati da modificare + id
    updatePost(id) {
      if (this.titleToUpdate && this.bodyToUpdate) {
        const titleToPush = this.titleToUpdate;
        const bodyToPush = this.bodyToUpdate;
        this.$store.commit("UPDATE_Title", { id, titleToPush });
        this.$store.commit("UPDATE_Body", { id, bodyToPush });
      } else if (this.titleToUpdate) {
        const titleToPush = this.titleToUpdate;
        this.$store.commit("UPDATE_Title", { id, titleToPush });
      } else if (this.bodyToUpdate) {
        const bodyToPush = this.bodyToUpdate;
        this.$store.commit("UPDATE_Body", { id, bodyToPush });
      }
      // svuoto dati
      this.titleToUpdate = null;
      this.bodyToUpdate = null;
    },
  },
  //   avvio la funzione loadPosts per caricare tutti i dati dallo store
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  //   richiamo l'array dallo store
  computed: {
    ...mapState(["posts"]),

    // filtra() {
    //   const text = this.search;
    //   return this.$store.commit("FILTER_ByTitle", text);
    // },
    // filtro l'array utilizzando la variabile search
    filteredByTitle() {
      const text = this.searchTitle;
      let filtered = this.posts;
      if (text != null) {
        filtered = this.posts.filter((post) =>
          post.title.includes(text.toLowerCase())
        );
      }
      return filtered;
    },
    filteredByBody() {
      const text = this.searchBody;
      let filtered = this.posts;
      if (text != null) {
        filtered = this.posts.filter((post) =>
          post.title.includes(text.toLowerCase())
        );
      }
      return filtered;
    },
    filteredArray() {
      let filtered = this.posts;
      // let title = this.filteredByTitle;
      // let body = this.filteredByBody;
      // title.forEach((element) => {
      //   console.log("element", element);
      //   console.log(body);
      // });
      return filtered;
    },
  },
};
</script>

<style>
.text-container {
  height: 90%;
}
.button-container {
  height: 10%;
}
</style>
