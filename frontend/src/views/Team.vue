<template>
  <div>
    <section class="hero-section bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div class="container text-center">
        <h1 class="text-5xl font-bold mb-6 text-gray-100">Meet Our Team</h1>
        <p class="text-xl leading-relaxed max-w-3xl mx-auto text-gray-200">
          The passionate people behind Make It Home who bring vision, expertise, and dedication to every project.
        </p>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="container">
        <div class="row justify-content-center">
          <div v-for="member in teamMembers" :key="member.name" class="col-lg-4 col-md-6 mb-4">
            <div class="card border-0 h-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="card-body text-center p-4">
                <img :src="getImageUrl(member.photo)" 
                     :alt="member.name"
                     class="rounded-circle mb-3 mx-auto" 
                     style="width: 120px; height: 120px; object-fit: cover;">
                <h5 class="card-title mb-2">{{ member.name }}</h5>
                <p class="text-primary mb-3">{{ member.title }}</p>
                <p class="card-text text-muted small mb-3">{{ truncateBio(member.bio) }}</p>
                
                <div v-if="member.tags && getTagsArray(member.tags).length > 0" class="mb-3">
                  <span v-for="tag in getTagsArray(member.tags)" :key="tag" 
                        class="badge bg-primary text-white me-1 mb-1 small">
                    {{ tag.trim() }}
                  </span>
                </div>
                
                <router-link :to="`/team/${encodeURIComponent(member.name.toLowerCase().replace(/\s+/g, '-'))}`" 
                             class="btn btn-outline-primary btn-sm">
                  View More Details
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Specialties Section -->
    <section class="py-16 bg-white" v-if="hasSpecialties">
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
          <div v-for="member in teamMembersWithSpecialties" :key="member.name" class="col-lg-4 col-md-6 mb-5" data-aos="fade-up" data-aos-delay="300">
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
                <div class="specialty-tags">
                  <span v-for="specialty in member.specialties" :key="specialty"
                        class="specialty-tag">
                    {{ specialty }}
                  </span>
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

    <!-- Social Media Section -->
    <section class="social-media-section py-5 bg-dark">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-4">
              <h2 class="text-white mb-2">Connect with Our Team</h2>
              <p class="text-white-50">Follow us on social media to stay connected with our leadership and company updates</p>
            </div>

            <!-- Social Media Cards -->
            <div class="row mb-4">
              <div class="col-md-3 mb-3">
                <div class="social-info-box">
                  <div class="info-icon">
                    <i class="fab fa-facebook-f"></i>
                  </div>
                  <h5>Facebook</h5>
                  <p>Connect with our team and see company updates and achievements.</p>
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
                  <p>See behind-the-scenes content and team highlights.</p>
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
                  <p>Get insights and thoughts from our leadership team.</p>
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
                  <p>Watch fun content and get to know our team better.</p>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Team',
  data() {
    return {
      teamMembers: []
    }
  },
  computed: {
    hasSpecialties() {
      return this.teamMembers.some(member => member.specialties && member.specialties.length > 0)
    },
    teamMembersWithSpecialties() {
      return this.teamMembers.filter(member => member.specialties && member.specialties.length > 0)
    }
  },
  async mounted() {
    await this.loadTeamMembers()
  },
  methods: {
    async loadTeamMembers() {
      try {
        console.log('=== TEAM DEBUG: Starting to load team members ===')
        
        // Try the main public content endpoint first
        const response = await axios.get('/api/admin/content/public')
        console.log('=== TEAM DEBUG: Full API response ===', response.data)
        
        if (response.data && response.data.team) {
          console.log('=== TEAM DEBUG: Found team in content ===', response.data.team)
          this.teamMembers = response.data.team
          console.log('=== TEAM DEBUG: Team members loaded ===', this.teamMembers.length)
        } else {
          console.log('=== TEAM DEBUG: No team in content, trying other endpoints ===')
          
          // Try agents endpoint as fallback
          try {
            const agentsResponse = await axios.get('/api/admin/agents')
            console.log('=== TEAM DEBUG: Agents response ===', agentsResponse.data)
            
            if (agentsResponse.data && Array.isArray(agentsResponse.data)) {
              // Filter active agents to use as team members
              this.teamMembers = agentsResponse.data.filter(agent => agent.isActive)
              console.log('=== TEAM DEBUG: Using agents as team members ===', this.teamMembers.length)
            }
          } catch (agentsError) {
            console.error('=== TEAM DEBUG: Error loading agents ===', agentsError)
            this.teamMembers = []
          }
        }
        
        console.log('=== TEAM DEBUG: Final team members count ===', this.teamMembers.length)
      } catch (error) {
        console.error('=== TEAM DEBUG: Error loading team members ===', error)
        this.teamMembers = []
      }
    },
    getTagsArray(tags) {
      if (typeof tags === 'string') {
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      return Array.isArray(tags) ? tags : []
    },
    truncateBio(bio) {
      if (!bio) return ''
      const words = bio.split(' ')
      if (words.length <= 15) return bio
      return words.slice(0, 15).join(' ') + '...'
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-person.jpg'
      if (imagePath.startsWith('http')) return imagePath
      if (imagePath.startsWith('/uploads/')) return `http://localhost:5000${imagePath}`
      return imagePath
    }
  }
}
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
}

.hero-section {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.2) 0%, transparent 50%);
  pointer-events: none;
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














