<template>
  <div class="our-partners">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-warm text-white py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <span class="eyebrow mb-3 text-light" data-aos="fade-up">Our Network</span>
            <h1 class="fw-bold display-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              Our <span class="text-accent">Partners</span>
            </h1>
            <p class="lead mb-4" data-aos="fade-up" data-aos-delay="400">
              Trusted professionals who help make your real estate dreams a reality
            </p>
            <div class="scroll-down" data-aos="fade-up" data-aos-delay="600"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Grid Section -->
    <section class="partners-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="text-center mb-5">
              <h2 class="display-5 fw-bold">Our Trusted Partners</h2>
              <p class="lead text-muted">Professional partners who share our commitment to excellence</p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading partners...</span>
              </div>
            </div>

            <!-- Partners Grid -->
            <div v-else-if="partners.length > 0" class="row g-4">
              <div 
                v-for="partner in partners" 
                :key="partner._id"
                class="col-lg-6 col-md-6"
                data-aos="fade-up"
                :data-aos-delay="partners.indexOf(partner) * 100"
              >
                <div class="partner-card h-100">
                  <div class="partner-logo-container">
                    <img 
                      :src="partner.logo" 
                      :alt="partner.title + ' logo'"
                      class="partner-logo"
                      @error="handleImageError"
                    >
                  </div>
                  <div class="partner-content">
                    <h4 class="partner-title">{{ partner.title }}</h4>
                    <p class="partner-description">{{ partner.description }}</p>
                    
                    <div class="partner-contact">
                      <div v-if="partner.phone" class="contact-item">
                        <i class="fas fa-phone text-primary me-2"></i>
                        <a :href="'tel:' + partner.phone" class="contact-link">{{ partner.phone }}</a>
                      </div>
                      <div v-if="partner.email" class="contact-item">
                        <i class="fas fa-envelope text-primary me-2"></i>
                        <a :href="'mailto:' + partner.email" class="contact-link">{{ partner.email }}</a>
                      </div>
                      <div v-if="partner.website" class="contact-item">
                        <i class="fas fa-globe text-primary me-2"></i>
                        <a :href="formatWebsiteUrl(partner.website)" target="_blank" rel="noopener noreferrer" class="contact-link">
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Partners State -->
            <div v-else class="text-center py-5">
              <div class="empty-state">
                <i class="fas fa-handshake fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No Partners Yet</h4>
                <p class="text-muted">We're building our network of trusted partners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section bg-light py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h3 class="fw-bold mb-3">Interested in Partnering With Us?</h3>
            <p class="lead text-muted mb-4">
              Join our network of trusted professionals and help us serve our clients better.
            </p>
            <router-link to="/contact" class="btn btn-primary btn-lg">
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OurPartners',
  data() {
    return {
      partners: [],
      loading: true
    }
  },
  async mounted() {
    document.title = 'Our Partners - Make It Home'
    await this.loadPartners()
  },
  methods: {
    async loadPartners() {
      try {
        this.loading = true
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/partners/public`)
        this.partners = response.data
      } catch (error) {
        console.error('Error loading partners:', error)
        this.partners = []
      } finally {
        this.loading = false
      }
    },
    formatWebsiteUrl(url) {
      if (!url) return '#'
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      }
      return 'https://' + url
    },
    handleImageError(event) {
      // Fallback to a placeholder image if logo fails to load
      event.target.src = '/businessimages/placeholder-logo.png'
    }
  }
}
</script>

<style scoped>
.bg-gradient-warm {
  background: linear-gradient(135deg, #EBA472 0%, #A15E3B 100%);
}

.text-accent {
  color: #FFE5D4 !important;
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.scroll-down {
  width: 2px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 auto;
  border-radius: 1px;
  position: relative;
}

.scroll-down::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: white;
  border-radius: 1px;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
}

.partners-section {
  min-height: 60vh;
}

.partner-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.partner-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.partner-logo-container {
  text-align: center;
  margin-bottom: 1.5rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo {
  max-width: 100%;
  max-height: 100px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.partner-content {
  text-align: center;
}

.partner-title {
  color: #2C3E50;
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.partner-description {
  color: #6C757D;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.partner-contact {
  border-top: 1px solid #E9ECEF;
  padding-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-link {
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
}

.contact-link:hover {
  color: #EBA472;
  text-decoration: none;
}

.empty-state {
  padding: 3rem 0;
}

.cta-section {
  background-color: #F8F9FA !important;
}

.btn-primary {
  background-color: #EBA472;
  border-color: #EBA472;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #A15E3B;
  border-color: #A15E3B;
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .partner-card {
    padding: 1.5rem;
  }
  
  .partner-logo-container {
    height: 80px;
  }
  
  .partner-logo {
    max-height: 80px;
  }
}
</style>
