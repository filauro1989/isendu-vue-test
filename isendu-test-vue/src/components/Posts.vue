<template>
  <div class="container">
    <div
      class="filter-box d-flex justify-content-center align-items-center rounded mb-2"
    >
      <label for="titlesearchbox">Cerca nel titolo</label>
      <input
        class="m-2"
        id="titlesearchbox"
        type="text"
        v-model="searchTitle"
      />
      <label for="bodysearchbox">Cerca nel testo</label>
      <input class="m-2" id="bodysearchbox" type="text" v-model="searchBody" />
    </div>

    <!-- ciclo sull'oggetto posts richiamato dalla computed -->
    <div class="cards-wrapper d-flex flex-wrap justify-content-around">
      <div v-for="post in filteredArray" :key="post.id" class="card my-2 w-33">
        <div class="card-body">
          <div class="text-container p-4">
            <div
              class="card-title d-flex align-items-center justify-content-center h-40 mb-0 py-3"
            >
              {{ post.title }}
            </div>
            <p class="card-text h-40 mb-0 py-3">
              {{ post.body }}
            </p>
            <div class="h-10 py-2">Post id n°{{ post.id }}</div>
            <div class="h-10 py-2">User id n°{{ post.userId }}</div>
          </div>
          <!-- link al post singolo passando come props l'id del post -->
          <div class="button-container d-flex justify-content-center p-4">
            <router-link
              class="btn btn-primary mx-2 d-flex align-items-center"
              :to="{
                name: 'post',
                params: {
                  id: post.id,
                },
              }"
              >View</router-link
            >

            <!-- Modale per editare post -->
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
            <div
              @click="deletePost(post)"
              class="btn btn-danger mx-2 d-flex align-items-center"
            >
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

    // funzione di filtro tramite input box per titolo
    filteredByTitle() {
      let text = this.searchTitle;
      let filtered = [];
      // se input box non è vuoto allora popolo array filtered con posts che contengono il testo digitato nel titolo
      if (text != "") {
        filtered = this.posts.filter((post) =>
          post.title.includes(text.toLowerCase())
        );
      }
      // altrimenti svuoto array vuoto
      else {
        filtered = [];
      }
      return filtered;
    },
    // funzione di filtro tramite input box per body
    filteredByBody() {
      const text = this.searchBody;
      let filtered = [];
      if (text != "") {
        filtered = this.posts.filter((post) =>
          post.body.includes(text.toLowerCase())
        );
      } else {
        filtered = [];
      }
      return filtered;
    },
    // funzione per filtro incrociato
    filteredArray() {
      let filtered = [];

      // se entrambe le input box sono vuote rimando l'array originale
      if (this.searchTitle == "" && this.searchBody == "") {
        filtered = this.posts;
      }
      // se input titolo è popolata e input body vuota faccio andare solo il filtro per titolo
      else if (this.searchTitle != "" && this.searchBody == "") {
        filtered = this.filteredByTitle;
      }
      // se input body è popolata e input titolo vuota faccio andare solo il filtro per body
      else if (this.searchTitle == "" && this.searchBody != "") {
        filtered = this.filteredByBody;
      }
      // altrimenti ciclo sull'array filtrato per titolo e, per ogni post filtrato dal body, controllo se l'id corrisponde. Se id corrisponde pusho nell'array filtered
      else {
        this.filteredByTitle.forEach((titleFiltered) => {
          this.filteredByBody.forEach((bodyFiltered) => {
            if (titleFiltered.id == bodyFiltered.id) {
              filtered.push(bodyFiltered);
            }
          });
        });
      }
      return filtered;
    },
  },
};
</script>

<style></style>
