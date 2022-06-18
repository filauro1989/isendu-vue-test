<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id" class="card">
      <div class="card-body">
        <h3 class="card-title">Post id n°{{ post.id }}</h3>
        <h3 class="card-title">User id n°{{ post.userId }}</h3>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.body }}</p>
        <!-- link al post singolo passando come props l'id del post -->
        <router-link
          class="btn btn-primary"
          :to="{
            name: 'post',
            params: {
              id: post.id,
            },
          }"
          >View Post</router-link
        >
        <!-- al click avvio la funzione di cancellazione -->
        <div @click="deletePost(post)" class="btn btn-danger">Delete Post</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Posts",
  methods: {
    // passo alla funzione il post e avvio la funzione nella mutation
    deletePost(post) {
      this.$store.commit("DELETE_Post", post);
    },
  },
  //   avvio la funzione loadPosts per caricare tutti i dati dallo store
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  //   richiamo l'oggetto dallo store
  computed: mapState(["posts"]),
};
</script>

<style></style>
