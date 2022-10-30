const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/personal-auth',
        name: 'PersonalAuth',
        component: () => import('src/pages/auth/register/personal/IndexPage.vue')
      },
      {
        path: '/company-auth',
        name: 'companyAuth',
        meta: {
          requiresAuth: true,
        },
        component: () => import('src/pages/auth/register/company/IndexPage.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('src/pages/auth/login/IndexPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
