<template>
  <div class="upcoming-page">
    <!-- Header Section with Dark Social Media Styling -->
    <section class="upcoming-header-section py-5" style="margin-top: 80px;">
      <div class="container">
        <!-- Header with Stats -->
        <div class="row align-items-end mb-0">
          <div class="col-lg-8">
            <h1 class="fw-bold mb-3 text-white" data-aos="fade-up">
              <span class="fw-light text-white">{{ sortedProperties.length }} upcoming</span>
              <span class="sunset-text">properties available</span>
            </h1>
            <p class="text-white-50 fs-lg" data-aos="fade-up" data-aos-delay="100">
              Get early access to premium properties before they hit the market.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end" data-aos="fade-up" data-aos-delay="200">
            <div class="property-stats">
              <div class="stat-item">
                <h4 class="text-primary mb-0">{{ sortedProperties.length }}</h4>
                <span class="text-muted">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Properties Section -->
    <section class="py-15 py-xl-20">
      <div class="container">

        <!-- Enhanced Filters -->
        <div class="filters-section mb-5" data-aos="fade-up" data-aos-delay="300" style="margin-top: -4rem;">
          <div class="filters-card">
            <div class="card-body p-4">
              <div class="row g-3 align-items-end">
                <!-- Price Range -->
                <div class="col-md-3">
                  <label class="form-label fw-medium">Price Range</label>
                  <div class="row g-2">
                    <div class="col-6">
                      <input type="number" class="form-control" placeholder="Min Price" 
                             v-model="filters.minPrice" @input="applyFilters">
                    </div>
                    <div class="col-6">
                      <input type="number" class="form-control" placeholder="Max Price" 
                             v-model="filters.maxPrice" @input="applyFilters">
                    </div>
                  </div>
                  <select v-model="filters.priceRange" @change="applyFilters" class="form-select mt-2">
                    <option value="">Quick Price Ranges</option>
                    <option value="0-200000">Under $200k</option>
                    <option value="200000-400000">$200k - $400k</option>
                    <option value="400000-600000">$400k - $600k</option>
                    <option value="600000-999999">$600k+</option>
                  </select>
                </div>
                
                <!-- Bedrooms -->
                <div class="col-md-2">
                  <label class="form-label fw-medium">Bedrooms</label>
                  <select v-model="filters.bedrooms" @change="applyFilters" class="form-select">
                    <option value="">Any</option>
                    <option value="1">1+ Bedrooms</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>
                
                <!-- Sort -->
                <div class="col-md-2">
                  <label class="form-label fw-medium">Sort By</label>
                  <select v-model="sortBy" @change="applySorting" class="form-select">
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="bedrooms">Most Bedrooms</option>
                  </select>
                </div>
                
                <!-- Actions -->
                <div class="col-md-5">
                  <div class="d-flex gap-2">
                    <button @click="clearFilters" class="btn btn-outline-secondary flex-fill">
                      <i class="fas fa-times me-2"></i>Clear Filters
                    </button>
                    <button class="btn btn-sunset flex-fill">
                      <i class="fas fa-bell me-2"></i>Get Notified
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        
        <!-- Properties Grid -->
        <div v-else class="row g-4 g-lg-5" id="properties-grid">
          <div v-for="(property, index) in sortedProperties" :key="property._id" 
               class="col-md-6 col-lg-4" 
               :data-aos="'fade-up'" 
               :data-aos-delay="index * 100">
            <div class="property-card card h-100 border-0 shadow-sm">
              <div class="card-image-wrapper">
                <img :src="getImageUrl(property.thumbnail || property.images?.[0])" 
                     class="card-img-top property-image" 
                     :alt="property.title"
                     @error="handleImageError">
                <div class="property-badges">
                  <span class="badge bg-warning text-dark">Coming Soon</span>
                </div>
                <div class="image-overlay">
                  <div class="overlay-actions">
                    <button class="btn btn-light btn-sm rounded-circle" 
                            title="Share" 
                            @click="shareProperty(property)">
                      <i class="fas fa-share-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <h5 class="card-title fw-bold mb-0">{{ property.title }}</h5>
                  <h5 class="text-primary mb-0 fw-bold">${{ formatPrice(property.price) }}</h5>
                </div>
                
                <p class="text-muted mb-3">
                  <i class="fas fa-map-marker-alt text-primary me-2"></i>
                  {{ getPropertyLocation(property) }}
                </p>
                
                <div class="property-features mb-4">
                  <div class="row g-2">
                    <div class="col-6" v-if="property.bedrooms">
                      <div class="feature-item">
                        <i class="fas fa-bed text-primary"></i>
                        <span>{{ property.bedrooms }} Beds</span>
                      </div>
                    </div>
                    <div class="col-6" v-if="property.bathrooms">
                      <div class="feature-item">
                        <i class="fas fa-bath text-primary"></i>
                        <span>{{ property.bathrooms }} Baths</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4 d-flex flex-column gap-2">
                  <button class="btn btn-sunset btn-sm w-100" @click="viewProperty(property._id)">
                    View Details
                  </button>
                  <button class="btn btn-outline-primary btn-sm w-100" @click="expressInterest(property)">
                    Express Interest
                  </button>
                  <button class="btn btn-outline-secondary btn-sm w-100" @click="shareProperty(property)">
                    <i class="fas fa-share-alt me-1"></i>Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="!loading && sortedProperties.length === 0" class="text-center py-5" data-aos="fade-up">
          <div class="empty-state">
            <i class="fas fa-home text-muted mb-3" style="font-size: 3rem;"></i>
            <h4 class="text-muted mb-3">No Properties Found</h4>
            <p class="text-muted mb-4">No upcoming properties match your current criteria.</p>
            <button @click="clearFilters" class="btn btn-outline-primary">Clear Filters</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'Upcoming',
  data() {
    return {
      upcomingProperties: [],
      filteredProperties: [],
      loading: true,
      selectedProperty: null,
      interestForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      filters: {
        priceRange: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        location: ''
      },
      sortBy: 'newest'
    }
  },
  async mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    })

    // Handle query parameters from home page search
    this.handleSearchParams()

    await this.loadUpcomingProperties()
  },
  computed: {
    sortedProperties() {
      const sorted = [...this.filteredProperties]
      switch (this.sortBy) {
        case 'price-low':
          return sorted.sort((a, b) => (a.estimatedPrice || a.price || 0) - (b.estimatedPrice || b.price || 0))
        case 'price-high':
          return sorted.sort((a, b) => (b.estimatedPrice || b.price || 0) - (a.estimatedPrice || a.price || 0))
        case 'bedrooms':
          return sorted.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0))
        case 'newest':
        default:
          return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      }
    }
  },
  methods: {
    async loadUpcomingProperties() {
      try {
        let response
        try {
          response = await axios.get('/api/properties?status=upcoming')
        } catch (error) {
          response = await axios.get('/api/properties')
          response.data = response.data.filter(p => p.status === 'upcoming')
        }
        
        this.upcomingProperties = response.data || []
        this.filteredProperties = [...this.upcomingProperties]
      } catch (error) {
        console.error('Error loading upcoming properties:', error)
        // Mock data for development
        this.upcomingProperties = [
          {
            _id: '1',
            title: 'Renovated Victorian Home',
            address: '555 Heritage Ave, Omaha, NE',
            location: '555 Heritage Ave, Omaha, NE',
            price: 425000,
            bedrooms: 4,
            bathrooms: 3,
            status: 'upcoming',
            images: ['/placeholder-home.jpg'],
            createdAt: new Date()
          },
          {
            _id: '2',
            title: 'New Construction Townhome',
            address: '777 Modern Way, Omaha, NE',
            location: '777 Modern Way, Omaha, NE',
            price: 315000,
            bedrooms: 3,
            bathrooms: 2.5,
            status: 'upcoming',
            images: ['/placeholder-home.jpg'],
            createdAt: new Date()
          }
        ]
        this.filteredProperties = [...this.upcomingProperties]
      } finally {
        this.loading = false
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `http://localhost:5000${imagePath}`
    },
    handleImageError(event) {
      event.target.src = '/placeholder-home.jpg'
    },
    formatPrice(price) {
      return new Intl.NumberFormat().format(price)
    },
    applyFilters() {
      this.filteredProperties = this.upcomingProperties.filter(property => {
        // Price filter - check both range and min/max inputs
        if (this.filters.priceRange) {
          const [min, max] = this.filters.priceRange.split('-').map(Number)
          const price = property.price || property.estimatedPrice || 0
          if (price < min || price > max) return false
        } else if (this.filters.minPrice || this.filters.maxPrice) {
          const price = property.price || property.estimatedPrice || 0
          const minPrice = this.filters.minPrice ? parseInt(this.filters.minPrice) : 0
          const maxPrice = this.filters.maxPrice ? parseInt(this.filters.maxPrice) : Infinity
          if (price < minPrice || price > maxPrice) return false
        }
        
        // Bedrooms filter
        if (this.filters.bedrooms) {
          const minBeds = parseInt(this.filters.bedrooms)
          if ((property.bedrooms || 0) < minBeds) return false
        }
        
        return true
      })
    },
    applySorting() {
      this.$forceUpdate()
    },
    clearFilters() {
      this.filters = {
        priceRange: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        location: ''
      }
      this.filteredProperties = [...this.upcomingProperties]
    },

    handleSearchParams() {
      const urlParams = new URLSearchParams(window.location.search)

      // Apply filters from URL parameters
      if (urlParams.get('location')) {
        this.filters.location = urlParams.get('location')
      }
      if (urlParams.get('priceRange')) {
        this.filters.priceRange = urlParams.get('priceRange')
      }
      if (urlParams.get('bedrooms')) {
        this.filters.bedrooms = urlParams.get('bedrooms')
      }
      if (urlParams.get('bathrooms')) {
        this.filters.bathrooms = urlParams.get('bathrooms')
      }

      // Apply filters after properties are loaded
      this.$nextTick(() => {
        if (this.upcomingProperties.length > 0) {
          this.applyFilters()
        }
      })
    },

    expressInterest(property) {
      // Simple alert for now, could be enhanced with a modal
      alert(`Thank you for your interest in ${property.title}! We'll contact you when it becomes available.`)
    },
    shareProperty(property) {
      const propertyUrl = `${window.location.origin}/property/${property._id}`
      
      // Create a temporary input element to copy the URL
      const tempInput = document.createElement('input')
      tempInput.value = propertyUrl
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      
      // Show success message
      alert('Property link copied to clipboard!')
      
      // Alternative: Use modern clipboard API if available
      if (navigator.clipboard) {
        navigator.clipboard.writeText(propertyUrl).then(() => {
          console.log('Link copied to clipboard')
        }).catch(err => {
          console.error('Failed to copy link: ', err)
        })
      }
    },
    viewProperty(propertyId) {
      const id = typeof propertyId === 'object' ? propertyId._id : propertyId
      this.$router.push(`/property/${id}`)
    },
    getPropertyLocation(property) {
      // Prioritize the address field first
      if (property.address) {
        return property.address
      }

      // If no address, try to construct from location object
      if (property.location && typeof property.location === 'object') {
        const locationParts = []
        if (property.location.neighborhood) locationParts.push(property.location.neighborhood)
        if (property.location.county) locationParts.push(property.location.county)

        if (locationParts.length > 0) {
          return locationParts.join(', ')
        }
      }

      // Fallback to a generic message
      return 'Location details coming soon'
    }
  }
}
</script>

<style scoped>
.upcoming-page {
  padding-top: 0;
  min-height: 100vh;
}

/* Header Section - Dark Social Media Style */
.upcoming-header-section {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border-top: 3px solid #EBA472;
  position: relative;
}

.sunset-text {
  color: #EBA472;
}

/* Main Content Section - Normal Light Background */
.py-15 {
  padding-top: 3rem;
  padding-bottom: 6rem;
  background-color: #f8f9fa;
  position: relative;
}

.py-xl-20 {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

/* Property stats - Dark Header Theme */
.property-stats {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(235, 164, 114, 0.3);
  position: relative;
}

.property-stats::before {
  content: '🚧';
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 1.5rem;
  background: #EBA472;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1a1a1a;
}

.stat-item h4 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #EBA472;
}

.stat-item span {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
}

/* Filters Section - Enhanced Visibility */
.filters-section {
  position: relative;
}

.filters-card {
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
}

.filters-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #EBA472 0%, #A15E3B 100%);
  border-radius: 1rem 1rem 0 0;
}

.filters-card:hover {
  box-shadow: 0 8px 30px rgba(235, 164, 114, 0.15);
  transform: translateY(-2px);
}

.filters-card .form-control,
.filters-card .form-select {
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.filters-card .form-control:focus,
.filters-card .form-select:focus {
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

.filters-card .form-label {
  color: #495057;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Property Card Styles - Clean Light Theme */
.property-card {
  background: #ffffff;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: #EBA472;
}

.property-card .card-body {
  background: #ffffff;
  color: #2c2c2c;
  position: relative;
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

.property-image {
  height: 250px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
}

.property-badges .badge {
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  background-color: #EBA472 !important;
  color: white !important;
  font-weight: 600;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.property-card:hover .image-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.property-card:hover .overlay-actions {
  transform: translateY(0);
}

.overlay-actions .btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: none;
  background: rgba(235, 164, 114, 0.9);
  color: white;
}

.overlay-actions .btn:hover {
  background: #A15E3B !important;
  color: white !important;
  transform: scale(1.1);
}

/* Property Features - Match site styling */
.property-features {
  border-top: 1px solid rgba(235, 164, 114, 0.3);
  padding-top: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #2c2c2c;
  font-weight: 500;
}

.feature-item i {
  width: 16px;
  text-align: center;
  color: #EBA472;
}

/* Card title and content styling */
.property-card .card-title {
  color: #A15E3B !important;
  font-weight: 600;
}

.property-card .text-muted {
  color: #313131 !important;
}

.property-card .text-primary {
  color: #EBA472 !important;
}

/* Button Styles - Match site branding */
.btn-sunset {
  background-color: #EBA472 !important;
  border-color: #EBA472 !important;
  color: white !important;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.btn-sunset:hover {
  background-color: #A15E3B !important;
  border-color: #A15E3B !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(235, 164, 114, 0.3);
}

.btn-outline-primary {
  border-color: #EBA472 !important;
  color: #EBA472 !important;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #EBA472 !important;
  border-color: #EBA472 !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(235, 164, 114, 0.3);
}

.btn-outline-secondary {
  border-color: #A15E3B !important;
  color: #A15E3B !important;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background-color: transparent;
}

.btn-outline-secondary:hover {
  background-color: #A15E3B !important;
  border-color: #A15E3B !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(161, 95, 59, 0.3);
}

.text-primary {
  color: #EBA472 !important;
}

/* Empty State - Clean Light Theme */
.empty-state {
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #dee2e6;
}

.empty-state i {
  color: #EBA472 !important;
}

.empty-state h4 {
  color: #2c2c2c !important;
}

.empty-state p {
  color: #6c757d !important;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .py-15 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .property-image {
    height: 200px;
  }
  
  .filters-section .row {
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>



























