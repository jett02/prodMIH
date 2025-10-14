import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Set base URL for axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Set up axios interceptor to include auth token
const token = sessionStorage.getItem('adminToken')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Add response interceptor to handle token expiration
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('adminToken')
      sessionStorage.removeItem('adminUser')
      delete axios.defaults.headers.common['Authorization']
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// Initialize AOS globally
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
})

const app = createApp(App)
app.use(router)

// Refresh AOS on route changes
router.afterEach(() => {
  AOS.refresh()
})

app.mount('#app')




