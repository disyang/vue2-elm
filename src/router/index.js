import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@components/Test.vue'),
      name: '雅虎'
    },
    {
      path: '/data/:id',
      component: () => import('@components/HelloWorld.vue'),
      name: 'google'
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});
