<template>
  <div class="about-us-page">
    <!-- Hero Section -->
    <section class="hero-section overflow-hidden inverted">
      <div class="d-flex flex-column py-15 min-vh-75 container foreground">
        <div class="row justify-content-center my-auto">
          <div class="col-lg-10 text-center hero-content">
            <span class="eyebrow mb-3 text-warm-sunset" data-aos="fade-up">About Make It Home</span>
            <h1 class="fw-bold display-3 mb-4" data-aos="fade-up" data-aos-delay="200">
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
      
      <!-- Smooth transition element -->
      <div class="hero-transition"></div>
    </section>

    <!-- Our Story Section -->
    <section id="our-story" class="py-xl-15 py-10 bg-light">
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

    <!-- What Makes Us Different Section -->
    <section class="py-xl-15 py-10 bg-white">
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

    <!-- Our Mission Section -->
    <section class="py-xl-15 py-10 mission-bg inverted">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center" data-aos="fade-up">
            <h2 class="display-5 fw-bold mb-5 text-white">Our Mission</h2>
            <blockquote class="mission-quote">
              <p class="display-6 fw-light text-white mb-4 lh-base">
                "Our mission is to rebuild, reimagine, and reinvest in the Omaha community by creating homes people are proud to live in."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing Statement Section -->
    <section class="py-xl-15 py-10 bg-light">
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
export default {
  name: 'AboutUs',
  mounted() {
    document.title = 'About Us - Make It Home'
  },
  methods: {
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

@media (max-width: 768px) {
  .hero-content {
    padding-top: 60px;
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

/* Hero Transition */
.hero-transition {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, transparent 0%, #f8f9fa 100%);
  z-index: 5;
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

/* Mission Section */
.mission-bg {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
}

.mission-quote {
  border: none;
  margin: 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
