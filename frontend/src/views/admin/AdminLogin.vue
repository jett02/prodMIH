<template>
  <div class="admin-login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="text-center mb-4">
          <div class="admin-logo">
            <span class="logo-text">MH</span>
          </div>
          <h2 class="login-title">Admin Portal</h2>
          <p class="login-subtitle">Make It Home Administration</p>
        </div>
        
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label class="form-label">Username</label>
            <input v-model="credentials.username" type="text" required 
                   class="form-control" placeholder="Enter username">
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input v-model="credentials.password" type="password" required 
                   class="form-control" placeholder="Enter password">
          </div>
          
          <button type="submit" :disabled="loading" class="btn btn-primary btn-login">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminLogin',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  async mounted() {
    // Check if user is already logged in
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        await axios.get('/api/admin/verify-token')
        this.$router.push('/admin/dashboard')
      } catch (error) {
        // Token is invalid, clear it
        sessionStorage.removeItem('adminToken')
        sessionStorage.removeItem('adminUser')
        delete axios.defaults.headers.common['Authorization']
      }
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.error = ''
      
      try {
        const response = await axios.post('/api/auth/login', this.credentials)
        
        // Store token and user info in sessionStorage instead of localStorage
        sessionStorage.setItem('adminToken', response.data.token)
        sessionStorage.setItem('adminUser', JSON.stringify(response.data.user))
        
        // Set default authorization header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        
        this.$router.push('/admin/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        this.error = error.response?.data?.message || 'Login failed'
      }
      
      this.loading = false
    }
  }
}
</script>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.admin-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.logo-text {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.login-title {
  color: white;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #f97316, #ea580c);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.btn-login:hover:not(:disabled) {
  background: linear-gradient(135deg, #ea580c, #dc2626);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  text-align: center;
  font-size: 0.875rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.5rem;
}
</style>




