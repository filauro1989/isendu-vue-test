<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id" class="card">
      <div class="card-body">
        <h3 class="card-title">{{ post.id }}</h3>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Posts",
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  computed: mapState(["posts"]),
};
</script>

<style></style>
