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
</style>














