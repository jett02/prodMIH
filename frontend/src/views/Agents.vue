<template>
  <div class="agents-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-lg-10">
              <h1 class="hero-title mb-4" data-aos="fade-up" data-aos-delay="100">
                Meet Our 
                <span class="sunset-text">Expert Agents</span>
              </h1>
              <p class="hero-subtitle mb-5" data-aos="fade-up" data-aos-delay="200">
                Work with experienced professionals who know Omaha's market inside and out. 
                We're here to guide you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-15 py-xl-20" style="padding-top: 3rem !important;">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-10 text-center">
            <h2 class="fw-bold mb-3" data-aos="fade-up">Meet the people behind our success.</h2>
            <p class="text-muted fs-lg" data-aos="fade-up" data-aos-delay="100">
              Here's the dedicated team of real estate professionals that are committed to helping you achieve your property goals.
            </p>
          </div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        
        <div v-else class="row g-4 g-lg-5">
          <div v-for="(agent, index) in agents" :key="agent._id" 
               class="col-md-6 col-lg-4" 
               :data-aos="'fade-up'" 
               :data-aos-delay="index * 150">
            <div class="agent-card card h-100 border-0 shadow-sm">
              <div class="card-image-wrapper">
                <img :src="getImageUrl(agent.photo)"
                     class="card-img-top agent-image"
                     :alt="agent.name"
                     @error="handleImageError">
                <div class="image-overlay">
                  <div class="contact-actions">
                    <a v-if="agent.phone" :href="`tel:${agent.phone}`"
                       class="btn btn-sm btn-light rounded-circle me-2"
                       title="Call">
                      <i class="fas fa-phone"></i>
                    </a>
                    <a v-if="agent.email" :href="`mailto:${agent.email}`"
                       class="btn btn-sm btn-light rounded-circle"
                       title="Email">
                      <i class="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
                <!-- Agency Logo Overlay -->
                <div v-if="agent.agencyLogo" class="agency-logo-overlay">
                  <img :src="getImageUrl(agent.agencyLogo)"
                       :alt="agent.company + ' logo'"
                       class="agency-logo-corner"
                       @error="handleLogoError">
                </div>
              </div>
              
              <div class="card-body text-center p-4">
                <h5 class="card-title fw-bold mb-2">{{ agent.name }}</h5>
                <p class="text-primary fw-medium mb-3">{{ agent.title }}</p>
                <p class="card-text text-muted mb-4">{{ agent.bio }}</p>
                
                <div class="contact-info">
                  <div v-if="agent.phone" class="contact-item mb-2">
                    <i class="fas fa-phone text-primary me-2"></i>
                    <a :href="`tel:${agent.phone}`" class="text-decoration-none">{{ agent.phone }}</a>
                  </div>
                  <div v-if="agent.email" class="contact-item mb-2">
                    <i class="fas fa-envelope text-primary me-2"></i>
                    <a :href="`mailto:${agent.email}`" class="text-decoration-none">{{ agent.email }}</a>
                  </div>
                </div>
                
                <div class="mt-4">
                  <button class="btn btn-primary btn-sm px-4" @click="contactAgent(agent)">
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="row justify-content-center mt-5 pt-5" data-aos="fade-up">
          <div class="col-lg-8 text-center">
            <div class="cta-section bg-light rounded-4 p-5">
              <h3 class="fw-bold mb-3">Ready to Work With Us?</h3>
              <p class="text-muted mb-4">
                Our team is here to help you navigate the real estate market with confidence and expertise.
              </p>
              <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button class="btn btn-primary px-4">Schedule Consultation</button>
                <button class="btn btn-outline-primary px-4">View Our Listings</button>
              </div>
            </div>
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
  name: 'Agents',
  data() {
    return {
      agents: [],
      loading: true
    }
  },
  async mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    })
    await this.loadAgents()
  },
  methods: {
    async loadAgents() {
      try {
        const response = await axios.get('/api/agents')
        this.agents = response.data
      } catch (error) {
        console.error('Error loading agents:', error)
        // Fallback data if API fails
        this.agents = [
          {
            _id: '1',
            name: 'Make It Home Team',
            title: 'Real Estate Professionals',
            bio: 'Our experienced team is dedicated to helping you find the perfect home or investment property.',
            phone: '(402) 555-0123',
            email: 'info@makeithome.com',
            photo: null
          }
        ]
      } finally {
        this.loading = false
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-agent.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
    },
    handleImageError(event) {
      event.target.src = '/placeholder-agent.jpg'
    },
    handleLogoError(event) {
      // Hide the logo if it fails to load
      event.target.style.display = 'none'
    },
    contactAgent(agent) {
      // You can implement a modal or redirect to contact form
      if (agent.email) {
        window.location.href = `mailto:${agent.email}?subject=Real Estate Inquiry`
      }
    }
  }
}
</script>

<style scoped>
.agents-page {
  padding-top: 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
  min-height: 100vh;
}

/* Hero Banner Styles - Toned Down */
.hero-banner {
  position: relative;
  min-height: 35vh; /* Reduced from 47vh to make it smaller */
  background: linear-gradient(135deg, #4A4A4A 0%, #2c3e50 25%, #34495e 50%, #4A4A4A 75%, #2c3e50 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding-top: 90px; /* Increased slightly since we removed the badge */
}

.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(235, 164, 114, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(235, 164, 114, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(235, 164, 114, 0.1) 50%, transparent 70%);
  animation: shimmer 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.sunset-text {
  color: #EBA472;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto;
}

.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(235, 164, 114, 0.15), rgba(255, 255, 255, 0.1));
  animation: rotate 20s linear infinite, pulse 4s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(235, 164, 114, 0.2);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 15%;
  animation-delay: -7s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 30%;
  animation-delay: -14s;
}

/* Team Section Styles */
.py-15 {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.py-xl-20 {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

.agent-stats {
  text-align: center;
  padding: 1.5rem;
  background: rgba(52, 73, 94, 0.08);
  border-radius: 1rem;
  border: 1px solid rgba(52, 73, 94, 0.1);
}

.stat-item h4 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
}

/* Agent Card Styles */
.agent-card {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  border: 2px solid #e5e7eb !important;
  background: white;
}

.agent-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12) !important;
  border-color: #d1d5db !important;
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

.agent-image {
  height: 280px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.agent-card:hover .agent-image {
  transform: scale(1.03);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(44, 62, 80, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.agent-card:hover .image-overlay {
  opacity: 1;
}

.contact-actions {
  display: flex;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.agent-card:hover .contact-actions {
  transform: translateY(0);
}

.contact-actions .btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
}

.contact-actions .btn:hover {
  background: #34495e !important;
  color: white !important;
  transform: scale(1.1);
}

/* Contact Info Styles */
.contact-info {
  border-top: 1px solid #ecf0f1;
  padding-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.contact-item a {
  color: #7f8c8d;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #2c3e50;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
  border: 1px solid #d5dbdb;
}

/* Button Styles */
.btn-primary {
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2c3e50 0%, #1a252f 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(44, 62, 80, 0.25);
}

.btn-outline-primary {
  border-color: #34495e;
  color: #34495e;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #34495e;
  border-color: #34495e;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 73, 94, 0.25);
}

.text-primary {
  color: #2c3e50 !important;
}

/* Animations */
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
  
  .agent-image {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding-top: 110px; /* Extra padding on mobile to avoid navbar overlap */
    min-height: 40vh; /* Slightly taller on mobile to accommodate padding */
  }
}

@media (max-width: 576px) {
  .hero-banner {
    padding-top: 130px; /* Even more padding on small mobile screens */
  }

  .hero-title {
    font-size: 2rem;
  }

  .cta-section {
    padding: 2rem !important;
  }
}

/* Agency Logo Overlay Styles */
.agency-logo-overlay {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 10;
}

.agency-logo-corner {
  height: 48px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.agency-logo-corner:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.35);
}
</style>


