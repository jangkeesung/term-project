import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/view-recipe',
    name: 'recipe',
    component: () => import('../views/RecipeView.vue'),
    props: route => ({ query: route.query.seq })
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/add-recipe',
    name: 'add',
    component: () => import('../views/RecipeAdd.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
