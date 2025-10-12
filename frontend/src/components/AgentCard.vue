<template>
  <div v-if="agent" class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <i class="fas fa-user-tie text-primary mr-2"></i>
      Listing Agent
    </h4>
    
    <div class="flex items-start space-x-4">
      <!-- Agent Photo -->
      <div class="flex-shrink-0">
        <img :src="getImageUrl(agent.photo)" 
             :alt="agent.name"
             class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
             @error="handleImageError">
      </div>
      
      <!-- Agent Info -->
      <div class="flex-grow">
        <h5 class="font-semibold text-gray-900">{{ agent.name }}</h5>
        <p class="text-sm text-primary font-medium">{{ agent.title }}</p>
        <p v-if="agent.company" class="text-sm text-gray-600">{{ agent.company }}</p>
        
        <!-- Contact Info -->
        <div class="mt-3 space-y-1">
          <a :href="`mailto:${agent.email}`" 
             class="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
            <i class="fas fa-envelope w-4 mr-2"></i>
            {{ agent.email }}
          </a>
          <a :href="`tel:${agent.phone}`" 
             class="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
            <i class="fas fa-phone w-4 mr-2"></i>
            {{ agent.phone }}
          </a>
        </div>
        
        <!-- Contact Buttons -->
        <div class="mt-4 flex space-x-2">
          <a :href="`mailto:${agent.email}`" 
             class="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
            <i class="fas fa-envelope mr-1"></i>Email
          </a>
          <a :href="`tel:${agent.phone}`" 
             class="bg-warm-sunset text-white px-3 py-1 rounded text-sm hover:bg-sienna-brown transition-colors">
            <i class="fas fa-phone mr-1"></i>Call
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentCard',
  props: {
    agent: {
      type: Object,
      default: null
    }
  },
  methods: {
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-person.jpg'
      if (imagePath.startsWith('http')) return imagePath
      if (imagePath.startsWith('/uploads/')) {
        return `http://localhost:5000${imagePath}`
      }
      return `http://localhost:5000${imagePath}`
    },
    
    handleImageError(event) {
      event.target.src = '/placeholder-person.jpg'
    }
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #3b82f6;
}

.text-primary {
  color: #3b82f6;
}

.bg-warm-sunset {
  background-color: #EBA472;
}

.bg-sienna-brown {
  background-color: #A15E3B;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.hover\:bg-sienna-brown:hover {
  background-color: #A15E3B;
}
</style>