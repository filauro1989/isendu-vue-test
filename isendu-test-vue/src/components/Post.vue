<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Post id n°{{ post.id }}</h3>
        <h3 class="card-title">User id n°{{ post.userId }}</h3>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  name: "Post",
  props: {
    id: {
      String,
      required: true,
    },
  },
  computed: {
    // Richiamo tutti i Posts dallo state nello store
    posts() {
      return this.$store.state.posts;
    },
    // cerco nell'array di posts il post singolo con lo stesso id passato dalle props
    post() {
      return this.posts.find((post) => post.id === this.id);
    },
    // ...mapState({
    //   title: (state) => state.posts.title,
    // }),
  },
  methods: {
    // updateTitle(e) {
    //   this.$store.commit("UPDATE_Title", e.target.value);
    // },
  },
};
</script>

<style></style>
