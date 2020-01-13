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
      path: '/login',
      component: () => import('@components/home/Login.vue'),
      name: '登录'
    },
    {
      path: '/home',
      component: () => import('@components/home/Home.vue'),
      name: '主页'
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
