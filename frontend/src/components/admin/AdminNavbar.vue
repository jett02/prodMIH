<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top admin-navbar">
    <div class="container-fluid">
      <!-- Admin Brand -->
      <router-link to="/admin/dashboard" class="navbar-brand d-flex align-items-center">
        <div class="admin-logo-small me-2">
          <span class="logo-text">MH</span>
        </div>
        <div class="d-flex flex-column">
          <span class="fw-bold">Make It Home</span>
          <small class="text-warning opacity-75">Admin Portal</small>
        </div>
      </router-link>

      <!-- Mobile toggle -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Admin Navigation -->
      <div class="collapse navbar-collapse" id="adminNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link" :class="{ active: $route.path === '/admin/dashboard' }">
              <i class="fas fa-tachometer-alt me-1"></i>Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/properties" class="nav-link" :class="{ active: $route.path === '/admin/properties' }">
              <i class="fas fa-home me-1"></i>Properties
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/content" class="nav-link" :class="{ active: $route.path === '/admin/content' }">
              <i class="fas fa-edit me-1"></i>Content
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/contacts" class="nav-link" :class="{ active: $route.path === '/admin/contacts' }">
              <i class="fas fa-envelope me-1"></i>Contacts
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/agents" class="nav-link" :class="{ active: $route.path === '/admin/agents' }">
              <i class="fas fa-users me-1"></i>Agents
            </router-link>
          </li>
        </ul>
        
        <!-- User info and logout -->
        <div class="d-flex align-items-center">
          <span class="text-light me-3">
            <i class="fas fa-user-circle me-1"></i>
            Welcome, {{ user?.username || 'Admin' }}
          </span>
          <button @click="logout" class="btn btn-outline-warning btn-sm">
            <i class="fas fa-sign-out-alt me-1"></i>Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminNavbar',
  computed: {
    user() {
      const userStr = sessionStorage.getItem('adminUser')
      return userStr ? JSON.parse(userStr) : null
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('adminToken')
      sessionStorage.removeItem('adminUser')
      delete axios.defaults.headers.common['Authorization']
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style scoped>
.admin-navbar {
  background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%) !important;
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #f97316;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.admin-logo-small {
  width: 35px;
  height: 35px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.logo-text {
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 0.375rem;
  margin: 0 0.25rem;
}

.nav-link:hover {
  color: #f97316 !important;
  background: rgba(249, 115, 22, 0.1);
}

.nav-link.active {
  color: #f97316 !important;
  background: rgba(249, 115, 22, 0.2);
  font-weight: 600;
}

.btn-outline-warning {
  border-color: #f97316;
  color: #f97316;
}

.btn-outline-warning:hover {
  background-color: #f97316;
  border-color: #f97316;
  color: white;
}

.navbar-brand:hover {
  opacity: 0.9;
}
</style>



