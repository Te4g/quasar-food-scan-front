
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Home.vue') },
      { path: 'scan', name: 'scan', component: () => import('pages/Scan.vue') },
      { path: 'pantry', name: 'pantry', component: () => import('pages/Pantry.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/Profile.vue') }
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
