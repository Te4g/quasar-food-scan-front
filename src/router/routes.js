
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: 'scan', name: 'scan', component: () => import('pages/Scan.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'pantry', name: 'pantry', component: () => import('pages/Pantry.vue') }
  ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
