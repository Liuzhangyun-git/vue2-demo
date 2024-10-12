export default [
  {
    path: '/',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/draggable-table',
    component: () => import('../views/draggableTable/index.vue'),
  },
]