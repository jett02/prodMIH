<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section position-relative overflow-hidden" :style="heroContent.backgroundImage ? {} : { background: 'linear-gradient(135deg, #022547 0%, #464646 25%, #EBA472 60%, #A15E3B 85%, #123852 100%)' }">
      <div class="hero-background-container">
        <div 
          v-show="heroContent.backgroundImage && heroContent.backgroundImage !== ''"
          class="hero-background active"
          :style="{ backgroundImage: `url(${getHeroBackgroundImage()})` }">
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container position-relative" style="padding-top: 120px; padding-bottom: 60px;">
        <div class="row align-items-center min-vh-60">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h1 class="hero-main-title fw-bold text-white mb-4">
              {{ heroContent.title || "Let's Find Your House. We Can Make It Home." }}
            </h1>
            <p class="hero-subtitle text-white-50 mb-4" data-aos="fade-up" data-aos-delay="200">
              {{ heroContent.subtitle || "You bring the dream—we bring the hustle. We flip homes with intention, rent with care, and build the kind of spaces people want to stay in." }}
            </p>
            <div class="d-flex gap-3 flex-wrap mb-4" data-aos="fade-up" data-aos-delay="300">
              <router-link to="/properties" class="btn btn-midnight-black btn-lg">View Properties</router-link>
              <router-link to="/contact" class="btn btn-outline-light btn-lg">Contact Us</router-link>
            </div>

            <!-- Foreground Image Carousel Display -->
            <div class="hero-image-carousel-container mt-4" data-aos="fade-left" data-aos-delay="400" v-if="heroContent.galleryImages && heroContent.galleryImages.length > 0">
              <div class="hero-carousel-wrapper">
                <!-- Main Image as Stacked Cards -->
                <div class="hero-card-stack" @click="nextImage">
                  <!-- Back cards (stack effect) -->
                  <div class="hero-card card-back-2"></div>
                  <div class="hero-card card-back-1"></div>

                  <!-- Front card with current media (image or video) -->
                  <div class="hero-card card-front">
                    <!-- Display video if current media is a video -->
                    <video v-if="isCurrentMediaVideo()"
                           :src="getHeroForegroundImage(currentImageIndex)"
                           class="hero-foreground-video"
                           autoplay
                           muted
                           loop
                           playsinline
                           @error="handleImageError">
                    </video>
                    <!-- Display image if current media is an image -->
                    <img v-else
                         :src="getHeroForegroundImage(currentImageIndex)"
                         alt="Make It Home"
                         class="hero-foreground-image"
                         @error="handleImageError">
                    <div class="card-overlay">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>

                <!-- Navigation Dots -->
                <div class="carousel-dots" v-if="heroContent.galleryImages.length > 1">
                  <button
                    v-for="(media, index) in heroContent.galleryImages"
                    :key="index"
                    class="carousel-dot"
                    :class="{ active: index === currentImageIndex }"
                    @click="goToImage(index)">
                  </button>
                </div>

                <!-- Image Counter -->
                <div class="image-counter">
                  <span>{{ currentImageIndex + 1 }} / {{ heroContent.galleryImages.length }}</span>
                </div>
              </div>
            </div>

            <!-- Fallback for single foreground image (backward compatibility) -->
            <div class="hero-image-container mt-4" data-aos="fade-left" data-aos-delay="400" v-else-if="heroContent.foregroundImage">
              <img :src="getHeroForegroundImage()"
                   alt="Make It Home"
                   class="hero-foreground-image-single"
                   @error="handleImageError">
            </div>
          </div>
          <div class="col-lg-6 d-flex align-items-center justify-content-center" data-aos="zoom-out" data-aos-delay="400">
            <!-- Property Search Section - Centered -->
            <div class="property-search-section">
              <div class="search-card-glass">
                <div class="search-header text-center mb-4">
                  <h2 class="search-title">Find Your Perfect Home</h2>
                  <p class="search-subtitle">Search by city, zipcode, school district, or address</p>
                </div>

                <form @submit.prevent="handleSearch" class="search-form">
                  <!-- Main Search Bar - Full Width -->
                  <div class="main-search-container mb-4">
                    <div class="search-input-wrapper">
                      <i class="fas fa-map-marker-alt search-location-icon"></i>
                      <input
                        v-model="searchQuery"
                        type="text"
                        class="search-input-main"
                        placeholder="Enter City, Zipcode, School District, or Address..."
                        @keyup.enter="handleSearch">
                      <div class="search-input-border"></div>
                    </div>
                  </div>

                  <!-- Property Type & Search Button Row -->
                  <div class="search-controls-row">
                    <div class="property-type-container">
                      <label class="control-label">Property Type</label>
                      <select v-model="searchType" class="property-type-select">
                        <option value="">All Properties</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>

                    <button type="submit" class="search-btn-main">
                      <i class="fas fa-search"></i>
                      <span>Search Properties</span>
                    </button>
                  </div>

                  <!-- Advanced Filters Toggle -->
                  <div class="advanced-toggle-container">
                    <button
                      type="button"
                      @click="showAdvancedFilters = !showAdvancedFilters"
                      class="advanced-toggle-btn">
                      <i class="fas" :class="showAdvancedFilters ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                      <span>{{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters</span>
                    </button>
                  </div>

                  <!-- Advanced Filters Panel -->
                  <div class="advanced-filters-container" :class="{ 'expanded': showAdvancedFilters }">
                    <div class="advanced-filters-panel">
                      <div class="filters-grid">
                        <div class="filter-group">
                          <label class="filter-label">Price Range</label>
                          <select v-model="filters.priceRange" class="filter-select">
                            <option value="">Any Price</option>
                            <option value="0-200000">Under $200K</option>
                            <option value="200000-400000">$200K - $400K</option>
                            <option value="400000-600000">$400K - $600K</option>
                            <option value="600000-800000">$600K - $800K</option>
                            <option value="800000-1000000">$800K - $1M</option>
                            <option value="1000000-99999999">$1M+</option>
                          </select>
                        </div>
                        <div class="filter-group">
                          <label class="filter-label">Bedrooms</label>
                          <select v-model="filters.bedrooms" class="filter-select">
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                          </select>
                        </div>
                        <div class="filter-group">
                          <label class="filter-label">Bathrooms</label>
                          <select v-model="filters.bathrooms" class="filter-select">
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="1.5">1.5+</option>
                            <option value="2">2+</option>
                            <option value="2.5">2.5+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                          </select>
                        </div>
                        <div class="filter-group">
                          <label class="filter-label">Property Type</label>
                          <select v-model="filters.propertyType" class="filter-select">
                            <option value="">Any Type</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="apartment">Apartment</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator Arrow -->
      <div class="scroll-indicator" data-aos="fade-up" data-aos-delay="800">
        <div class="scroll-arrow" @click="scrollToContent">
          <i class="fas fa-chevron-down"></i>
        </div>
        <span class="scroll-text">Discover More</span>
      </div>
    </section>

    <!-- Featured Properties and Upcoming Properties -->
    <section class="py-5 properties-main-section">
      <div class="container">
        <!-- Company Description Section -->
        <div class="row mb-5">
          <div class="col-lg-4 mb-4 mb-lg-0">
            <div class="company-description-card h-100">
              <div class="card-body p-4">
                <span class="eyebrow text-primary mb-3 d-block">About Make It Home</span>
                <h3 class="fs-4 fw-bold mb-4">Redefining Real Estate Excellence</h3>
                <p class="lead text-secondary mb-4">
                  Make It Home represents the next generation of real estate services, combining innovative technology with personalized expertise to deliver exceptional results for our diverse clientele.
                </p>
                <div class="row g-2 mb-4">
                  <div class="col-12">
                    <div class="d-flex align-items-center mb-2">
                      <div class="icon-box icon-box-sm bg-opaque-primary rounded-circle me-2">
                        <i class="bi bi-check2 text-primary"></i>
                      </div>
                      <span class="fs-6">Comprehensive Market Analysis</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex align-items-center mb-2">
                      <div class="icon-box icon-box-sm bg-opaque-primary rounded-circle me-2">
                        <i class="bi bi-check2 text-primary"></i>
                      </div>
                      <span class="fs-6">Diverse Portfolio Management</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex align-items-center mb-4">
                      <div class="icon-box icon-box-sm bg-opaque-primary rounded-circle me-2">
                        <i class="bi bi-check2 text-primary"></i>
                      </div>
                      <span class="fs-6">Trusted Advisory Services</span>
                    </div>
                  </div>
                </div>
                <router-link to="/about" class="btn btn-midnight-black btn-sm">Learn More About Us</router-link>
              </div>
            </div>
          </div>
          
          <div class="col-lg-8">
            <!-- Company Image Section -->
            <div class="company-image-card h-100" v-if="companyImage">
              <div class="image-container">
                <img :src="getCompanyImage()" 
                     alt="Make It Home" 
                     class="img-fluid company-showcase-image"
                     @error="handleCompanyImageError">
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Properties - Full Width -->
        <div class="featured-properties-section mb-4">
          <div class="text-center mb-4">
            <h2 class="display-6 fw-bold">Featured Properties</h2>
            <p class="lead">Discover our latest listings</p>
          </div>
          
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-dark" role="status"></div>
          </div>
          
          <div v-else class="properties-horizontal-scroll">
            <div class="properties-row">
              <div v-for="property in featuredProperties.slice(0, 5)" :key="property._id" class="property-item">
                <div class="card h-100 featured-property-card">
                  <div class="position-relative">
                    <img :src="getImageUrl(property.thumbnail || property.images?.[0])" 
                         :alt="property.title"
                         class="card-img-top property-image-small"
                         @error="handleImageError">
                    <div class="position-absolute top-0 end-0 m-2">
                      <span class="badge badge-sm" :class="getStatusBadgeClass(property)">
                        {{ getStatusText(property) }}
                      </span>
                    </div>
                  </div>
                  <div class="card-body p-3">
                    <h6 class="card-title mb-2">{{ property.title }}</h6>
                    <p class="text-muted mb-2 small">{{ property.address }}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <span class="h6 mb-0">
                        ${{ property.price?.toLocaleString() }}{{ property.type === 'rental' ? '/mo' : '' }}
                      </span>
                      <small class="text-muted">{{ property.bedrooms }}bd • {{ property.bathrooms }}ba</small>
                    </div>
                    <router-link :to="`/property/${property._id}`" class="btn btn-warm-sunset btn-sm w-100">View Details</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-3">
            <router-link to="/properties" class="btn btn-midnight-black">View All Properties</router-link>
          </div>
        </div>

        <!-- Upcoming Properties - Full Width -->
        <div class="upcoming-properties-section">
          <div class="text-center mb-4">
            <h2 class="display-6 fw-bold">Upcoming Properties</h2>
            <p class="lead">Coming soon to market</p>
          </div>
          
          <div v-if="loadingUpcoming" class="text-center py-5">
            <div class="spinner-border text-light" role="status"></div>
          </div>
          
          <div v-else class="properties-horizontal-scroll">
            <div class="properties-row">
              <div v-for="property in upcomingProperties.slice(0, 5)" :key="property._id" class="property-item">
                <div class="card h-100 upcoming-property-card">
                  <div class="position-relative">
                    <img :src="getImageUrl(property.thumbnail || property.images?.[0])" 
                         :alt="property.title"
                         class="card-img-top property-image-small"
                         @error="handleImageError">
                    <div class="position-absolute top-0 end-0 m-2">
                      <span class="badge bg-warning text-dark badge-sm">Coming Soon</span>
                    </div>
                  </div>
                  <div class="card-body p-3">
                    <h6 class="card-title mb-2">{{ property.title }}</h6>
                    <p class="text-muted mb-2 small">{{ property.address }}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <span class="h6 mb-0">
                        <span v-if="property.estimatedPrice">Est. ${{ property.estimatedPrice.toLocaleString() }}</span>
                        <span v-else>Price TBD</span>
                      </span>
                      <small class="text-muted">{{ property.bedrooms }}bd • {{ property.bathrooms }}ba</small>
                    </div>
                    <button class="btn btn-outline-dark btn-sm w-100" @click="expressInterest(property)">
                      Express Interest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-3">
            <router-link to="/upcoming" class="btn btn-outline-light">View All Upcoming</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-5 services-section">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold">Our Services</h2>
          <p class="lead text-muted">What we do best</p>
        </div>
        <div class="row g-4">
          <div class="col-lg-4 text-center">
            <div class="service-icon mb-3">
              <i class="fas fa-home fa-3x text-primary"></i>
            </div>
            <h4>Property Sales</h4>
            <p class="text-muted">Find your perfect home from our curated selection of quality properties.</p>
          </div>
          <div class="col-lg-4 text-center">
            <div class="service-icon mb-3">
              <i class="fas fa-key fa-3x text-primary"></i>
            </div>
            <h4>Rental Management</h4>
            <p class="text-muted">Quality rental properties with responsive management and care.</p>
          </div>
          <div class="col-lg-4 text-center">
            <div class="service-icon mb-3">
              <i class="fas fa-tools fa-3x text-primary"></i>
            </div>
            <h4>Home Flipping</h4>
            <p class="text-muted">We flip homes with intention, creating spaces people want to live in.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      featuredProperties: [],
      upcomingProperties: [],
      loading: true,
      loadingUpcoming: true,
      companyImage: "",
      heroContent: {
        title: "Let's Find Your House. We Can Make It Home.",
        subtitle: "You bring the dream—we bring the hustle. We flip homes with intention, rent with care, and build the kind of spaces people want to stay in.",
        backgroundImage: "",
        foregroundImage: "",
        companyImage: ""
      },
      // Search functionality
      searchQuery: '',
      searchType: '',
      showAdvancedFilters: false,
      filters: {
        priceRange: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: ''
      },
      // Carousel functionality
      currentImageIndex: 0,
      carouselInterval: null,
      isTransitioning: false
    }
  },
  async mounted() {
    // Load hero content first and wait for it
    await this.loadHeroContent()

    // Start carousel timer after content is loaded
    this.$nextTick(() => {
      this.startCarouselTimer()
    })

    // Then load properties in parallel
    Promise.all([
      this.loadFeaturedProperties(),
      this.loadUpcomingProperties()
    ])
  },

  beforeUnmount() {
    this.stopCarouselTimer()
  },

  beforeRouteLeave(_, __, next) {
    // Stop carousel when leaving the page
    this.stopCarouselTimer()
    next()
  },
  methods: {
    async loadFeaturedProperties() {
      try {
        // Include both available and sold properties in featured properties
        const response = await axios.get('/api/properties?limit=6')
        // Filter to get a mix of available and sold properties, prioritizing available
        const availableProperties = response.data.filter(p => p.status === 'available')
        const soldProperties = response.data.filter(p => p.status === 'sold')

        // Take up to 3 available properties, then fill remaining slots with sold properties
        const featured = [
          ...availableProperties.slice(0, 3),
          ...soldProperties.slice(0, Math.max(0, 3 - availableProperties.length))
        ].slice(0, 3)

        this.featuredProperties = featured
      } catch (error) {
        console.error('Error loading featured properties:', error)
        this.featuredProperties = []
      } finally {
        this.loading = false
      }
    },
    async loadUpcomingProperties() {
      try {
        const response = await axios.get('/api/properties?status=upcoming&limit=3')
        this.upcomingProperties = response.data
      } catch (error) {
        console.error('Error loading upcoming properties:', error)
        this.upcomingProperties = []
      } finally {
        this.loadingUpcoming = false
      }
    },
    onBackgroundLoad() {
      console.log('Background image loaded')
    },
    async loadHeroContent() {
      try {
        const response = await axios.get('/api/admin/content/public')
        console.log('Hero content API response:', response.data) // Debug
        if (response.data) {
          this.heroContent = { ...this.heroContent, ...response.data.hero }
          this.companyImage = response.data.hero?.companyImage || ""
          console.log('Final heroContent:', this.heroContent) // Debug
          console.log('Company image:', this.companyImage) // Debug
        }
      } catch (error) {
        console.error('Error loading hero content:', error)
      }
    },
    getHeroBackgroundImage() {
      if (this.heroContent.backgroundImage) {
        if (this.heroContent.backgroundImage.startsWith('http')) {
          return this.heroContent.backgroundImage
        }
        return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${this.heroContent.backgroundImage}`
      }
      // Return empty string instead of placeholder to avoid flicker
      return ''
    },
    getHeroForegroundImage(index = null) {
      // If index is provided, get image from gallery
      if (index !== null && this.heroContent.galleryImages && this.heroContent.galleryImages[index]) {
        const imagePath = this.heroContent.galleryImages[index]
        if (imagePath.startsWith('http')) {
          return imagePath
        }
        return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
      }

      // Fallback to single foreground image for backward compatibility
      if (this.heroContent.foregroundImage) {
        if (this.heroContent.foregroundImage.startsWith('http')) {
          return this.heroContent.foregroundImage
        }
        return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${this.heroContent.foregroundImage}`
      }
      // Return empty string instead of placeholder
      return ''
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
    },
    handleImageError(event) {
      event.target.src = '/placeholder-home.jpg'
    },

    handleCompanyImageError(event) {
      event.target.src = '/placeholder-home.jpg'
    },
    getStatusBadgeClass(property) {
      // Status-based coloring (sold, pending, available)
      if (property.status === 'sold') return 'bg-danger'
      if (property.status === 'pending') return 'bg-warning'
      if (property.status === 'available') {
        if (property.type === 'sale') return 'bg-success'
        if (property.type === 'rental') return 'bg-info'
      }
      return 'bg-primary'
    },
    getStatusText(property) {
      // Show status for sold/pending, otherwise show type
      if (property.status === 'sold') return 'Sold'
      if (property.status === 'pending') return 'Pending'
      if (property.type === 'sale') return 'For Sale'
      if (property.type === 'rental') return 'For Rent'
      return property.status || 'Available'
    },
    expressInterest(property) {
      // Simple alert for now, could be enhanced with a modal
      alert(`Thank you for your interest in ${property.title}! We'll contact you when it becomes available.`)
    },
    viewProperty(property) {
      // Prevent default scroll behavior that might cause flashing
      this.$router.push(`/property/${property._id}`).catch(() => {})
    },
    getCompanyImage() {
      if (!this.companyImage) {
        console.log('No company image found')
        return null
      }
      if (this.companyImage.startsWith('http')) return this.companyImage
      const fullUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${this.companyImage}`
      console.log('Company image URL:', fullUrl) // Debug
      return fullUrl
    },

    handleSearch() {
      // Build query parameters for the search
      const queryParams = new URLSearchParams()

      // Add location search if provided
      if (this.searchQuery.trim()) {
        queryParams.set('location', this.searchQuery.trim())
      }

      // Add advanced filters if they exist
      if (this.filters.priceRange) {
        queryParams.set('priceRange', this.filters.priceRange)
      }
      if (this.filters.bedrooms) {
        queryParams.set('bedrooms', this.filters.bedrooms)
      }
      if (this.filters.bathrooms) {
        queryParams.set('bathrooms', this.filters.bathrooms)
      }
      if (this.filters.propertyType) {
        queryParams.set('propertyType', this.filters.propertyType)
      }

      // Determine which page to redirect to based on search type
      let targetRoute = '/properties' // Default to properties page

      if (this.searchType === 'rent') {
        targetRoute = '/rentals'
      } else if (this.searchType === 'upcoming') {
        targetRoute = '/upcoming'
      } else if (this.searchType === 'buy') {
        targetRoute = '/properties'
      }

      // Build the final URL with query parameters
      const queryString = queryParams.toString()
      const finalUrl = queryString ? `${targetRoute}?${queryString}` : targetRoute

      // Navigate to the target page
      this.$router.push(finalUrl)
    },

    // Carousel methods - Simplified to prevent double animations
    nextImage() {
      if (this.heroContent.galleryImages && this.heroContent.galleryImages.length > 1 && !this.isTransitioning) {
        this.isTransitioning = true
        this.currentImageIndex = (this.currentImageIndex + 1) % this.heroContent.galleryImages.length

        // Reset transition flag after animation completes
        setTimeout(() => {
          this.isTransitioning = false
        }, 300)

        this.resetCarouselTimer()
      }
    },

    previousImage() {
      if (this.heroContent.galleryImages && this.heroContent.galleryImages.length > 1 && !this.isTransitioning) {
        this.isTransitioning = true
        this.currentImageIndex = this.currentImageIndex === 0
          ? this.heroContent.galleryImages.length - 1
          : this.currentImageIndex - 1

        // Reset transition flag after animation completes
        setTimeout(() => {
          this.isTransitioning = false
        }, 300)

        this.resetCarouselTimer()
      }
    },

    goToImage(index) {
      if (index !== this.currentImageIndex && !this.isTransitioning) {
        this.isTransitioning = true
        this.currentImageIndex = index

        // Reset transition flag after animation completes
        setTimeout(() => {
          this.isTransitioning = false
        }, 300)

        this.resetCarouselTimer()
      }
    },

    getNextImageIndex() {
      if (!this.heroContent.galleryImages || this.heroContent.galleryImages.length <= 1) return 0
      return (this.currentImageIndex + 1) % this.heroContent.galleryImages.length
    },

    getPreviousImageIndex() {
      if (!this.heroContent.galleryImages || this.heroContent.galleryImages.length <= 1) return 0
      return this.currentImageIndex === 0
        ? this.heroContent.galleryImages.length - 1
        : this.currentImageIndex - 1
    },

    startCarouselTimer() {
      // Clear any existing timer first
      this.stopCarouselTimer()

      if (this.heroContent.galleryImages && this.heroContent.galleryImages.length > 1) {
        this.carouselInterval = setInterval(() => {
          // Additional safety check
          if (this.$route.name === 'Home' && this.heroContent.galleryImages && this.heroContent.galleryImages.length > 1) {
            this.nextImage()
          } else {
            this.stopCarouselTimer()
          }
        }, 5000) // Change image every 5 seconds
      }
    },

    resetCarouselTimer() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
        this.carouselInterval = null
      }
      this.startCarouselTimer()
    },

    stopCarouselTimer() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
        this.carouselInterval = null
      }
    },

    isCurrentMediaVideo() {
      if (!this.heroContent.galleryImages || this.heroContent.galleryImages.length === 0) {
        return false
      }
      const currentMedia = this.heroContent.galleryImages[this.currentImageIndex]
      if (!currentMedia) return false

      const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.m4v']
      const lowerPath = currentMedia.toLowerCase()
      return videoExtensions.some(ext => lowerPath.includes(ext))
    },

    scrollToContent() {
      // Scroll to the next section (Featured Properties)
      const nextSection = document.querySelector('.properties-main-section')
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 80vh;
  z-index: 3;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%
  );
  z-index: 4;
  pointer-events: none;
}

.hero-background-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  filter: blur(2px);
}

.hero-background.active {
  opacity: 0.2;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg, 
    rgb(216, 146, 95) 0%, 
    rgba(160, 96, 1, 0.596) 50%, 
    rgba(0, 0, 0, 0.829) 100%
  );
  z-index: 1;
}

.property-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.property-image {
  height: 200px;
  object-fit: cover;
}

.min-vh-60 {
  min-height: 60vh;
}

.btn-midnight-black {
  background-color: #000000 !important;
  border-color: #000000 !important;
  color: #ffffff !important;
  transition: all 0.3s ease;
}

.btn-midnight-black:hover,
.btn-midnight-black:focus,
.btn-midnight-black:active {
  background-color: #ffffff !important;
  border-color: #000000 !important;
  color: #000000 !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.custom-dark-btn {
  background-color: #000000 !important;
  border-color: #000000 !important;
  color: #ffffff !important;
  transition: all 0.3s ease;
}

.custom-dark-btn:hover,
.custom-dark-btn:focus,
.custom-dark-btn:active {
  background-color: #ffffff !important;
  border-color: #000000 !important;
  color: #000000 !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.text-primary {
  color: #000000 !important;
}

.bg-primary {
  background-color: #EBA472 !important;
}

.spinner-border.text-primary {
  color: #000000 !important;
}

.btn-outline-dark {
  color: #000000 !important;
  border-color: #000000 !important;
}

.btn-outline-dark:hover {
  background-color: #000000 !important;
  border-color: #000000 !important;
  color: #ffffff !important;
}

.cube-image-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}


.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 2;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(235, 164, 114, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 15%;
  animation-delay: -2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 30%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  33% { 
    transform: translateY(-15px) rotate(2deg);
  }
  66% { 
    transform: translateY(-8px) rotate(-2deg);
  }
}

/* Main page background - darker */
.home-page {
  background-color: #4A4A4A; /* slate-gray background */
  min-height: 100vh;
}

/* Properties main section background */
.properties-main-section {
  background: linear-gradient(135deg, #000000 0%, #000000 50%, #000000 100%);
  position: relative;
  overflow: hidden;
  will-change: transform;
  margin-top: -20px;
  padding-top: 40px;
  z-index: 2;
}

.properties-main-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgb(0, 0, 0) 0%,
    rgba(255, 178, 142, 0.89) 25%,
    rgb(0, 0, 0) 50%,
    rgb(252, 187, 140) 75%,
    rgb(0, 0, 0) 100%
  );
  background-size: 400% 400%;
  backdrop-filter: blur(8px);
  pointer-events: none;
  animation: shimmerFlow 18s ease-in-out infinite;
  will-change: background-position;
}

.properties-main-section::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    rgba(235, 164, 114, 0.2),
    rgba(255, 255, 255, 0.15),
    transparent
  );
  animation: shimmerSweep 6s linear infinite;
  pointer-events: none;
  will-change: transform;
}

@keyframes shimmerFlow {
  0%, 100% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
}

@keyframes shimmerSweep {
  0% { transform: translateX(-100%) translateZ(0); }
  100% { transform: translateX(100%) translateZ(0); }
}

.properties-main-section .container {
  position: relative;
  z-index: 2;
}

/* Featured Properties section */
.featured-properties-section {
  background: linear-gradient(145deg, 
    rgba(0, 0, 0, 0.9) 0%, 
    rgba(27, 25, 25, 0.8) 30%,
    rgba(235, 164, 114, 0.1) 60%,
    rgba(27, 25, 25, 0.8) 100%
  );
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(235, 164, 114, 0.2);
  position: relative;
  overflow: hidden;
}

.featured-properties-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 50%,
    rgba(235, 164, 114, 0.03) 100%
  );
  pointer-events: none;
}

.featured-properties-section h2 {
  color: #ffffff;
}

.featured-properties-section .lead {
  color: #ffffff9d;
}

/* Featured property cards - darker elegant look */
.featured-property-card {
  background: linear-gradient(145deg, #c5b196 0%, #cfbb8e 100%);
  border: 1px solid #404040;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.featured-property-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.3);
}

.featured-property-card .card-body {
  background-color: #ffffff9c;
  color: #414141;
}

.featured-property-card .card-title {
  color: #86540a; /* warm-sunset for titles */
  font-weight: 600;
}

.featured-property-card .text-muted {
  color: #2b2b2b !important;
}

.featured-property-card .h5 {
  color: #000000;
}

/* Upcoming Properties section */
.upcoming-properties-section {
  background: linear-gradient(145deg, 
    rgba(43, 43, 43, 0.9) 0%, 
    rgba(161, 95, 59, 0.3) 30%,
    rgba(255, 255, 255, 0.05) 60%,
    rgba(43, 43, 43, 0.9) 100%
  );
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 
    0 8px 32px rgba(161, 95, 59, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(161, 95, 59, 0.3);
  position: relative;
  overflow: hidden;
}

.upcoming-properties-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(235, 164, 114, 0.08) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.03) 100%
  );
  pointer-events: none;
}

.upcoming-properties-section h2 {
  color: #ffffff;
}

.upcoming-properties-section .lead {
  color: rgba(255, 255, 255, 0.9);
}

/* Upcoming property cards - warm sunset theme */
.upcoming-property-card {
  background: linear-gradient(145deg, #f4f4f4 0%, #e8e8e8 100%);
  border: 2px solid #EBA472;
  box-shadow: 0 4px 15px rgba(235, 164, 114, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.upcoming-property-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(235, 164, 114, 0.4);
  border-color: #A15E3B;
}

.upcoming-property-card .card-body {
  background: linear-gradient(145deg, #ffffff 0%, #ffffffb4 100%);
  /* background-color: #ffffff; */
  color: #2c2c2c;
}

.upcoming-property-card .card-title {
  color: #A15E3B; /* sienna-brown for upcoming titles */
  font-weight: 600;
}

.upcoming-property-card .text-muted {
  color: #666666 !important;
}

.upcoming-property-card .h5 {
  color: #2c2c2c;
}

/* Services section - keep light but softer */
.services-section {
  background-color: #f1f1f1 !important; /* Softer than bright white */
}

.services-section .service-icon i {
  color: #EBA472 !important;
}

/* Featured property cards - darker elegant look */
.featured-property-card .btn-warm-sunset {
  background-color: #EBA472 !important;
  border-color: #EBA472 !important;
  color: #ffffff !important;
  font-weight: 500;
}

.featured-property-card .btn-warm-sunset:hover {
  background-color: #A15E3B !important;
  border-color: #A15E3B !important;
  color: #ffffff !important;
}

/* Company Description Card - Cube-inspired styling */
.company-description-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 248, 0.9) 100%);
  border: 1px solid rgba(235, 164, 114, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.company-description-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #000000 0%, #EBA472 50%, #A15E3B 100%);
}

.company-description-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.company-description-card .eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #EBA472 !important;
}

.company-description-card .icon-box {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-description-card .bg-opaque-primary {
  background-color: rgba(235, 164, 114, 0.1) !important;
}

.company-description-card .text-primary {
  color: #EBA472 !important;
}

.company-description-card .text-secondary {
  color: #666666 !important;
}

.company-description-card h3 {
  color: #2c2c2c;
}

/* Horizontal Properties Layout */
.properties-horizontal-scroll {
  overflow-x: auto;
  padding-bottom: 10px;
}

.properties-row {
  display: flex;
  gap: 1rem;
  min-width: min-content;
}

.property-item {
  flex: 0 0 220px;
  min-width: 220px;
}

.property-image-small {
  height: 140px;
  object-fit: cover;
}

.badge-sm {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
}

/* Smaller property cards */
.featured-property-card,
.upcoming-property-card {
  max-width: 220px;
}

.featured-property-card .card-title,
.upcoming-property-card .card-title {
  font-size: 0.9rem;
  line-height: 1.2;
}

.featured-property-card .h6,
.upcoming-property-card .h6 {
  font-size: 0.85rem;
}

/* Company Image Card - slim border, no hover, matched height */
.company-image-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(235, 164, 114, 0.3);
  border-radius: 6px;
  overflow: hidden;
  height: 32.5%;
}

.company-image-card .image-container {
  padding: 1px;
  height: 100%;
}

.company-showcase-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

/* Hero Image Container - Original (Fallback) */
.hero-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  margin-top: 1.5rem;
}

/* Hero Image Carousel Container */
.hero-image-carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the carousel */
  padding-top: 2rem;
  margin-top: 1.5rem;
  width: 100%;
}

.hero-carousel-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  position: relative;
}

/* Hero Card Stack */
.hero-card-stack {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hero-card-stack:hover {
  transform: translateY(-8px);
}

/* Hero Cards */
.hero-card {
  position: absolute;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* Back cards for stacking effect */
.hero-card.card-back-2 {
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  transform: translateY(16px) translateX(-8px) rotate(-1.5deg);
  z-index: 1;
  opacity: 0.6;
}

.hero-card.card-back-1 {
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  transform: translateY(8px) translateX(-4px) rotate(-0.8deg);
  z-index: 2;
  opacity: 0.8;
}

/* Front card with image */
.hero-card.card-front {
  z-index: 3;
  background: #fff;
  transform: translateY(0) translateX(0) rotate(0deg);
  position: relative;
}

.hero-card.card-front:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.hero-foreground-image,
.hero-foreground-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-card-stack:hover .card-overlay {
  opacity: 1;
}

.card-overlay i {
  color: white;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Image Counter */
.image-counter {
  text-align: center;
  margin-top: 0.5rem;
}

.image-counter span {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

/* Single Image Fallback */
.hero-foreground-image-single {
  width: 100%;
  max-width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  display: block;
}

.hero-foreground-image-single:hover {
  transform: scale(1.02);
}

/* Navigation Dots */
.carousel-dots {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dot:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.3);
}

.carousel-dot.active {
  background: #EBA472;
  border-color: #EBA472;
  box-shadow: 0 0 10px rgba(235, 164, 114, 0.5);
}

/* Hero Text Styles - Smaller and Better Spaced */
.hero-main-title {
  font-size: 2.5rem; /* Smaller than display-4 */
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.1rem; /* Smaller than lead */
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Scroll Indicator Styles */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  transform: translateX(-50%) translateY(-5px);
}

.scroll-arrow {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.9) 0%, rgba(161, 94, 59, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(235, 164, 114, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: bounce 2s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
  transition: all 0.3s ease;
}

.scroll-arrow:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(235, 164, 114, 0.5);
}

.scroll-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  animation: fade-pulse 2s ease-in-out infinite;
}

/* Scroll Indicator Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(235, 164, 114, 0.3);
  }
  50% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 30px rgba(235, 164, 114, 0.6);
  }
}

@keyframes fade-pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Property Search Section - Professional Glass Design */
.property-search-section {
  position: relative;
  z-index: 2;
  width: 100%;
}

.search-card-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.search-card-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.search-header {
  margin-bottom: 2.5rem;
}

.search-title {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.search-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
}

/* Main Search Input */
.main-search-container {
  position: relative;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-location-icon {
  position: absolute;
  left: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  z-index: 3;
}

.search-input-main {
  width: 100%;
  height: 65px;
  padding: 0 25px 0 55px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.search-input-main::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.search-input-main:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(235, 164, 114, 0.6);
  box-shadow:
    0 0 0 3px rgba(235, 164, 114, 0.2),
    0 8px 32px rgba(235, 164, 114, 0.15);
  transform: translateY(-2px);
}

/* Controls Row */
.search-controls-row {
  display: flex;
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 2rem;
}

.property-type-container {
  flex: 1;
}

.control-label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.property-type-select {
  width: 100%;
  height: 55px;
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.property-type-select:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(235, 164, 114, 0.6);
  box-shadow: 0 0 0 3px rgba(235, 164, 114, 0.2);
}

.property-type-select option {
  background: #2a2a2a;
  color: #ffffff;
  padding: 10px;
}

/* Search Button */
.search-btn-main {
  height: 55px;
  padding: 0 2.5rem;
  background: linear-gradient(135deg, #EBA472 0%, #D4956B 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(235, 164, 114, 0.3);
  white-space: nowrap;
}

.search-btn-main:hover {
  background: linear-gradient(135deg, #D4956B 0%, #C8875F 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.4);
}

.search-btn-main:active {
  transform: translateY(-1px);
}

/* Advanced Filters Toggle */
.advanced-toggle-container {
  text-align: center;
  margin-bottom: 1rem;
}

.advanced-toggle-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.advanced-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
}

/* Advanced Filters Container with Animation */
.advanced-filters-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.advanced-filters-container.expanded {
  max-height: 300px;
}

.advanced-filters-panel {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.advanced-filters-container.expanded .advanced-filters-panel {
  opacity: 1;
  transform: translateY(0);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-select {
  height: 48px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.95rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(235, 164, 114, 0.6);
  box-shadow: 0 0 0 2px rgba(235, 164, 114, 0.2);
}

.filter-select option {
  background: #2a2a2a;
  color: #ffffff;
  padding: 8px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .search-card-glass {
    padding: 2.5rem 2rem;
  }

  .search-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .hero-main-title {
    font-size: 2rem; /* Smaller on mobile */
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-carousel-wrapper {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem; /* Add padding to prevent edge cutoff */
  }

  .carousel-dots {
    bottom: -30px;
  }

  .search-card-glass {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  .search-title {
    font-size: 1.8rem;
  }

  .search-subtitle {
    font-size: 1rem;
  }

  .search-input-main {
    height: 58px;
    font-size: 1rem;
  }

  .search-controls-row {
    flex-direction: column;
    gap: 1rem;
  }

  .search-btn-main {
    width: 100%;
    justify-content: center;
    height: 52px;
  }

  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .advanced-filters-panel {
    padding: 1.5rem;
  }

  .advanced-filters-container.expanded {
    max-height: 400px;
  }

  .hero-image-carousel-container {
    padding: 0 1rem; /* Add horizontal padding */
  }

  .hero-card-stack {
    max-width: calc(100vw - 2rem); /* Full width minus padding */
    width: 100%;
    height: 250px; /* Smaller height on mobile */
    margin: 0 auto; /* Center the stack */
  }

  .hero-card {
    height: 250px;
    width: 100%;
  }

  .hero-foreground-image,
  .hero-foreground-video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensure proper scaling */
    object-position: center; /* Center the image/video */
  }

  .hero-foreground-image-single {
    max-width: calc(100vw - 2rem);
    width: 100%;
    height: 250px;
    margin: 0 auto;
  }

  .hero-card.card-back-2 {
    transform: translateY(8px) translateX(-4px) rotate(-1deg);
  }

  .hero-card.card-back-1 {
    transform: translateY(4px) translateX(-2px) rotate(-0.5deg);
  }

  .card-overlay i {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-image-carousel-container {
    padding: 0 0.5rem; /* Tighter padding on very small screens */
  }

  .hero-card-stack {
    max-width: calc(100vw - 1rem);
    height: 200px; /* Even smaller on very small screens */
  }

  .hero-card {
    height: 200px;
  }

  .hero-foreground-image-single {
    max-width: calc(100vw - 1rem);
    height: 200px;
  }

  .search-card-glass {
    padding: 1.5rem 1rem;
    margin: 0 0.5rem;
  }

  .search-title {
    font-size: 1.6rem;
  }

  .search-input-main {
    height: 55px;
    padding-left: 50px;
  }

  .search-location-icon {
    left: 16px;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .advanced-filters-container.expanded {
    max-height: 500px;
  }

  .scroll-indicator {
    bottom: 20px;
    left: 50% !important;
    transform: translateX(-50%) !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .scroll-indicator:hover {
    transform: translateX(-50%) translateY(-5px) !important;
  }

  .scroll-arrow {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    margin: 0 auto;
  }

  .scroll-text {
    font-size: 0.75rem;
    text-align: center;
  }

  .hero-main-title {
    font-size: 2rem; /* Smaller on mobile */
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>


