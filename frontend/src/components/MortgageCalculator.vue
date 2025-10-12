<template>
  <div class="mortgage-calculator">
    <div class="calculator-header">
      <h3 class="calculator-title">Mortgage Calculator</h3>
      <p class="calculator-subtitle">Calculate your estimated monthly payment</p>
    </div>
    
    <div class="calculator-form">
      <div class="form-group">
        <label for="homePrice" class="form-label">Home Price</label>
        <div class="input-wrapper">
          <span class="currency-symbol">$</span>
          <input
            id="homePrice"
            v-model.number="homePrice"
            type="number"
            class="form-input"
            placeholder="450,000"
            min="0"
            step="1000"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="downPayment" class="form-label">Down Payment</label>
          <div class="input-wrapper">
            <span class="currency-symbol">$</span>
            <input
              id="downPayment"
              v-model.number="downPaymentAmount"
              type="number"
              class="form-input"
              placeholder="90,000"
              min="0"
              step="1000"
            />
          </div>
          <div class="percentage-display">{{ downPaymentPercent }}% of home price</div>
        </div>

        <div class="form-group">
          <label for="interestRate" class="form-label">Interest Rate</label>
          <div class="input-wrapper">
            <input
              id="interestRate"
              v-model.number="interestRate"
              type="number"
              class="form-input"
              placeholder="6.5"
              min="0"
              max="20"
              step="0.01"
            />
            <span class="percentage-symbol">%</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="loanTerm" class="form-label">Loan Term (Years)</label>
        <div class="loan-term-wrapper">
          <input
            id="loanTerm"
            v-model.number="loanTerm"
            type="number"
            class="form-input"
            placeholder="30"
            min="1"
            max="50"
            step="1"
          />
          <div class="loan-term-options">
            <button 
              v-for="term in commonTerms" 
              :key="term"
              type="button"
              @click="loanTerm = term"
              :class="['term-btn', { active: loanTerm === term }]"
            >
              {{ term }}yr
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="calculator-result">
      <div class="result-card">
        <div class="result-label">Estimated Monthly Payment</div>
        <div class="result-amount">${{ formatCurrency(monthlyPayment) }}</div>
        <div class="result-breakdown">
          <div class="breakdown-item">
            <span>Loan Amount:</span>
            <span>${{ formatCurrency(loanAmount) }}</span>
          </div>
          <div class="breakdown-item">
            <span>Total Interest:</span>
            <span>${{ formatCurrency(totalInterest) }}</span>
          </div>
          <div class="breakdown-item">
            <span>Total Cost:</span>
            <span>${{ formatCurrency(totalCost) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MortgageCalculator',
  props: {
    initialHomePrice: {
      type: Number,
      default: 450000
    }
  },
  data() {
    return {
      homePrice: this.initialHomePrice,
      downPaymentAmount: 90000,
      interestRate: 6.5,
      loanTerm: 30,
      commonTerms: [15, 20, 25, 30]
    }
  },
  computed: {
    downPaymentPercent() {
      if (!this.homePrice || this.homePrice <= 0) return 0
      return Math.round((this.downPaymentAmount / this.homePrice) * 100)
    },
    loanAmount() {
      return Math.max(0, this.homePrice - this.downPaymentAmount)
    },
    monthlyPayment() {
      if (!this.loanAmount || !this.interestRate || !this.loanTerm) return 0
      
      const principal = this.loanAmount
      const monthlyRate = this.interestRate / 100 / 12
      const numberOfPayments = this.loanTerm * 12
      
      if (monthlyRate === 0) return principal / numberOfPayments
      
      const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      
      return monthlyPayment
    },
    totalInterest() {
      return (this.monthlyPayment * this.loanTerm * 12) - this.loanAmount
    },
    totalCost() {
      return this.monthlyPayment * this.loanTerm * 12
    }
  },
  watch: {
    initialHomePrice(newPrice) {
      this.homePrice = newPrice
      // Auto-adjust down payment to 20% when home price changes
      this.downPaymentAmount = Math.round(newPrice * 0.2)
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(Math.round(amount))
    }
  }
}
</script>

<style scoped>
.mortgage-calculator {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.calculator-header {
  text-align: center;
  margin-bottom: 2rem;
}

.calculator-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.calculator-subtitle {
  color: #6b7280;
  font-size: 1rem;
}

.calculator-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 12px;
  color: #6b7280;
  font-weight: 500;
  z-index: 1;
}

.percentage-symbol {
  position: absolute;
  right: 12px;
  color: #6b7280;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  padding-left: 32px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.percentage-display {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  font-weight: 500;
}

.loan-term-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.loan-term-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.term-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.term-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.term-btn.active {
  border-color: #f97316;
  background: #f97316;
  color: white;
}

.calculator-result {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.result-card {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.result-label {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.result-amount {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.result-breakdown {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .mortgage-calculator {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .result-amount {
    font-size: 2rem;
  }
}
</style>





