import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import OptionsOverview from "./pages/options-overview.vue";
import Circle from "./pages/circle.vue";
import Rectangle from "./pages/rectangle.vue";
import Triangle from "./pages/triangle.vue";
import Ellipse from "./pages/ellipse.vue";
import Plus from "./pages/plus.vue";
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
import Polygon from "./pages/polygon.vue";
import Layers from "./pages/layers.vue";
import LayersWithColor from "./pages/layers-with-color.vue";
import LayersWithMultipleProperties from "./pages/layers-with-multiple-properties.vue";
import LayersViaArray from "./pages/layers-via-array.vue";
import LayersViaArraWithSorting from "./pages/layers-via-array-w-sorting.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    // {
    //     path: "/options-overview",
    //     name: "Options overview",
    //     component: OptionsOverview,
    // },
    {
        path: "/circle",
        name: "Circle",
        meta: {
            group: "Drawing shapes",
        },
        component: Circle,
    },
    {
        path: "/rectangle",
        name: "Rectangle",
        meta: {
            group: "Drawing shapes",
        },
        component: Rectangle,
    },
    {
        path: "/triangle",
        name: "Triangle",
        meta: {
            group: "Drawing shapes",
        },
        component: Triangle,
    },
    {
        path: "/plus",
        name: "Plus",
        meta: {
            group: "Drawing shapes",
        },
        component: Plus,
    },
    {
        path: "/ellipse",
        name: "Ellipse",
        meta: {
            group: "Drawing shapes",
        },
        component: Ellipse,
    },
    {
        path: "/polygon",
        name: "Polygon",
        component: Polygon,
        meta: {
            group: "Drawing shapes",
        },
    },
    {
        path: "/canvas-image",
        name: "Canvas Image",
        component: CanvasImage,
        meta: {
            group: "Drawing shapes",
        },
    },
    {
        path: "/horizontal-line",
        name: "1. Horizontal line",
        component: HorizontalLine,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/vertical-line",
        name: "2. Vertical line",
        component: VerticalLine,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/vertical-plus-horizontal-line",
        name: "3. Vertical + Horizontal line",
        component: VerticalPlusHorizontalLine,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/teken-functie",
        name: "4. Teken functie",
        component: TekenFunctie,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/x-offset",
        name: "5. X Offset",
        component: xOffset,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/double-offset",
        name: "6. Double Offset",
        component: DoubleOffset,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/cell-size",
        name: "7. Cell size",
        component: CellSize,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/cell-size-plus-shape-size",
        name: "8. Cell size + Shape size",
        component: CellSizePlusShapeSize,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/cell-image",
        name: "9. Cell Image",
        component: CellImage,
        meta: {
            group: "How to draw a grid",
        },
    },
    {
        path: "/layers",
        name: "Layers",
        component: Layers,
        meta: {
            group: "Using layers",
        },
    },
    {
        path: "/layers-with-color",
        name: "Layers with color property",
        component: LayersWithColor,
        meta: {
            group: "Using layers",
        },
    },
    {
        path: "/layers-with-multiple-properties",
        name: "Layers with multiple properties",
        component: LayersWithMultipleProperties,
        meta: {
            group: "Using layers",
        },
    },
    {
        path: "/layers-via-array",
        name: "Layers via array",
        component: LayersViaArray,
        meta: {
            group: "Using layers",
        },
    },
    {
        path: "/layers-via-array-with-sorting",
        name: "Layers via array with sorting",
        component: LayersViaArraWithSorting,
        meta: {
            group: "Using layers",
        },
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
