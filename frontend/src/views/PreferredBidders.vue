<template>
  <div class="preferred-bidders-page">
    <!-- Banner Section -->
    <section class="hero-banner bg-gradient-dark text-modern-white py-5 position-relative overflow-hidden">
      <div class="banner-overlay"></div>
      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <div class="banner-icon mb-4">
              <i class="fas fa-hammer fa-3x text-warm-sunset"></i>
            </div>
            <h1 class="display-4 fw-bold text-warm-sunset mb-4 banner-title">{{ bannerContent.title }}</h1>
            <div class="lead text-light banner-description" v-html="bannerContent.description"></div>
          </div>
        </div>
      </div>
      <div class="banner-decoration"></div>
    </section>

    <!-- Form Section -->
    <section class="form-section py-5 bg-soft-beige">
      <div class="container">
        <div class="row">
          <!-- Left Info Panel -->
          <div class="col-lg-3 mb-4">
            <div class="info-panel sticky-top">
              <div class="info-card mb-3">
                <div class="info-icon mb-2">
                  <i class="fas fa-handshake text-warm-sunset"></i>
                </div>
                <h4 class="h6 fw-bold text-midnight-black mb-2">Why Partner With Us?</h4>
                <p class="text-slate-gray mb-0">Join a network of trusted professionals working on quality home renovation projects. We value reliability, craftsmanship, and long-term partnerships.</p>
              </div>

              <div class="info-card mb-3">
                <div class="info-icon mb-2">
                  <i class="fas fa-dollar-sign text-warm-sunset"></i>
                </div>
                <h4 class="h6 fw-bold text-midnight-black mb-2">Competitive Opportunities</h4>
                <p class="text-slate-gray mb-0">Access to consistent work with fair pricing. We believe in paying our partners well for quality work delivered on time.</p>
              </div>

              <div class="info-card">
                <div class="info-icon mb-2">
                  <i class="fas fa-users text-warm-sunset"></i>
                </div>
                <h4 class="h6 fw-bold text-midnight-black mb-2">Professional Support</h4>
                <p class="text-slate-gray mb-0">Work with an experienced team that provides clear communication, detailed project specs, and ongoing support throughout each project.</p>
              </div>
            </div>
          </div>

          <!-- Application Form -->
          <div class="col-lg-6">
            <div class="card shadow-lg border-0 rounded-4 bg-modern-white">
              <div class="card-header bg-gradient-sunset text-modern-white text-center py-4 rounded-top-4">
                <h2 class="h3 mb-0 fw-bold">Preferred Bidders Application</h2>
              </div>
              <div class="card-body p-5 bg-light-cream">
                <form @submit.prevent="submitForm" class="bidders-form">
                  
                  <!-- Company Information Section -->
                  <div class="form-section-header mb-4">
                    <h3 class="h4 text-midnight-black fw-bold border-bottom border-warm-sunset pb-2">
                      <i class="fas fa-building me-2 text-warm-sunset"></i>Company Information
                    </h3>
                  </div>
                  
                  <div class="row g-3 mb-4">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Company Name *</label>
                      <input v-model="form.companyName" type="text" required 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Your Company Name">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Primary Contact Person *</label>
                      <input v-model="form.primaryContact" type="text" required 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Name & Title">
                    </div>
                  </div>
                  
                  <div class="row g-3 mb-4">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Phone Number *</label>
                      <input v-model="form.phone" type="tel" required 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="(555) 123-4567">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Email Address *</label>
                      <input v-model="form.email" type="email" required 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="contact@company.com">
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Business Address *</label>
                    <textarea v-model="form.businessAddress" required 
                              class="form-control form-control-lg border-2 rounded-3" 
                              rows="3" placeholder="Complete business address"></textarea>
                  </div>

                  <!-- Business Credentials Section -->
                  <div class="form-section-header mb-4 mt-5">
                    <h3 class="h4 text-midnight-black fw-bold border-bottom border-warm-sunset pb-2">
                      <i class="fas fa-certificate me-2 text-warm-sunset"></i>Business Credentials
                    </h3>
                  </div>
                  
                  <div class="row g-3 mb-4">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Business License Number & State</label>
                      <input v-model="form.businessLicense" type="text" 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="License # - State">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Contractor's License Number</label>
                      <input v-model="form.contractorLicense" type="text" 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Contractor License #">
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Insurance Information *</label>
                    <div class="row g-3">
                      <div class="col-md-8">
                        <textarea v-model="form.insuranceInfo" required 
                                  class="form-control form-control-lg border-2 rounded-3" 
                                  rows="3" placeholder="Insurance carrier & coverage details"></textarea>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label fw-semibold text-slate-gray">Upload COI</label>
                        <input @change="handleFileUpload($event, 'insuranceCOI')" type="file" 
                               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                               class="form-control form-control-lg border-2 rounded-3">
                        <small class="text-muted">PDF, DOC, or Image files</small>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Bonding Information *</label>
                    <div class="row g-3">
                      <div class="col-md-4">
                        <select v-model="form.bondingStatus" required 
                                class="form-select form-select-lg border-2 rounded-3">
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div class="col-md-8" v-if="form.bondingStatus === 'yes'">
                        <textarea v-model="form.bondingDetails" 
                                  class="form-control form-control-lg border-2 rounded-3" 
                                  rows="2" placeholder="Bonding details"></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Experience & Capabilities Section -->
                  <div class="form-section-header mb-4 mt-5">
                    <h3 class="h4 text-midnight-black fw-bold border-bottom border-warm-sunset pb-2">
                      <i class="fas fa-tools me-2 text-warm-sunset"></i>Experience & Capabilities
                    </h3>
                  </div>
                  
                  <div class="row g-3 mb-4">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Years in Business *</label>
                      <input v-model="form.yearsInBusiness" type="number" required min="0" 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Number of years">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Number of Employees / Crew Size *</label>
                      <input v-model="form.crewSize" type="number" required min="1" 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Team size">
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Trades / Services Provided *</label>
                    <div class="row g-2 mt-2">
                      <div class="col-md-4" v-for="trade in availableTrades" :key="trade.value">
                        <div class="form-check form-check-custom">
                          <input v-model="form.tradesServices" :value="trade.value" type="checkbox" 
                                 class="form-check-input" :id="'trade-' + trade.value">
                          <label class="form-check-label fw-medium" :for="'trade-' + trade.value">
                            {{ trade.label }}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3" v-if="form.tradesServices.includes('other')">
                      <input v-model="form.otherTradesDetails" type="text" 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Please specify other trades/services">
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Geographic Area Served *</label>
                    <div class="row g-2 mt-2">
                      <div class="col-md-6">
                        <div class="form-check form-check-custom">
                          <input v-model="form.serviceArea" value="metro-omaha" type="radio" 
                                 class="form-check-input" id="area-metro">
                          <label class="form-check-label fw-medium" for="area-metro">
                            Metro Omaha Only
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-check form-check-custom">
                          <input v-model="form.serviceArea" value="broader" type="radio" 
                                 class="form-check-input" id="area-broader">
                          <label class="form-check-label fw-medium" for="area-broader">
                            Broader Area
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3" v-if="form.serviceArea === 'broader'">
                      <input v-model="form.broaderAreaDetails" type="text" 
                             class="form-control form-control-lg border-2 rounded-3" 
                             placeholder="Please specify broader service area">
                    </div>
                  </div>

                  <!-- Performance & Background Section -->
                  <div class="form-section-header mb-4 mt-5">
                    <h3 class="h4 text-midnight-black fw-bold border-bottom border-warm-sunset pb-2">
                      <i class="fas fa-chart-line me-2 text-warm-sunset"></i>Performance & Background
                    </h3>
                  </div>

                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Recent Projects</label>
                    <div class="row g-3">
                      <div class="col-md-8">
                        <textarea v-model="form.recentProjects"
                                  class="form-control form-control-lg border-2 rounded-3"
                                  rows="4" placeholder="Describe 2-3 recent projects or provide links"></textarea>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label fw-semibold text-slate-gray">Upload Project Files</label>
                        <input @change="handleFileUpload($event, 'projectFiles')" type="file"
                               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple
                               class="form-control form-control-lg border-2 rounded-3">
                        <small class="text-muted">Multiple files allowed</small>
                      </div>
                    </div>
                  </div>

                  <!-- References -->
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">References (At least 2) *</label>
                    <div v-for="(reference, index) in form.references" :key="index" class="reference-group mb-3 p-3 border rounded-3 bg-light">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0 text-slate-gray">Reference {{ index + 1 }}</h6>
                        <button v-if="form.references.length > 2" @click="removeReference(index)"
                                type="button" class="btn btn-sm btn-outline-danger">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                      <div class="row g-2">
                        <div class="col-md-6">
                          <input v-model="reference.name" type="text" required
                                 class="form-control border-2 rounded-3"
                                 placeholder="Contact Name">
                        </div>
                        <div class="col-md-6">
                          <input v-model="reference.company" type="text" required
                                 class="form-control border-2 rounded-3"
                                 placeholder="Company">
                        </div>
                        <div class="col-md-6">
                          <input v-model="reference.phone" type="tel" required
                                 class="form-control border-2 rounded-3"
                                 placeholder="Phone">
                        </div>
                        <div class="col-md-6">
                          <input v-model="reference.email" type="email" required
                                 class="form-control border-2 rounded-3"
                                 placeholder="Email">
                        </div>
                        <div class="col-12">
                          <input v-model="reference.project" type="text" required
                                 class="form-control border-2 rounded-3"
                                 placeholder="Project Description">
                        </div>
                      </div>
                    </div>
                    <button @click="addReference" type="button"
                            class="btn btn-outline-warm-sunset btn-sm">
                      <i class="fas fa-plus me-1"></i>Add Another Reference
                    </button>
                  </div>

                  <div class="row g-3 mb-4">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Safety Record (OSHA violations?) *</label>
                      <select v-model="form.oshaViolations" required
                              class="form-select form-select-lg border-2 rounded-3">
                        <option value="">Select...</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold text-slate-gray">Litigation History (Sued in last 5 years?) *</label>
                      <select v-model="form.litigationHistory" required
                              class="form-select form-select-lg border-2 rounded-3">
                        <option value="">Select...</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div class="mb-4" v-if="form.oshaViolations === 'yes' || form.litigationHistory === 'yes'">
                    <label class="form-label fw-semibold text-slate-gray">Brief Explanation</label>
                    <textarea v-model="form.violationsExplanation"
                              class="form-control form-control-lg border-2 rounded-3"
                              rows="3" placeholder="Please provide brief explanation"></textarea>
                  </div>

                  <!-- Compliance & Verification Section -->
                  <div class="form-section-header mb-4 mt-5">
                    <h3 class="h4 text-midnight-black fw-bold border-bottom border-warm-sunset pb-2">
                      <i class="fas fa-check-circle me-2 text-warm-sunset"></i>Compliance & Verification
                    </h3>
                  </div>

                  <div class="mb-4">
                    <div class="form-check form-check-custom mb-3">
                      <input v-model="form.agreeToProvideDocuments" type="checkbox" required
                             class="form-check-input" id="agree-documents">
                      <label class="form-check-label fw-medium" for="agree-documents">
                        I agree to provide W-9, insurance certificates, and bonding documentation if requested *
                      </label>
                    </div>
                    <div class="form-check form-check-custom">
                      <input v-model="form.agreeToSiteRules" type="checkbox" required
                             class="form-check-input" id="agree-rules">
                      <label class="form-check-label fw-medium" for="agree-rules">
                        I agree to follow Make It Home site rules and bidding procedures *
                      </label>
                    </div>
                  </div>

                  <!-- Optional Upload -->
                  <div class="mb-4">
                    <label class="form-label fw-semibold text-slate-gray">Upload Capability Statement (Optional)</label>
                    <input @change="handleFileUpload($event, 'capabilityStatement')" type="file"
                           accept=".pdf,.doc,.docx"
                           class="form-control form-control-lg border-2 rounded-3">
                    <small class="text-muted">PDF or DOC files only</small>
                  </div>

                  <!-- Submit Button -->
                  <div class="text-center mt-5">
                    <button type="submit" :disabled="submitting"
                            class="btn btn-warm-sunset btn-lg px-5 py-3 fw-bold text-modern-white rounded-pill shadow-lg">
                      <i class="fas fa-paper-plane me-2"></i>
                      {{ submitting ? 'Submitting...' : 'Submit Application' }}
                    </button>
                  </div>

                  <div class="text-center mt-4">
                    <small class="text-muted">
                      <i class="fas fa-info-circle me-1"></i>
                      We will review your application and follow up within 10 business days.
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Right Info Panel -->
          <div class="col-lg-3 mb-4">
            <div class="info-panel sticky-top">
              <div class="info-card mb-3">
                <div class="info-icon mb-2">
                  <i class="fas fa-clock text-warm-sunset"></i>
                </div>
                <h4 class="h6 fw-bold text-midnight-black mb-2">Quick Process</h4>
                <p class="text-slate-gray mb-0">Complete this application and we'll review your submission within 10 business days. We keep the process simple and straightforward.</p>
              </div>

              <div class="info-card mb-3">
                <div class="info-icon mb-2">
                  <i class="fas fa-shield-alt text-warm-sunset"></i>
                </div>
                <h4 class="h6 fw-bold text-midnight-black mb-2">Quality Standards</h4>
                <p class="text-slate-gray mb-0">We maintain high standards for safety, quality, and professionalism. All preferred bidders must meet our insurance and licensing requirements.</p>
              </div>

              <div class="info-card">
                <div class="info-icon mb-2">
                  <i class="fas fa-home text-warm-sunset"></i>
                </div>
                <h4 class="h6 fw-bold text-midnight-black mb-2">Make It Home</h4>
                <p class="text-slate-gray mb-0">Join our mission to transform houses into homes. Every project we complete helps families achieve their dream of homeownership.</p>
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
  name: 'PreferredBidders',
  data() {
    return {
      bannerContent: {
        title: 'Preferred Bidders List',
        description: `Let's Make It Home: One Flip, One Crew, One Win at a Time.<br>
                     Bring your skills. Bring your hustle. Join our Preferred Bidders List and build with us.<br><br>
                     At Make It Home, we believe great projects start with great partners. If you'd like to be considered for our Preferred Bidders List, please complete the form below. To keep the process clear and consistent, we only accept submissions here. Once we've reviewed your information, our team will follow up within 10 business days with next steps.`
      },
      submitting: false,
      form: {
        companyName: '',
        primaryContact: '',
        phone: '',
        email: '',
        businessAddress: '',
        businessLicense: '',
        contractorLicense: '',
        insuranceInfo: '',
        insuranceCOI: null,
        bondingStatus: '',
        bondingDetails: '',
        yearsInBusiness: '',
        crewSize: '',
        tradesServices: [],
        otherTradesDetails: '',
        serviceArea: '',
        broaderAreaDetails: '',
        recentProjects: '',
        projectFiles: [],
        references: [
          { name: '', company: '', phone: '', email: '', project: '' },
          { name: '', company: '', phone: '', email: '', project: '' }
        ],
        oshaViolations: '',
        litigationHistory: '',
        violationsExplanation: '',
        agreeToProvideDocuments: false,
        agreeToSiteRules: false,
        capabilityStatement: null
      },
      availableTrades: [
        { value: 'electrical', label: 'Electrical' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'hvac', label: 'HVAC' },
        { value: 'roofing', label: 'Roofing' },
        { value: 'carpentry', label: 'General Carpentry' },
        { value: 'painting', label: 'Painting' },
        { value: 'flooring', label: 'Flooring' },
        { value: 'landscaping', label: 'Landscaping' },
        { value: 'other', label: 'Other' }
      ]
    }
  },
  async mounted() {
    await this.loadBannerContent()
  },
  methods: {
    async loadBannerContent() {
      try {
        const response = await axios.get('/api/content')
        if (response.data.preferredBiddersBanner) {
          this.bannerContent = response.data.preferredBiddersBanner
        }
      } catch (error) {
        console.error('Error loading banner content:', error)
      }
    },

    handleFileUpload(event, fieldName) {
      const files = Array.from(event.target.files)
      if (fieldName === 'projectFiles') {
        this.form.projectFiles = files
      } else {
        this.form[fieldName] = files[0]
      }
    },

    addReference() {
      this.form.references.push({
        name: '',
        company: '',
        phone: '',
        email: '',
        project: ''
      })
    },

    removeReference(index) {
      if (this.form.references.length > 2) {
        this.form.references.splice(index, 1)
      }
    },

    async submitForm() {
      if (!this.validateForm()) {
        return
      }

      this.submitting = true

      try {
        const formData = new FormData()

        // Add all form fields
        Object.keys(this.form).forEach(key => {
          if (key === 'references') {
            formData.append(key, JSON.stringify(this.form[key]))
          } else if (key === 'tradesServices') {
            formData.append(key, JSON.stringify(this.form[key]))
          } else if (key === 'projectFiles') {
            this.form[key].forEach(file => {
              formData.append('projectFiles', file)
            })
          } else if (this.form[key] instanceof File) {
            formData.append(key, this.form[key])
          } else {
            formData.append(key, this.form[key])
          }
        })

        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/preferred-bidders`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // Send confirmation email
        await this.sendConfirmationEmail()

        alert('Application submitted successfully! A confirmation email has been sent to your email address. We will review your information and follow up within 10 business days.')
        this.resetForm()

      } catch (error) {
        console.error('Error submitting form:', error)
        alert('Error submitting application. Please try again.')
      } finally {
        this.submitting = false
      }
    },

    async sendConfirmationEmail() {
      try {
        const emailData = {
          to: this.form.email,
          subject: 'Preferred Bidders Application Confirmation - Make It Home',
          applicantName: this.form.primaryContact,
          companyName: this.form.companyName,
          submissionDate: new Date().toLocaleDateString(),
          applicationId: `MIH-${Date.now()}`
        }

        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/send-confirmation-email`, emailData)
      } catch (error) {
        console.error('Error sending confirmation email:', error)
        // Don't throw error here - we don't want to fail the whole submission if email fails
      }
    },

    validateForm() {
      // Check required fields
      const requiredFields = [
        'companyName', 'primaryContact', 'phone', 'email', 'businessAddress',
        'insuranceInfo', 'bondingStatus', 'yearsInBusiness', 'crewSize',
        'serviceArea', 'oshaViolations', 'litigationHistory'
      ]

      for (let field of requiredFields) {
        if (!this.form[field]) {
          alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`)
          return false
        }
      }

      // Check trades services
      if (this.form.tradesServices.length === 0) {
        alert('Please select at least one trade/service.')
        return false
      }

      // Check references
      for (let i = 0; i < this.form.references.length; i++) {
        const ref = this.form.references[i]
        if (!ref.name || !ref.company || !ref.phone || !ref.email || !ref.project) {
          alert(`Please complete all fields for Reference ${i + 1}.`)
          return false
        }
      }

      // Check agreements
      if (!this.form.agreeToProvideDocuments || !this.form.agreeToSiteRules) {
        alert('Please agree to all compliance requirements.')
        return false
      }

      return true
    },

    resetForm() {
      this.form = {
        companyName: '',
        primaryContact: '',
        phone: '',
        email: '',
        businessAddress: '',
        businessLicense: '',
        contractorLicense: '',
        insuranceInfo: '',
        insuranceCOI: null,
        bondingStatus: '',
        bondingDetails: '',
        yearsInBusiness: '',
        crewSize: '',
        tradesServices: [],
        otherTradesDetails: '',
        serviceArea: '',
        broaderAreaDetails: '',
        recentProjects: '',
        projectFiles: [],
        references: [
          { name: '', company: '', phone: '', email: '', project: '' },
          { name: '', company: '', phone: '', email: '', project: '' }
        ],
        oshaViolations: '',
        litigationHistory: '',
        violationsExplanation: '',
        agreeToProvideDocuments: false,
        agreeToSiteRules: false,
        capabilityStatement: null
      }
    }
  }
}
</script>

<style scoped>
.preferred-bidders-page {
  padding-top: 80px; /* Account for fixed navbar */
}

.bg-gradient-dark {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%);
}

.bg-gradient-sunset {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 50%, #A15E3B 100%);
}

.bg-soft-beige {
  background-color: #F5F1EC !important;
}

.bg-light-cream {
  background-color: #FEFCF9 !important;
}

.hero-banner {
  min-height: 400px;
  display: flex;
  align-items: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23EBA472" opacity="0.08"/><circle cx="75" cy="75" r="1" fill="%23EBA472" opacity="0.08"/><circle cx="50" cy="10" r="0.5" fill="%23EBA472" opacity="0.12"/><circle cx="10" cy="60" r="0.5" fill="%23EBA472" opacity="0.12"/><circle cx="90" cy="40" r="0.5" fill="%23EBA472" opacity="0.12"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.banner-decoration {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(235, 164, 114, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.banner-icon {
  animation: float 3s ease-in-out infinite;
}

.banner-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

.banner-description {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1s ease-out 0.3s both;
  line-height: 1.6;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-warm-sunset {
  color: #EBA472 !important;
}

.text-soft-beige {
  color: #EDE0D4 !important;
}

.text-slate-gray {
  color: #4A4A4A !important;
}

.text-midnight-black {
  color: #000000 !important;
}

.bg-warm-sunset {
  background-color: #EBA472 !important;
}

.bg-midnight-black {
  background-color: #000000 !important;
}

.bg-modern-white {
  background-color: #FFFFFF !important;
}

.border-warm-sunset {
  border-color: #EBA472 !important;
}

.btn-warm-sunset {
  background-color: #EBA472;
  border-color: #EBA472;
  color: #FFFFFF;
  transition: all 0.3s ease;
}

.btn-warm-sunset:hover {
  background-color: #D4935E;
  border-color: #D4935E;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.3);
}

.btn-outline-warm-sunset {
  border-color: #EBA472;
  color: #EBA472;
  background-color: transparent;
}

.btn-outline-warm-sunset:hover {
  background-color: #EBA472;
  border-color: #EBA472;
  color: #FFFFFF;
}

.card {
  border: none;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: linear-gradient(145deg, #FEFCF9 0%, #F8F6F2 100%);
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.form-control, .form-select {
  border: 2px solid #D1C7B8;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #2D2D2D;
  padding: 0.5rem 0.75rem;
}

.form-control-lg, .form-select-lg {
  font-size: 0.95rem;
  padding: 0.6rem 0.85rem;
}

.form-control:focus, .form-select:focus {
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.15);
  background-color: #FFFEF9;
  transform: translateY(-1px);
}

.form-control-lg {
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
}

.form-select-lg {
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
}

.form-control::placeholder {
  color: #8B8680;
  opacity: 0.8;
}

.form-check-custom .form-check-input {
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #EBA472;
  border-radius: 0.25em;
}

.form-check-custom .form-check-input:checked {
  background-color: #EBA472;
  border-color: #EBA472;
}

.form-check-custom .form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

.form-check-custom .form-check-label {
  color: #4A4A4A;
  font-weight: 500;
  margin-left: 0.5rem;
}

.form-section-header h3 {
  position: relative;
  padding-bottom: 0.75rem;
}

.form-section-header {
  background: linear-gradient(135deg, #F8F6F2 0%, #F0EDE7 100%);
  padding: 1rem 1.5rem;
  margin: 0 -2rem 1.5rem -2rem;
  border-radius: 0.75rem;
  border-left: 4px solid #EBA472;
}

.form-section-header h3 {
  margin-bottom: 0;
}

.form-section-header h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #EBA472 0%, #D4935E 100%);
  border-radius: 2px;
}

.reference-group {
  background: linear-gradient(135deg, #F8F6F2 0%, #F0EDE7 100%);
  border: 2px solid #D1C7B8 !important;
  transition: all 0.3s ease;
}

.reference-group:hover {
  border-color: #EBA472 !important;
  box-shadow: 0 4px 12px rgba(235, 164, 114, 0.15);
  background: linear-gradient(135deg, #FFFEF9 0%, #F8F6F2 100%);
}

.rounded-4 {
  border-radius: 1rem !important;
}

.rounded-top-4 {
  border-top-left-radius: 1rem !important;
  border-top-right-radius: 1rem !important;
}

.shadow-lg {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
}

/* Additional form styling */
.form-label {
  color: #3D3D3D;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.text-muted {
  color: #8B8680 !important;
}

/* Submit button enhancement */
.btn-warm-sunset {
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(235, 164, 114, 0.3);
}

.btn-warm-sunset:hover {
  background: linear-gradient(135deg, #D4935E 0%, #A15E3B 100%);
  box-shadow: 0 6px 20px rgba(235, 164, 114, 0.4);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-banner {
    padding: 3rem 0 !important;
    min-height: 300px;
  }

  .hero-banner h1 {
    font-size: 2rem !important;
  }

  .card-body {
    padding: 2rem !important;
  }

  .form-control-lg, .form-select-lg {
    font-size: 1rem;
  }

  .form-section-header {
    margin: 0 -1rem 1.5rem -1rem;
    padding: 1rem;
  }
}

/* Info Panel Styles */
.info-panel {
  top: 2rem;
}

.info-card {
  background: linear-gradient(145deg, #FFFFFF 0%, #F8F6F2 100%);
  border: 2px solid #F0EDE7;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.info-card h4 {
  font-size: 1rem;
}

.info-card p {
  font-size: 0.85rem;
  line-height: 1.4;
}

.info-card:hover {
  border-color: #EBA472;
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.15);
  transform: translateY(-2px);
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #EBA472 0%, #D4935E 100%);
  border-radius: 50%;
  margin: 0 auto;
}

.info-icon i {
  font-size: 1.2rem;
}

.info-icon i {
  color: #FFFFFF !important;
}

/* Animation for form submission */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.btn-warm-sunset:active {
  animation: pulse 0.3s ease;
}

/* Custom scrollbar for textareas */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #EBA472;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #D4935E;
}
</style>
