import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from '@/views/About.vue';
import LoginView from '@/views/LoginView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'index',
      redirect: '/Login',
    },
    {
      path: '/Home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'), can like this
      component: Home,
    },
  ],
});
