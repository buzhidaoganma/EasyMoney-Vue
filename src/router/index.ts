import Money from '../views/Money.vue'
import Labels from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/Labels.vue'
import Statistics from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/Statistics.vue'
import NotFound from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/NotFound.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/money',
  },
  {
    path: '/money',
    component: Money,
  },
  {
    path: '/labels',
    component: Labels,
  },
  {
    path: '/statistics',
    component: Statistics,
  },
  {
    path: '*',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

export default router
