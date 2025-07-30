import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/activity-manage',
      name: 'activity-manage',
      component: () => import('../views/activity-manage.vue'),
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/member.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/report.vue'),
    },
    {
      path: '/contact-form',
      name: 'contact-form',
      component: () => import('../views/contact-form.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
