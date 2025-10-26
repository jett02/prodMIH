<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section overflow-hidden inverted">
      <div class="d-flex flex-column py-15 min-vh-75 container foreground">
        <div class="row justify-content-center my-auto">
          <div class="col-lg-8 text-center">
            <span class="eyebrow mb-3 text-secondary" data-aos="fade-up">About Make It Home</span>
            <h1 class="fw-bold display-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              Our <span class="text-primary">Leadership</span>
            </h1>
            <p class="lead mb-4" data-aos="fade-up" data-aos-delay="400">
              Meet the team behind Make It Home
            </p>
            <div class="scroll-down" data-aos="fade-up" data-aos-delay="600"></div>
          </div>
        </div>
      </div>
      <figure class="background background-overlay" 
              style="background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80')"
              data-top-top="transform: scale(1);" 
              data-top-bottom="transform: scale(1.05);"></figure>
    </section>

    <!-- About Content -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="text-center mb-5">
              <h2 class="display-5 fw-bold">Our Leadership Team</h2>
              <p class="lead text-muted">The people behind Make It Home's vision and mission</p>
            </div>
            
            <div class="content-section mb-5">
              <p class="fs-5" v-if="content.about.story">
                {{ content.about.story }}
              </p>
              <p class="fs-5" v-else>
                At Make It Home, we believe that finding the right property is just the beginning. 
                Whether you're looking to buy, rent, or invest, we bring the hustle to make your 
                real estate dreams a reality.
              </p>
              
              <p v-if="content.about.mission">
                {{ content.about.mission }}
              </p>
              <p v-else>
                We flip homes with intention, creating spaces people want to live in. We rent with 
                care, ensuring our tenants feel at home. And we build the kind of spaces people 
                want to stay in for years to come.
              </p>
            </div>

            <div class="row g-4 mb-5">
              <div class="col-md-4">
                <div class="text-center">
                  <div class="service-icon mb-3">
                    <i class="fas fa-home fa-3x text-primary"></i>
                  </div>
                  <h4>Property Sales</h4>
                  <p class="text-muted">Find your perfect home with our extensive property listings.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="text-center">
                  <div class="service-icon mb-3">
                    <i class="fas fa-key fa-3x text-primary"></i>
                  </div>
                  <h4>Rental Management</h4>
                  <p class="text-muted">Quality rental properties managed with care and attention.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="text-center">
                  <div class="service-icon mb-3">
                    <i class="fas fa-tools fa-3x text-primary"></i>
                  </div>
                  <h4>Home Flipping</h4>
                  <p class="text-muted">We flip homes with intention, creating spaces people love.</p>
                </div>
              </div>
            </div>

            <!-- Animated scroll indicator -->
            <div class="text-center mt-5" v-if="teamMembers && teamMembers.length > 0">
              <div class="scroll-indicator" data-aos="fade-up" data-aos-delay="200">
                <p class="text-muted mb-3">Meet our team</p>
                <div class="scroll-arrow">
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section - Using Agency Template Style -->
    <section class="py-15 py-xl-20 bg-black inverted" v-if="teamMembers && teamMembers.length > 0">
      <div class="container">
        <div class="row align-items-end mb-5">
          <div class="col-lg-6">
            <h2 class="fw-bold text-white">Meet the people behind our project.</h2>
          </div>
          <div class="col-lg-6 text-lg-end">
            <router-link to="/contact" class="action underline text-white">
              Get in touch with our team<i class="bi bi-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
        <div class="row g-2 g-lg-5">
          <div v-for="(member, index) in teamMembers" 
               :key="member._id || index" 
               class="col-12" 
               data-aos="fade-up" 
               :data-aos-delay="index * 150">
            <div class="team-member-row" :class="{ 'reverse': index % 2 === 1 }">
              <!-- Team Member Card -->
              <div class="team-member-card-container">
                <div class="card card-hover-gradient inverted team-member-card"
                     :style="{ backgroundImage: `url(${getImageUrl(member.photo)})` }">
                  <div class="card-wrap">
                    <div class="card-footer text-shadow mt-auto">
                      <h5 class="mb-0 text-white">{{ member.name }}</h5>
                      <span class="text-muted">{{ member.title }}</span>
                      <div v-if="member.linkedin" class="mt-2">
                        <a :href="member.linkedin" target="_blank" class="text-white">
                          <i class="fab fa-linkedin me-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Always Visible Bio Section -->
              <div class="bio-section-horizontal">
                <div class="bio-card-horizontal">
                  <div class="bio-content-horizontal">
                    <div class="bio-header-horizontal">
                      <h4 class="bio-name-horizontal">{{ member.name }}</h4>
                      <p class="bio-title-horizontal">{{ member.title }}</p>
                    </div>
                    <div class="bio-text" v-html="member.bio"></div>
                    <div v-if="member.linkedin" class="bio-footer-horizontal">
                      <a :href="member.linkedin" 
                         target="_blank" 
                         class="btn btn-outline-light btn-sm">
                        <i class="fab fa-linkedin me-2"></i>Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-5 bg-light" v-if="content.values && (content.values.valuesList.length > 0 || content.values.description)">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-3">{{ content.values.title || 'Our Values' }}</h2>
            <p class="lead text-muted mb-5" v-if="content.values.description">{{ content.values.description }}</p>
            
            <div class="row g-4" v-if="content.values.valuesList && content.values.valuesList.length > 0">
              <div v-for="(value, index) in content.values.valuesList" :key="index" class="col-md-6 col-lg-4">
                <div class="text-center">
                  <div class="service-icon mb-3">
                    <i :class="value.icon + ' fa-3x text-primary'"></i>
                  </div>
                  <h4>{{ value.title }}</h4>
                  <p class="text-muted">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Specialties Section -->
    <section class="py-16 bg-white" v-if="teamMembers && teamMembers.length > 0">
      <div class="container">
        <div class="text-center mb-5">
          <span class="eyebrow mb-3 text-sunset-orange" data-aos="fade-up">Our Expertise</span>
          <h2 class="display-4 fw-bold text-midnight-black mb-4" data-aos="fade-up" data-aos-delay="100">
            Team Specialties
          </h2>
          <p class="lead text-slate-gray max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Our team members bring diverse expertise and specialized knowledge to serve all your real estate needs.
          </p>
        </div>

        <div class="row justify-content-center">
          <div v-for="member in teamMembers" :key="member.name" class="col-lg-4 col-md-6 mb-5" data-aos="fade-up" data-aos-delay="300">
            <div class="specialty-card h-100">
              <div class="specialty-card-header">
                <div class="specialty-member-photo">
                  <img :src="getImageUrl(member.photo)"
                       :alt="member.name"
                       class="rounded-circle">
                </div>
                <div class="specialty-member-info">
                  <h4 class="specialty-member-name">{{ member.name }}</h4>
                  <p class="specialty-member-title">{{ member.title }}</p>
                  <a v-if="member.linkedin" :href="member.linkedin" target="_blank" class="linkedin-link">
                    <i class="fab fa-linkedin"></i> Connect on LinkedIn
                  </a>
                </div>
              </div>
              <div class="specialty-card-body">
                <h5 class="specialty-section-title">Areas of Expertise</h5>
                <div class="specialty-tags" v-if="member.specialties && member.specialties.length > 0">
                  <span v-for="specialty in member.specialties" :key="specialty"
                        class="specialty-tag">
                    {{ specialty }}
                  </span>
                </div>
                <div v-else class="text-muted text-center">
                  <small>Specialties will be displayed here when added in admin</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="400">
          <p class="lead text-slate-gray mb-4">
            Ready to work with our specialized team?
          </p>
          <router-link to="/contact" class="btn btn-sunset-orange btn-lg me-3">
            Contact Our Team
          </router-link>
          <router-link to="/properties" class="btn btn-outline-midnight-black btn-lg">
            View Properties
          </router-link>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-15 py-xl-20">
      <div class="container">
        <div class="row g-4 g-xl-6">
          <div class="col-lg-6" data-aos="fade-up">
            <div class="card h-100 border card-arrow">
              <div class="card-body">
                <h4 class="card-title fw-light fs-4">
                  <span class="fw-bold">Let's connect.</span> Follow us on social media.
                </h4>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <router-link to="/contact" class="card card-arrow bg-primary inverted overflow-hidden text-decoration-none">
              <div class="card-body">
                <h4 class="card-title fw-light fs-4 text-white">
                  We'd love to <span class="fw-bold">get in touch</span> with you and your team.
                </h4>
              </div>
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
  name: 'OurLeadership',
  data() {
    return {
      content: {
        about: {
          story: '',
          mission: ''
        },
        values: {
          title: 'Our Values',
          description: '',
          valuesList: []
        }
      },
      teamMembers: [],
      expandedBio: null
    }
  },
  async mounted() {
    document.title = 'Our Leadership - Make It Home'
    await this.loadContent()
  },
  methods: {
    async loadContent() {
      try {
        const response = await axios.get('/api/admin/content/public')
        console.log('About page - Full content response:', response.data)
        
        this.content = response.data || { 
          about: { story: '', mission: '' },
          values: { title: 'Our Values', description: '', valuesList: [] }
        }
        
        // Load team members from the content response
        if (response.data && response.data.team && Array.isArray(response.data.team)) {
          this.teamMembers = response.data.team
          console.log('Team members loaded from content:', this.teamMembers.length)
        } else {
          console.log('No team data found in content, trying agents as fallback')
          // Try loading agents as fallback
          try {
            const agentsResponse = await axios.get('/api/admin/agents')
            if (agentsResponse.data && Array.isArray(agentsResponse.data)) {
              this.teamMembers = agentsResponse.data.filter(agent => agent.isActive)
              console.log('Team members loaded from agents:', this.teamMembers.length)
            }
          } catch (agentsError) {
            console.error('Error loading agents as team:', agentsError)
            this.teamMembers = []
          }
        }
      } catch (error) {
        console.error('Error loading content:', error)
        this.content = { 
          about: { story: '', mission: '' },
          values: { title: 'Our Values', description: '', valuesList: [] }
        }
        this.teamMembers = []
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-person.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `http://localhost:5000${imagePath}`
    },
    toggleBio(index) {
      this.expandedBio = this.expandedBio === index ? null : index
    },
    
    truncateBio(bio) {
      if (!bio) return ''
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = bio
      const text = tempDiv.textContent || tempDiv.innerText || ''
      const words = text.split(' ')
      if (words.length <= 15) return bio
      return words.slice(0, 15).join(' ') + '...'
    }
  }
}
</script>

<style scoped>
.about-page {
  background-color: #f8f9fa; /* Soft gray background */
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #EBA472 0%, #A15E3B 100%);
  position: relative;
}

.min-vh-75 {
  min-height: 50vh !important;
}

.service-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Agency Template Styles */
.py-15 {
  padding-top: 4rem !important;
  padding-bottom: 4rem !important;
}

.py-xl-20 {
  padding-top: 8rem !important;
  padding-bottom: 8rem !important;
}

.bg-black {
  background-color: #000000 !important;
}

.inverted {
  color: #ffffff !important;
}

.team-member-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  min-height: 300px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  transition: opacity 0.3s ease;
}

.team-member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.team-member-card:hover::before {
  opacity: 0.9;
}

.card-hover-gradient {
  position: relative;
}

.card-wrap {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.card-footer {
  margin-top: auto;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.equal-1-1 {
  aspect-ratio: 1 / 1;
}

.equal-lg-3-4 {
  aspect-ratio: 3 / 4;
}

@media (min-width: 992px) {
  .equal-lg-3-4 {
    aspect-ratio: 3 / 4;
  }
}

.action {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.action:hover {
  color: #EBA472;
}

.underline {
  text-decoration: underline !important;
}

.bi {
  font-family: 'bootstrap-icons';
}

.bi-arrow-right::before {
  content: "→";
}

.card-arrow {
  position: relative;
  transition: transform 0.3s ease;
}

.card-arrow:hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .py-15 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  
  .team-member-card {
    min-height: 250px;
  }
}

.team-member-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.team-member-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 4rem;
  min-height: 450px;
}

.team-member-row.reverse {
  flex-direction: row-reverse;
}

.team-member-card-container {
  flex: 0 0 320px;
  z-index: 2;
}

.team-member-card {
  width: 320px;
  height: 450px;
  border-radius: 16px;
  transition: all 0.3s ease;
  background-size: cover;
  background-position: center;
  position: relative;
}

.team-member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.bio-section-horizontal {
  flex: 1;
  margin-left: 2rem;
  opacity: 1;
  animation: slideInRight 0.8s ease-out;
}

.team-member-row.reverse .bio-section-horizontal {
  margin-left: 0;
  margin-right: 2rem;
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.bio-card-horizontal {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  height: 450px;
  display: flex;
  flex-direction: column;
}

.bio-content-horizontal {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bio-header-horizontal {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.bio-name-horizontal {
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.bio-title-horizontal {
  color: #EBA472;
  font-size: 1.1rem;
  margin-bottom: 0;
  font-weight: 500;
}

.bio-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1rem;
  flex: 1;
  margin-bottom: 1.5rem;
  overflow-y: auto;
  max-height: 280px;
  padding-right: 8px;
}

/* Custom Scrollbar */
.bio-text::-webkit-scrollbar {
  width: 6px;
}

.bio-text::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.bio-text::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #EBA472, #d4926a);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.bio-text::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #d4926a, #EBA472);
  box-shadow: 0 2px 8px rgba(235, 164, 114, 0.3);
}

/* Firefox scrollbar */
.bio-text {
  scrollbar-width: thin;
  scrollbar-color: #EBA472 rgba(255, 255, 255, 0.1);
}

.bio-text p {
  margin-bottom: 1rem;
}

.bio-text ul, 
.bio-text ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.bio-text strong {
  color: #ffffff;
  font-weight: 600;
}

.bio-text em {
  color: #EBA472;
}

.bio-footer-horizontal {
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.bio-footer-horizontal .btn {
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  transition: all 0.3s ease;
}

.bio-footer-horizontal .btn:hover {
  background-color: #EBA472;
  border-color: #EBA472;
  color: #ffffff;
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .team-member-row,
  .team-member-row.reverse {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .team-member-card-container {
    flex: none;
    margin-bottom: 2rem;
  }
  
  .bio-section-horizontal {
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
    width: 100%;
  }
  
  .bio-card-horizontal {
    height: auto;
    min-height: 300px;
    max-height: 400px;
    overflow: hidden;
    padding: 1.5rem;
  }
  
  .bio-text {
    max-height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-right: 8px;
    margin-bottom: 1rem;
  }
  
  /* Ensure proper spacing between team members */
  .team-member-wrapper {
    margin-bottom: 3rem;
    overflow: hidden;
  }
}

@media (max-width: 768px) {
  .team-member-card {
    width: 300px;
    height: 400px;
  }
  
  .team-member-card-container {
    flex: 0 0 300px;
  }
  
  .bio-card-horizontal {
    padding: 1.5rem;
    max-height: 350px;
  }
  
  .bio-text {
    font-size: 0.9rem;
    max-height: 180px;
    line-height: 1.6;
  }
  
  /* Add clear separation between sections */
  .py-15 {
    padding-bottom: 4rem !important;
  }
}

@media (max-width: 576px) {
  .bio-card-horizontal {
    padding: 1rem;
    max-height: 300px;
  }
  
  .bio-text {
    max-height: 150px;
    font-size: 0.85rem;
  }
  
  .team-member-card {
    width: 280px;
    height: 350px;
  }
}

/* Scroll indicator animation */
.scroll-indicator {
  animation: fadeInUp 2s ease-in-out;
}

.scroll-arrow {
  display: inline-block;
  animation: bounce 2s infinite;
}

.scroll-arrow i {
  font-size: 1.5rem;
  color: #EBA472;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hero Section Animations */
.hero-section {
  position: relative;
}

.scroll-down {
  transform: rotate(-45deg);
  position: absolute;
  bottom: 40px;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border-left: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  animation: scrollDown 1.4s infinite;
  z-index: 8;
}

@keyframes scrollDown {
  0% {
    transform: rotate(-45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(-45deg) translate(-100%, 100%);
    opacity: 0;
  }
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #EBA472;
}

/* Text animations */
.display-4 {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-primary {
  color: #EBA472 !important;
  -webkit-text-fill-color: #EBA472 !important;
}

/* Enhanced background with subtle parallax */
.background {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive adjustments for hero */
@media (max-width: 768px) {
  .min-vh-75 {
    min-height: 60vh !important;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
}
/* Team Specialties Section */
.specialty-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid rgba(235, 164, 114, 0.1);
}

.specialty-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(235, 164, 114, 0.3);
}

.specialty-card-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid rgba(235, 164, 114, 0.1);
}

.specialty-member-photo {
  margin-bottom: 1rem;
}

.specialty-member-photo img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 3px solid #EBA472;
  transition: transform 0.3s ease;
}

.specialty-card:hover .specialty-member-photo img {
  transform: scale(1.05);
}

.specialty-member-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.specialty-member-title {
  color: #6c757d;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.linkedin-link {
  color: #0077b5;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.linkedin-link:hover {
  color: #005885;
  text-decoration: none;
}

.linkedin-link i {
  margin-right: 0.5rem;
}

.specialty-card-body {
  padding: 1.5rem 2rem 2rem;
}

.specialty-section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-align: center;
}

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.specialty-tag {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(235, 164, 114, 0.3);
}

.specialty-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(235, 164, 114, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .specialty-card-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .specialty-card-body {
    padding: 1rem 1.5rem 1.5rem;
  }

  .specialty-member-photo img {
    width: 70px;
    height: 70px;
  }

  .specialty-member-name {
    font-size: 1.1rem;
  }

  .specialty-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

/* Eyebrow styling */
.eyebrow {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

.text-sunset-orange {
  color: #EBA472;
}

.btn-sunset-orange {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border: none;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(235, 164, 114, 0.3);
}

.btn-sunset-orange:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.4);
  color: white;
}

.btn-outline-midnight-black {
  border: 2px solid #1a1a1a;
  color: #1a1a1a;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-outline-midnight-black:hover {
  background: #1a1a1a;
  color: white;
  transform: translateY(-2px);
}

.text-midnight-black {
  color: #1a1a1a;
}

.text-slate-gray {
  color: #6c757d;
}

.max-w-3xl {
  max-width: 48rem;
}

</style>































