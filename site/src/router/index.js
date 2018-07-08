import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import dashboard from '@/components/dashboard';
import login from '@/components/login';
import register from '@/components/register';

Vue.use(Router);
let homePath;  

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    }
  ],
});
