import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import OptionsOverview from "./pages/options-overview.vue";
import Dot from "./pages/dot.vue";
import HorizontalLine from "./pages/horizontal-line.vue";
import VerticalLine from "./pages/vertical-line.vue";
import VerticalPlusHorizontalLine from "./pages/vertical-plus-horizontal-lines.vue"
import TekenFunctie from "./pages/teken-functie.vue"
import xOffset from "./pages/x-offset.vue"
import DoubleOffset from "./pages/double-offset.vue"
import CellSize from "./pages/cell-size.vue"
import CellSizePlusShapeSize from "./pages/cell-size-plus-shape-size.vue"

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
    path: "/dot",
    name: "1. Dot",
    component: Dot,
  },
  {
    path: "/horizontal-line",
    name: "2. Horizontal line",
    component: HorizontalLine,
  },
  {
    path: "/vertical-line",
    name: "3. Vertical line",
    component: VerticalLine,
  },
  {
    path: "/vertical-plus-horizontal-line",
    name: "4. Vertical + Horizontal line",
    component: VerticalPlusHorizontalLine,
  },
  {
    path: "/teken-functie",
    name: "5. Teken functie",
    component: TekenFunctie,
  },
  {
    path: "/x-offset",
    name: "6. X Offset",
    component: xOffset,
  },
  {
    path: "/double-offset",
    name: "7. Double Offset",
    component: DoubleOffset,
  },
  {
    path: "/cell-size",
    name: "8. Cell size",
    component: CellSize,
  },
  {
    path: "/cell-size-plus-shape-size",
    name: "9. Cell size + Shape size",
    component: CellSizePlusShapeSize,
  },
  
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

