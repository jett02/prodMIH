<template>
  <div class="sitemap-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold text-white mb-3">Site Map</h1>
            <p class="lead text-white opacity-90">Navigate through all pages and sections of Make It Home LLC</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sitemap Content -->
    <section class="sitemap-content py-5">
      <div class="container">
        <div class="row g-4">
          
          <!-- Main Pages -->
          <div class="col-lg-6">
            <div class="sitemap-section">
              <h3 class="section-title">
                <i class="fas fa-home me-2"></i>
                Main Pages
              </h3>
              <ul class="sitemap-list">
                <li>
                  <router-link to="/" class="sitemap-link">
                    <i class="fas fa-house-user me-2"></i>
                    Home
                  </router-link>
                  <p class="sitemap-description">Welcome page with featured properties and company overview</p>
                </li>
                <li>
                  <router-link to="/properties" class="sitemap-link">
                    <i class="fas fa-building me-2"></i>
                    Buy Properties
                  </router-link>
                  <p class="sitemap-description">Browse available properties for purchase</p>
                </li>
                <li>
                  <router-link to="/rentals" class="sitemap-link">
                    <i class="fas fa-key me-2"></i>
                    Rentals
                  </router-link>
                  <p class="sitemap-description">Find rental properties and apartments</p>
                </li>
                <li>
                  <router-link to="/upcoming" class="sitemap-link">
                    <i class="fas fa-calendar-alt me-2"></i>
                    Upcoming Properties
                  </router-link>
                  <p class="sitemap-description">Properties coming soon to the market</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- Company & Services -->
          <div class="col-lg-6">
            <div class="sitemap-section">
              <h3 class="section-title">
                <i class="fas fa-briefcase me-2"></i>
                Company & Services
              </h3>
              <ul class="sitemap-list">
                <li>
                  <router-link to="/about" class="sitemap-link">
                    <i class="fas fa-info-circle me-2"></i>
                    About Us
                  </router-link>
                  <p class="sitemap-description">Learn about our mission and values</p>
                </li>
                <li>
                  <router-link to="/agents" class="sitemap-link">
                    <i class="fas fa-users me-2"></i>
                    Our Agents
                  </router-link>
                  <p class="sitemap-description">Meet our professional real estate team</p>
                </li>
                <li>
                  <router-link to="/contact" class="sitemap-link">
                    <i class="fas fa-envelope me-2"></i>
                    Contact Us
                  </router-link>
                  <p class="sitemap-description">Get in touch with our team</p>
                </li>
                <li>
                  <router-link to="/preferred-bidders" class="sitemap-link">
                    <i class="fas fa-hammer me-2"></i>
                    Preferred Bidders
                  </router-link>
                  <p class="sitemap-description">Find trusted contractors and service providers</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tools & Resources -->
          <div class="col-lg-6">
            <div class="sitemap-section">
              <h3 class="section-title">
                <i class="fas fa-tools me-2"></i>
                Tools & Resources
              </h3>
              <ul class="sitemap-list">
                <li>
                  <router-link to="/mortgage-calculator" class="sitemap-link">
                    <i class="fas fa-calculator me-2"></i>
                    Mortgage Calculator
                  </router-link>
                  <p class="sitemap-description">Calculate your monthly mortgage payments</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- Legal & Information -->
          <div class="col-lg-6">
            <div class="sitemap-section">
              <h3 class="section-title">
                <i class="fas fa-file-alt me-2"></i>
                Legal & Information
              </h3>
              <ul class="sitemap-list">
                <li>
                  <a href="#" class="sitemap-link">
                    <i class="fas fa-shield-alt me-2"></i>
                    Privacy Policy
                  </a>
                  <p class="sitemap-description">How we protect your personal information</p>
                </li>
                <li>
                  <a href="#" class="sitemap-link">
                    <i class="fas fa-file-contract me-2"></i>
                    Terms of Service
                  </a>
                  <p class="sitemap-description">Terms and conditions for using our website</p>
                </li>
                <li>
                  <router-link to="/sitemap" class="sitemap-link active">
                    <i class="fas fa-sitemap me-2"></i>
                    Sitemap
                  </router-link>
                  <p class="sitemap-description">You are here - site navigation overview</p>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Quick Navigation -->
        <div class="row mt-5">
          <div class="col-12">
            <div class="quick-nav-section">
              <h3 class="section-title text-center mb-4">
                <i class="fas fa-compass me-2"></i>
                Quick Navigation
              </h3>
              <div class="row g-3">
                <div class="col-md-3 col-sm-6">
                  <router-link to="/properties" class="quick-nav-card">
                    <i class="fas fa-search-plus"></i>
                    <span>Search Properties</span>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6">
                  <router-link to="/contact" class="quick-nav-card">
                    <i class="fas fa-phone"></i>
                    <span>Contact Agent</span>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6">
                  <router-link to="/mortgage-calculator" class="quick-nav-card">
                    <i class="fas fa-calculator"></i>
                    <span>Calculate Mortgage</span>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6">
                  <router-link to="/agents" class="quick-nav-card">
                    <i class="fas fa-user-tie"></i>
                    <span>Meet Our Team</span>
                  </router-link>
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
  name: 'Sitemap',
  mounted() {
    document.title = 'Sitemap - Make It Home LLC'
  }
}
</script>

<style scoped>
.sitemap-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.hero-section {
  background: linear-gradient(135deg, #000000de 0%, #000000 100%);
  color: rgb(255, 255, 255);
  padding-top: 100px;
  padding-bottom: 20px;
  margin-top: 0;
}

.text-midnight-black {
  color: #000000 !important;
}

.text-slate-gray {
  color: #64748b !important;
}

.sitemap-content {
  background: transparent;
}

.sitemap-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  border-left: 4px solid #EBA472;
}

.section-title {
  color: #000000;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #EBA472;
}

.sitemap-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sitemap-list li {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.sitemap-list li:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.sitemap-link {
  color: #000000;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.sitemap-link:hover {
  color: #EBA472;
  text-decoration: none;
  transform: translateX(5px);
}

.sitemap-link.active {
  color: #EBA472;
  font-weight: 600;
}

.sitemap-description {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 2rem;
  line-height: 1.4;
}

.quick-nav-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quick-nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  text-decoration: none;
  color: #000000;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.quick-nav-card:hover {
  background: linear-gradient(135deg, #EBA472 0%, #D4956B 100%);
  color: white;
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(235, 164, 114, 0.3);
  border-color: #EBA472;
}

.quick-nav-card i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.quick-nav-card span {
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 100px;
    padding-bottom: 60px;
  }

  .sitemap-section {
    padding: 1.5rem;
  }

  .quick-nav-section {
    padding: 1.5rem;
  }

  .sitemap-description {
    margin-left: 1.5rem;
  }
}
</style>
