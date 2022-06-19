<template>
  <div class="container">
    <!-- ciclo sull'oggetto posts richiamato dalla computed -->
    <div v-for="post in posts" :key="post.id" class="card">
      <div class="card-body">
        <h3 class="card-title">Post id n°{{ post.id }}</h3>
        <h3 class="card-title">User id n°{{ post.userId }}</h3>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.body }}</p>
        <!-- link al post singolo passando come props l'id del post -->
        <router-link
          class="btn btn-primary mx-2"
          :to="{
            name: 'post',
            params: {
              id: post.id,
            },
          }"
          >View Post</router-link
        >
        <!-- button per aprire il modale di modifica del post -->
        <button class="btn btn-primary mx-2" v-b-modal="'modal' + post.id">
          Edit Post
        </button>
        <b-modal
          :id="'modal' + post.id"
          centered
          title="Vue Bootstrap Centered Modal Example"
        >
          <div class="text-wrapper d-flex flex-column">
            <label for="title">Modifica il titolo del post</label>
            <input
              class="my-2"
              type="title"
              name="title"
              :id="'title' + post.id"
              v-model="titleToUpdate"
            />
            <label for="body">Modifica messaggio del post</label>
            <input
              class="my-2"
              type="text"
              name="body"
              :id="'body' + post.id"
              v-model="bodyToUpdate"
            />

            <button @click="updatePost(post.id)" class="btn">salva</button>
          </div>
        </b-modal>
        <!-- al click avvio la funzione di cancellazione -->
        <div @click="deletePost(post)" class="btn btn-danger mx-2">
          Delete Post
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
    };
  },
  methods: {
    // passo alla funzione il post e avvio la funzione nella mutation
    deletePost(post) {
      this.$store.commit("DELETE_Post", post);
    },
    // passo alla funzione l'id del post avvio mutations inviando dati da modificare + id
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
    },
  },
  //   avvio la funzione loadPosts per caricare tutti i dati dallo store
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  //   richiamo l'array dallo store
  computed: {
    ...mapState(["posts"]),
    // title: {
    //   get() {
    //     return this.$store.state.posts.title;
    //   },
    //   set(value) {
    //     this.$store.commit("updateTitle", value);
    //   },
    // },
  },
};
</script>

<style></style>
