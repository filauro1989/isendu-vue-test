import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  // nuova rotta per visual singola di ogni post con id dinamico
  {
    path: "/posts/:id",
    name: "post",
    props: true,
    component: () => import("../components/Post.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
