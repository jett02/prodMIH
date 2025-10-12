<template>
  <div class="mortgage-calculator-page">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3">Mortgage Calculator</h1>
            <p class="lead">Calculate your monthly mortgage payments and see what you can afford.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="card shadow-sm">
              <div class="card-body p-4">
                <h3 class="h4 mb-4">Loan Details</h3>
                
                <div class="mb-3">
                  <label class="form-label">Home Price</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input v-model.number="homePrice" type="number" class="form-control" @input="calculate">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Down Payment</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input v-model.number="downPayment" type="number" class="form-control" @input="calculate">
                  </div>
                  <small class="text-muted">{{ downPaymentPercent }}% of home price</small>
                </div>

                <div class="mb-3">
                  <label class="form-label">Interest Rate</label>
                  <div class="input-group">
                    <input v-model.number="interestRate" type="number" step="0.01" class="form-control" @input="calculate">
                    <span class="input-group-text">%</span>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Loan Term</label>
                  <div class="input-group">
                    <input v-model.number="loanTerm" type="number" class="form-control" @input="calculate" min="1" max="50" step="1">
                    <span class="input-group-text">years</span>
                  </div>
                  <div class="loan-term-buttons mt-2">
                    <button 
                      v-for="term in [15, 20, 25, 30]" 
                      :key="term"
                      type="button"
                      @click="loanTerm = term; calculate()"
                      :class="['btn', 'btn-sm', 'me-2', loanTerm === term ? 'btn-primary' : 'btn-outline-secondary']"
                    >
                      {{ term }}yr
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Property Tax (Annual)</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input v-model.number="propertyTax" type="number" class="form-control" @input="calculate">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Home Insurance (Annual)</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input v-model.number="homeInsurance" type="number" class="form-control" @input="calculate">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card shadow-sm">
              <div class="card-body p-4">
                <h3 class="h4 mb-4">Monthly Payment Breakdown</h3>
                
                <div class="payment-result mb-4">
                  <div class="text-center p-4 bg-light rounded">
                    <h2 class="text-primary mb-0">${{ monthlyPayment.toLocaleString() }}</h2>
                    <p class="text-muted mb-0">Total Monthly Payment</p>
                  </div>
                </div>

                <div class="payment-breakdown">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Principal & Interest:</span>
                    <strong>${{ principalAndInterest.toLocaleString() }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Property Tax:</span>
                    <strong>${{ monthlyPropertyTax.toLocaleString() }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Home Insurance:</span>
                    <strong>${{ monthlyInsurance.toLocaleString() }}</strong>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between">
                    <strong>Total Monthly Payment:</strong>
                    <strong class="text-primary">${{ monthlyPayment.toLocaleString() }}</strong>
                  </div>
                </div>

                <div class="loan-summary mt-4 p-3 bg-light rounded">
                  <h5>Loan Summary</h5>
                  <div class="d-flex justify-content-between mb-1">
                    <span>Loan Amount:</span>
                    <strong>${{ loanAmount.toLocaleString() }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-1">
                    <span>Total Interest:</span>
                    <strong>${{ totalInterest.toLocaleString() }}</strong>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Total Paid:</span>
                    <strong>${{ totalPaid.toLocaleString() }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Get Pre-Qualified Section - Moved below calculator -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="pre-qualify-section-bottom">
              <div class="pre-qualify-card-bottom">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center mb-3 mb-md-0">
                    <div class="bank-logo-container-bottom">
                      <img src="/businessimages/ExchangeBank.png" alt="Exchange Bank" class="bank-logo-bottom" 
                           @error="$event.target.src='/placeholder-home.jpg'" />
                    </div>
                  </div>
                  <div class="col-md-7 text-center text-md-start mb-3 mb-md-0">
                    <h4 class="pre-qualify-title-bottom mb-2">Ready to Get Pre-Qualified?</h4>
                    <p class="pre-qualify-description-bottom mb-0">
                      Take the next step and get pre-qualified for your mortgage with our trusted partner.
                    </p>
                  </div>
                  <div class="col-md-3 text-center">
                    <a 
                      href="https://eb-us.com/pre-qualify-app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="btn btn-primary btn-lg">
                      <i class="fas fa-external-link-alt me-2"></i>
                      Get Pre-Qualified
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MortgageCalculator',
  data() {
    return {
      homePrice: 350000,
      downPayment: 70000,
      interestRate: 6.5,
      loanTerm: 30,
      propertyTax: 4200,
      homeInsurance: 1200,
      monthlyPayment: 0,
      principalAndInterest: 0,
      monthlyPropertyTax: 0,
      monthlyInsurance: 0,
      loanAmount: 0,
      totalInterest: 0,
      totalPaid: 0
    }
  },
  computed: {
    downPaymentPercent() {
      if (this.homePrice > 0) {
        return Math.round((this.downPayment / this.homePrice) * 100)
      }
      return 0
    }
  },
  mounted() {
    this.calculate()
  },
  methods: {
    calculate() {
      this.loanAmount = this.homePrice - this.downPayment
      
      if (this.loanAmount <= 0) {
        this.monthlyPayment = 0
        this.principalAndInterest = 0
        this.totalInterest = 0
        this.totalPaid = 0
        return
      }

      const monthlyRate = this.interestRate / 100 / 12
      const numPayments = this.loanTerm * 12

      // Calculate principal and interest
      if (monthlyRate > 0) {
        this.principalAndInterest = this.loanAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
          (Math.pow(1 + monthlyRate, numPayments) - 1)
      } else {
        this.principalAndInterest = this.loanAmount / numPayments
      }

      // Calculate monthly taxes and insurance
      this.monthlyPropertyTax = this.propertyTax / 12
      this.monthlyInsurance = this.homeInsurance / 12

      // Total monthly payment
      this.monthlyPayment = this.principalAndInterest + this.monthlyPropertyTax + this.monthlyInsurance

      // Calculate totals
      this.totalPaid = this.principalAndInterest * numPayments
      this.totalInterest = this.totalPaid - this.loanAmount
    }
  }
}
</script>

<style scoped>
.mortgage-calculator-page {
  padding-top: 80px;
}

.hero-section {
  background: linear-gradient(135deg, #EBA472 0%, #A15E3B 100%);
}

.card {
  border: none;
  border-radius: 10px;
}

.payment-result h2 {
  font-size: 2.5rem;
  font-weight: 700;
}

/* Pre-Qualified Section */
.pre-qualify-section {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
}

.pre-qualify-card {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.25);
}

.pre-qualify-title {
  font-weight: 700;
  color: white;
}

.pre-qualify-description {
  opacity: 0.95;
  line-height: 1.5;
}

.bank-logo-container {
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 150px;
}

.bank-logo {
  height: 32px;
  width: auto;
  object-fit: contain;
  display: block;
  max-width: 120px;
}

.btn-primary {
  background: white;
  color: #f97316;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #f8f9fa;
  color: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.form-control:focus, .form-select:focus {
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

/* Pre-Qualified Section at Bottom */
.pre-qualify-section-bottom {
  margin-top: 2rem;
}

.pre-qualify-card-bottom {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.25);
}

.pre-qualify-title-bottom {
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.pre-qualify-description-bottom {
  opacity: 0.95;
  line-height: 1.5;
  font-size: 1rem;
}

.bank-logo-container-bottom {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 120px;
  width: 100%;
}

.bank-logo-bottom {
  height: 40px;
  width: auto;
  object-fit: contain;
  display: block;
  max-width: 100px;
  margin: 0 auto;
}
</style>




