import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/binPic',
    name: 'binPic',
    component: function () {return import( '../views/Article.vue')}
  },
  {
    path: '/login',
    name: 'login',
    component: function () {return import( '../views/LoginPage.vue')}
  },
  {
    path: '/login2',
    name: 'login2',
    component: function () {return import( '../views/LoginPage.vue')}
  },
  {
    path: '/writeBlog',
    name: 'writeBlog',
    component: function () {return import( '../views/WriteBlog.vue')}
  },
  {
    path: '/articledetail',
    name: 'articledetail',
    component: function () {return import( '../views/ArticleDetail.vue')}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
