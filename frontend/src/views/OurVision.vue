<template>
  <div class="vision-page">
    <!-- Hero Section -->
    <section class="hero-section overflow-hidden inverted">
      <div class="d-flex flex-column py-15 min-vh-75 container foreground">
        <div class="row justify-content-center my-auto">
          <div class="col-lg-8 text-center">
            <span class="eyebrow mb-3 text-warm-sunset" data-aos="fade-up">Our Vision</span>
            <h1 class="fw-bold display-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              Building <span class="text-warm-sunset">Tomorrow's</span> Communities
            </h1>
            <p class="lead mb-4 text-light" data-aos="fade-up" data-aos-delay="400">
              {{ content.vision.heroSubtitle || 'Discover the vision that drives everything we do at Make It Home' }}
            </p>
            <div class="scroll-down" data-aos="fade-up" data-aos-delay="600"></div>
          </div>
        </div>
      </div>
      <figure class="background background-overlay">
      </figure>
    </section>

    <!-- Vision Statement Section -->
    <section class="py-xl-20 py-15 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5" data-aos="fade-up">
              <h2 class="display-5 fw-bold mb-4 text-dark">
                {{ content.vision.mainTitle || 'Our Vision for the Future' }}
              </h2>
              <div class="vision-statement">
                <p class="fs-4 text-muted mb-4" v-html="content.vision.statement || defaultVisionStatement"></p>
              </div>
            </div>

            <!-- Enhanced Vision Details -->
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
                  <h4 class="vision-detail-title">Changing Lives</h4>
                  <p class="vision-detail-text">Every transaction represents a life-changing moment, and we're committed to making that experience positive, transparent, and transformative.</p>
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
    <section class="py-xl-20 py-15 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5" data-aos="fade-up">
              <h2 class="display-6 fw-bold mb-4 text-dark">
                {{ content.vision.goalsTitle || 'Looking Ahead' }}
              </h2>
              <p class="lead text-muted mb-5">
                {{ content.vision.goalsDescription || 'Our commitment to growth, innovation, and community impact shapes everything we do.' }}
              </p>
            </div>

            <div class="goals-content" data-aos="fade-up" data-aos-delay="200">
              <div class="goals-text mb-5">
                <p class="fs-5 mb-4" v-html="content.vision.futureGoals || defaultFutureGoals"></p>
              </div>

              <!-- Enhanced Future Goals Details -->
              <div class="row g-4 mt-4">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="300">
                  <div class="future-goal-item">
                    <div class="goal-icon">
                      <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="goal-content">
                      <h4 class="goal-title">Sustainable Growth</h4>
                      <p class="goal-description">We're committed to expanding our reach while maintaining the personal touch and quality service that defines us. Our growth strategy focuses on building lasting relationships and creating value for every community we serve.</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="400">
                  <div class="future-goal-item">
                    <div class="goal-icon">
                      <i class="fas fa-lightbulb"></i>
                    </div>
                    <div class="goal-content">
                      <h4 class="goal-title">Innovation Leadership</h4>
                      <p class="goal-description">We're pioneering new approaches to real estate that leverage technology while preserving the human connection. From virtual tours to streamlined processes, we're making real estate more accessible and efficient.</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="500">
                  <div class="future-goal-item">
                    <div class="goal-icon">
                      <i class="fas fa-leaf"></i>
                    </div>
                    <div class="goal-content">
                      <h4 class="goal-title">Environmental Responsibility</h4>
                      <p class="goal-description">Our future includes a strong commitment to sustainable practices and eco-friendly development. We're working to create homes and communities that are both beautiful and environmentally conscious.</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="600">
                  <div class="future-goal-item">
                    <div class="goal-icon">
                      <i class="fas fa-handshake"></i>
                    </div>
                    <div class="goal-content">
                      <h4 class="goal-title">Community Partnership</h4>
                      <p class="goal-description">We envision deeper partnerships with local organizations, schools, and businesses to create thriving communities where everyone benefits from our presence and investment in the area.</p>
                    </div>
                  </div>
                </div>
              </div>
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
          ctaDescription: ''
        }
      },
      defaultVisionStatement: `At Make It Home, we envision a future where every person has access to quality housing that serves as more than just shelter—it's a foundation for building dreams, creating memories, and fostering community connections.`,
      defaultMotivation: `We're motivated by the belief that real estate should be accessible, transparent, and transformative. Every property we touch, every family we serve, and every community we impact drives us to push boundaries and redefine what's possible in real estate.`,
      defaultFutureGoals: `Our vision extends beyond today's transactions. We're building sustainable communities, pioneering innovative real estate solutions, and creating lasting partnerships that will shape the industry for generations to come.`,
      visionStats: [
        { number: '500+', label: 'Families Served' },
        { number: '50+', label: 'Properties Transformed' },
        { number: '10+', label: 'Communities Impacted' },
        { number: '100%', label: 'Commitment to Excellence' }
      ]
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
        }
      } catch (error) {
        console.error('Error loading vision content:', error)
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return ''
      if (imagePath.startsWith('http')) return imagePath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
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
}

.text-warm-sunset {
  color: #EBA472 !important;
}

.min-vh-75 {
  min-height: 50vh !important;
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

.scroll-down {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  margin: 0 auto;
  position: relative;
}

.scroll-down::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
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
