export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/draggable-table",
    name: "draggableTable",
    component: () => import("../views/draggableTable/test.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test/index.vue"),
  },
];
