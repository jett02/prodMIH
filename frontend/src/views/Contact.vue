<template>
  <div class="contact-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-border text-warm-sunset" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading contact information...</p>
      </div>
    </div>

    <!-- Content (hidden while loading) -->
    <div v-else>
      <!-- Hero Section with Animated Background -->
    <section class="hero-section bg-dark text-white overflow-hidden position-relative">
      <!-- Animated Background Elements -->
      <div class="hero-animations">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
      </div>
      
      <!-- Parallax Background Image -->
      <div class="hero-background" 
           style="background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80')">
      </div>
      
      <!-- Animated Overlay -->
      <div class="hero-overlay"></div>
      
      <div class="container d-flex flex-column py-5 min-vh-50 position-relative" style="z-index: 3;">
        <div class="row align-items-center justify-content-between mt-auto">
          <div class="col-lg-8 mb-4 mb-lg-0">
            <div class="hero-badge mb-4" data-aos="fade-up">
              <span class="badge-text">📍 Get In Touch</span>
            </div>
            <h1 class="hero-title mb-3 lh-1" data-aos="fade-up" data-aos-delay="100">
              Contact <span class="text-gradient">Make It Home</span>
            </h1>
            <p class="hero-subtitle fs-5 text-light opacity-75" data-aos="fade-up" data-aos-delay="200">
              Ready to find your dream home in Omaha? Let's start the conversation.
            </p>
            
            <!-- Animated Call-to-Action -->
            <div class="hero-cta mt-4" data-aos="fade-up" data-aos-delay="300">
              <div class="pulse-ring"></div>
              <div class="scroll-indicator">
                <span class="scroll-text">Scroll to connect</span>
                <div class="scroll-arrow">
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information Cards -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row g-4">
          <!-- Phone Card -->
          <div class="col-lg-4">
            <div class="card h-100 border-0 shadow-sm card-hover">
              <div class="card-body text-center p-4">
                <div class="icon-circle bg-primary text-white mb-3 mx-auto">
                  <i class="fas fa-phone"></i>
                </div>
                <h5 class="card-title mb-2">Call Us</h5>
                <p class="text-muted mb-3">{{ contactInfo.phoneDescription || 'Ready to talk? Give us a call' }}</p>
                <a :href="`tel:${contactInfo.phone}`" class="btn btn-outline-primary">
                  {{ contactInfo.phone || '402-XXX-XXXX' }}
                </a>
              </div>
            </div>
          </div>

          <!-- Email Card -->
          <div class="col-lg-4">
            <div class="card h-100 border-0 shadow-sm card-hover">
              <div class="card-body text-center p-4">
                <div class="icon-circle bg-success text-white mb-3 mx-auto">
                  <i class="fas fa-envelope"></i>
                </div>
                <h5 class="card-title mb-2">Email Us</h5>
                <p class="text-muted mb-3">{{ contactInfo.emailDescription || 'Send us your questions' }}</p>
                <a :href="`mailto:${contactInfo.email}`" class="btn btn-outline-success">
                  {{ contactInfo.email || 'info@makeithome.com' }}
                </a>
              </div>
            </div>
          </div>

          <!-- Location Card -->
          <div class="col-lg-4">
            <div class="card h-100 border-0 shadow-sm card-hover">
              <div class="card-body text-center p-4">
                <div class="icon-circle bg-info text-white mb-3 mx-auto">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <h5 class="card-title mb-2">Visit Us</h5>
                <p class="text-muted mb-3">{{ contactInfo.locationDescription || 'Visit our office' }}</p>
                <p class="text-muted mb-3">{{ contactInfo.address || 'Omaha, Nebraska' }}</p>
                <button class="btn btn-outline-info" @click="openMap">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Additional Info Section -->
    <section class="py-5 bg-dark text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h3 class="fw-bold mb-5">Why Choose Make It Home?</h3>
            <div class="row g-4">
              <div class="col-md-4">
                <div class="feature-item">
                  <div class="icon-circle bg-primary text-white mb-3 mx-auto" style="width: 60px; height: 60px;">
                    <i class="fas fa-home"></i>
                  </div>
                  <h5 class="mb-2">Local Expertise</h5>
                  <p class="text-light opacity-75">Deep knowledge of Omaha's neighborhoods</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="feature-item">
                  <div class="icon-circle bg-success text-white mb-3 mx-auto" style="width: 60px; height: 60px;">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <h5 class="mb-2">Personalized Service</h5>
                  <p class="text-light opacity-75">Tailored approach for every client</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="feature-item">
                  <div class="icon-circle bg-info text-white mb-3 mx-auto" style="width: 60px; height: 60px;">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <h5 class="mb-2">Market Insights</h5>
                  <p class="text-light opacity-75">Data-driven real estate decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Media Section -->
    <section class="social-media-section py-5 bg-dark">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-4">
              <h2 class="text-white mb-2">Connect with Make It Home</h2>
              <p class="text-white-50">Follow us on social media for the latest updates and property listings</p>
            </div>

            <!-- Social Media Cards -->
            <div class="row mb-4">
              <div class="col-md-3 mb-3">
                <div class="social-info-box">
                  <div class="info-icon">
                    <i class="fab fa-facebook-f"></i>
                  </div>
                  <h5>Facebook</h5>
                  <p>Stay updated with our latest property listings and community news.</p>
                  <a href="https://facebook.com/makeithome" target="_blank" class="btn btn-social-facebook">
                    <i class="fab fa-facebook-f me-2"></i>Follow Us
                  </a>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="social-info-box">
                  <div class="info-icon">
                    <i class="fab fa-instagram"></i>
                  </div>
                  <h5>Instagram</h5>
                  <p>See behind-the-scenes content and beautiful property photos.</p>
                  <a href="https://instagram.com/makeithome" target="_blank" class="btn btn-social-instagram">
                    <i class="fab fa-instagram me-2"></i>Follow Us
                  </a>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="social-info-box">
                  <div class="info-icon">
                    <i class="fab fa-twitter"></i>
                  </div>
                  <h5>Twitter</h5>
                  <p>Get real-time updates and market insights from our team.</p>
                  <a href="https://twitter.com/makeithome" target="_blank" class="btn btn-social-twitter">
                    <i class="fab fa-twitter me-2"></i>Follow Us
                  </a>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="social-info-box">
                  <div class="info-icon">
                    <i class="fab fa-tiktok"></i>
                  </div>
                  <h5>TikTok</h5>
                  <p>Watch fun property tours and real estate tips.</p>
                  <a href="https://tiktok.com/@makeithome" target="_blank" class="btn btn-social-tiktok">
                    <i class="fab fa-tiktok me-2"></i>Follow Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div> <!-- End content div -->
  </div>
</template>

<script>
import ContactSection from '@/components/ContactSection.vue'
import axios from 'axios'

export default {
  name: 'Contact',
  components: {
    ContactSection
  },
  data() {
    return {
      loading: true,
      contactInfo: {
        phone: "402-XXX-XXXX",
        email: "info@makeithome.com",
        address: "Omaha, Nebraska",
        phoneDescription: "Ready to talk? Give us a call",
        emailDescription: "Send us your questions",
        locationDescription: "Visit our office",
        googleMapsLink: ""
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
        console.log('Full API response:', response.data) // Debug log
        
        if (response.data && response.data.contact) {
          this.contactInfo = {
            phone: response.data.contact.phone || '',
            email: response.data.contact.email || '',
            address: response.data.contact.address || '',
            phoneDescription: response.data.contact.phoneDescription || 'Ready to talk? Give us a call',
            emailDescription: response.data.contact.emailDescription || 'Send us your questions',
            locationDescription: response.data.contact.locationDescription || 'Visit our office',
            googleMapsLink: response.data.contact.googleMapsLink || ''
          }
          console.log('Loaded contact info from contact section:', this.contactInfo)
        } else if (response.data && response.data.footer) {
          // Fallback to footer data
          this.contactInfo = {
            ...this.contactInfo,
            phone: response.data.footer.phone || '',
            email: response.data.footer.email || '',
            address: response.data.footer.address || '',
            phoneDescription: this.contactInfo.phoneDescription,
            emailDescription: this.contactInfo.emailDescription,
            locationDescription: this.contactInfo.locationDescription,
            googleMapsLink: this.contactInfo.googleMapsLink
          }
          console.log('Loaded contact info from footer section:', this.contactInfo)
        }
        
        // Force reactivity update
        this.$forceUpdate()
      } catch (error) {
        console.error('Error loading contact info:', error)
      } finally {
        this.loading = false
      }
    },
    openMap() {
      console.log('Opening map with link:', this.contactInfo.googleMapsLink) // Debug log
      if (this.contactInfo.googleMapsLink && this.contactInfo.googleMapsLink.trim()) {
        window.open(this.contactInfo.googleMapsLink, '_blank')
      } else {
        console.log('No Google Maps link found, using address search')
        const address = encodeURIComponent(this.contactInfo.address || 'Make It Home LLC')
        window.open(`https://www.google.com/maps/search/${address}`, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
  background-color: #f8f9fa; /* Soft gray background */
  min-height: 100vh;
  padding-top: 80px;
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.loading-spinner {
  text-align: center;
}

.text-warm-sunset {
  color: #EBA472 !important;
}

.contact-card {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 8px;
}

.contact-form {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 8px;
}

/* Enhanced Hero Section */
.hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

/* Animated Background */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  animation: subtleZoom 20s ease-in-out infinite alternate;
}

@keyframes subtleZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

/* Animated Overlay */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg, 
    rgba(0,0,0,0.7) 0%, 
    rgba(0,0,0,0.4) 50%, 
    rgba(0,0,0,0.6) 100%
  );
  z-index: 1;
  animation: overlayPulse 8s ease-in-out infinite;
}

@keyframes overlayPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.6; }
}

/* Floating Shapes */
.hero-animations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 2;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(235, 164, 114, 0.1);
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 8s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
  animation-duration: 10s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 40%;
  left: 80%;
  animation-delay: 4s;
  animation-duration: 7s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 1s;
  animation-duration: 9s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

/* Hero Badge Animation */
.hero-badge {
  display: inline-block;
  animation: badgeFloat 3s ease-in-out infinite;
}

.badge-text {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: 10px 24px;
  border-radius: 30px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Hero Title with Gradient */
.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.text-gradient {
  background: linear-gradient(135deg, #EBA472 0%, #A15E3B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(20deg); }
}

/* Animated Call-to-Action */
.hero-cta {
  position: relative;
  display: inline-block;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(235, 164, 114, 0.4);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.scroll-indicator {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 2;
}

.scroll-text {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.scroll-arrow {
  display: inline-block;
  animation: bounce 2s infinite;
}

.scroll-arrow i {
  font-size: 1.2rem;
  color: #EBA472;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

/* Contact Cards Hover Effects */
.card-hover {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #EBA472;
}

.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.card-hover:hover .icon-circle {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .floating-shape {
    display: none; /* Hide floating shapes on mobile for performance */
  }
  
  .hero-background {
    background-attachment: scroll; /* Fix for mobile */
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-section {
    min-height: 50vh;
  }
}

/* Social Media Section */
.social-media-section {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border-top: 3px solid #EBA472;
}

.social-info-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  height: 100%;
  border: 1px solid rgba(235, 164, 114, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-info-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.social-info-box .info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 1.5rem;
}

.social-info-box h5 {
  color: #000000;
  font-weight: 600;
  margin-bottom: 15px;
}

.social-info-box p {
  color: #4A4A4A;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.btn-social-facebook {
  background: #1877f2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-facebook:hover {
  background: #166fe5;
  color: white;
  transform: translateY(-2px);
}

.btn-social-instagram {
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-instagram:hover {
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.btn-social-twitter {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-twitter:hover {
  background: #0d8bd9;
  color: white;
  transform: translateY(-2px);
}

.btn-social-tiktok {
  background: #000000;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-tiktok:hover {
  background: #333333;
  color: white;
  transform: translateY(-2px);
}
</style>


























