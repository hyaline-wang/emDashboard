import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { useStore } from 'vuex';

const EmptyComponent = { template: '<div></div>' }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        const store = useStore()
        console.log('Before entering DashboardView')
        console.log('store.state.isLoggedIn', store.state.isLoggedIn)
        if (!store.state.isLoggedIn) {
          next('/login')
        }
        else {
          next('/shell')
        }
      }
    },
    {
      path: '/setting',
      name: 'setting',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SettingView.vue'),
    },
    {
      path: '/shell',
      name: 'shell',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/ShellView.vue')
      component: EmptyComponent
    },
    {
      path: '/navview',
      name: 'navview',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NavView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    }, 
    {
      path: '/document',
      name: 'document',
      component: EmptyComponent,
      beforeEnter(to, from, next) {
        window.open('https://emnavi.tech', '_blank'); // 在新窗口打开
        next(false); // 阻止原本的导航
      }
    }  
  ]
})

export default router
