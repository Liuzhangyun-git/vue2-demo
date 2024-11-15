export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/vue-draggable-table",
    name: "vue-draggable-table",
    component: () => import("../views/vue/draggable-table/test.vue"),
  },
  {
    path: "/css-erase",
    name: "css-erase",
    component: () => import("../views/css/erase/test.vue"),
  },
  {
    path: "/as-calendar-v2",
    name: "as-calendar-v2",
    component: () => import("../views/vue/as-calendar/test.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test/index.vue"),
  },
];
