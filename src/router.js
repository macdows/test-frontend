import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/views/products.vue'
import Cart from '@/views/cart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'products',
      component: Products,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
  ],
})
