<template>
  <footer class="footer-dark py-5">
    <div class="container">
      <div class="row g-4">
        <!-- Company Info -->
        <div class="col-lg-4 col-md-6">
          <h5 class="footer-heading mb-3">Make It Home LLC</h5>
          <p class="footer-text mb-3">Your trusted partner in finding the perfect home in Omaha and surrounding areas.</p>
          <div class="d-flex gap-3">
            <a v-if="contactInfo.socialMedia?.facebook" :href="contactInfo.socialMedia.facebook" target="_blank" class="footer-social-link fs-5"><i class="fab fa-facebook"></i></a>
            <a v-if="contactInfo.socialMedia?.twitter" :href="contactInfo.socialMedia.twitter" target="_blank" class="footer-social-link fs-5"><i class="fab fa-twitter"></i></a>
            <a v-if="contactInfo.socialMedia?.instagram" :href="contactInfo.socialMedia.instagram" target="_blank" class="footer-social-link fs-5"><i class="fab fa-instagram"></i></a>
            <a v-if="contactInfo.socialMedia?.linkedin" :href="contactInfo.socialMedia.linkedin" target="_blank" class="footer-social-link fs-5"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-heading mb-3">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2"><router-link to="/" class="footer-link">Home</router-link></li>
            <li class="mb-2"><router-link to="/properties" class="footer-link">Properties</router-link></li>
            <li class="mb-2"><router-link to="/rentals" class="footer-link">Rentals</router-link></li>
            <li class="mb-2"><router-link to="/upcoming" class="footer-link">Upcoming</router-link></li>
          </ul>
        </div>
        
        <!-- Services -->
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-heading mb-3">Services</h6>
          <ul class="list-unstyled">
            <li class="mb-2"><router-link to="/mortgage-calculator" class="footer-link">Mortgage Calculator</router-link></li>
            <li class="mb-2"><router-link to="/agents" class="footer-link">Our Agents</router-link></li>
            <li class="mb-2"><router-link to="/about" class="footer-link">About Us</router-link></li>
            <li class="mb-2"><router-link to="/contact" class="footer-link">Contact</router-link></li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div class="col-lg-4 col-md-6">
          <h6 class="footer-heading mb-3">Contact Info</h6>
          <div class="footer-contact">
            <p class="mb-2"><i class="fas fa-map-marker-alt footer-icon me-2"></i>{{ contactInfo.address || 'Omaha, Nebraska' }}</p>
            <p class="mb-2"><i class="fas fa-phone footer-icon me-2"></i>{{ contactInfo.phone || '402-XXX-XXXX' }}</p>
            <p class="mb-2"><i class="fas fa-envelope footer-icon me-2"></i>{{ contactInfo.email || 'info@makeithome.com' }}</p>
            <p class="mb-0"><i class="fas fa-clock footer-icon me-2"></i>{{ contactInfo.officeHours || 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM' }}</p>
          </div>
        </div>
      </div>
      
      <hr class="footer-divider my-4">
      
      <!-- Copyright -->
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="footer-text mb-0">&copy; 2025 Make It Home LLC. All rights reserved.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <div class="d-flex justify-content-md-end gap-3">
            <a href="#" class="footer-link small">Privacy Policy</a>
            <a href="#" class="footer-link small">Terms of Service</a>
            <router-link to="/sitemap" class="footer-link small">Sitemap</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-dark {
  background-color: #000000 !important;
  color: #FFFFFF !important;
}

.footer-heading {
  color: #EBA472 !important;
  font-weight: 600;
}

.footer-text {
  color: #FFFFFF !important;
  opacity: 0.9;
}

.footer-contact {
  color: #FFFFFF !important;
}

.footer-contact p {
  color: #FFFFFF !important;
}

.footer-icon {
  color: #EBA472 !important;
}

.footer-link {
  color: #FFFFFF !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #EBA472 !important;
  text-decoration: none;
}

.footer-social-link {
  color: #EBA472 !important;
  transition: color 0.3s ease;
}

.footer-social-link:hover {
  color: #FFFFFF !important;
}

.footer-divider {
  border-color: #4A4A4A !important;
  opacity: 0.3;
}

.bank-logo-compact {
  max-height: 40px;
  max-width: 120px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.bank-logo {
  max-height: 50px;
  max-width: 150px;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Ensure container doesn't overflow */
.bank-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.bank-logos img {
  flex-shrink: 0;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .footer-dark .container .row {
    text-align: center;
  }
  
  .footer-dark .col-lg-4,
  .footer-dark .col-lg-2,
  .footer-dark .col-md-6 {
    margin-bottom: 2rem;
  }
  
  .footer-dark .d-flex {
    justify-content: center;
  }
  
  .footer-dark .text-md-end {
    text-align: center !important;
  }
  
  .footer-dark .justify-content-md-end {
    justify-content: center !important;
  }
}

/* Ensure footer stays at bottom */
.footer-dark {
  margin-top: auto;
}

/* Add to your main app wrapper */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Footer',
  data() {
    return {
      contactInfo: {
        phone: '402-XXX-XXXX',
        email: 'info@makeithome.com',
        address: 'Omaha, Nebraska'
      }
    }
  },
  async mounted() {
    await this.loadContactInfo()
  },
  methods: {
    async loadContactInfo() {
      try {
        const response = await axios.get('/api/admin/content/public')
        if (response.data && response.data.footer) {
          this.contactInfo = { ...this.contactInfo, ...response.data.footer }
        }
      } catch (error) {
        console.error('Error loading contact info:', error)
      }
    }
  }
}
</script>






