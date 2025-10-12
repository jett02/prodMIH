<template>
  <div class="pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white py-20">
      <div class="container">
        <div class="max-w-4xl mx-auto text-center">
          <img :src="getImageUrl(member.photo)" 
               :alt="member.name"
               class="team-profile-photo mx-auto mb-8">
          <h1 class="text-5xl font-bold mb-4 text-gray-100">
            {{ member.name }}
          </h1>
          <p class="text-2xl text-blue-300 font-semibold mb-4">{{ member.title }}</p>

          <!-- Employee Tags -->
          <div v-if="member.tags && getTagsArray(member.tags).length > 0" class="mb-8">
            <span v-for="tag in getTagsArray(member.tags)" :key="tag" 
                  class="badge bg-primary bg-opacity-75 text-white me-2 mb-2 px-3 py-2">
              {{ tag.trim() }}
            </span>
          </div>

          <!-- Contact Buttons -->
          <div class="flex justify-center space-x-4 mb-8">
            <a v-if="member.email" :href="`mailto:${member.email}`" 
               class="btn btn-primary">
              <i class="fas fa-envelope me-2"></i>Email
            </a>
            <a v-if="member.phone" :href="`tel:${member.phone}`" 
               class="btn btn-outline-primary">
              <i class="fas fa-phone me-2"></i>Call
            </a>
            <a v-if="member.linkedin" :href="member.linkedin" target="_blank" 
               class="btn btn-outline-primary">
              <i class="fab fa-linkedin me-2"></i>LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Bio Section -->
    <section class="py-20 bg-white">
      <div class="container">
        <div class="max-w-4xl mx-auto">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="bg-gray-50 rounded-lg p-8 shadow-lg">
                <h2 class="text-3xl font-bold mb-6 text-primary">About {{ member.name.split(' ')[0] }}</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-8">{{ member.bio }}</p>
                
                <!-- Contact Info Cards -->
                <div class="row">
                  <div class="col-md-4 mb-4" v-if="member.email">
                    <div class="text-center p-4 bg-white rounded-lg shadow">
                      <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-envelope text-white"></i>
                      </div>
                      <h5 class="font-semibold text-primary mb-2">Email</h5>
                      <a :href="`mailto:${member.email}`" class="text-gray-600 hover:text-primary text-sm">
                        {{ member.email }}
                      </a>
                    </div>
                  </div>
                  
                  <div class="col-md-4 mb-4" v-if="member.phone">
                    <div class="text-center p-4 bg-white rounded-lg shadow">
                      <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-phone text-white"></i>
                      </div>
                      <h5 class="font-semibold text-primary mb-2">Phone</h5>
                      <a :href="`tel:${member.phone}`" class="text-gray-600 hover:text-primary text-sm">
                        {{ member.phone }}
                      </a>
                    </div>
                  </div>
                  
                  <div class="col-md-4 mb-4" v-if="member.linkedin">
                    <div class="text-center p-4 bg-white rounded-lg shadow">
                      <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fab fa-linkedin text-white"></i>
                      </div>
                      <h5 class="font-semibold text-primary mb-2">LinkedIn</h5>
                      <a :href="member.linkedin" target="_blank" class="text-gray-600 hover:text-primary text-sm">
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Back to About -->
          <div class="text-center mt-12">
            <router-link to="/about" class="btn btn-outline-primary">
              <i class="fas fa-arrow-left me-2"></i>Back to About
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
  name: 'TeamMember',
  data() {
    return {
      member: {
        name: '',
        title: '',
        bio: '',
        photo: '',
        email: '',
        phone: '',
        linkedin: '',
        tags: ''
      }
    }
  },
  async mounted() {
    await this.loadTeamMember()
  },
  watch: {
    '$route': {
      handler() {
        this.loadTeamMember()
      },
      immediate: true
    }
  },
  methods: {
    async loadTeamMember() {
      try {
        const response = await axios.get('/api/admin/content/public')
        const memberSlug = this.$route.params.name
        const memberName = decodeURIComponent(memberSlug).replace(/-/g, ' ')
        
        console.log('Looking for member:', memberName)
        console.log('Available team members:', response.data?.team)
        
        if (response.data && response.data.team) {
          const foundMember = response.data.team.find(m => 
            m.name.toLowerCase() === memberName.toLowerCase()
          )
          
          if (foundMember) {
            this.member = foundMember
            console.log('Found member:', foundMember)
            return
          }
        }
        
        console.log('Member not found, redirecting to team page')
        this.$router.replace('/team')
      } catch (error) {
        console.error('Error loading team member:', error)
        this.$router.replace('/team')
      }
    },
    getTagsArray(tags) {
      if (typeof tags === 'string') {
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      return Array.isArray(tags) ? tags : []
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
.team-profile-photo {
  width: 300px;
  height: 300px;
  border-radius: 40%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 0 0 2px rgba(249, 115, 22, 0.4),
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  margin-top: 2rem;
}

.team-profile-photo:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 0 0 3px rgba(249, 115, 22, 0.6),
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 12px 24px rgba(0, 0, 0, 0.3);
}

.team-profile-photo::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f97316, #ea580c, #f97316);
  z-index: -1;
  opacity: 0.7;
  filter: blur(8px);
}
</style>










