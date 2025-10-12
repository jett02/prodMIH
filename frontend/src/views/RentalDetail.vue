<template>
  <div class="rental-detail-page" v-if="rental">
    <!-- Similar structure to PropertyDetail but for rentals -->
    <div class="container-fluid p-0 mb-5">
      <!-- Image carousel section -->
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="rental-info-section p-4 mb-4">
            <h1 class="display-5 fw-bold mb-3 rental-title">
              {{ rental.address }}
            </h1>
            <p class="mb-4 rental-details">
              {{ rental.title }}
            </p>
            
            <div class="rental-gallery-section p-4 mb-4">
              <h3 class="mb-3 text-white">Property Images</h3>
              <!-- image content -->
            </div>
            
            <!-- Features Section -->
            <div class="rental-info-section p-4 mb-4" v-if="rental.features && rental.features.length > 0">
              <h3 class="mb-3 text-white">Property Features</h3>
              <div class="row">
                <div class="col-md-6 col-lg-4 mb-2" v-for="feature in rental.features" :key="feature">
                  <span class="feature-badge px-3 py-2 rounded-pill d-inline-block mb-2">
                    <i class="fas fa-check me-2"></i>{{ feature }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="rental-info-section p-4 mb-4">
              <h3 class="mb-3 text-white">Rental Details</h3>
              <div class="rental-description">
                <p>{{ rental.description }}</p>
              </div>
              
              <div class="row mt-4">
                <div class="col-md-4 col-6 mb-3">
                  <div class="text-center rental-details">
                    <i class="fas fa-dollar-sign fa-2x mb-2" style="color: #EBA472;"></i>
                    <h5 class="rental-price">${{ formatPrice(rental.price) }}</h5>
                    <small>Per Month</small>
                  </div>
                </div>
                <!-- other rental details -->
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="application-form p-4 mb-4">
            <h4 class="text-white mb-3">Apply Now</h4>
            <!-- application form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RentalDetail',
  data() {
    return {
      rental: null,
      loading: true
    }
  },
  async mounted() {
    await this.loadRental()
  },
  methods: {
    async loadRental() {
      try {
        const response = await axios.get(`/api/rentals/${this.$route.params.id}`)
        this.rental = response.data
      } catch (error) {
        console.error('Error loading rental:', error)
        this.$router.push('/rentals')
      } finally {
        this.loading = false
      }
    },
    formatPrice(price) {
      if (!price) return '0'
      return price.toLocaleString()
    }
  }
}
</script>

<style scoped>
/* Main page styling similar to admin portal */
.rental-detail-page {
  background: linear-gradient(135deg, #ffffff 0%, #464646 25%, #2c2c2c 60%, #1a1a1a 85%, #123852 100%);
  min-height: 100vh;
  color: #ffffff;
}

/* Rental info cards with admin-style glass effect */
.rental-info-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.rental-gallery-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Text styling for readability */
.rental-title {
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.rental-price {
  color: #EBA472;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.rental-details {
  color: #e5e5e5;
}

.rental-description {
  color: #d1d1d1;
  line-height: 1.6;
}

/* Lease terms section */
.lease-terms-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

/* Application form */
.application-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

/* Form controls */
.form-control {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  backdrop-filter: blur(5px);
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #EBA472;
  color: #ffffff;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-label {
  color: #ffffff;
  font-weight: 500;
}


