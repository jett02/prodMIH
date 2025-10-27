<template>
  <div class="about-us-page">
    <!-- Hero Section -->
    <section class="hero-section overflow-hidden inverted">
      <div class="d-flex flex-column py-15 min-vh-75 container foreground">
        <div class="row justify-content-center my-auto">
          <div class="col-lg-10 text-center hero-content">
            <span class="eyebrow mb-3 text-warm-sunset" data-aos="fade-up">About Make It Home</span>
            <h1 class="fw-bold display-3 mb-4 hero-title" data-aos="fade-up" data-aos-delay="200">
              We're not a <span class="text-warm-sunset">real estate company.</span><br>
              We're a <span class="text-warm-sunset">movement</span> disguised as one.
            </h1>
            <p class="lead mb-4 text-light" data-aos="fade-up" data-aos-delay="400">
              Built from the ground up with a deep belief that homes can change lives
            </p>
            
            <!-- Scroll Indicator -->
            <div class="scroll-indicator-container" data-aos="fade-up" data-aos-delay="600">
              <p class="scroll-text mb-3">Discover Our Story</p>
              <div class="scroll-arrow" @click="scrollToStory">
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
      
      <!-- Enhanced smooth transition element -->
      <div class="hero-transition"></div>
    </section>

    <!-- Our Story Section -->
    <section id="our-story" class="py-xl-20 py-15 story-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5" data-aos="fade-up">
              <h2 class="display-5 fw-bold mb-4 text-dark">Our Story</h2>
              <div class="divider mx-auto mb-5"></div>
            </div>
            
            <div class="story-content" data-aos="fade-up" data-aos-delay="200">
              <p class="fs-4 text-dark mb-4 lh-lg">
                Make It Home, LLC was built from the ground up, not just with nails and drywall, but with a deep belief that homes can change lives. We aren't interested in flipping houses for fast cash or renting units just to fill space. We are builders of opportunity, architects of change, and fierce believers in what happens when people are finally given a space that reflects their worth.
              </p>
              
              <p class="fs-4 text-dark mb-4 lh-lg">
                We buy properties that others overlook, homes with history, edges, and flaws, and we breathe new life into them. Then, we hand those homes back to the community, one buyer or renter at a time. The result is a property that's no longer forgotten. A tenant who finally feels proud to walk through their first door. A neighborhood that starts to rise again, one house at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Mission Section -->
    <section class="py-xl-30 py-25 mission-bg inverted">
      <div class="container">
        <div class="row align-items-center">
          <!-- Mission Text Column -->
          <div class="col-lg-7 mb-5 mb-lg-0" data-aos="fade-right">
            <h2 class="display-3 fw-bold mb-6 text-white">Our Mission</h2>
            <div class="mission-content">
              <blockquote class="mission-quote-new">
                <p class="mission-text-new text-white mb-4">
                  "Our mission is to rebuild, reimagine, and reinvest in the Omaha community by creating homes people are proud to live in."
                </p>
              </blockquote>
              <div class="mission-details">
                <p class="text-light fs-5 mb-0 lh-lg">
                  We believe every family deserves a home that reflects their worth and contributes to a thriving community. Through thoughtful renovation and community investment, we're building more than houses, we're building hope.
                </p>
              </div>
            </div>
          </div>

          <!-- Mission Image Column -->
          <div class="col-lg-5" data-aos="fade-left" data-aos-delay="200">
            <div class="mission-image-container">
              <img v-if="content.aboutUs && content.aboutUs.missionImage"
                   :src="getImageUrl(content.aboutUs.missionImage)"
                   alt="Our Mission"
                   class="mission-image">
              <div v-else class="mission-placeholder">
                <i class="fas fa-home fa-4x text-warm-sunset mb-3"></i>
                <p class="text-light mb-0">Mission Image</p>
                <small class="text-muted">Upload via admin panel</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What Makes Us Different Section -->
    <section class="py-xl-20 py-15 different-section">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center" data-aos="fade-up">
            <h2 class="display-5 fw-bold mb-4 text-dark">What Makes Us Different</h2>
            <p class="lead text-dark mb-5">What makes us different is simple: we care too much to cut corners.</p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Design with Intention -->
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div class="difference-card h-100">
              <div class="difference-icon">
                <i class="fas fa-drafting-compass"></i>
              </div>
              <h4 class="difference-title">We design with intention</h4>
              <p class="difference-description">Every space is thoughtfully planned to create homes that truly serve the people who live in them.</p>
            </div>
          </div>

          <!-- Real Craftsmanship -->
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="difference-card h-100">
              <div class="difference-icon">
                <i class="fas fa-hammer"></i>
              </div>
              <h4 class="difference-title">We renovate with real craftsmanship</h4>
              <p class="difference-description">Quality work that stands the test of time, because homes should be built to last.</p>
            </div>
          </div>

          <!-- Rent with Empathy -->
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div class="difference-card h-100">
              <div class="difference-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h4 class="difference-title">We rent with empathy</h4>
              <p class="difference-description">Understanding that a home is more than four walls - it's where life happens.</p>
            </div>
          </div>

          <!-- Operate with Backbone -->
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
            <div class="difference-card h-100">
              <div class="difference-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h4 class="difference-title">We operate with backbone</h4>
              <p class="difference-description">Standing firm in our values and commitment to doing what's right for our community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Closing Statement Section -->
    <section class="py-xl-20 py-15 closing-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center" data-aos="fade-up">
            <p class="fs-3 text-dark mb-5 lh-lg fw-light">
              There's no corporate gloss here, just grit, love, and a relentless work ethic that fuels our flips, funds our future, and helps our people make it home.
            </p>
            
            <div class="cta-buttons" data-aos="fade-up" data-aos-delay="200">
              <router-link to="/properties" class="btn btn-sunset-orange btn-lg me-3 mb-3">
                View Our Properties
              </router-link>
              <router-link to="/contact" class="btn btn-outline-dark btn-lg mb-3">
                Get In Touch
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
  name: 'AboutUs',
  data() {
    return {
      content: {
        aboutUs: {
          missionImage: ''
        }
      }
    }
  },
  async mounted() {
    document.title = 'About Us - Make It Home'
    await this.loadContent()
  },
  methods: {
    async loadContent() {
      try {
        const response = await axios.get('/api/admin/content/public')
        this.content = response.data || { aboutUs: { missionImage: '' } }
      } catch (error) {
        console.error('Error loading content:', error)
        this.content = { aboutUs: { missionImage: '' } }
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return ''
      if (imagePath.startsWith('http')) return imagePath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
    },
    scrollToStory() {
      const element = document.getElementById('our-story')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
/* Hero Section Styles */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  min-height: 75vh;
  display: flex;
  align-items: center;
}

.hero-content {
  padding-top: 80px;
  z-index: 10;
  position: relative;
}

/* Hero Title Enhanced Visibility */
.hero-title {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5);
  color: #ffffff !important;
  font-weight: 800 !important;
  letter-spacing: -0.02em;
}

.hero-title .text-warm-sunset {
  color: #EBA472 !important;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 25px rgba(235, 164, 114, 0.3);
}

@media (max-width: 768px) {
  .hero-content {
    padding-top: 60px;
  }

  .hero-title {
    font-size: 2.5rem !important;
    line-height: 1.2;
  }
}

/* Animated Background */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.bg-layer {
  position: absolute;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at center, rgba(235, 164, 114, 0.1) 0%, transparent 70%);
  animation: float-slow 20s ease-in-out infinite;
}

.bg-layer-2 {
  animation-duration: 15s;
  animation-delay: -5s;
  background: radial-gradient(circle at 30% 70%, rgba(212, 147, 94, 0.08) 0%, transparent 60%);
}

.bg-layer-3 {
  animation-duration: 12s;
  animation-delay: -10s;
  background: radial-gradient(circle at 70% 30%, rgba(235, 164, 114, 0.06) 0%, transparent 50%);
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(235, 164, 114, 0.1) 0%, transparent 70%);
  animation: float-slow 8s ease-in-out infinite;
}

.floating-element-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-element-2 {
  top: 60%;
  right: 15%;
  animation-delay: -3s;
  animation-duration: 10s;
}

.floating-element-3 {
  bottom: 30%;
  left: 60%;
  animation-delay: -6s;
  animation-duration: 12s;
}

/* Scroll Indicator */
.scroll-indicator-container {
  margin-top: 2rem;
}

.scroll-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  animation: fade-pulse 2s ease-in-out infinite;
}

.scroll-arrow {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: bounce 2s infinite;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(235, 164, 114, 0.3);
}

.scroll-arrow:hover {
  transform: translateY(-5px) scale(1.1);
  animation: pulse-glow 3s infinite;
}

.scroll-arrow i {
  color: white;
  font-size: 1.2rem;
}

/* Enhanced Hero Transition */
.hero-transition {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom,
    transparent 0%,
    rgba(248, 249, 250, 0.1) 20%,
    rgba(248, 249, 250, 0.3) 40%,
    rgba(248, 249, 250, 0.6) 60%,
    rgba(248, 249, 250, 0.8) 80%,
    #f8f9fa 100%);
  z-index: 5;
}

/* Story Section Enhanced Background */
.story-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  position: relative;
}

.story-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom,
    rgba(26, 26, 26, 0.05) 0%,
    transparent 100%);
  z-index: 1;
}

.story-section .container {
  position: relative;
  z-index: 2;
}

/* Different Section Enhanced Background */
.different-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  position: relative;
}

/* Closing Section Enhanced Background */
.closing-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
  position: relative;
}

/* Content Sections */
.divider {
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #EBA472, #D4935E);
  border-radius: 2px;
}

.story-content p {
  text-align: justify;
  line-height: 1.8;
}

/* Difference Cards */
.difference-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(235, 164, 114, 0.1);
}

.difference-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.difference-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.difference-icon i {
  font-size: 2rem;
  color: white;
}

.difference-title {
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.difference-description {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 0;
}

/* Enhanced Mission Section */
.mission-bg {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  margin: 0;
}

/* New Mission Content Styling */
.mission-content {
  padding-right: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mission-quote-new {
  border: none;
  margin: 0 0 3rem 0;
  padding: 0;
  background: none;
  border-left: 4px solid #EBA472;
  padding-left: 2.5rem;
}

.mission-text-new {
  font-size: 2rem;
  font-style: italic;
  line-height: 1.4;
  font-weight: 300;
  margin-bottom: 2rem;
}

.mission-details {
  padding-left: 2.5rem;
  margin-top: 1.5rem;
}

/* Mission Image Styling */
.mission-image-container {
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.mission-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.mission-image:hover {
  transform: scale(1.05);
}

.mission-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(235, 164, 114, 0.3);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  backdrop-filter: blur(10px);
}

.text-warm-sunset {
  color: #EBA472 !important;
}

/* Responsive Design */
@media (max-width: 991px) {
  .mission-content {
    padding-right: 0;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 3rem;
  }

  .mission-text-new {
    font-size: 1.75rem;
  }

  .mission-image-container {
    height: 400px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .mission-quote-new {
    padding-left: 2rem;
    border-left-width: 3px;
    margin-bottom: 2.5rem;
  }

  .mission-text-new {
    font-size: 1.5rem;
  }

  .mission-details {
    padding-left: 2rem;
  }

  .mission-image-container {
    height: 350px;
  }

  .mission-content {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

/* CTA Buttons */
.cta-buttons .btn {
  min-width: 200px;
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-sunset-orange {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border: none;
  color: white;
}

.btn-sunset-orange:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(235, 164, 114, 0.4);
  color: white;
}

.btn-outline-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
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
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .scroll-arrow {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .scroll-text {
    font-size: 0.75rem;
  }
  
  .difference-card {
    padding: 2rem 1.5rem;
  }
  
  .difference-icon {
    width: 60px;
    height: 60px;
  }
  
  .difference-icon i {
    font-size: 1.5rem;
  }
  
  .cta-buttons .btn {
    min-width: 180px;
    margin-bottom: 1rem;
  }
}
</style>
