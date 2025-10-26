<template>
  <div class="vision-page">
    <!-- Hero Section -->
    <section class="hero-section overflow-hidden inverted">
      <div class="d-flex flex-column py-20 min-vh-100 container foreground">
        <div class="row justify-content-center my-auto">
          <div class="col-lg-8 text-center hero-content">
            <span class="eyebrow mb-3 text-warm-sunset" data-aos="fade-up">Our Vision</span>
            <h1 class="fw-bold display-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              Building <span class="text-warm-sunset">Tomorrow's</span> Communities
            </h1>
            <p class="lead mb-4 text-light" data-aos="fade-up" data-aos-delay="400">
              {{ content.vision.heroSubtitle || 'Discover the vision that drives everything we do at Make It Home' }}
            </p>

            <!-- Scroll Indicator -->
            <div class="scroll-indicator-container" data-aos="fade-up" data-aos-delay="600">
              <p class="scroll-text mb-3">Explore Our Vision</p>
              <div class="scroll-arrow" @click="scrollToVision">
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Animated Background -->
      <figure class="background background-overlay animated-bg">
        <div class="bg-layer bg-layer-1"></div>
        <div class="bg-layer bg-layer-2"></div>
        <div class="bg-layer bg-layer-3"></div>
        <div class="floating-elements">
          <div class="floating-element floating-element-1"></div>
          <div class="floating-element floating-element-2"></div>
          <div class="floating-element floating-element-3"></div>
        </div>
      </figure>

      <!-- Smooth transition element -->
      <div class="hero-transition"></div>
    </section>

    <!-- Vision Statement Section -->
    <section class="py-xl-20 py-15 vision-statement-bg text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5" data-aos="fade-up">
              <h2 class="display-5 fw-bold mb-4">
                {{ content.vision.mainTitle || 'Our Vision for the Future' }}
              </h2>
              <div class="vision-statement">
                <p class="fs-4 text-light opacity-75 mb-4" v-html="content.vision.statement || defaultVisionStatement"></p>
              </div>
            </div>

            <!-- Vision Images Section - Ready for admin content -->
            <div class="row g-4 mt-5" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div class="vision-image-card">
                  <div class="vision-image-placeholder">
                    <i class="fas fa-image"></i>
                    <h5>Vision Image 1</h5>
                    <p>Future vision content will be added here</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div class="vision-image-card">
                  <div class="vision-image-placeholder">
                    <i class="fas fa-image"></i>
                    <h5>Vision Image 2</h5>
                    <p>Future vision content will be added here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Mission & Motivation Section -->
    <section class="py-xl-20 py-15 bg-dark-professional text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <h2 class="display-6 fw-bold mb-4">
              {{ content.vision.motivationTitle || 'What Drives Us' }}
            </h2>
            <div class="motivation-content">
              <p class="fs-5 mb-4" v-html="content.vision.motivation || defaultMotivation"></p>
            </div>
            
            <div class="stats-row mt-5">
              <div class="row g-4">
                <div v-for="(stat, index) in visionStats" :key="index" class="col-6">
                  <div class="stat-item text-center">
                    <div class="stat-number">{{ stat.number }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div class="vision-image-container">
              <img v-if="content.vision.motivationImage" 
                   :src="getImageUrl(content.vision.motivationImage)"
                   alt="Our Motivation"
                   class="vision-image">
              <div v-else class="vision-placeholder">
                <i class="fas fa-image"></i>
                <p>Motivation image will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future Goals Section -->
    <section class="py-xl-20 py-15 looking-ahead-bg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5" data-aos="fade-up">
              <h2 class="display-6 fw-bold mb-4 text-dark">
                {{ content.vision.goalsTitle || 'Looking Ahead' }}
              </h2>
              <p class="lead text-dark opacity-75 mb-5">
                {{ content.vision.goalsDescription || 'Our commitment to growth, innovation, and community impact shapes everything we do.' }}
              </p>
            </div>

            <!-- Vision Cards moved from Vision Statement Section -->
            <div class="row g-4 mt-5" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-4">
                <div class="vision-detail-card">
                  <div class="vision-icon">
                    <i class="fas fa-home"></i>
                  </div>
                  <h4 class="vision-detail-title">Transforming Homes</h4>
                  <p class="vision-detail-text">We see every property as a canvas for creating meaningful spaces where families can build their dreams and create lasting memories.</p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="vision-detail-card">
                  <div class="vision-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <h4 class="vision-detail-title">Building Communities</h4>
                  <p class="vision-detail-text">Our vision extends beyond individual properties to creating vibrant neighborhoods where people connect, thrive, and support one another.</p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="vision-detail-card">
                  <div class="vision-icon">
                    <i class="fas fa-heart"></i>
                  </div>
                  <h4 class="vision-detail-title">Creating Affordable Quality</h4>
                  <p class="vision-detail-text">We're committed to creating affordable, high-quality homes that don't compromise on craftsmanship, ensuring every family can access beautiful, well-built housing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- City Images Section -->
    <section class="py-xl-20 py-15 communities-bg text-white">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center" data-aos="fade-up">
            <h2 class="display-6 fw-bold mb-4">
              {{ content.vision.cityImagesTitle || 'Communities We Serve' }}
            </h2>
            <p class="lead text-light opacity-75">
              {{ content.vision.cityImagesDescription || 'Discover the vibrant neighborhoods and communities where we\'re making a difference, one home at a time.' }}
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div v-for="(cityImage, index) in cityImages" :key="index" class="col-lg-6" data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="city-image-card">
              <div v-if="cityImage.image" class="city-image-wrapper">
                <img :src="cityImage.image" :alt="cityImage.title" class="city-image">
                <div class="city-overlay">
                  <div class="city-content">
                    <h4 class="city-title">{{ cityImage.title }}</h4>
                    <p class="city-description">{{ cityImage.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="city-placeholder">
                <i class="fas fa-city"></i>
                <h5>{{ cityImage.title || `City ${index + 1}` }}</h5>
                <p>{{ cityImage.description || 'City description' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Media Section -->
    <section class="py-xl-15 py-10 social-media-bg">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center" data-aos="fade-up">
            <h2 class="display-6 fw-bold mb-4 text-dark">Stay Connected</h2>
            <p class="lead text-dark opacity-75">Follow us on social media for the latest updates, property listings, and community news.</p>
          </div>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay="100">
            <div class="social-media-card">
              <div class="social-icon facebook">
                <i class="fab fa-facebook-f"></i>
              </div>
              <h5 class="social-title">Facebook</h5>
              <p class="social-description">Stay updated with our latest property listings and community news.</p>
              <a href="https://facebook.com/makeithome" target="_blank" class="btn btn-social-facebook">
                <i class="fab fa-facebook-f me-2"></i>Follow Us
              </a>
            </div>
          </div>

          <div class="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay="200">
            <div class="social-media-card">
              <div class="social-icon instagram">
                <i class="fab fa-instagram"></i>
              </div>
              <h5 class="social-title">Instagram</h5>
              <p class="social-description">See behind-the-scenes content and beautiful property photos.</p>
              <a href="https://instagram.com/makeithome" target="_blank" class="btn btn-social-instagram">
                <i class="fab fa-instagram me-2"></i>Follow Us
              </a>
            </div>
          </div>

          <div class="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay="300">
            <div class="social-media-card">
              <div class="social-icon twitter">
                <i class="fab fa-twitter"></i>
              </div>
              <h5 class="social-title">Twitter</h5>
              <p class="social-description">Get real-time updates and market insights from our team.</p>
              <a href="https://twitter.com/makeithome" target="_blank" class="btn btn-social-twitter">
                <i class="fab fa-twitter me-2"></i>Follow Us
              </a>
            </div>
          </div>

          <div class="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay="400">
            <div class="social-media-card">
              <div class="social-icon tiktok">
                <i class="fab fa-tiktok"></i>
              </div>
              <h5 class="social-title">TikTok</h5>
              <p class="social-description">Watch fun property tours and real estate tips.</p>
              <a href="https://tiktok.com/@makeithome" target="_blank" class="btn btn-social-tiktok">
                <i class="fab fa-tiktok me-2"></i>Follow Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-xl-20 py-15 bg-warm-sunset text-white">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8" data-aos="fade-up">
            <h2 class="display-6 fw-bold mb-4">
              {{ content.vision.ctaTitle || 'Join Our Vision' }}
            </h2>
            <p class="lead mb-5">
              {{ content.vision.ctaDescription || 'Ready to be part of something bigger? Let\'s build the future of real estate together.' }}
            </p>
            <div class="cta-buttons">
              <router-link to="/contact" class="btn btn-light btn-lg me-3">
                Get In Touch
              </router-link>
              <router-link to="/properties" class="btn btn-outline-light btn-lg">
                View Properties
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OurVision',
  data() {
    return {
      content: {
        vision: {
          heroSubtitle: '',
          mainTitle: '',
          statement: '',
          pillarsTitle: '',
          pillarsDescription: '',
          motivationTitle: '',
          motivation: '',
          motivationImage: '',
          goalsTitle: '',
          goalsDescription: '',
          futureGoals: '',
          ctaTitle: '',
          ctaDescription: '',
          cityImagesTitle: '',
          cityImagesDescription: ''
        }
      },
      defaultVisionStatement: `At Make It Home, we envision a future where every person has access to quality housing that serves as more than just shelter—it's a foundation for building dreams, creating memories, and fostering community connections.`,
      defaultMotivation: `We're motivated by the belief that real estate should be accessible, transparent, and transformative. Every property we touch, every family we serve, and every community we impact drives us to push boundaries and redefine what's possible in real estate.`,
      defaultFutureGoals: `Our vision extends beyond today's transactions. We're building sustainable communities, pioneering innovative real estate solutions, and creating lasting partnerships that will shape the industry for generations to come.`,
      visionStats: [
        { number: '5+', label: 'Years of Experience' },
        { number: '4+', label: 'Properties Evaluated' },
        { number: '3+', label: 'Neighborhoods Served' },
        { number: '100%', label: 'Commitment to Excellence' }
      ],
      cityImages: []
    }
  },
  async mounted() {
    document.title = 'Our Vision - Make It Home'
    await this.loadContent()
  },
  methods: {
    async loadContent() {
      try {
        const response = await axios.get('/api/admin/content/public')
        console.log('Vision page - Full content response:', response.data)
        
        if (response.data && response.data.vision) {
          this.content.vision = { ...this.content.vision, ...response.data.vision }

          // Load city images if they exist
          if (response.data.vision.cityImages && response.data.vision.cityImages.length > 0) {
            this.cityImages = response.data.vision.cityImages
          } else {
            // Default city images if none are set
            this.cityImages = [
              {
                title: 'Omaha',
                description: 'Serving the heart of Nebraska with quality homes and exceptional service.',
                image: ''
              },
              {
                title: 'Surrounding Areas',
                description: 'Building communities in surrounding areas.',
                image: ''
              }
            ]
          }
        }
      } catch (error) {
        console.error('Error loading vision content:', error)
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return ''
      if (imagePath.startsWith('http')) return imagePath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
    },
    scrollToVision() {
      const visionSection = document.querySelector('.vision-statement-bg')
      if (visionSection) {
        visionSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script>

<style scoped>
.vision-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
  padding-top: 80px; /* Ensure space for navbar */
  min-height: 100vh;
}

.hero-content {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

/* Animated Background Layers */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.bg-layer-1 {
  background: linear-gradient(45deg, rgba(235, 164, 114, 0.1) 0%, transparent 50%, rgba(212, 147, 94, 0.08) 100%);
  animation: float-slow 20s ease-in-out infinite;
}

.bg-layer-2 {
  background: radial-gradient(circle at 30% 70%, rgba(235, 164, 114, 0.15) 0%, transparent 60%);
  animation: float-medium 15s ease-in-out infinite reverse;
}

.bg-layer-3 {
  background: linear-gradient(135deg, transparent 20%, rgba(255, 255, 255, 0.03) 50%, transparent 80%);
  animation: float-fast 12s ease-in-out infinite;
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(235, 164, 114, 0.1);
  backdrop-filter: blur(10px);
}

.floating-element-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation: float-up-down 8s ease-in-out infinite;
}

.floating-element-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation: float-up-down 6s ease-in-out infinite reverse;
}

.floating-element-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 70%;
  animation: float-up-down 10s ease-in-out infinite;
}

/* Hero Transition */
.hero-transition {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, transparent 0%, rgba(44, 44, 44, 0.3) 50%, #2c2c2c 100%);
  z-index: 1;
}

/* Scroll Indicator */
.scroll-indicator-container {
  margin-top: 2rem;
}

.scroll-arrow {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.9) 0%, rgba(212, 147, 94, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(235, 164, 114, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: bounce 2s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
  transition: all 0.3s ease;
  margin: 0 auto;
  cursor: pointer;
}

.scroll-arrow:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(235, 164, 114, 0.5);
}

.scroll-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  animation: fade-pulse 2s ease-in-out infinite;
}

/* Enhanced Background Styles */
.vision-statement-bg {
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 25%, #1e1e1e 50%, #2a2a2a 75%, #1a1a1a 100%);
  position: relative;
}

.vision-statement-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(235, 164, 114, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(212, 147, 94, 0.08) 0%, transparent 50%),
    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%),
    radial-gradient(ellipse at center, transparent 20%, rgba(255, 255, 255, 0.03) 70%, rgba(255, 255, 255, 0.08) 100%);
  pointer-events: none;
}

.looking-ahead-bg {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #f1f3f4 50%, #e9ecef 75%, #f8f9fa 100%);
  position: relative;
}

.looking-ahead-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(235, 164, 114, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(212, 147, 94, 0.03) 0%, transparent 50%),
    linear-gradient(45deg, transparent 40%, rgba(0, 0, 0, 0.02) 50%, transparent 60%);
  pointer-events: none;
}

.communities-bg {
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 25%, #2e2e2e 50%, #1c1c1c 75%, #2a2a2a 100%);
  position: relative;
}

.communities-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 40% 20%, rgba(235, 164, 114, 0.12) 0%, transparent 60%),
    radial-gradient(circle at 60% 80%, rgba(212, 147, 94, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, transparent 20%, rgba(255, 255, 255, 0.03) 50%, transparent 80%);
  pointer-events: none;
}

.social-media-bg {
  background: linear-gradient(135deg, #f1f3f4 0%, #e8eaed 25%, #f5f6f7 50%, #e8eaed 75%, #f1f3f4 100%);
  position: relative;
}

.social-media-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 25% 30%, rgba(235, 164, 114, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 75% 70%, rgba(212, 147, 94, 0.04) 0%, transparent 50%),
    linear-gradient(45deg, transparent 30%, rgba(0, 0, 0, 0.015) 50%, transparent 70%);
  pointer-events: none;
}

/* Ensure content appears above background overlays */
.vision-statement-bg .container,
.looking-ahead-bg .container,
.communities-bg .container,
.social-media-bg .container {
  position: relative;
  z-index: 1;
}

/* Animation Keyframes */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateX(0px) scale(1);
  }
  50% {
    transform: translateX(15px) scale(1.05);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-10px) translateX(10px);
  }
  66% {
    transform: translateY(5px) translateX(-5px);
  }
}

@keyframes float-up-down {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
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

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(235, 164, 114, 0.3);
  }
  50% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 30px rgba(235, 164, 114, 0.6);
  }
}

@keyframes fade-pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.text-warm-sunset {
  color: #EBA472 !important;
}

.min-vh-75 {
  min-height: 50vh !important;
}

.min-vh-100 {
  min-height: 100vh !important;
}

.py-15 {
  padding-top: 4rem !important;
  padding-bottom: 4rem !important;
}

.py-xl-20 {
  padding-top: 8rem !important;
  padding-bottom: 8rem !important;
}

.inverted {
  color: #ffffff !important;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.background-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 20%, rgba(235, 164, 114, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(235, 164, 114, 0.1) 0%, transparent 50%);
  z-index: -1;
}

.foreground {
  position: relative;
  z-index: 1;
}

/* City Images Section */
.city-image-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 300px;
}

.city-image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.city-image-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.city-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.city-image-card:hover .city-image {
  transform: scale(1.05);
}

.city-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem;
  color: white;
}

.city-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #EBA472;
}

.city-description {
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
}

.city-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #6c757d;
  text-align: center;
  padding: 2rem;
}

.city-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #EBA472;
}

.city-placeholder h5 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

/* Social Media Section */
.social-media-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
}

.social-media-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.social-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.social-icon.facebook {
  background: linear-gradient(135deg, #1877f2, #42a5f5);
}

.social-icon.instagram {
  background: linear-gradient(135deg, #e4405f, #fd1d1d, #fcb045);
}

.social-icon.twitter {
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
}

.social-icon.tiktok {
  background: linear-gradient(135deg, #000000, #ff0050);
}

.social-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.social-description {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn-social-facebook {
  background: #1877f2;
  border-color: #1877f2;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-social-facebook:hover {
  background: #166fe5;
  border-color: #166fe5;
  color: white;
  transform: translateY(-2px);
}

.btn-social-instagram {
  background: linear-gradient(135deg, #e4405f, #fd1d1d);
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-social-instagram:hover {
  background: linear-gradient(135deg, #d73447, #e91e63);
  color: white;
  transform: translateY(-2px);
}

.btn-social-twitter {
  background: #1da1f2;
  border-color: #1da1f2;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-social-twitter:hover {
  background: #0d8bd9;
  border-color: #0d8bd9;
  color: white;
  transform: translateY(-2px);
}

.btn-social-tiktok {
  background: #000000;
  border-color: #000000;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-social-tiktok:hover {
  background: #ff0050;
  border-color: #ff0050;
  color: white;
  transform: translateY(-2px);
}

/* Vision Statement */
.vision-statement {
  max-width: 800px;
  margin: 0 auto;
}

/* Vision Detail Cards */
.vision-detail-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(235, 164, 114, 0.1);
  height: 100%;
}

.vision-detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.vision-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #EBA472, #D4935E);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.vision-icon i {
  font-size: 1.75rem;
  color: white;
}

.vision-detail-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.vision-detail-text {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* Vision Image Cards */
.vision-image-card {
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.vision-image-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(255, 255, 255, 0.2);
}

.vision-image-placeholder {
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(235, 164, 114, 0.1), rgba(255, 255, 255, 0.08));
  border: 2px dashed rgba(235, 164, 114, 0.4);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.vision-image-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(235, 164, 114, 0.1) 50%, transparent 70%);
  pointer-events: none;
}

.vision-image-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
  color: rgba(235, 164, 114, 0.8);
  position: relative;
  z-index: 1;
}

.vision-image-placeholder h5 {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.vision-image-placeholder p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  position: relative;
  z-index: 1;
}



/* Dark Professional Background */
.bg-dark-professional {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  position: relative;
}

.bg-dark-professional::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(235, 164, 114, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* Vision Image */
.vision-image-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.vision-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
}

.vision-placeholder {
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.vision-placeholder i {
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
}

.vision-placeholder p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Stats */
.stats-row {
  margin-top: 3rem;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #EBA472;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
}

/* Goals Content */
.goals-content {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.goals-text {
  max-width: 800px;
  margin: 0 auto;
}

/* Future Goal Items */
.future-goal-item {
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(235, 164, 114, 0.1);
  height: 100%;
}

.future-goal-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.goal-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #EBA472, #D4935E);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.goal-icon i {
  font-size: 1.5rem;
  color: white;
}

.goal-content {
  flex: 1;
}

.goal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.goal-description {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

/* CTA Section */
.bg-warm-sunset {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
}

.cta-buttons .btn {
  min-width: 160px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.cta-buttons .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px; /* Smaller navbar spacing on mobile */
  }

  .hero-content {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .min-vh-75 {
    min-height: 60vh !important;
  }

  .display-4 {
    font-size: 2.5rem;
  }

  .display-5 {
    font-size: 2rem;
  }

  .display-6 {
    font-size: 1.75rem;
  }

  .py-xl-20 {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }

  .vision-detail-card,
  .future-goal-item {
    padding: 1.5rem;
  }

  .vision-image,
  .vision-placeholder {
    height: 300px;
  }

  .goals-content {
    padding: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .cta-buttons .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }

  .cta-buttons .btn:last-child {
    margin-bottom: 0;
  }

  .future-goal-item {
    flex-direction: column;
    text-align: center;
  }

  .goal-icon {
    margin: 0 auto 1rem;
  }
}

@media (max-width: 576px) {
  .vision-detail-card,
  .future-goal-item {
    padding: 1rem;
  }

  .vision-icon,
  .goal-icon {
    width: 50px;
    height: 50px;
  }

  .vision-icon i,
  .goal-icon i {
    font-size: 1.25rem;
  }

  .goals-content {
    padding: 1.5rem;
  }
}
</style>
