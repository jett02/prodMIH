<template>
  <div class="rentals-page">
    <!-- Hero Section with Banner -->
    <section class="hero-section position-relative overflow-hidden bg-midnight-black text-white py-8 py-xl-10">
      <!-- Night Sky Animation Background -->
      <div class="night-sky-container">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="clouds"></div>
      </div>
      
      <div class="container position-relative" style="z-index: 10;">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-5 fw-light mb-3 text-white" data-aos="fade-up">
              {{ bannerText || 'Find Your Perfect Rental Home' }}
            </h1>
            <p class="fs-6 text-white-50 mb-0" data-aos="fade-up" data-aos-delay="200">
              Discover quality rental properties in Omaha's best neighborhoods
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Bar -->
    <section class="filters-bar py-3 bg-white shadow-lg border-bottom">
      <div class="container-fluid">
        <div class="row align-items-center g-3">
          <div class="col-md-3">
            <div class="row g-2 align-items-center">
              <div class="col-6">
                <input type="number" class="form-control form-control-sm filter-input" placeholder="Min Price" 
                       v-model="filters.minPrice" @input="applyFilters">
              </div>
              <div class="col-6">
                <input type="number" class="form-control form-control-sm filter-input" placeholder="Max Price" 
                       v-model="filters.maxPrice" @input="applyFilters">
              </div>
            </div>
            <select v-model="filters.priceRange" @change="applyFilters" class="form-select form-select-sm filter-select mt-2">
              <option value="">Quick Price Ranges</option>
              <option value="0-1000">Under $1,000</option>
              <option value="1000-1500">$1,000 - $1,500</option>
              <option value="1500-2000">$1,500 - $2,000</option>
              <option value="2000-2500">$2,000 - $2,500</option>
              <option value="2500-3000">$2,500 - $3,000</option>
              <option value="3000-99999">$3,000+</option>
            </select>
          </div>
          <div class="col-md-2">
            <select v-model="filters.bedrooms" @change="applyFilters" class="form-select form-select-sm filter-select-compact">
              <option value="" selected>Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>
          <div class="col-md-2">
            <select v-model="filters.bathrooms" @change="applyFilters" class="form-select form-select-sm filter-select-compact">
              <option value="" selected>Any Bathrooms</option>
              <option value="1">1+ Bathrooms</option>
              <option value="1.5">1.5+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="2.5">2.5+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
          </div>
          <div class="col-md-3">
            <input 
              id="location-search"
              v-model="filters.location" 
              type="text" 
              class="form-control form-control-sm filter-input-search" 
              placeholder="Search cities (e.g., Millard, Bellevue...)" 
              @input="handleLocationSearch"
              autocomplete="off">
          </div>
          <div class="col-md-2">
            <button @click="clearFilters" class="btn btn-outline-secondary btn-sm filter-btn w-100">Clear Filters</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content with Map and Properties Panel -->
    <section class="main-content-section">
      <div class="container-fluid p-0">
        <div class="row g-0" style="height: calc(100vh - 350px); min-height: 600px; max-height: 800px;">
          <!-- Map Panel - Left Side (66% - 2/3) -->
          <div class="col-lg-8">
            <div class="map-container position-relative h-100">
              <!-- Map Controls -->
              <div class="map-controls position-absolute top-0 start-0 m-3" style="z-index: 1000;">
                <div class="bg-white rounded shadow-sm p-2">
                  <div class="form-check">
                    <input v-model="showOnlyInView" @change="filterPropertiesInView" class="form-check-input" type="checkbox" id="showOnlyInView">
                    <label class="form-check-label small" for="showOnlyInView">
                      Show only in view
                    </label>
                  </div>
                </div>
              </div>
              
              <div id="rentals-map" class="h-100 w-100"></div>
            </div>
          </div>
          
          <!-- Properties Panel - Right Side (33% - 1/3) -->
          <div class="col-lg-4">
            <div class="properties-panel h-100">
              <div class="panel-header p-3 bg-light border-bottom">
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="mb-0">{{ filteredProperties.length }} Found</h6>
                  <select v-model="sortBy" @change="applySorting" class="form-select form-select-sm" style="width: auto;">
                    <option value="newest">Newest</option>
                    <option value="price-low">Price ↑</option>
                    <option value="price-high">Price ↓</option>
                  </select>
                </div>
              </div>
              
              <div class="panel-body overflow-auto" style="height: calc(100% - 60px);">
                <div v-if="loading" class="text-center p-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <p class="mt-2 small">Loading rentals...</p>
                </div>
                
                <div v-else>
                  <!-- 2x2 Grid Layout -->
                  <div class="row g-2">
                    <div v-for="rental in sortedProperties" :key="rental._id" class="col-6">
                      <div class="property-card-small border rounded shadow-sm h-100">
                        <!-- Image Carousel -->
                        <div class="position-relative" style="height: 150px;">
                          <div v-for="(image, index) in getPropertyImages(rental)" :key="index"
                               :style="{ display: (rental.currentImageIndex || 0) === index ? 'block' : 'none' }">
                            <img :src="getImageUrl(image)" 
                                 :alt="rental.title"
                                 class="card-img-top property-thumb-small"
                                 @error="handleImageError"
                                 style="height: 150px; object-fit: cover; width: 100%;">
                          </div>
                          
                          <!-- Carousel Controls -->
                          <div v-if="getPropertyImages(rental).length > 1">
                            <button @click="navigatePropertyCarousel(rental, -1)" 
                                    class="btn btn-sm btn-dark position-absolute carousel-btn-left">
                              <i class="fas fa-chevron-left"></i>
                            </button>
                            <button @click="navigatePropertyCarousel(rental, 1)" 
                                    class="btn btn-sm btn-dark position-absolute carousel-btn-right">
                              <i class="fas fa-chevron-right"></i>
                            </button>
                          </div>
                        </div>
                        
                        <div class="card-body p-2">
                          <div class="d-flex justify-content-between align-items-start mb-1">
                            <h6 class="card-title property-title mb-0" style="font-size: 0.85rem; flex: 1;">{{ rental.title }}</h6>
                            <div class="status-indicator ms-2" :class="getStatusIndicatorClass(rental.status)"></div>
                          </div>
                          <p class="card-text text-muted mb-2" style="font-size: 0.75rem;">{{ rental.address }}</p>
                          <div class="price-emphasis text-sunset fw-bold mb-2" style="font-size: 1.1rem; text-shadow: 0 1px 2px rgba(235, 164, 114, 0.3);">
                            ${{ rental.price ? rental.price.toLocaleString() : '0' }}/mo
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">{{ rental.bedrooms || 0 }}bd • {{ rental.bathrooms || 0 }}ba</small>
                            <small class="status-text" :class="getStatusTextClass(rental.status)">
                              {{ getStatusText(rental.status) }}
                            </small>
                          </div>
                          <button @click="viewProperty(rental._id)" 
                                  class="btn btn-sunset btn-sm w-100 mb-2" 
                                  style="font-size: 0.75rem;">
                            View Details
                          </button>
                          <button @click="shareProperty(rental)" 
                                  class="btn btn-outline-secondary btn-sm w-100" 
                                  style="font-size: 0.75rem;">
                            <i class="fas fa-share-alt me-1"></i>Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="!loading && filteredProperties.length === 0" class="text-center p-4">
                  <p class="text-muted small">No properties match your criteria.</p>
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
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Loader } from '@googlemaps/js-api-loader'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Rentals',
  components: {
    Footer
  },
  data() {
    return {
      rentalProperties: [],
      filteredProperties: [],
      loading: true,
      bannerText: '',
      filters: {
        priceRange: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        location: ''
      },
      sortBy: 'newest',
      showMap: false,
      map: null,
      mapInitialized: false,
      markers: [],
      mapSearchQuery: '',
      showOnlyInView: false,
      mapBounds: null,
      cityBoundary: null,
      currentInfoWindow: null,
      autocomplete: null,
      searchTimeout: null,
      boundsTimeout: null,
      pendingLocationSearch: null
    }
  },
  computed: {
    sortedProperties() {
      const sorted = [...this.filteredProperties]
      switch (this.sortBy) {
        case 'price-low':
          return sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
        case 'price-high':
          return sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
        case 'bedrooms':
          return sorted.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0))
        case 'newest':
        default:
          return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      }
    }
  },
  async mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    })

    window.viewPropertyFromMap = (propertyId) => {
      this.$router.push(`/property/${propertyId}`)
    }

    // Handle query parameters from home page search
    this.handleSearchParams()

    await this.loadBannerText()
    await this.loadRentalProperties()
    await this.initializeMap()
  },
  methods: {
    async loadBannerText() {
      try {
        const response = await axios.get('/api/settings/rentals-banner-text')
        this.bannerText = response.data.text
      } catch (error) {
        console.log('No rentals banner text found, using default')
      }
    },
    async loadRentalProperties() {
      try {
        console.log('Loading rental properties...')
        let response
        try {
          response = await axios.get('/api/properties')
          console.log('All properties loaded:', response.data)
          
          response.data = response.data.filter(p => {
            console.log('Property:', p.title, 'Type:', p.type, 'Status:', p.status)
            return p.type === 'rental' && p.status !== 'upcoming'
          })
          
          console.log('Filtered rental properties:', response.data)
        } catch (error) {
          console.error('Error loading from /api/properties:', error)
          try {
            response = await axios.get('/api/admin/properties')
            response.data = response.data.filter(p => 
              p.type === 'rental' && p.status !== 'upcoming'
            )
          } catch (adminError) {
            console.error('Error loading from admin endpoint:', adminError)
            throw adminError
          }
        }
        
        this.rentalProperties = response.data.map(property => ({
          ...property,
          currentImageIndex: 0
        })) || []
        this.filteredProperties = [...this.rentalProperties]
        
        // If map is already initialized, add markers
        if (this.map) {
          this.addPropertyMarkers()
        }
      } catch (error) {
        console.error('Error loading rental properties:', error)
        this.rentalProperties = []
        this.filteredProperties = []
      } finally {
        this.loading = false
      }
    },
    navigatePropertyCarousel(property, direction) {
      const images = this.getPropertyImages(property)
      const currentIndex = property.currentImageIndex || 0
      const newIndex = direction > 0 
        ? (currentIndex + 1) % images.length 
        : (currentIndex - 1 + images.length) % images.length
      
      property.currentImageIndex = newIndex
    },
    goToPropertySlide(property, targetIndex) {
      property.currentImageIndex = targetIndex
    },
    getPropertyImages(property) {
      const images = []
      if (property.thumbnail) images.push(property.thumbnail)
      if (property.images && property.images.length > 0) {
        property.images.forEach(img => {
          if (img !== property.thumbnail) images.push(img)
        })
      }
      return images.length > 0 ? images : ['/placeholder-home.jpg']
    },
    setupCarouselFunctions() {
      window.navigatePopupCarousel = (propertyId, direction) => {
        const carousel = document.getElementById(`popup-carousel-${propertyId}`)
        if (!carousel) return
        
        const images = carousel.querySelectorAll('.popup-carousel-image')
        const dots = carousel.parentElement.querySelectorAll('.popup-carousel-dot')
        
        let currentIndex = 0
        images.forEach((img, index) => {
          if (img.style.display === 'block') {
            currentIndex = index
          }
        })
        
        const newIndex = direction > 0 
          ? (currentIndex + 1) % images.length 
          : (currentIndex - 1 + images.length) % images.length
        
        images.forEach((img, index) => {
          img.style.display = index === newIndex ? 'block' : 'none'
        })
        
        dots.forEach((dot, index) => {
          dot.style.background = index === newIndex ? 'white' : 'rgba(255,255,255,0.5)'
        })
      }

      window.goToPopupSlide = (propertyId, targetIndex) => {
        const carousel = document.getElementById(`popup-carousel-${propertyId}`)
        if (!carousel) return
        
        const images = carousel.querySelectorAll('.popup-carousel-image')
        const dots = carousel.parentElement.querySelectorAll('.popup-carousel-dot')
        
        images.forEach((img, index) => {
          img.style.display = index === targetIndex ? 'block' : 'none'
        })
        
        dots.forEach((dot, index) => {
          dot.style.background = index === targetIndex ? 'white' : 'rgba(255,255,255,0.5)'
        })
      }
    },
    async toggleMap() {
      this.showMap = !this.showMap
      
      // Initialize map when first shown
      if (this.showMap && !this.mapInitialized) {
        // Wait for DOM to update
        await this.$nextTick()
        await this.initializeMap()
      }
    },
    async initializeMap() {
      try {
        // Check if element exists
        const mapElement = document.getElementById('rentals-map')
        if (!mapElement) {
          console.error('Map element not found')
          return
        }

        const loader = new Loader({
          apiKey: 'AIzaSyCPDKyo5k6UfUjds0XW0LpVR4glyfqDmS0',
          version: 'weekly',
          libraries: ['places']
        })

        const google = await loader.load()
        
        this.setupCarouselFunctions()
        
        this.map = new google.maps.Map(mapElement, {
          center: { lat: 41.2524, lng: -95.9980 },
          zoom: 11,
          styles: [],
          gestureHandling: 'greedy'
        })

        this.mapInitialized = true
        this.addMarkersToMap()

        // Handle pending location search from home page
        if (this.pendingLocationSearch) {
          this.searchAndZoomToLocation(this.pendingLocationSearch)
          this.pendingLocationSearch = null
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error)
      }
    },
    initializeAutocomplete() {
      const locationInput = document.getElementById('location-search')
      if (!locationInput) return

      const autocomplete = new google.maps.places.Autocomplete(locationInput, {
        types: ['(cities)'],
        componentRestrictions: { country: 'us' },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(40.5, -97.0),
          new google.maps.LatLng(42.5, -94.0)
        ),
        strictBounds: false
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          this.filters.location = place.formatted_address || place.name
          this.applyFilters()
          
          this.map.setCenter(place.geometry.location)
          this.map.setZoom(13)
        }
      })

      this.autocomplete = autocomplete
    },
    addPropertyMarkers() {
      this.clearMarkers()
      
      this.filteredProperties.forEach(property => {
        if (property.address) {
          this.geocodeAndAddMarker(property)
        }
      })
    },
    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
    },
    setupMapListeners() {
      this.map.addListener('bounds_changed', () => {
        this.mapBounds = this.map.getBounds()
        clearTimeout(this.boundsTimeout)
        this.boundsTimeout = setTimeout(() => {
          this.filterPropertiesInView()
        }, 300)
      })
      
      this.map.addListener('click', () => {
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close()
          this.currentInfoWindow = null
        }
      })
    },
    handleLocationSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        if (this.filters.location.trim()) {
          this.searchAndHighlightCity(this.filters.location)
        }
        this.applyFilters()
      }, 500)
    },
    filterPropertiesInView() {
      if (!this.mapBounds) {
        this.filteredProperties = this.applyBaseFilters()
        return
      }

      // When map bounds exist, prioritize geographic filtering over location text filter
      const baseFiltered = this.rentalProperties.filter(property => {
        // Apply all filters EXCEPT location when map bounds are active
        if (this.filters.priceRange) {
          const [min, max] = this.filters.priceRange.split('-').map(Number)
          if (property.price < min || property.price > max) return false
        }
        
        if (this.filters.minPrice && property.price < this.filters.minPrice) return false
        if (this.filters.maxPrice && property.price > this.filters.maxPrice) return false
        if (this.filters.bedrooms && property.bedrooms < this.filters.bedrooms) return false
        if (this.filters.bathrooms && property.bathrooms < this.filters.bathrooms) return false
        
        // Skip location filter when using map bounds
        return true
      })
      
      this.filteredProperties = baseFiltered.filter(property => {
        if (property.coordinates) {
          return this.mapBounds.contains(property.coordinates)
        }
        return property.address
      })
    },
    applyBaseFilters() {
      return this.rentalProperties.filter(property => {
        if (this.filters.priceRange) {
          const [min, max] = this.filters.priceRange.split('-').map(Number)
          if (property.price < min || property.price > max) return false
        }
        
        if (this.filters.minPrice && property.price < this.filters.minPrice) return false
        if (this.filters.maxPrice && property.price > this.filters.maxPrice) return false
        if (this.filters.bedrooms && property.bedrooms < this.filters.bedrooms) return false
        if (this.filters.bathrooms && property.bathrooms < this.filters.bathrooms) return false
        
        if (this.filters.location) {
          const location = this.filters.location.toLowerCase()
          const address = (property.address || '').toLowerCase()
          const title = (property.title || '').toLowerCase()
          if (!address.includes(location) && !title.includes(location)) return false
        }
        
        return true
      })
    },
    addMarkersToMap() {
      this.addPropertyMarkers()
      this.setupMapListeners()
      this.initializeAutocomplete()
    },
    async geocodeAndAddMarker(property) {
      const geocoder = new google.maps.Geocoder()
      
      try {
        const result = await new Promise((resolve, reject) => {
          geocoder.geocode({ address: property.address }, (results, status) => {
            if (status === 'OK') resolve(results[0])
            else reject(status)
          })
        })

        const location = result.geometry.location
        property.coordinates = location

        // Round to nearest 0.1K for rentals
        const roundedPrice = Math.round(property.price / 100) / 10

        const priceLabel = new google.maps.Marker({
          position: {
            lat: location.lat() + 0.0008,
            lng: location.lng()
          },
          map: this.map,
          zIndex: 1000,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="30">
                <rect width="120" height="30" rx="15" fill="#EBA472" stroke="#fff" stroke-width="2"/>
                <text x="60" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">
                  $${roundedPrice}K/mo
                </text>
              </svg>
            `),
            anchor: new google.maps.Point(60, 30)
          }
        })

        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: property.title,
          zIndex: 500,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EBA472">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 24)
          }
        })

        const propertyImages = this.getPropertyImages(property)
        const infoWindowContent = `
          <div class="property-popup" style="width: 300px; font-family: Arial, sans-serif;">
            <div class="popup-carousel-container" style="position: relative; margin-bottom: 10px;">
              <div class="popup-carousel" id="popup-carousel-${property._id}" style="position: relative; overflow: hidden; border-radius: 8px; height: 150px;">
                ${propertyImages.map((image, index) => `
                  <img src="${this.getImageUrl(image)}" 
                       alt="${property.title}" 
                       class="popup-carousel-image"
                       style="width: 100%; height: 150px; object-fit: cover; display: ${index === 0 ? 'block' : 'none'}; cursor: pointer;"
                       onclick="window.viewPropertyFromMap('${property._id}')"
                       onerror="this.src='/placeholder-home.jpg'">
                `).join('')}
                ${propertyImages.length > 1 ? `
                  <button onclick="window.navigatePopupCarousel('${property._id}', -1)" 
                          style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    ‹
                  </button>
                  <button onclick="window.navigatePopupCarousel('${property._id}', 1)" 
                          style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    ›
                  </button>
                ` : ''}
              </div>
              ${propertyImages.length > 1 ? `
                <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
                  ${propertyImages.map((_, index) => `
                    <button onclick="window.goToPopupSlide('${property._id}', ${index})" 
                            class="popup-carousel-dot"
                            style="width: 8px; height: 8px; border-radius: 50%; border: none; background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'}; cursor: pointer;">
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <h6 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${property.title}</h6>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${property.address}</p>
            <div style="margin-bottom: 8px;">
              <span style="font-size: 18px; font-weight: bold; color: #EBA472;">$${roundedPrice}K/mo</span>
            </div>
            <div style="margin-bottom: 12px; color: #666; font-size: 14px;">
              ${property.bedrooms || 0}bd • ${property.bathrooms || 0}ba
            </div>
            <button onclick="window.viewPropertyFromMap('${property._id}')" 
                    style="width: 100%; padding: 8px 16px; background-color: #EBA472; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">
              View Details
            </button>
          </div>
        `

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
          disableAutoPan: false,
          pixelOffset: new google.maps.Size(0, -20)
        })

        const openInfoWindow = () => {
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close()
          }
          
          const mapDiv = document.getElementById('rentals-map')
          const mapBounds = mapDiv.getBoundingClientRect()
          
          const latLng = marker.getPosition()
          const projection = this.map.getProjection()
          
          if (projection) {
            const point = projection.fromLatLngToPoint(latLng)
            point.y -= 0.008
            const newLatLng = projection.fromPointToLatLng(point)
            this.map.panTo(newLatLng)
          } else {
            this.map.panTo(latLng)
          }
          
          setTimeout(() => {
            infoWindow.open(this.map, marker)
            this.currentInfoWindow = infoWindow
          }, 400)
        }

        marker.addListener('click', openInfoWindow)
        priceLabel.addListener('click', openInfoWindow)

        this.markers.push(marker, priceLabel)
      } catch (error) {
        console.error('Geocoding failed for:', property.address, error)
      }
    },
    async searchAndHighlightCity(cityName) {
      const geocoder = new google.maps.Geocoder()
      
      try {
        const result = await new Promise((resolve, reject) => {
          geocoder.geocode({ address: cityName }, (results, status) => {
            if (status === 'OK') resolve(results[0])
            else reject(status)
          })
        })

        const location = result.geometry.location
        const bounds = result.geometry.bounds || result.geometry.viewport

        this.map.setCenter(location)
        this.map.fitBounds(bounds)

      } catch (error) {
        console.error('Geocoding failed for:', cityName, error)
      }
    },
    removeCityBoundary() {
      if (this.cityBoundary) {
        this.cityBoundary.setMap(null)
        this.cityBoundary = null
      }
    },
    applyFilters() {
      this.filteredProperties = this.applyBaseFilters()

      if (this.map) {
        this.addPropertyMarkers()
      }
    },
    clearFilters() {
      this.filters = {
        priceRange: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        minBathrooms: '',
        maxBathrooms: '',
        location: ''
      }
      this.filteredProperties = [...this.rentalProperties]
      
      if (this.map) {
        this.map.setCenter({ lat: 41.2524, lng: -95.9980 })
        this.map.setZoom(11)
        
        this.removeCityBoundary()
        
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close()
          this.currentInfoWindow = null
        }
      }
    },

    handleSearchParams() {
      const urlParams = new URLSearchParams(window.location.search)

      // Apply filters from URL parameters
      if (urlParams.get('location')) {
        this.filters.location = urlParams.get('location')
        // Store location for map search after map is loaded
        this.pendingLocationSearch = urlParams.get('location')
      }
      if (urlParams.get('priceRange')) {
        this.filters.priceRange = urlParams.get('priceRange')
      }
      if (urlParams.get('bedrooms')) {
        this.filters.bedrooms = urlParams.get('bedrooms')
      }
      if (urlParams.get('bathrooms')) {
        this.filters.bathrooms = urlParams.get('bathrooms')
      }

      // Apply filters after properties are loaded
      this.$nextTick(() => {
        if (this.rentalProperties.length > 0) {
          this.applyFilters()
          // If we have a pending location search and map is ready, search and zoom
          if (this.pendingLocationSearch && this.map) {
            this.searchAndZoomToLocation(this.pendingLocationSearch)
            this.pendingLocationSearch = null
          }
        }
      })
    },

    searchAndZoomToLocation(location) {
      if (!this.map || !location) return

      const service = new google.maps.places.PlacesService(this.map)

      // Handle known Omaha area neighborhoods and suburbs
      const omahaAreas = {
        'millard': 'Millard, Omaha, Nebraska',
        'bellevue': 'Bellevue, Nebraska',
        'papillion': 'Papillion, Nebraska',
        'la vista': 'La Vista, Nebraska',
        'gretna': 'Gretna, Nebraska',
        'elkhorn': 'Elkhorn, Omaha, Nebraska',
        'benson': 'Benson, Omaha, Nebraska',
        'florence': 'Florence, Omaha, Nebraska',
        'ralston': 'Ralston, Nebraska',
        'boys town': 'Boys Town, Nebraska',
        'waterloo': 'Waterloo, Nebraska',
        'valley': 'Valley, Nebraska',
        'bennington': 'Bennington, Nebraska',
        'blair': 'Blair, Nebraska',
        'council bluffs': 'Council Bluffs, Iowa',
        'carter lake': 'Carter Lake, Iowa'
      }

      // Check if the location is a known area and use the full name
      const normalizedLocation = location.toLowerCase().trim()
      const knownArea = omahaAreas[normalizedLocation]
      const searchLocation = knownArea || location

      // Try multiple search strategies for better coverage
      const searchStrategies = [
        // Strategy 1: Use known area mapping or search as-is
        { query: searchLocation, fields: ['geometry', 'name'] },
        // Strategy 2: Add "Nebraska" to help with local areas
        { query: `${location}, Nebraska`, fields: ['geometry', 'name'] },
        // Strategy 3: Add "Omaha" for suburbs/neighborhoods
        { query: `${location}, Omaha, Nebraska`, fields: ['geometry', 'name'] },
        // Strategy 4: Search as neighborhood
        { query: `${location} neighborhood, Omaha, Nebraska`, fields: ['geometry', 'name'] },
        // Strategy 5: Try with "NE" abbreviation
        { query: `${location}, NE`, fields: ['geometry', 'name'] }
      ]

      const trySearch = (strategyIndex = 0) => {
        if (strategyIndex >= searchStrategies.length) {
          console.log('All location search strategies failed for:', location)
          return
        }

        const request = searchStrategies[strategyIndex]
        console.log(`Trying search strategy ${strategyIndex + 1}:`, request.query)

        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
            const place = results[0]
            const foundLocation = place.geometry.location

            // Center map on the location
            this.map.setCenter(foundLocation)
            this.map.setZoom(13)

            // Add a marker for the searched location
            new google.maps.Marker({
              position: foundLocation,
              map: this.map,
              title: `Search: ${place.name}`,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }
            })

            console.log(`Successfully found and zoomed to: ${place.name}`)
          } else {
            console.log(`Strategy ${strategyIndex + 1} failed, trying next...`)
            // Try next strategy
            trySearch(strategyIndex + 1)
          }
        })
      }

      // Start with the first strategy
      trySearch(0)
    },

    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    },
    handleImageError(event) {
      event.target.src = '/placeholder-home.jpg'
    },
    viewProperty(propertyId) {
      // Handle both property object and property ID
      const id = typeof propertyId === 'object' ? propertyId._id : propertyId
      this.$router.push(`/property/${id}`)
    },
    formatPrice(price) {
      if (!price) return '0'
      return (price / 1000).toFixed(0) + 'K'
    },
    getStatusIndicatorClass(status) {
      switch (status) {
        case 'available': return 'status-available'
        case 'pending': return 'status-pending'
        case 'rented': return 'status-rented'
        default: return 'status-available'
      }
    },
    getStatusTextClass(status) {
      switch (status) {
        case 'available': return 'text-success'
        case 'pending': return 'text-warning'
        case 'rented': return 'text-danger'
        default: return 'text-success'
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'available': return 'Available'
        case 'pending': return 'Pending'
        case 'rented': return 'Rented'
        default: return 'Available'
      }
    },
    applySorting() {
      // Sorting is handled by computed property
    },
    shareProperty(property) {
      const propertyUrl = `${window.location.origin}/property/${property._id}`
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(propertyUrl).then(() => {
          alert('Property link copied to clipboard!')
        }).catch(err => {
          console.error('Failed to copy link: ', err)
          this.fallbackCopyToClipboard(propertyUrl)
        })
      } else {
        this.fallbackCopyToClipboard(propertyUrl)
      }
    },
    fallbackCopyToClipboard(text) {
      const tempInput = document.createElement('input')
      tempInput.value = text
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      alert('Property link copied to clipboard!')
    }
  },
  
  watch: {
    filteredProperties() {
      if (this.map) {
        this.addPropertyMarkers()
      }
    },
    
    showMap(newValue) {
      if (newValue && !this.mapInitialized) {
        this.$nextTick(() => {
          this.initializeMap()
        })
      }
    }
  },
  
  beforeUnmount() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete)
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
    if (this.boundsTimeout) {
      clearTimeout(this.boundsTimeout)
    }
  }
}
</script>

<style scoped>
.rentals-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 80px;
}

.hero-section {
  background: #000000 !important;
  position: relative;
  overflow: hidden;
}

.bg-midnight-black {
  background-color: #000000 !important;
}

.night-sky-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stars, .twinkling, .clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.stars {
  background: #000 url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white"/><circle cx="80" cy="30" r="0.3" fill="white"/><circle cx="30" cy="60" r="0.4" fill="white"/><circle cx="70" cy="80" r="0.2" fill="white"/><circle cx="50" cy="10" r="0.6" fill="white"/><circle cx="10" cy="70" r="0.3" fill="white"/><circle cx="90" cy="60" r="0.4" fill="white"/><circle cx="40" cy="40" r="0.2" fill="white"/></svg>') repeat;
  background-size: 200px 200px;
  animation: move-stars 200s linear infinite;
}

.twinkling {
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="0.3" fill="white" opacity="0.8"/><circle cx="75" cy="35" r="0.2" fill="white" opacity="0.6"/><circle cx="35" cy="65" r="0.4" fill="white" opacity="0.9"/><circle cx="65" cy="75" r="0.2" fill="white" opacity="0.7"/><circle cx="15" cy="55" r="0.3" fill="white" opacity="0.5"/><circle cx="85" cy="15" r="0.2" fill="white" opacity="0.8"/></svg>') repeat;
  background-size: 300px 300px;
  animation: move-twinkle 100s linear infinite;
}

.clouds {
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="20" cy="80" rx="15" ry="3" fill="rgba(255,255,255,0.1)"/><ellipse cx="70" cy="20" rx="20" ry="4" fill="rgba(255,255,255,0.08)"/><ellipse cx="50" cy="60" rx="25" ry="5" fill="rgba(255,255,255,0.06)"/></svg>') repeat-x;
  background-size: 400px 100px;
  animation: move-clouds 120s linear infinite;
}

@keyframes move-stars {
  from { transform: translateX(0); }
  to { transform: translateX(-200px); }
}

@keyframes move-twinkle {
  from { transform: translateX(0); }
  to { transform: translateX(-300px); }
}

@keyframes move-clouds {
  from { transform: translateX(0); }
  to { transform: translateX(-400px); }
}

.filters-bar {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border-bottom: 3px solid #EBA472 !important;
}

.filter-input {
  border: 2px solid #dee2e6 !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  background: #ffffff !important;
}

.filter-input:focus {
  border-color: #EBA472 !important;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25) !important;
  transform: translateY(-1px) !important;
}

.filter-select {
  border: 2px solid #dee2e6 !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  background: #ffffff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 12px !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
}

.filter-select:focus {
  border-color: #EBA472 !important;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25) !important;
  transform: translateY(-1px) !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23EBA472' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e") !important;
}

.filter-select-compact {
  border: 2px solid #dee2e6 !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  background: #ffffff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 12px !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
}

.filter-select-compact:focus {
  border-color: #EBA472 !important;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25) !important;
  transform: translateY(-1px) !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23EBA472' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e") !important;
}

.filter-btn {
  border: 2px solid #6c757d !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  background: #ffffff !important;
}

.filter-btn:hover {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
}

.filter-input-search {
  border: 1px solid #EBA472 !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-weight: 700 !important;
  transition: all 0.3s ease !important;
  background: #ffffff !important;
}

.filter-input-search:focus {
  border-color: #d4926a !important;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25) !important;
  transform: translateY(-1px) !important;
}

.main-content-section {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
}

.map-container {
  height: 100%;
  background-color: #f8f9fa;
}

.properties-panel {
  background-color: #ffffff;
  border-left: 1px solid #dee2e6;
  height: 100%;
  max-height: 100%;
}

.panel-header {
  background-color: #f8f9fa !important;
  border-bottom: 1px solid #dee2e6 !important;
}

.panel-body {
  padding: 1rem;
  background-color: #ffffff;
  overflow-y: auto;
  max-height: calc(100% - 60px);
}

.property-card-small {
  background-color: #ffffff;
  border: 1px solid #e9ecef !important;
  border-radius: 8px !important;
  transition: all 0.2s ease;
  cursor: pointer;
}

.property-card-small:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
}

.property-thumb-small {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 150px !important;
  object-fit: cover;
}

.carousel-btn-left {
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn-right {
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.property-title {
  color: #333;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.text-sunset {
  color: #EBA472 !important;
}

.btn-sunset {
  background-color: #EBA472 !important;
  border-color: #EBA472 !important;
  color: white !important;
  font-weight: 500;
}

.btn-sunset:hover {
  background-color: #d4926a !important;
  border-color: #d4926a !important;
  transform: translateY(-1px);
}

#rentals-map {
  border-right: 1px solid #dee2e6;
  min-height: 500px;
  max-height: 100%;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-available {
  background-color: #28a745;
  box-shadow: 0 0 6px rgba(40, 167, 69, 0.6);
  animation: pulse-green 2s infinite;
}

.status-pending {
  background-color: #ffc107;
  box-shadow: 0 0 6px rgba(255, 193, 7, 0.6);
  animation: pulse-yellow 2s infinite;
}

.status-rented {
  background-color: #dc3545;
  box-shadow: 0 0 6px rgba(220, 53, 69, 0.6);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 6px rgba(40, 167, 69, 0.6); }
  50% { box-shadow: 0 0 12px rgba(40, 167, 69, 0.8); }
  100% { box-shadow: 0 0 6px rgba(40, 167, 69, 0.6); }
}

@keyframes pulse-yellow {
  0% { box-shadow: 0 0 6px rgba(255, 193, 7, 0.6); }
  50% { box-shadow: 0 0 12px rgba(255, 193, 7, 0.8); }
  100% { box-shadow: 0 0 6px rgba(255, 193, 7, 0.6); }
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 6px rgba(220, 53, 69, 0.6); }
  50% { box-shadow: 0 0 12px rgba(220, 53, 69, 0.8); }
  100% { box-shadow: 0 0 6px rgba(220, 53, 69, 0.6); }
}

.price-emphasis {
  font-weight: 700 !important;
  text-shadow: 0 1px 2px rgba(235, 164, 114, 0.3);
}

/* Map controls styling */
.map-controls .input-group-sm .form-control {
  font-size: 0.8rem;
}

.map-controls .btn {
  font-size: 0.8rem;
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .main-content-section {
    margin-bottom: 2rem;
  }
  
  .main-content-section .row {
    height: auto !important;
    min-height: auto !important;
  }
  
  .properties-panel {
    height: auto;
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>





















