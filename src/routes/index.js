import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import OptionsOverview from "./pages/options-overview.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/options-overview",
    name: "Options overview",
    component: OptionsOverview,
  }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

