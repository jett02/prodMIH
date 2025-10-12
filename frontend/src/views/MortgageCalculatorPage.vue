<template>
  <div class="mortgage-calculator-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Mortgage Calculator</h1>
        <p class="page-description">
          Calculate your monthly mortgage payment and see how different loan terms affect your budget.
        </p>
      </div>
      
      <div class="calculator-content">
        <div class="calculator-main">
          <MortgageCalculator />
        </div>
        
        <div class="calculator-sidebar">
          <div class="info-cards">
            <div class="info-card">
              <h4>Understanding Your Payment</h4>
              <p>Your monthly mortgage payment typically includes principal, interest, taxes, and insurance (PITI). This calculator shows the principal and interest portion.</p>
            </div>
            <div class="info-card">
              <h4>Down Payment Tips</h4>
              <p>A larger down payment reduces your loan amount and monthly payment. Consider putting down 20% to avoid private mortgage insurance (PMI).</p>
            </div>
            <!-- Interest Rates Info Card -->
            <div class="info-card">
              <h4>Current Interest Rates</h4>
              <p>Interest rates vary based on your credit score, down payment, and loan term. Current rates typically range from 6.5% to 8.5% for conventional loans.</p>
            </div>

            <!-- Get Pre-Qualified Section - Moved here -->
            <div class="pre-qualify-section-small">
              <div class="pre-qualify-card-small">
                <div class="pre-qualify-content-small">
                  <div class="bank-logo-small">
                    <div class="bank-logo-container-small">
                      <img src="/businessimages/ExchangeBank.png" alt="Exchange Bank" class="bank-image-small" 
                           @error="$event.target.src='/placeholder-home.jpg'" />
                    </div>
                  </div>
                  <h4 class="pre-qualify-title-small">Ready to Take the Next Step?</h4>
                  <p class="pre-qualify-description-small">
                    Get pre-qualified and know exactly how much you can afford.
                  </p>
                  <a 
                    href="https://eb-us.com/pre-qualify-app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="pre-qualify-btn-small"
                  >
                    Get Pre-Qualified Now
                    <i class="fas fa-external-link-alt ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MortgageCalculator from '@/components/MortgageCalculator.vue'

export default {
  name: 'MortgageCalculatorPage',
  components: {
    MortgageCalculator
  }
}
</script>

<style scoped>
.mortgage-calculator-page {
  padding: 2rem 0 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #111827 !important;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.125rem;
  color: #374151 !important;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.calculator-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.calculator-main {
  /* Main calculator takes up more space */
}

.calculator-sidebar {
  /* Sidebar for info cards */
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info-card h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.info-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.875rem;
}

.pre-qualify-section-small {
  margin: 1.5rem 0;
}

.pre-qualify-card-small {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.25);
}

.pre-qualify-content-small {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pre-qualify-title-small {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.pre-qualify-description-small {
  font-size: 1rem;
  margin-bottom: 1.25rem;
  opacity: 0.95;
  line-height: 1.5;
}

.pre-qualify-btn-small {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #f97316;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
}

.pre-qualify-btn-small:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  color: #ea580c;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.bank-logo-small {
  margin-bottom: 1rem;
}

.bank-logo-container-small {
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 120px;
}

.bank-image-small {
  height: 24px;
  width: auto;
  object-fit: contain;
  display: block;
  max-width: 100px;
}

@media (max-width: 1024px) {
  .calculator-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>












