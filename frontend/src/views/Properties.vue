<template>
  <div class="properties-page">
    <!-- Hero Section with Banner -->
    <section class="hero-section position-relative overflow-hidden bg-midnight-black text-white py-8 py-xl-10">
      <!-- Sunrise Night Sky Animation Background -->
      <div class="sunrise-night-sky-container">
        <div class="sunrise-gradient"></div>
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="clouds"></div>
      </div>
      
      <div class="container position-relative" style="z-index: 10;">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-5 fw-light mb-3" data-aos="fade-up">
              {{ bannerText || 'Find Your Dream Home' }}
            </h1>
            <p class="fs-6 text-white-50 mb-0" data-aos="fade-up" data-aos-delay="200">
              Discover beautiful properties in Omaha and surrounding areas
            </p>
          </div>
        </div>
      </div>
      
      <!-- Remove old animated decorative elements -->
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
              <option value="0-200000">Under $200K</option>
              <option value="200000-400000">$200K - $400K</option>
              <option value="400000-600000">$400K - $600K</option>
              <option value="600000-800000">$600K - $800K</option>
              <option value="800000-999999">$800K+</option>
            </select>
          </div>
          <div class="col-md-2">
            <select v-model="filters.bedrooms" @change="applyFilters" class="form-select form-select-sm filter-select-compact">
              <option value="">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>
          <div class="col-md-2">
            <select v-model="filters.bathrooms" @change="applyFilters" class="form-select form-select-sm filter-select-compact">
              <option value="">Any Bathrooms</option>
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
            <button @click="clearFilters" class="btn btn-outline-secondary btn-sm filter-btn-compact w-100">
              <i class="fas fa-times me-1"></i>Clear
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content: Map + Properties -->
    <section class="main-content">
      <div class="container-fluid p-0">
        <div class="row g-0" style="height: calc(100vh - 200px);">
          <!-- Map Section - Left Side (67% - 2/3) -->
          <div class="col-lg-8">
            <div id="properties-map" class="h-100"></div>
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
              
              <div class="properties-list overflow-auto p-2" style="height: calc(100% - 80px);">
                <div v-if="loading" class="text-center p-4">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                
                <div v-else>
                  <!-- 2x2 Grid Layout -->
                  <div class="row g-2">
                    <div v-for="property in sortedProperties" :key="property._id" class="col-6">
                      <div class="property-card-small border rounded shadow-sm h-100">
                        <!-- Image Carousel -->
                        <div class="position-relative" style="height: 150px;">
                          <div v-for="(image, index) in getPropertyImages(property)" :key="index"
                               :style="{ display: (property.currentImageIndex || 0) === index ? 'block' : 'none' }">
                            <img :src="getImageUrl(image)" 
                                 :alt="property.title"
                                 class="card-img-top property-thumb-small"
                                 @error="handleImageError"
                                 @click="viewProperty(property._id)"
                                 style="height: 150px; object-fit: cover; width: 100%; cursor: pointer;">
                          </div>
                          
                          <!-- Carousel Controls - only show if multiple images -->
                          <div v-if="getPropertyImages(property).length > 1">
                            <button @click="navigatePropertyCarousel(property, -1)"
                                    class="btn btn-sm position-absolute"
                                    style="left: 5px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 25px; height: 25px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                              &#8249;
                            </button>
                            <button @click="navigatePropertyCarousel(property, 1)"
                                    class="btn btn-sm position-absolute"
                                    style="right: 5px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 25px; height: 25px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                              &#8250;
                            </button>
                            
                            <!-- Dot indicators -->
                            <div class="position-absolute d-flex gap-1" style="bottom: 5px; left: 50%; transform: translateX(-50%);">
                              <button v-for="(image, index) in getPropertyImages(property)" :key="index"
                                      @click="goToPropertySlide(property, index)"
                                      class="border-0"
                                      :style="{ 
                                        width: '6px', 
                                        height: '6px', 
                                        borderRadius: '50%', 
                                        background: (property.currentImageIndex || 0) === index ? 'white' : 'rgba(255,255,255,0.5)',
                                        cursor: 'pointer'
                                      }">
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div class="card-body p-2">
                          <div class="d-flex justify-content-between align-items-start mb-1">
                            <h6 class="card-title property-title mb-0" style="font-size: 0.85rem; flex: 1;">{{ property.title }}</h6>
                            <div class="status-indicator ms-2" :class="getStatusIndicatorClass(property.status)"></div>
                          </div>
                          <p class="card-text text-muted mb-2" style="font-size: 0.75rem;">{{ property.address }}</p>
                          <div class="price-emphasis text-sunset fw-bold mb-2" style="font-size: 1.1rem; text-shadow: 0 1px 2px rgba(235, 164, 114, 0.3);">
                            ${{ property.price ? property.price.toLocaleString() : '0' }}
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">{{ property.bedrooms || 0 }}bd • {{ property.bathrooms || 0 }}ba</small>
                            <small class="status-text" :class="getStatusTextClass(property.status)">
                              {{ getStatusText(property.status) }}
                            </small>
                          </div>
                          <button @click="viewProperty(property._id)" 
                                  class="btn btn-sunset btn-sm w-100 mb-2" 
                                  style="font-size: 0.75rem;">
                            View Details
                          </button>
                          <button @click="shareProperty(property)" 
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

export default {
  name: 'Properties',
  data() {
    return {
      properties: [],
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
    await this.loadProperties()
    await this.initializeMap()
  },
  methods: {
    async loadBannerText() {
      try {
        const response = await axios.get('/api/settings/banner-text')
        this.bannerText = response.data.text
      } catch (error) {
        console.log('No banner text found, using default')
      }
    },
    
    async loadProperties() {
      try {
        console.log('Loading properties for sale...')
        let response
        try {
          response = await axios.get('/api/properties')
          console.log('All properties loaded:', response.data)
          
          response.data = response.data.filter(p => {
            console.log('Property:', p.title, 'Type:', p.type, 'Status:', p.status)
            return p.type === 'sale' && p.status !== 'upcoming'
          })
          
          console.log('Filtered sale properties:', response.data)
        } catch (error) {
          console.error('Error loading from /api/properties:', error)
          try {
            response = await axios.get('/api/admin/properties')
            response.data = response.data.filter(p => 
              p.type === 'sale' && p.status !== 'upcoming'
            )
          } catch (adminError) {
            console.error('Error loading from admin endpoint:', adminError)
            throw adminError
          }
        }
        
        this.properties = response.data.map(property => ({
          ...property,
          currentImageIndex: 0
        })) || []
        this.filteredProperties = [...this.properties]
        console.log('Final properties count:', this.properties.length)
        
        if (this.map && this.filteredProperties.length > 0) {
          this.addPropertyMarkers()
        }
      } catch (error) {
        console.error('Error loading properties:', error)
        this.properties = []
        this.filteredProperties = []
      } finally {
        this.loading = false
      }
    },
    
    applyFilters() {
      this.filterPropertiesInView()
    },
    
    applySorting() {
      this.$forceUpdate()
    },
    
    clearFilters() {
      this.filters = {
        priceRange: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        location: ''
      }
      this.filteredProperties = [...this.properties]
      
      // Reset map to original position and zoom
      if (this.map) {
        this.map.setCenter({ lat: 41.2524, lng: -95.9980 })
        this.map.setZoom(11)
        
        // Force remove ALL city boundaries
        this.removeCityBoundary()
        
        // Close any open info windows
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
        if (this.properties.length > 0) {
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

    removeCityBoundary() {
      console.log('Force removing city boundary...')
      if (this.cityBoundary) {
        try {
          this.cityBoundary.setMap(null)
          this.cityBoundary = null
          console.log('City boundary removed successfully')
        } catch (error) {
          console.error('Error removing boundary:', error)
        }
      }
      
      // Also clear any potential lingering boundaries by recreating the map markers
      if (this.map) {
        this.addPropertyMarkers()
      }
    },
    
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `http://localhost:5000${imagePath}`
    },
    
    handleImageError(event) {
      event.target.src = '/placeholder-home.jpg'
    },
    
    viewProperty(propertyId) {
      // Handle both property object and property ID
      const id = typeof propertyId === 'object' ? propertyId._id : propertyId
      this.$router.push(`/property/${id}`)
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

    async initializeMap() {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyCPDKyo5k6UfUjds0XW0LpVR4glyfqDmS0',
          version: 'weekly',
          libraries: ['places']
        })

        const google = await loader.load()
        
        this.setupCarouselFunctions()
        
        this.map = new google.maps.Map(document.getElementById('properties-map'), {
          center: { lat: 41.2524, lng: -95.9980 },
          zoom: 11,
          styles: [],
          gestureHandling: 'greedy' // This allows scroll wheel zoom without Ctrl
        })

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
                  $${(property.price / 1000).toFixed(0)}K
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
              </div>
              ${propertyImages.length > 1 ? `
                <button onclick="window.navigatePopupCarousel('${property._id}', -1)" 
                        style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                  &#8249;
                </button>
                <button onclick="window.navigatePopupCarousel('${property._id}', 1)" 
                        style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                  &#8250;
                </button>
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
              <span style="font-size: 18px; font-weight: bold; color: #EBA472;">$${property.price ? (property.price / 1000).toFixed(0) : '0'}K</span>
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
          
          const mapDiv = document.getElementById('properties-map')
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
      
      // Close info window when clicking on the map
      this.map.addListener('click', () => {
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close()
          this.currentInfoWindow = null
        }
      })
    },

    async searchLocation() {
      if (!this.mapSearchQuery.trim()) return

      const service = new google.maps.places.PlacesService(this.map)
      
      const request = {
        query: this.mapSearchQuery,
        fields: ['geometry']
      }

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
          const location = results[0].geometry.location
          this.map.setCenter(location)
          this.map.setZoom(13)
        }
      })
    },

    filterPropertiesInView() {
      if (!this.mapBounds) {
        this.filteredProperties = this.applyBaseFilters()
        return
      }

      // When map bounds exist, prioritize geographic filtering over location text filter
      const baseFiltered = this.properties.filter(property => {
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

        // Don't create any city boundary - just zoom to the location

      } catch (error) {
        console.error('Geocoding failed for:', cityName, error)
      }
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

    applyBaseFilters() {
      return this.properties.filter(property => {
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
    
    getPropertyImages(property) {
      const images = []
      if (property.thumbnail) images.push(property.thumbnail)
      if (property.images && Array.isArray(property.images)) {
        property.images.forEach(img => {
          if (img && !images.includes(img)) images.push(img)
        })
      }
      return images.length > 0 ? images : ['/placeholder-home.jpg']
    },

    getStatusIndicatorClass(status) {
      const classes = {
        available: 'status-available',
        pending: 'status-pending', 
        sold: 'status-sold',
        rented: 'status-sold'
      }
      return classes[status] || 'status-available'
    },

    getStatusTextClass(status) {
      const classes = {
        available: 'text-success',
        pending: 'text-warning',
        sold: 'text-danger',
        rented: 'text-danger'
      }
      return classes[status] || 'text-success'
    },

    getStatusText(status) {
      const texts = {
        available: 'Available',
        pending: 'Pending',
        sold: 'Sold',
        rented: 'Rented'
      }
      return texts[status] || 'Available'
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

    addMarkersToMap() {
      this.addPropertyMarkers()
      this.setupMapListeners()
      this.initializeAutocomplete()
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
.properties-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 80px;
}

/* Hero Section Animations */
.hero-section {
  background: #000000 !important;
  position: relative;
  overflow: hidden;
}

.sunrise-night-sky-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sunrise-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(255, 94, 77, 0.4) 0%,
    rgba(255, 154, 0, 0.3) 25%,
    rgba(255, 206, 84, 0.2) 50%,
    rgba(255, 178, 142, 0.15) 75%,
    rgba(235, 164, 114, 0.1) 100%
  );
  animation: sunrise-glow 20s ease-in-out infinite alternate;
}

.stars, .twinkling, .clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.stars {
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white"/><circle cx="80" cy="30" r="0.3" fill="white"/><circle cx="30" cy="60" r="0.4" fill="white"/><circle cx="70" cy="80" r="0.2" fill="white"/><circle cx="50" cy="10" r="0.6" fill="white"/><circle cx="10" cy="70" r="0.3" fill="white"/><circle cx="90" cy="60" r="0.4" fill="white"/><circle cx="40" cy="40" r="0.2" fill="white"/></svg>') repeat;
  background-size: 200px 200px;
  animation: move-stars 200s linear infinite;
  opacity: 0.8;
}

.twinkling {
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="0.3" fill="white" opacity="0.8"/><circle cx="75" cy="35" r="0.2" fill="white" opacity="0.6"/><circle cx="35" cy="65" r="0.4" fill="white" opacity="0.9"/><circle cx="65" cy="75" r="0.2" fill="white" opacity="0.7"/><circle cx="15" cy="55" r="0.3" fill="white" opacity="0.5"/><circle cx="85" cy="15" r="0.2" fill="white" opacity="0.8"/></svg>') repeat;
  background-size: 300px 300px;
  animation: move-twinkle 100s linear infinite;
  opacity: 0.9;
}

.clouds {
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="20" cy="80" rx="15" ry="3" fill="rgba(255,255,255,0.1)"/><ellipse cx="70" cy="20" rx="20" ry="4" fill="rgba(255,255,255,0.08)"/><ellipse cx="50" cy="60" rx="25" ry="5" fill="rgba(255,255,255,0.06)"/></svg>') repeat-x;
  background-size: 400px 100px;
  animation: move-clouds 120s linear infinite;
}

@keyframes sunrise-glow {
  0% { 
    background: linear-gradient(
      to top,
      rgba(255, 94, 77, 0.3) 0%,
      rgba(255, 154, 0, 0.25) 25%,
      rgba(255, 206, 84, 0.15) 50%,
      rgba(255, 178, 142, 0.1) 75%,
      rgba(235, 164, 114, 0.05) 100%
    );
  }
  100% { 
    background: linear-gradient(
      to top,
      rgba(255, 94, 77, 0.5) 0%,
      rgba(255, 154, 0, 0.35) 25%,
      rgba(255, 206, 84, 0.25) 50%,
      rgba(255, 178, 142, 0.2) 75%,
      rgba(235, 164, 114, 0.15) 100%
    );
  }
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

/* Remove old floating shape animations */
.floating-shape {
  display: none;
}

/* Enhanced Filter Styling */
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
  background: #ffffff !important;
}

.filter-select:focus {
  border-color: #EBA472 !important;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25) !important;
  transform: translateY(-1px) !important;
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

.filter-select-compact {
  border: 2px solid #dee2e6 !important;
  border-radius: 8px !important;
  padding: 6px 8px !important;
  padding-right: 24px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  background: #ffffff !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") !important;
  background-repeat: no-repeat !important;
  background-position: right 8px center !important;
  background-size: 12px !important;
}

.filter-select-compact:focus {
  border-color: #EBA472 !important;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25) !important;
  transform: translateY(-1px) !important;
}

.filter-btn-compact {
  border: 2px solid #6c757d !important;
  border-radius: 8px !important;
  padding: 6px 10px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  background: #ffffff !important;
}

.filter-btn-compact:hover {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
}

.property-thumb-small {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 150px !important;
  object-fit: cover;
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

#properties-map {
  border-right: 1px solid #dee2e6;
  min-height: 500px;
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

.status-sold {
  background-color: #dc3545;
  box-shadow: 0 0 6px rgba(220, 53, 69, 0.6);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 6px rgba(40, 167, 69, 0.6); }
  50% { box-shadow: 0 0 12px rgba(40, 167, 69, 0.9); }
}

@keyframes pulse-yellow {
  0%, 100% { box-shadow: 0 0 6px rgba(255, 193, 7, 0.6); }
  50% { box-shadow: 0 0 12px rgba(255, 193, 7, 0.9); }
}

@keyframes pulse-red {
  0%, 100% { box-shadow: 0 0 6px rgba(220, 53, 69, 0.6); }
  50% { box-shadow: 0 0 12px rgba(220, 53, 69, 0.9); }
}

.price-emphasis {
  font-weight: 700 !important;
  letter-spacing: 0.5px;
}

.status-text {
  font-weight: 600;
  font-size: 0.7rem;
}

/* Add these mobile responsive styles to Properties.vue */
@media (max-width: 991.98px) {
  .main-content .container-fluid .row {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
  }
  
  .main-content {
    height: auto !important;
  }
  
  .properties-panel {
    height: auto !important;
    max-height: none !important;
    overflow-y: visible !important;
    border-left: none;
    border-top: 1px solid #dee2e6;
    margin-bottom: 2rem;
  }
  
  .panel-body {
    max-height: none !important;
    overflow-y: visible !important;
    padding-bottom: 2rem;
  }
  
  .col-lg-8, .col-lg-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  #properties-map {
    height: 400px;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
  }
}
</style>






















