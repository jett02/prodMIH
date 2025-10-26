<template>
  <div class="sell-to-us-page">
    <!-- Hero Section -->
    <section class="hero-section py-20 bg-dark-professional">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-up">
            <span class="eyebrow mb-3 text-sunset-orange">Fast & Fair</span>
            <h1 class="display-3 fw-bold text-white mb-4">
              We Buy Homes in Any Condition
            </h1>
            <p class="lead text-light mb-5">
              We don't play games. No showings. No repairs. Just a clear, direct path to closing.
            </p>
            <div class="hero-stats row g-4">
              <div class="col-6 col-md-3">
                <div class="stat-item text-center">
                  <h3 class="text-sunset-orange fw-bold">24-48</h3>
                  <p class="text-light small">Hours to Offer</p>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-item text-center">
                  <h3 class="text-sunset-orange fw-bold">100%</h3>
                  <p class="text-light small">Cash Offers</p>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-item text-center">
                  <h3 class="text-sunset-orange fw-bold">0</h3>
                  <p class="text-light small">Repair Costs</p>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-item text-center">
                  <h3 class="text-sunset-orange fw-bold">Fast</h3>
                  <p class="text-light small">Closing</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="hero-form-card" id="hero-form">
              <h3 class="text-center mb-4">Get Your Cash Offer</h3>
              <form @submit.prevent="submitForm" class="sell-form">
                <div class="row g-3">
                  <div class="col-md-6">
                    <input v-model="form.firstName" type="text" class="form-control" placeholder="First Name" required>
                  </div>
                  <div class="col-md-6">
                    <input v-model="form.lastName" type="text" class="form-control" placeholder="Last Name" required>
                  </div>
                  <div class="col-12">
                    <input v-model="form.address" type="text" class="form-control" placeholder="Property Address" required>
                  </div>
                  <div class="col-md-6">
                    <input v-model="form.email" type="email" class="form-control" placeholder="Email Address" required>
                  </div>
                  <div class="col-md-6">
                    <input v-model="form.phone" type="tel" class="form-control" placeholder="Phone Number" required>
                  </div>
                  <div class="col-md-6">
                    <select v-model="form.propertyType" class="form-select" required>
                      <option value="">Property Type</option>
                      <option value="single-family">Single Family Home</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="condo">Condo</option>
                      <option value="multi-family">Multi-Family</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <select v-model="form.timeframe" class="form-select" required>
                      <option value="">When do you need to sell?</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 Month</option>
                      <option value="3-months">Within 3 Months</option>
                      <option value="6-months">Within 6 Months</option>
                      <option value="flexible">I'm Flexible</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <textarea v-model="form.details" class="form-control" rows="3"
                              placeholder="Tell us about your property and situation (optional)"></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-sunset-orange btn-lg w-100" :disabled="isSubmitting">
                      <span v-if="isSubmitting">
                        <i class="fas fa-spinner fa-spin me-2"></i>Submitting...
                      </span>
                      <span v-else>Get My Cash Offer</span>
                    </button>
                  </div>
                </div>
              </form>
              <div v-if="submitMessage" class="alert mt-3"
                   :class="submitMessage.includes('error') ? 'alert-danger' : 'alert-success'">
                {{ submitMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-soft-beige">
      <div class="container">
        <div class="text-center mb-5">
          <span class="eyebrow mb-3 text-sunset-orange" data-aos="fade-up">Simple Process</span>
          <h2 class="display-4 fw-bold text-midnight-black mb-4" data-aos="fade-up" data-aos-delay="100">
            How It Works
          </h2>
          <p class="lead text-slate-gray max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Our streamlined process gets you from inquiry to cash in hand quickly and efficiently.
          </p>
        </div>

        <div class="row g-5">
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="process-step text-center">
              <div class="step-number">1</div>
              <h4 class="step-title">Submit Your Address</h4>
              <p class="step-description">Fill out our simple form with your property details. It takes less than 2 minutes.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="process-step text-center">
              <div class="step-number">2</div>
              <h4 class="step-title">Quick Walk-Through</h4>
              <p class="step-description">We schedule a convenient time for a brief property assessment. No pressure, no obligations.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="process-step text-center">
              <div class="step-number">3</div>
              <h4 class="step-title">Get Your Offer</h4>
              <p class="step-description">Receive a competitive, fair cash offer within 24-48 hours. No waiting, no uncertainty.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div class="process-step text-center">
              <div class="step-number">4</div>
              <h4 class="step-title">Close Fast</h4>
              <p class="step-description">We close on your timeline. Whether it's 7 days or 7 weeks, we work around your schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Sell to Us Section -->
    <section class="py-20 bg-modern-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-up">
            <span class="eyebrow mb-3 text-sunset-orange">Why Choose Us</span>
            <h2 class="display-4 fw-bold text-midnight-black mb-4">
              Why Sell to Make It Home?
            </h2>
            <div class="benefits-list">
              <div class="benefit-item mb-4">
                <div class="benefit-icon">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="benefit-content">
                  <h5 class="benefit-title">We Pay Cash</h5>
                  <p class="benefit-description">No financing contingencies or loan delays. Cash in hand at closing.</p>
                </div>
              </div>
              <div class="benefit-item mb-4">
                <div class="benefit-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="benefit-content">
                  <h5 class="benefit-title">We Close Quickly</h5>
                  <p class="benefit-description">Close in as little as 7 days, or on your preferred timeline.</p>
                </div>
              </div>
              <div class="benefit-item mb-4">
                <div class="benefit-icon">
                  <i class="fas fa-tools"></i>
                </div>
                <div class="benefit-content">
                  <h5 class="benefit-title">We Handle the Mess</h5>
                  <p class="benefit-description">No repairs, no cleaning, no staging. We buy as-is, in any condition.</p>
                </div>
              </div>
              <div class="benefit-item mb-4">
                <div class="benefit-icon">
                  <i class="fas fa-handshake"></i>
                </div>
                <div class="benefit-content">
                  <h5 class="benefit-title">We Respect Your Time</h5>
                  <p class="benefit-description">No showings, no open houses, no disruption to your daily life.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="benefits-media" v-if="content.sellToUs.benefitsMedia">
              <!-- Video Display -->
              <video
                v-if="isVideoFile(content.sellToUs.benefitsMedia)"
                :src="getMediaUrl(content.sellToUs.benefitsMedia)"
                class="benefits-video"
                controls
                muted
                playsinline
                @error="handleMediaError"
              >
                Your browser does not support the video tag.
              </video>
              <!-- Image Display -->
              <img
                v-else
                :src="getMediaUrl(content.sellToUs.benefitsMedia)"
                alt="Why Sell to Make It Home"
                class="benefits-image"
                @error="handleMediaError"
              />
            </div>
            <!-- Placeholder when no media -->
            <div v-else class="benefits-placeholder">
              <div class="placeholder-content">
                <i class="fas fa-image text-muted" style="font-size: 4rem;"></i>
                <p class="text-muted mt-3">Media will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-dark-professional">
      <div class="container">
        <div class="text-center">
          <h2 class="display-4 fw-bold text-white mb-4" data-aos="fade-up">
            Ready to Get Your Cash Offer?
          </h2>
          <p class="lead text-light mb-5" data-aos="fade-up" data-aos-delay="100">
            Join the list of satisfied homeowners who chose the fast, fair way to sell.
          </p>
          <a href="#hero-form" class="btn btn-sunset-orange btn-lg" data-aos="fade-up" data-aos-delay="200">
            Get Your Offer Now
          </a>
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
      submitMessage: '',
      content: {
        sellToUs: {
          benefitsMedia: ''
        }
      }
    }
  },
  async mounted() {
    await this.loadContent()
  },
  methods: {
    async submitForm() {
      if (this.isSubmitting) return

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact/sell-to-us`, {
          name: `${this.form.firstName} ${this.form.lastName}`,
          email: this.form.email,
          phone: this.form.phone,
          address: this.form.address,
          propertyType: this.form.propertyType,
          timeframe: this.form.timeframe,
          message: this.form.details || 'No additional details provided',
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
    },
    async loadContent() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content`)
        if (response.data && response.data.sellToUs) {
          this.content.sellToUs = response.data.sellToUs
        }
      } catch (error) {
        console.error('Error loading content:', error)
      }
    },
    getMediaUrl(mediaPath) {
      if (!mediaPath) return ''
      if (mediaPath.startsWith('http')) return mediaPath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${mediaPath}`
    },
    isVideoFile(mediaPath) {
      if (!mediaPath) return false
      const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.m4v']
      const lowerPath = mediaPath.toLowerCase()
      return videoExtensions.some(ext => lowerPath.includes(ext))
    },
    handleMediaError(event) {
      console.error('Media failed to load:', event.target.src)
      // Hide the media element if it fails to load
      event.target.style.display = 'none'
    }
  }
}
</script>

<style scoped>
/* =================================
   SELL TO US PAGE - PROFESSIONAL DESIGN
   ================================= */

/* Base Layout */
.sell-to-us-page {
  background: #ffffff;
  min-height: 100vh;
}

/* Hero Section - Clean Dark Background */
.bg-dark-professional {
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  position: relative;
  overflow: hidden;
}

.bg-dark-professional::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(235, 164, 114, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(235, 164, 114, 0.04) 0%, transparent 50%);
  pointer-events: none;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 6rem 0;
}

.hero-stats {
  margin-top: 3rem;
}

.stat-item {
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-align: center;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #EBA472;
}

.stat-item p {
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Hero Form Card */
.hero-form-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(235, 164, 114, 0.1);
  position: relative;
}

.hero-form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #EBA472 0%, #D4935E 100%);
  border-radius: 20px 20px 0 0;
}

.hero-form-card h3 {
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* Form Styling */
.sell-form .form-control,
.sell-form .form-select {
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #1a1a1a;
}

.sell-form .form-control:focus,
.sell-form .form-select:focus {
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
  background: #ffffff;
  outline: none;
}

.sell-form .form-control::placeholder {
  color: #6c757d;
  font-weight: 400;
}

.sell-form textarea.form-control {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

/* Process Steps Section */
.process-step {
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.process-step:hover {
  transform: translateY(-5px);
}

.step-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.3);
  transition: all 0.3s ease;
}

.process-step:hover .step-number {
  transform: scale(1.05);
  box-shadow: 0 12px 35px rgba(235, 164, 114, 0.4);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.step-description {
  color: #6c757d;
  line-height: 1.6;
  font-size: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

/* Benefits Section */
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-item:hover {
  padding-left: 1rem;
  background: rgba(235, 164, 114, 0.02);
  border-radius: 12px;
  border-bottom-color: transparent;
}

.benefit-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(235, 164, 114, 0.3);
  transition: all 0.3s ease;
}

.benefit-item:hover .benefit-icon {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.4);
}

.benefit-icon i {
  font-size: 1.5rem;
  color: white;
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.benefit-description {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

/* Benefits Media Styling */
.benefits-media {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.benefits-video,
.benefits-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
}

.benefits-placeholder {
  height: 400px;
  background: #f8f9fa;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #dee2e6;
}

.placeholder-content {
  text-align: center;
}

/* Button Styling */
.btn-sunset-orange {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border: none;
  color: white;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(235, 164, 114, 0.3);
}

.btn-sunset-orange:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.5);
  background: linear-gradient(135deg, #D4935E 0%, #EBA472 100%);
  color: white;
}

.btn-sunset-orange:active {
  transform: translateY(0);
}

.btn-sunset-orange:disabled {
  opacity: 0.7;
  transform: none;
  cursor: not-allowed;
}

/* Section Spacing */
.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

/* Utility Classes */
.text-sunset-orange {
  color: #EBA472 !important;
}

.text-midnight-black {
  color: #1a1a1a !important;
}

.text-slate-gray {
  color: #6c757d !important;
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
}

/* Alert Styling */
.alert {
  border-radius: 12px;
  border: none;
  font-weight: 500;
  padding: 1rem 1.5rem;
}

.alert-success {
  background: rgba(40, 167, 69, 0.1);
  color: #155724;
  border-left: 4px solid #28a745;
}

.alert-danger {
  background: rgba(220, 53, 69, 0.1);
  color: #721c24;
  border-left: 4px solid #dc3545;
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-section {
    min-height: auto;
    padding: 4rem 0;
  }

  .hero-stats {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-form-card {
    padding: 2rem 1.5rem;
    margin-top: 3rem;
  }

  .hero-form-card h3 {
    font-size: 1.5rem;
  }

  .step-number {
    width: 70px;
    height: 70px;
    font-size: 1.75rem;
  }

  .step-title {
    font-size: 1.1rem;
  }

  .step-description {
    font-size: 0.95rem;
  }

  .benefit-icon {
    width: 50px;
    height: 50px;
  }

  .benefit-icon i {
    font-size: 1.25rem;
  }

  .stat-item h3 {
    font-size: 2rem;
  }

  .py-20 {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

@media (max-width: 576px) {
  .hero-form-card {
    padding: 1.5rem;
  }

  .hero-form-card h3 {
    font-size: 1.25rem;
  }

  .process-step {
    padding: 2rem 1rem;
  }

  .step-number {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .benefit-item {
    gap: 1rem;
    padding: 1rem 0;
  }

  .benefit-icon {
    width: 45px;
    height: 45px;
  }

  .benefit-icon i {
    font-size: 1.1rem;
  }

  .btn-sunset-orange {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
