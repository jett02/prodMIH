<template>
  <section class="hero-section bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
    <div class="container">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p class="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Ready to make your next move? Contact us today and let's discuss how we can help you find your perfect home.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Company Phone -->
        <div class="hero-card p-6 text-center">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-sm">📞</span>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-white">Call Us</h3>
          <a :href="`tel:${contactInfo.phone}`" class="text-blue-300 hover:text-blue-200 transition-colors">
            {{ contactInfo.phone }}
          </a>
        </div>

        <!-- Company Email -->
        <div class="hero-card p-6 text-center">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-sm">✉️</span>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-white">Email Us</h3>
          <a :href="`mailto:${contactInfo.email}`" class="text-blue-300 hover:text-blue-200 transition-colors">
            {{ contactInfo.email }}
          </a>
        </div>

        <!-- Chris's Email -->
        <div class="hero-card p-6 text-center">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-sm">👤</span>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-white">Chris Phillips</h3>
          <a :href="`mailto:${contactInfo.chrisEmail}`" class="text-blue-300 hover:text-blue-200 transition-colors">
            {{ contactInfo.chrisEmail }}
          </a>
        </div>
      </div>

      <!-- Address Section (Second Row) -->
      <div class="grid md:grid-cols-1 gap-8 mt-8">
        <div class="hero-card p-6 text-center max-w-md mx-auto">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-sm">📍</span>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-white">Visit Us</h3>
          <p class="text-gray-300">{{ contactInfo.address }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContactSection',
  data() {
    return {
      contactInfo: {
        phone: "402-XXX-XXXX",
        email: "info@makeithome.com",
        chrisEmail: "chris@makeithome.com",
        address: "Omaha, Nebraska"
      }
    }
  },
  async mounted() {
    await this.loadContactInfo()
  },
  methods: {
    async loadContactInfo() {
      try {
        const response = await axios.get('/api/admin/content/public')
        if (response.data && response.data.footer) {
          this.contactInfo = { ...this.contactInfo, ...response.data.footer }
        }
      } catch (error) {
        console.error('Error loading contact info:', error)
      }
    }
  }
}
</script>




