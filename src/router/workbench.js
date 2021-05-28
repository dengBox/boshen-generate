
export default [
  {
    path: '/workbench',
    name: 'workbench',
    component: () => import('@/views/workbench/Index.vue')
  },
  {
    path: '/workbench/preview',
    name: 'preview',
    component: () => import('@/views/workbench/Preview.vue')
  }
]
