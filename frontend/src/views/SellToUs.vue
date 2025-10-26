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
    <section class="py-20 bg-white">
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
    <section class="py-20 bg-light">
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
            <div class="benefits-image">
              <div class="image-placeholder bg-sunset-orange rounded-3 d-flex align-items-center justify-content-center" style="height: 400px;">
                <i class="fas fa-home text-white" style="font-size: 4rem;"></i>
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
            Join hundreds of satisfied homeowners who chose the fast, fair way to sell.
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
      submitMessage: ''
    }
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
    }
  }
}
</script>

<style scoped>
/* Dark Professional Background */
.bg-dark-professional {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  position: relative;
}

.bg-dark-professional::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(235, 164, 114, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* Hero Form Card */
.hero-form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-form-card h3 {
  color: #1a1a1a;
  font-weight: 700;
}

/* Process Steps */
.process-step {
  padding: 2rem 1rem;
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
  box-shadow: 0 8px 20px rgba(235, 164, 114, 0.3);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.step-description {
  color: #6c757d;
  line-height: 1.6;
}

/* Benefits Section */
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
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
}

.benefit-icon i {
  font-size: 1.5rem;
  color: white;
}

.benefit-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.benefit-description {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* Buttons */
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
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.5);
  background: linear-gradient(135deg, #D4935E 0%, #EBA472 100%);
  color: white;
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero-form-card {
    padding: 2rem 1.5rem;
  }

  .step-number {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .benefit-icon {
    width: 50px;
    height: 50px;
  }

  .benefit-icon i {
    font-size: 1.25rem;
  }
}
</style>
