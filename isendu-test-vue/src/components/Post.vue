<template>
  <div class="container h-100 post-view d-flex justify-content-center">
    <div class="card w-50 h-75">
      <div class="card-body p-3">
        <div class="text-container h-100 p-4">
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
      </div>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style></style>
