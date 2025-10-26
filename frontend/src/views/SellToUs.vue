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
/* =================================
   SELL TO US PAGE STYLES
   ================================= */

/* CSS Custom Properties */
:root {
  --sunset-orange: #EBA472;
  --sunset-brown: #D4935E;
  --midnight-black: #1a1a1a;
  --slate-gray: #6c757d;
  --modern-white: #FFFFFF;
  --soft-beige: #F5F1EC;
  --warm-beige: #EDE0D4;
  --professional-gray: #f8f9fa;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --shadow-light: 0 8px 20px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 15px 35px rgba(0, 0, 0, 0.2);
  --shadow-heavy: 0 25px 50px rgba(0, 0, 0, 0.4);
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base Layout */
.sell-to-us-page {
  overflow-x: hidden;
  background: linear-gradient(135deg, var(--warm-beige) 0%, var(--soft-beige) 50%, var(--warm-beige) 100%);
  min-height: 100vh;
}

/* Dark Professional Background */
.bg-dark-professional {
  background: linear-gradient(135deg, var(--midnight-black) 0%, #2d2d2d 50%, var(--midnight-black) 100%);
  position: relative;
  overflow: hidden;
}

.bg-dark-professional::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(235, 164, 114, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-stats {
  margin-top: 3rem;
}

.stat-item {
  padding: 1.5rem 1rem;
  background: var(--glass-bg);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  box-shadow: var(--shadow-light);
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
}

.stat-item p {
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-size: 0.875rem;
}

/* Hero Form Card */
.hero-form-card {
  background: linear-gradient(135deg, var(--soft-beige) 0%, rgba(245, 241, 236, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-heavy);
  border: 1px solid rgba(235, 164, 114, 0.2);
  position: relative;
  overflow: hidden;
}

.hero-form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--sunset-orange) 0%, var(--sunset-brown) 50%, var(--sunset-orange) 100%);
}

.hero-form-card h3 {
  color: var(--midnight-black);
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
}

.hero-form-card h3::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--sunset-orange), var(--sunset-brown));
  border-radius: 2px;
}

/* Enhanced Form Styling */
.sell-form .form-control,
.sell-form .form-select {
  border: 2px solid rgba(235, 164, 114, 0.2);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  transition: var(--transition-smooth);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: var(--midnight-black);
}

.sell-form .form-control:focus,
.sell-form .form-select:focus {
  border-color: var(--sunset-orange);
  box-shadow: 0 0 0 0.25rem rgba(235, 164, 114, 0.15);
  background: rgba(255, 255, 255, 0.95);
  outline: none;
}

.sell-form .form-control::placeholder {
  color: var(--slate-gray);
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
  position: relative;
  transition: var(--transition-smooth);
  border-radius: 16px;
}

.process-step:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.02);
}

.step-number {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--sunset-orange) 0%, var(--sunset-brown) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 auto 2rem;
  box-shadow:
    0 15px 30px rgba(235, 164, 114, 0.4),
    0 0 0 8px rgba(235, 164, 114, 0.1);
  position: relative;
  z-index: 2;
  transition: var(--transition-smooth);
}

.step-number::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.2), rgba(212, 147, 94, 0.2));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.process-step:hover .step-number {
  transform: scale(1.05);
  box-shadow:
    0 20px 40px rgba(235, 164, 114, 0.5),
    0 0 0 12px rgba(235, 164, 114, 0.15);
}

.process-step:hover .step-number::before {
  opacity: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--midnight-black);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.step-description {
  color: var(--slate-gray);
  line-height: 1.7;
  font-size: 1.1rem;
  max-width: 300px;
  margin: 0 auto;
}

/* Benefits Section */
.benefits-list {
  max-width: 520px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(108, 117, 125, 0.1);
  transition: var(--transition-smooth);
  border-radius: 12px;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-item:hover {
  padding-left: 1.5rem;
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.03), rgba(235, 164, 114, 0.01));
  border-bottom-color: transparent;
  box-shadow: var(--shadow-light);
}

.benefit-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--sunset-orange) 0%, var(--sunset-brown) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(235, 164, 114, 0.3);
  transition: var(--transition-smooth);
}

.benefit-item:hover .benefit-icon {
  transform: scale(1.1) rotate(2deg);
  box-shadow: 0 15px 35px rgba(235, 164, 114, 0.4);
}

.benefit-icon i {
  font-size: 1.75rem;
  color: white;
  transition: var(--transition-smooth);
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--midnight-black);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.benefit-description {
  color: var(--slate-gray);
  line-height: 1.6;
  margin: 0;
  font-size: 1.05rem;
}

.benefits-image {
  position: relative;
}

.image-placeholder {
  background: linear-gradient(135deg, var(--sunset-orange) 0%, var(--sunset-brown) 100%);
  border-radius: 24px;
  box-shadow: var(--shadow-medium);
  transition: var(--transition-smooth);
  overflow: hidden;
}

.image-placeholder:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 30px 60px rgba(235, 164, 114, 0.4);
}

/* Enhanced Button Styling */
.btn-sunset-orange {
  background: linear-gradient(135deg, var(--sunset-orange) 0%, var(--sunset-brown) 100%);
  border: none;
  color: white;
  font-weight: 700;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: var(--transition-smooth);
  box-shadow:
    0 8px 20px rgba(235, 164, 114, 0.4),
    0 0 0 0 rgba(235, 164, 114, 0.5);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-sunset-orange::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.btn-sunset-orange:hover::before {
  transform: translateX(100%);
}

.btn-sunset-orange:hover {
  transform: translateY(-3px);
  box-shadow:
    0 15px 35px rgba(235, 164, 114, 0.6),
    0 0 0 3px rgba(235, 164, 114, 0.2);
  background: linear-gradient(135deg, var(--sunset-brown) 0%, var(--sunset-orange) 100%);
  color: white;
  text-decoration: none;
}

.btn-sunset-orange:focus {
  box-shadow:
    0 15px 35px rgba(235, 164, 114, 0.6),
    0 0 0 3px rgba(235, 164, 114, 0.4);
  outline: none;
}

.btn-sunset-orange:active {
  transform: translateY(-1px);
}

.btn-sunset-orange:disabled {
  opacity: 0.6;
  transform: none;
  cursor: not-allowed;
  box-shadow: var(--shadow-light);
}

/* Section Spacing */
.py-20 {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

/* Utility Classes */
.text-sunset-orange {
  color: var(--sunset-orange) !important;
}

.text-midnight-black {
  color: var(--midnight-black) !important;
}

.text-slate-gray {
  color: var(--slate-gray) !important;
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: block;
  position: relative;
  margin-bottom: 0.5rem;
}

.eyebrow::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 40px;
  height: 2px;
  background: currentColor;
  opacity: 0.6;
  border-radius: 1px;
}

/* Enhanced Alert Styling */
.alert {
  border-radius: 16px;
  border: none;
  font-weight: 500;
  padding: 1.25rem 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-light);
}

.alert-success {
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.15), rgba(40, 167, 69, 0.05));
  color: #155724;
  border-left: 4px solid #28a745;
}

.alert-danger {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.15), rgba(220, 53, 69, 0.05));
  color: #721c24;
  border-left: 4px solid #dc3545;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-form-card {
    padding: 2.5rem 2rem;
  }
}

@media (max-width: 992px) {
  .hero-section {
    min-height: auto;
    padding: 4rem 0;
  }

  .hero-stats {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  .stat-item {
    padding: 1.25rem 0.75rem;
  }

  .stat-item h3 {
    font-size: 2.25rem;
  }
}

@media (max-width: 768px) {
  .hero-form-card {
    padding: 2.5rem 2rem;
    margin-top: 3rem;
    border-radius: 20px;
  }

  .hero-form-card h3 {
    font-size: 1.5rem;
  }

  .step-number {
    width: 80px;
    height: 80px;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .step-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .step-description {
    font-size: 1rem;
    max-width: 260px;
  }

  .benefit-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
  }

  .benefit-icon i {
    font-size: 1.5rem;
  }

  .benefit-title {
    font-size: 1.15rem;
  }

  .benefit-description {
    font-size: 1rem;
  }

  .stat-item h3 {
    font-size: 2rem;
  }

  .py-20 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .process-step {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 576px) {
  .hero-form-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  .hero-form-card h3 {
    font-size: 1.375rem;
  }

  .process-step {
    padding: 2rem 1rem;
  }

  .step-number {
    width: 70px;
    height: 70px;
    font-size: 1.75rem;
  }

  .benefit-item {
    gap: 1rem;
    padding: 1.5rem 0;
  }

  .benefit-icon {
    width: 55px;
    height: 55px;
  }

  .benefit-icon i {
    font-size: 1.25rem;
  }

  .btn-sunset-orange {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    border-radius: 40px;
  }

  .stat-item {
    padding: 1rem 0.5rem;
  }

  .stat-item h3 {
    font-size: 1.75rem;
  }

  .stat-item p {
    font-size: 0.8rem;
  }

  .py-20 {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

/* Brand Background Classes */
.bg-soft-beige {
  background: linear-gradient(135deg, var(--soft-beige) 0%, var(--warm-beige) 100%) !important;
  position: relative;
}

.bg-soft-beige::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 70%, rgba(235, 164, 114, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.bg-modern-white {
  background: linear-gradient(135deg, var(--modern-white) 0%, rgba(248, 249, 250, 0.95) 100%) !important;
  position: relative;
}

.bg-modern-white::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(235, 164, 114, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Additional utility for better spacing */
.max-w-3xl {
  max-width: 48rem;
}
</style>
