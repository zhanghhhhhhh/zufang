import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('@/views/Layout'),
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/Home')
    }, {
      path: 'search',
      name: 'search',
      component: () => import('@/views/Search')
    }, {
      path: 'news',
      name: 'news',
      component: () => import('@/views/News')
    }, {
      path: 'my',
      name: 'my',
      component: () => import('@/views/My')
    }

    ]
  },
  {
    path: '/favorate',
    name: 'favorate',
    component: () => import('@/views/Favorate')
  },
  {
    path: '/rent',
    name: 'rent',
    component: () => import('@/views/Rent/index.vue')

  },
  {
    path: '/add',
    name: 'houseAdd',
    component: () => import('@/views/Rent/houseAdd.vue')
  },
  {
    path: '/rentsearch',
    name: 'houseAdd',
    component: () => import('@/views/Rent/houseSearch.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/Home/components/map.vue')
  }, {
    path: '/city',
    name: 'city',
    component: () => import('@/views/Home/components/city.vue')
  }, {
    path: '/article/:article_id',
    component: () => import('@/components/articleInfo.vue'),
    name: 'articleInfo'
  }
]

const router = new VueRouter({
  routes
})

export default router
