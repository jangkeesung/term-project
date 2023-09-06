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
  },
  {
    path: '/edit-recipe',
    name: 'edit',
    component: () => import('../views/RecipeEdit.vue'),
    props: route => ({ query: route.query.seq })
  },
  {
    path: '/my-recipe',
    name: 'my',
    component: () => import('../views/MyRecipe.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchList.vue'),
    props: route => ({ s_category: route.query.category})
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MyPage.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
