import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Properties from '@/views/Properties.vue'
import Rentals from '@/views/Rentals.vue'
import Upcoming from '@/views/Upcoming.vue'
import Contact from '@/views/Contact.vue'
import PropertyDetail from '@/views/PropertyDetail.vue'
import Agents from '@/views/Agents.vue'
import OurLeadership from '@/views/About.vue'
import MortgageCalculator from '@/views/MortgageCalculator.vue'
import PreferredBidders from '@/views/PreferredBidders.vue'
import Sitemap from '@/views/Sitemap.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminContent from '@/views/admin/AdminContent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/properties',
    name: 'Properties',
    component: Properties
  },
  {
    path: '/property/:id',
    name: 'PropertyDetail',
    component: PropertyDetail
  },
  {
    path: '/rentals',
    name: 'Rentals',
    component: Rentals
  },
  {
    path: '/upcoming',
    name: 'Upcoming',
    component: Upcoming
  },
  {
    path: '/agents',
    name: 'Agents',
    component: Agents
  },
  {
    path: '/about',
    name: 'OurLeadership',
    component: OurLeadership
  },
  {
    path: '/mortgage-calculator',
    name: 'MortgageCalculator',
    component: MortgageCalculator
  },
  {
    path: '/preferred-bidders',
    name: 'PreferredBidders',
    component: PreferredBidders
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/sitemap',
    name: 'Sitemap',
    component: Sitemap
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/content',
    name: 'AdminContent',
    component: AdminContent,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/properties',
    name: 'AdminProperties',
    component: () => import('@/views/admin/AdminProperties.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/contacts',
    name: 'AdminContacts',
    component: () => import('@/views/admin/AdminContacts.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/agents',
    name: 'AdminAgents',
    component: () => import('@/views/admin/AdminAgents.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = sessionStorage.getItem('adminToken')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

// Add afterEach guard to scroll to top after navigation
router.afterEach((to, from) => {
  // Scroll to top after route change
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

export default router



