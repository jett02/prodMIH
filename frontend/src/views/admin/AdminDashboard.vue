<template>
  <div class="admin-page">
    <AdminNavbar />
    
    <div class="container-fluid px-4 py-5 mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <div class="mb-5">
            <h1 class="display-4 fw-bold text-primary mb-3">Dashboard</h1>
            <p class="lead text-muted">Manage your Make It Home website</p>
          </div>

          <!-- Stats Cards -->
          <div class="row g-4 mb-5">
            <div class="col-lg-3 col-md-6">
              <div class="card bg-primary text-white h-100">
                <div class="card-body text-center">
                  <i class="fas fa-home fa-2x mb-3"></i>
                  <h6 class="card-title">Total Properties</h6>
                  <p class="card-text display-6 fw-bold">{{ stats.totalProperties }}</p>
                </div>
              </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
              <div class="card bg-success text-white h-100">
                <div class="card-body text-center">
                  <i class="fas fa-check-circle fa-2x mb-3"></i>
                  <h6 class="card-title">Available</h6>
                  <p class="card-text display-6 fw-bold">{{ stats.availableProperties }}</p>
                </div>
              </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
              <div class="card bg-danger text-white h-100">
                <div class="card-body text-center">
                  <i class="fas fa-sold-out fa-2x mb-3"></i>
                  <h6 class="card-title">Sold</h6>
                  <p class="card-text display-6 fw-bold">{{ stats.soldProperties }}</p>
                </div>
              </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
              <div class="card bg-info text-white h-100">
                <div class="card-body text-center">
                  <i class="fas fa-key fa-2x mb-3"></i>
                  <h6 class="card-title">Rentals</h6>
                  <p class="card-text display-6 fw-bold">{{ stats.rentalProperties }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="row g-4">
            <div class="col-md-4">
              <router-link to="/admin/properties" class="card text-decoration-none h-100 admin-card">
                <div class="card-body text-center p-4">
                  <i class="fas fa-home fa-3x text-primary mb-3"></i>
                  <h4 class="card-title text-primary mb-3">Manage Properties</h4>
                  <p class="card-text text-muted">Add, edit, or remove property listings</p>
                </div>
              </router-link>
            </div>
            
            <div class="col-md-4">
              <router-link to="/admin/content" class="card text-decoration-none h-100 admin-card">
                <div class="card-body text-center p-4">
                  <i class="fas fa-edit fa-3x text-primary mb-3"></i>
                  <h4 class="card-title text-primary mb-3">Website Content</h4>
                  <p class="card-text text-muted">Update site content, images, and team info</p>
                </div>
              </router-link>
            </div>
            
            <div class="col-md-4">
              <router-link to="/admin/contacts" class="card text-decoration-none h-100 admin-card">
                <div class="card-body text-center p-4">
                  <i class="fas fa-envelope fa-3x text-primary mb-3"></i>
                  <h4 class="card-title text-primary mb-3">Contact Inquiries</h4>
                  <p class="card-text text-muted">View and manage customer inquiries</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue'
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  components: {
    AdminNavbar
  },
  data() {
    return {
      stats: {
        totalProperties: 0,
        availableProperties: 0,
        soldProperties: 0,
        rentalProperties: 0
      }
    }
  },
  async mounted() {
    await this.loadStats()
  },
  methods: {
    async loadStats() {
      try {
        console.log('=== DASHBOARD STATS DEBUG ===')
        console.log('Auth token:', sessionStorage.getItem('adminToken'))
        
        const response = await axios.get('/api/admin/properties')
        console.log('Dashboard properties response:', response.data)
        
        const properties = response.data
        
        this.stats.totalProperties = properties.length
        this.stats.availableProperties = properties.filter(p => p.status === 'available').length
        this.stats.soldProperties = properties.filter(p => p.status === 'sold').length
        this.stats.rentalProperties = properties.filter(p => p.type === 'rental').length
        
        console.log('Final stats:', this.stats)
      } catch (error) {
        console.error('Error loading stats:', error)
        console.error('Error response:', error.response)
      }
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.admin-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #dee2e6;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  text-decoration: none;
}

.card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>




