import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import main from '@/components/main'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    }
  ]
})
