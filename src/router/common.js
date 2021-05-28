import LostConnection from '@/components/status/502.vue'
import NoPrivileges from '@/components/status/403.vue'
/**
 * " / "开头的路由视为根路径
 */
export default [
  {
    path: '/502',
    name: '502',
    component: LostConnection
  },
  {
    path: '/403',
    name: '403',
    component: NoPrivileges
  }
]
