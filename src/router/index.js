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
    path: '/view-admin',
    name: 'recipe',
    component: () => import('../views/AdminView.vue'),
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
    props: route => ({ s_category: route.query.category })
    // props: route => ({ s_category: route.query.category, s_col: route.query.col, s_word: route.query.word})
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MyPage.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 페이지 전환 시 스크롤 위치를 최상단으로 이동
    return { top: 0 };
  },
  routes
})

export default router
