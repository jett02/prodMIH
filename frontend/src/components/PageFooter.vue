<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 border-t border-gray-700">
    <div class="container">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center space-x-4 mb-6">
            <div class="flex flex-col">
              <span class="text-xl font-bold text-white">
                Make It Home
              </span>
              <span class="text-xs text-gray-400 font-medium">
                LLC
              </span>
            </div>
          </div>
          <p class="text-gray-300 leading-relaxed">
Our mission is to rebuild, reimagine, and reinvest in the Omaha community by creating homes people are proud to live in.
          </p>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white">Our Services</h3>
          <ul class="space-y-2">
            <li class="text-gray-300">Home Flipping</li>
            <li class="text-gray-300">Property Rentals</li>
            <li class="text-gray-300">Real Estate Investment</li>
            <li class="text-gray-300">Property Management</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-700 mt-12 pt-8 text-center">
        <p class="text-gray-400">
          © 2025 Make It Home. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PageFooter',
  data() {
    return {
      contactInfo: {
        phone: "402-XXX-XXXX",
        email: "info@makeithome.com",
        chrisEmail: "chris@makeithome.com",
        address: "Omaha, Nebraska",
        facebook: "",
        instagram: "",
        twitter: ""
      }
    }
  },
  mounted() {
    this.loadContactInfo()
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









