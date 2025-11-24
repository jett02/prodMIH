<template>
  <div class="admin-page">
    <AdminNavbar />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-primary">Agent Management</h1>
          <p class="text-gray-300">Manage your real estate agents</p>
        </div>
        <button @click="showAddForm = true" class="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
          + Add New Agent
        </button>
      </div>

      <!-- Agents Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="agent in agents" :key="agent._id"
             class="agent-card bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary">
          <!-- Agent Photo -->
          <div class="relative">
            <div class="h-32 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <img :src="getImageUrl(agent.photo)"
                   class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                   @error="handleImageError" />
            </div>
            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <span class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="agent.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ agent.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <!-- Agent Info -->
          <div class="p-6 text-center">
            <h3 class="font-bold text-xl text-gray-900 mb-1">{{ agent.name }}</h3>
            <p class="text-primary font-medium mb-3">{{ agent.title }}</p>

            <!-- Contact Info -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-center text-sm text-gray-600">
                <i class="fas fa-envelope mr-2 text-primary"></i>
                <span class="truncate">{{ agent.email }}</span>
              </div>
              <div class="flex items-center justify-center text-sm text-gray-600">
                <i class="fas fa-phone mr-2 text-primary"></i>
                <span>{{ agent.phone }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button @click="editAgent(agent)"
                      class="flex-1 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                <i class="fas fa-edit mr-1"></i>Edit
              </button>
              <button @click="deleteAgent(agent._id)"
                      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                <i class="fas fa-trash mr-1"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Agent Modal -->
      <div v-if="showAddForm || editingAgent" class="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold">
                  {{ editingAgent ? 'Edit Agent' : 'Add New Agent' }}
                </h3>
                <p class="text-blue-100 text-sm">
                  {{ editingAgent ? 'Update agent information' : 'Create a new agent profile' }}
                </p>
              </div>
              <button @click="closeForm" class="text-white hover:text-gray-200 transition-colors">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="overflow-y-auto max-h-[calc(80vh-100px)] p-6">

          <form @submit.prevent="saveAgent" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input v-model="agentForm.name" type="text" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input v-model="agentForm.title" type="text" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input v-model="agentForm.email" type="email" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input v-model="agentForm.phone" type="tel" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <input @change="handlePhotoUpload" type="file" accept="image/*"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <img v-if="agentForm.photo" :src="getImageUrl(agentForm.photo)" class="mt-2 h-20 w-20 rounded-full object-cover">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Agency Logo</label>
              <input @change="handleAgencyLogoUpload" type="file" accept="image/*"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <img v-if="agentForm.agencyLogo" :src="getImageUrl(agentForm.agencyLogo)" class="mt-2 h-12 w-auto max-w-24 object-contain border rounded">
              <p class="text-xs text-gray-500 mt-1">Upload the logo of the agency this agent works for</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea v-model="agentForm.bio" rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input v-model="agentForm.company" type="text"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">License #</label>
                <input v-model="agentForm.license" type="text"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="agentForm.isActive"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>

            <div class="flex justify-end space-x-4 pt-4">
              <button type="button" @click="closeForm" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                {{ saving ? 'Saving...' : 'Save Agent' }}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import axios from 'axios'

export default {
  name: 'AdminAgents',
  components: {
    AdminNavbar
  },
  data() {
    return {
      agents: [],
      showAddForm: false,
      editingAgent: null,
      saving: false,
      agentForm: {
        name: '',
        title: '',
        email: '',
        phone: '',
        photo: '',
        agencyLogo: '',
        bio: '',
        company: 'Make It Home',
        license: '',
        isActive: true
      }
    }
  },
  async mounted() {
    // Ensure auth header is set
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    await this.loadAgents()
  },
  methods: {
    async loadAgents() {
      try {
        const response = await axios.get('/api/admin/agents')
        this.agents = response.data
      } catch (error) {
        console.error('Error loading agents:', error)
      }
    },
    
    editAgent(agent) {
      this.editingAgent = agent
      this.agentForm = { ...agent }
    },
    
    closeForm() {
      this.showAddForm = false
      this.editingAgent = null
      this.resetForm()
    },
    
    resetForm() {
      this.agentForm = {
        name: '',
        title: '',
        email: '',
        phone: '',
        agencyLogo: '',
        bio: '',
        company: 'Make It Home',
        license: '',
        isActive: true
      }
    },
    
    async handlePhotoUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const formData = new FormData()
      formData.append('photo', file)

      try {
        const response = await axios.post('/api/admin/agents/upload-photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.agentForm.photo = response.data.photoUrl
      } catch (error) {
        console.error('Error uploading photo:', error)
        alert('Error uploading photo. Please try again.')
      }
    },

    async handleAgencyLogoUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const formData = new FormData()
      formData.append('agencyLogo', file)

      try {
        const response = await axios.post('/api/admin/agents/upload-agency-logo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.agentForm.agencyLogo = response.data.logoUrl
      } catch (error) {
        console.error('Error uploading agency logo:', error)
        alert('Error uploading agency logo. Please try again.')
      }
    },
    
    async saveAgent() {
      this.saving = true
      try {
        if (this.editingAgent) {
          await axios.put(`/api/admin/agents/${this.editingAgent._id}`, this.agentForm)
        } else {
          await axios.post('/api/admin/agents', this.agentForm)
        }
        
        await this.loadAgents()
        this.closeForm()
        alert('Agent saved successfully!')
      } catch (error) {
        console.error('Error saving agent:', error)
        alert('Error saving agent. Please try again.')
      }
      this.saving = false
    },
    
    async deleteAgent(agentId) {
      if (confirm('Are you sure you want to delete this agent?')) {
        try {
          await axios.delete(`/api/admin/agents/${agentId}`)
          await this.loadAgents()
          alert('Agent deleted successfully!')
        } catch (error) {
          console.error('Error deleting agent:', error)
          alert('Error deleting agent. Please try again.')
        }
      }
    },
    
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-person.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `http://localhost:5000${imagePath}`
    },
    
    handleImageError(event) {
      event.target.src = '/placeholder-person.jpg'
    }
  }
}
</script>
