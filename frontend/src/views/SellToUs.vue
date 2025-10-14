<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="mb-6">Sell Your Home to Us</h1>
          <p class="text-xl opacity-90 leading-relaxed">
            Get a fair cash offer for your property. No repairs, no showings, no hassle.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="hero-section bg-gradient-to-br from-green-900 via-gray-900 to-black text-white">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p class="text-xl opacity-90 max-w-3xl mx-auto">
            Our simple 3-step process makes selling your home easy
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="hero-card p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <p class="text-gray-300 leading-relaxed">Fill out our form or give us a call. We'll schedule a time to see your property.</p>
          </div>
          <div class="hero-card p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-white">Get Your Offer</h3>
            <p class="text-gray-300 leading-relaxed">We'll evaluate your property and present you with a fair cash offer within 24 hours.</p>
          </div>
          <div class="hero-card p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-white">Close Fast</h3>
            <p class="text-gray-300 leading-relaxed">Accept our offer and we can close in as little as 7 days. Cash in hand, hassle-free.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="hero-section bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div class="container">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Get Your Cash Offer Today
            </h2>
            <p class="text-xl opacity-90">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>
          
          <div class="hero-card p-8">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label text-dark">First Name</label>
                  <input v-model="form.firstName" type="text" required class="form-control bg-secondary bg-opacity-50 text-white border-white border-opacity-25" placeholder="John">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label text-dark">Last Name</label>
                  <input v-model="form.lastName" type="text" required class="form-control bg-secondary bg-opacity-50 text-white border-white border-opacity-25" placeholder="Doe">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label text-dark">Email</label>
                  <input v-model="form.email" type="email" required class="form-control bg-secondary bg-opacity-50 text-white border-white border-opacity-25" placeholder="john@example.com">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label text-dark">Phone</label>
                  <input v-model="form.phone" type="tel" required class="form-control bg-secondary bg-opacity-50 text-white border-white border-opacity-25" placeholder="(555) 123-4567">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label text-dark">Property Address</label>
                <input v-model="form.address" type="text" required class="form-control bg-secondary bg-opacity-50 text-white border-white border-opacity-25" placeholder="123 Main St, Omaha, NE">
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label text-dark">Property Type</label>
                  <select v-model="form.propertyType" required class="form-select bg-secondary bg-opacity-50 text-white border-white border-opacity-25">
                    <option value="">Select type</option>
                    <option value="single-family">Single Family Home</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="multi-family">Multi-Family</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label text-dark">Timeframe</label>
                  <select v-model="form.timeframe" required class="form-select bg-secondary bg-opacity-50 text-white border-white border-opacity-25">
                    <option value="">Select timeframe</option>
                    <option value="asap">ASAP</option>
                    <option value="30-days">Within 30 days</option>
                    <option value="60-days">Within 60 days</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label text-dark">Additional Details</label>
                <textarea v-model="form.details" rows="4" class="form-control bg-secondary bg-opacity-50 text-white border-white border-opacity-25" placeholder="Property details, condition, reason for selling, etc."></textarea>
              </div>
              
              <div v-if="submitMessage" class="p-4 rounded-lg" :class="submitMessage.includes('error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'">
                {{ submitMessage }}
              </div>
              
              <button type="submit" :disabled="isSubmitting" class="btn btn-primary btn-lg px-5 py-3 w-100" style="background: linear-gradient(to right, #059669, #2563eb); border: none;">
                {{ isSubmitting ? 'Submitting...' : 'Get My Cash Offer' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SellToUs',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        propertyType: '',
        timeframe: '',
        details: ''
      },
      isSubmitting: false,
      submitMessage: ''
    }
  },
  methods: {
    async submitForm() {
      if (this.isSubmitting) return
      
      this.isSubmitting = true
      this.submitMessage = ''
      
      try {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
          ...this.form,
          type: 'sell-to-us',
          subject: 'Sell To Us Inquiry'
        })
        
        this.submitMessage = 'Thank you! We\'ll get back to you within 24 hours with your cash offer.'
        this.resetForm()
      } catch (error) {
        console.error('Error submitting form:', error)
        this.submitMessage = 'Sorry, there was an error submitting your form. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    },
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        propertyType: '',
        timeframe: '',
        details: ''
      }
    }
  }
}
</script>




