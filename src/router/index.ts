import Money from '../views/Money.vue'
import Labels from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/Labels.vue'
import Statistics from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/Statistics.vue'
import NotFound from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/NotFound.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EditLabel from '/Users/cz/Desktop/ZLC-方应杭学习项目/morney-2/src/views/EditLabel.vue'

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
    path: '/labels/edit/:id', //:id表示我edit后面会有一个字符串，但是我先不知道是多少，所以用：id表示我这里会有一个，只是占位
    component: EditLabel,
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
