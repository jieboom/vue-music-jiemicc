import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    component: () => import(/* webpackChunkName:"app-recommend" */ '../views/recommend.vue')
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName:"app-singer" */ '../views/singer.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName:"singer-detail" */'@/views/singerDetail.vue')
      }
    ]
  },
  {
    path: '/rankList',
    component: () => import(/* webpackChunkName:"app-rankList" */ '../views/rankList.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"app-search" */ '../views/search.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
