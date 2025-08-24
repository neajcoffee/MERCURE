import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Import des vues
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import SignupView from '../views/SignupView.vue'
import LandingPage from '../views/LandingPage.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentCancel from '../views/PaymentCancel.vue'
import OnboardingView from '../views/OnboardingView.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    // meta: { requiresGuest: true }
  },
  {
    path: '/signup-old',
    name: 'SignupOld',
    component: Signup,
    // meta: { requiresGuest: true }
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: PaymentSuccess
  },
  {
    path: '/payment/cancel',
    name: 'PaymentCancel',
    component: PaymentCancel
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: OnboardingView
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: LandingPage,
    props: { scrollTo: 'pricing' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  
  // Pages qui nécessitent une authentification
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // Pages pour les utilisateurs non connectés seulement
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router
