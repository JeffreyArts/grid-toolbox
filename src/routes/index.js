import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import OptionsOverview from "./pages/options-overview.vue";
import Circle from "./pages/circle.vue";
import Rectangle from "./pages/rectangle.vue";
import Triangle from "./pages/triangle.vue";
import HorizontalLine from "./pages/horizontal-line.vue";
import VerticalLine from "./pages/vertical-line.vue";
import VerticalPlusHorizontalLine from "./pages/vertical-plus-horizontal-lines.vue"
import TekenFunctie from "./pages/teken-functie.vue"
import xOffset from "./pages/x-offset.vue"
import DoubleOffset from "./pages/double-offset.vue"
import CellSize from "./pages/cell-size.vue"
import CellSizePlusShapeSize from "./pages/cell-size-plus-shape-size.vue"
import CellImage from "./pages/cell-image.vue"
import CanvasImage from "./pages/canvas-image.vue"

const routes = [{
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
        path: "/circle",
        name: "1. Circle",
        meta: {
            group: "Shapes",
        },
        component: Circle,
    },
    {
        path: "/rectangle",
        name: "2. Rectangle",
        meta: {
            group: "Shapes",
        },
        component: Rectangle,
    },
    {
        path: "/triangle",
        name: "3. Triangle",
        meta: {
            group: "Shapes",
        },
        component: Triangle,
    },
    {
        path: "/horizontal-line",
        name: "1. Horizontal line",
        component: HorizontalLine,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/vertical-line",
        name: "2. Vertical line",
        component: VerticalLine,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/vertical-plus-horizontal-line",
        name: "3. Vertical + Horizontal line",
        component: VerticalPlusHorizontalLine,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/teken-functie",
        name: "4. Teken functie",
        component: TekenFunctie,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/x-offset",
        name: "5. X Offset",
        component: xOffset,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/double-offset",
        name: "6. Double Offset",
        component: DoubleOffset,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/cell-size",
        name: "7. Cell size",
        component: CellSize,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/cell-size-plus-shape-size",
        name: "8. Cell size + Shape size",
        component: CellSizePlusShapeSize,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/cell-image",
        name: "9. Cell Image",
        component: CellImage,
        meta: {
            group: "How to draw grid",
        },
    },
    {
        path: "/canvas-image",
        name: "4. Canvas Image",
        component: CanvasImage,
        meta: {
            group: "Shapes",
        },
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
