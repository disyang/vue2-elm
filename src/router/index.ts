import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@components/Login.vue'),
      name: '登录'
    },
    {
      path: '/home',
      component: () => import('@components/HelloDecorator.vue'),
      name: '主页'
    },
  ]
});

router.beforeEach((to, from, next) => {
  next();
});
