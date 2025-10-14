<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img :src="getImageUrl(property.thumbnail || property.images?.[0])" 
           :alt="property.title" 
           class="w-full h-48 object-cover cursor-pointer"
           @error="handleImageError"
           @click="$emit('imageClick', property)">
      <div class="absolute top-3 right-3">
        <span class="px-3 py-1 text-xs font-semibold rounded-full text-white"
              :class="property.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'">
          {{ property.type === 'sale' ? 'For Sale' : 'For Rent' }}
        </span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ property.address }}</h3>
      <p class="text-gray-600 text-sm mb-3">
        <i class="fas fa-home mr-1"></i>{{ property.title }}
      </p>
      
      <div class="flex justify-between items-center mb-3">
        <div class="flex space-x-4 text-sm text-gray-500">
          <span><i class="fas fa-bed mr-1"></i>{{ property.bedrooms }} beds</span>
          <span><i class="fas fa-bath mr-1"></i>{{ property.bathrooms }} baths</span>
        </div>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="text-xl font-bold text-blue-600">
          ${{ formatPrice(property.price) }}
          <span v-if="property.type === 'rental'" class="text-sm text-gray-500">/mo</span>
        </div>
        <router-link :to="`/property/${property._id}`" 
                     class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat().format(price);
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
    },
    getThumbnailUrl() {
      // Use thumbnail first, then first gallery image, then placeholder
      if (this.property.thumbnail) {
        return this.getImageUrl(this.property.thumbnail)
      }
      if (this.property.images && this.property.images.length > 0) {
        return this.getImageUrl(this.property.images[0])
      }
      return '/placeholder-home.jpg'
    },
    handleImageError(event) {
      event.target.src = '/placeholder-home.jpg';
    }
  }
}
</script>

<style scoped>
.property-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
}

.property-image {
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-badge {
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.feature-box {
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.05);
}

.feature-box i {
  font-size: 1.1rem;
}

.property-price {
  color: #2563eb;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border: none;
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
  transform: translateY(-1px);
}
</style>







