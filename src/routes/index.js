import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import OptionsOverview from "./pages/options-overview.vue";
import HorizontalLine from "./pages/horizontal-line.vue";
import VerticalLine from "./pages/vertical-line.vue";
import VerticalPlusHorizontalLine from "./pages/vertical-plus-horizontal-lines.vue"

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
  },
  {
    path: "/horizontal-line",
    name: "Horizontal line",
    component: HorizontalLine,
  },
  {
    path: "/vertical-line",
    name: "Vertical line",
    component: VerticalLine,
  },
  {
    path: "/vertical-plus-horizontal-line",
    name: "Vertical + Horizontal line",
    component: VerticalPlusHorizontalLine,
  },
  
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

