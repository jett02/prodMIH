<template>
  <div v-if="property && property.address" class="property-detail-page">
    <!-- Simple Professional Background -->
    <div class="detail-background-container"></div>

    <!-- Image Carousel - Full Width at Top with Text Overlay -->
    <div class="container-fluid p-0 mb-5">
      <div v-if="allImages && allImages.length > 0"
           id="propertyCarousel" class="carousel slide carousel-fade cube-carousel"
           data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="hover">
        <div class="carousel-inner">
          <div v-for="(image, index) in allImages" :key="index"
               class="carousel-item cube-slide" :class="{ active: index === 0 }">
            <img :src="getImageUrl(image)" :alt="`${property.address} - Image ${index + 1}`"
                 class="d-block w-100 cube-image cube-fade-image" style="height: 200px; object-fit: cover;">
            <div class="cube-overlay"></div>
            <div class="cube-shimmer"></div>
          </div>
        </div>

        <!-- Text Overlay on Carousel -->
        <div class="carousel-text-overlay">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center">
                <h1 class="carousel-title mb-3 animate__animated animate__fadeInUp">{{ property.address }}</h1>
                <p class="carousel-subtitle animate__animated animate__fadeInUp animate__delay-1s">{{ property.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel controls with cube animations -->
        <button v-if="allImages.length > 1"
                class="carousel-control-prev cube-nav" type="button"
                data-bs-target="#propertyCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon cube-arrow"></span>
        </button>
        <button v-if="allImages.length > 1"
                class="carousel-control-next cube-nav" type="button"
                data-bs-target="#propertyCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon cube-arrow"></span>
        </button>


      </div>
    </div>

    <!-- Main Content Section -->
    <div class="container mt-2">
      <div class="row">
        <!-- Left Side: Property Images + Property Details (spans 8 columns) -->
        <div class="col-lg-8">
          <!-- Property Gallery Section -->
          <div class="property-gallery-section mb-2">
            <div class="gallery-body">
            
            <!-- Main Thumbnail Carousel -->
            <div v-if="allImages && allImages.length > 0"
                 id="thumbnailCarousel" class="carousel slide mb-3"
                 data-bs-ride="false">
              <div class="carousel-inner rounded">
                <div v-for="(image, index) in allImages" :key="`thumb-${index}`"
                     class="carousel-item" :class="{ active: index === 0 }">
                  <div class="main-image-container">
                    <img :src="getImageUrl(image)"
                         :alt="`${property.address} - Image ${index + 1}`"
                         class="d-block w-100 main-thumbnail-image"
                         @click="openImageModal(image)"
                         @load="onImageLoad">
                    <div class="image-overlay">
                      <i class="fas fa-expand-alt"></i>
                      <span>Click to enlarge</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Thumbnail Navigation Controls -->
              <button v-if="allImages.length > 1"
                      class="carousel-control-prev" type="button"
                      data-bs-target="#thumbnailCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button v-if="allImages.length > 1"
                      class="carousel-control-next" type="button"
                      data-bs-target="#thumbnailCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>

            <!-- Thumbnail Grid -->
            <div v-if="allImages && allImages.length > 1" class="row g-2 mt-3">
              <div v-for="(image, index) in allImages.slice(0, 5)" :key="index"
                   class="col" :class="index === 4 && allImages.length > 5 ? 'position-relative' : ''">
                <img v-if="index < 4 || allImages.length <= 5"
                     :src="getImageUrl(image)"
                     :alt="`Thumbnail ${index + 1}`"
                     class="thumbnail-grid-image"
                     :class="{ 'active-thumbnail': index === currentThumbnailIndex }"
                     @click="openImageModal(image)">
                
                <!-- View All Box for 5th thumbnail if more than 5 images -->
                <div v-else-if="index === 4 && allImages.length > 5"
                     class="view-all-box d-flex align-items-center justify-content-center text-white cursor-pointer"
                     @click="openImageModal(allImages[0])">
                  <div class="text-center">
                    <i class="fas fa-images mb-1" style="font-size: 1.2rem;"></i>
                    <div class="fw-bold" style="font-size: 0.9rem;">View All</div>
                    <div class="small" style="font-size: 0.75rem;">{{ allImages.length }} Photos</div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <!-- Property Information Section - Centered and Styled -->
          <div class="row justify-content-center mb-2">
            <div class="col-lg-12">
              <div class="property-info-section p-4">
                <!-- Property Address and Title -->
                <div class="row justify-content-center mb-3">
                  <div class="col-lg-12 text-center">
                    <!-- Status Indicator -->
                    <div class="property-status-indicator mb-2">
                      <span class="status-button" :class="getStatusClass(property.status)">
                        {{ getStatusText(property.status) }}
                      </span>
                    </div>
                    <h2 class="h4 fw-bold mb-2 property-title">{{ property.address }}</h2>
                    <p class="mb-2 property-subtitle">{{ property.title }}</p>

                  </div>
                </div>

                <!-- Property Stats Row -->
                <div class="row g-3 mb-4">
                  <div class="col-6 col-md-3">
                    <div class="property-stat">
                      <i class="fas fa-bed" style="color: #EBA472;"></i>
                      <h6 class="mb-0">{{ property.bedrooms || 'N/A' }}</h6>
                      <small style="color: #000000;">Bedrooms</small>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="property-stat">
                      <i class="fas fa-bath" style="color: #EBA472;"></i>
                      <h6 class="mb-0">{{ property.bathrooms || 'N/A' }}</h6>
                      <small style="color: #000000;">Bathrooms</small>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="property-stat">
                      <i class="fas fa-ruler-combined" style="color: #EBA472;"></i>
                      <h6 class="mb-0">{{ property.squareFootage || 'N/A' }}</h6>
                      <small style="color: #000000;">Sq Ft</small>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="property-stat">
                      <i class="fas fa-home" style="color: #EBA472;"></i>
                      <h6 class="mb-0">{{ property.type === 'sale' ? 'Sale' : 'Rent' }}</h6>
                      <small style="color: #000000;">Type</small>
                    </div>
                  </div>
                </div>

                <!-- Property Description -->
                <div class="row justify-content-center mb-4">
                  <div class="col-lg-10">
                    <h5 style="color: #000000; font-weight: 600;" class="mb-3 text-center">Description</h5>
                    <div class="property-description text-center">
                      <p style="color: #4A4A4A; font-size: 1.1rem; line-height: 1.6;">{{ property.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Features Section -->
                <div class="row justify-content-center mb-4" v-if="property.features && property.features.length > 0">
                  <div class="col-lg-10">
                    <h5 style="color: #000000; font-weight: 600;" class="mb-3 text-center">Features</h5>
                    <div class="d-flex flex-wrap justify-content-center gap-2">
                      <span v-for="feature in property.features" :key="feature"
                            class="feature-badge px-3 py-1 rounded-pill small">
                        <i class="fas fa-check me-1"></i>{{ feature }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>

        <!-- Right Column: Contact Section (spans 4 columns for better width) -->
        <div class="col-lg-4">
          <div class="contact-section" :class="{ 'forms-closed': !showContactForm && !showTourForm }">
            <div class="contact-header">
              <h5 class="contact-title"><i class="fas fa-user-tie me-2"></i>Contact Agent</h5>
            </div>
            
            <div class="contact-body">
              <!-- Property Type Status -->
              <div class="property-type-status mb-3">
                <span class="property-type-badge" :class="property.type">
                  <!-- Status Dot with Tooltip - Top Left of Badge -->
                  <div class="status-dot-container"
                       :title="getStatusText(property.status)"
                       data-bs-toggle="tooltip"
                       data-bs-placement="top">
                    <span class="status-dot-price" :class="getStatusClass(property.status)"></span>
                  </div>
                  {{ property.type === 'sale' ? 'For Sale' : 'For Rent' }}
                </span>
              </div>

              <!-- Price Display -->
              <div class="price-display-card">
                <div class="price-amount-container">
                  <div class="price-amount">
                    ${{ formatPrice(property.price) }}
                  </div>
                  <div v-if="property.type === 'rental'" class="price-period">/month</div>
                </div>
              </div>

              <!-- Agent Information -->
              <div v-if="property.agent" class="mb-4 pb-4 border-bottom">
                <h6 class="fw-bold text-dark mb-3">
                  <i class="fas fa-user-tie me-2" style="color: #EBA472;"></i>
                  Listing Agent
                </h6>
                <div class="d-flex align-items-center mb-3">
                  <img :src="getAgentImageUrl(property.agent.photo)"
                       :alt="property.agent.name"
                       class="rounded-circle me-3"
                       style="width: 60px; height: 60px; object-fit: cover;"
                       @error="handleAgentImageError">
                  <div>
                    <div class="fw-semibold text-dark">{{ property.agent.name }}</div>
                    <div class="text-muted small">{{ property.agent.title || 'Real Estate Agent' }}</div>
                    <div v-if="property.agent.phone" class="text-muted small">
                      <i class="fas fa-phone me-1"></i>{{ property.agent.phone }}
                    </div>
                    <div v-if="property.agent.email" class="text-muted small">
                      <i class="fas fa-envelope me-1"></i>{{ property.agent.email }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Contact Form Buttons -->
              <div v-if="!showContactForm && !showTourForm" class="d-grid gap-2">
                <button @click="showContactForm = true" class="btn btn-sunset-gradient btn-lg">
                  Contact Agent
                </button>
                <button @click="showTourForm = true" class="btn btn-outline-dark">Schedule Tour</button>

                <!-- Get Pre-Qualified Button (For Sale Properties Only) -->
                <div v-if="property.type === 'sale'" class="prequalified-section mt-3 p-3 rounded" style="background: rgba(235, 164, 114, 0.1); border: 1px solid rgba(235, 164, 114, 0.3);">
                  <div class="text-center mb-2">
                    <img src="/businessimages/ExchangeBank.png" alt="Exchange Bank" class="exchange-bank-logo mb-2">
                    <p class="text-muted small mb-2">Get pre-qualified for your mortgage</p>
                  </div>
                  <button @click="openPrequalificationModal" class="btn btn-exchange-bank w-100">
                    <i class="fas fa-calculator me-2"></i>Get Pre-Qualified
                  </button>
                </div>
              </div>

              <!-- Contact Agent Form -->
              <div v-if="showContactForm" class="contact-form mt-4">
                <h6 class="fw-bold mb-3">Contact Agent</h6>
                <form @submit.prevent="submitContactForm">
                  <div class="mb-3">
                    <input v-model="contactForm.name" type="text" class="form-control" placeholder="Your Name" required>
                  </div>
                  <div class="mb-3">
                    <input v-model="contactForm.email" type="email" class="form-control" placeholder="Your Email" required>
                  </div>
                  <div class="mb-3">
                    <input v-model="contactForm.phone" type="tel" class="form-control" placeholder="Your Phone">
                  </div>
                  <div class="mb-3">
                    <select v-model="contactForm.preferredContact" class="form-select">
                      <option value="email">Prefer Email</option>
                      <option value="phone">Prefer Phone</option>
                      <option value="either">Either is Fine</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <textarea v-model="contactForm.message" class="form-control" rows="3"
                              placeholder="Message (optional)"></textarea>
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-sunset-gradient">Send Message</button>
                    <button type="button" @click="showContactForm = false" class="btn btn-outline-secondary">Cancel</button>
                  </div>
                  <!-- Contact Agent Disclosure -->
                  <div v-if="disclosures && disclosures.contactAgent" class="mt-3 disclosure-container">
                    <p class="disclosure-text contact-disclosure">
                      {{ disclosures.contactAgent }}
                    </p>
                  </div>
                </form>
              </div>

              <!-- Schedule Tour Form -->
              <div v-if="showTourForm" class="tour-form mt-4">
                <h6 class="fw-bold mb-3 text-center">Schedule a Showing</h6>
                <form @submit.prevent="submitTourForm">
                  <!-- Step 1: Date Selection -->
                  <div class="mb-3">
                    <label class="form-label fw-bold text-sunset-orange">
                      <i class="fas fa-calendar me-2"></i>Select Date
                    </label>
                    <input v-model="tourForm.preferredDate" type="date" class="form-control" required>
                  </div>

                  <!-- Step 2: Time Selection -->
                  <div class="mb-3">
                    <label class="form-label fw-bold text-sunset-orange">
                      <i class="fas fa-clock me-2"></i>Select Time
                    </label>
                    <select v-model="tourForm.preferredTime" class="form-select" required>
                      <option value="">Choose a time slot</option>
                      <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                      <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                      <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                    </select>
                  </div>

                  <!-- Step 3: Contact Information -->
                  <div class="mb-3">
                    <label class="form-label fw-bold text-sunset-orange">
                      <i class="fas fa-user me-2"></i>Your Information
                    </label>
                    <div class="row g-2">
                      <div class="col-12">
                        <input v-model="tourForm.name" type="text" class="form-control" placeholder="Full Name" required>
                      </div>
                      <div class="col-12">
                        <input v-model="tourForm.email" type="email" class="form-control" placeholder="Email Address" required>
                      </div>
                      <div class="col-12">
                        <input v-model="tourForm.phone" type="tel" class="form-control" placeholder="Phone Number" required>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <textarea v-model="tourForm.message" class="form-control" rows="2"
                              placeholder="Any special requests or questions? (optional)"></textarea>
                  </div>

                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-sunset-gradient">
                      <i class="fas fa-paper-plane me-2"></i>Request Showing
                    </button>
                    <button type="button" @click="showTourForm = false" class="btn btn-outline-secondary">Cancel</button>
                  </div>
                  <!-- Request Showing Disclosure -->
                  <div v-if="disclosures && disclosures.requestShowing" class="mt-3 disclosure-container">
                    <p class="disclosure-text showing-disclosure">
                      {{ disclosures.requestShowing }}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Complete Property Details Section (For All Properties) -->
  <section v-if="property" class="property-details-section py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="text-center mb-4">
            <h2 class="text-dark mb-2">Complete Property Details</h2>
            <p class="text-muted">Comprehensive information about this property</p>
          </div>

          <div class="property-detail-card bg-white rounded-3 p-4 shadow-lg">
            <div class="row g-4">
              <!-- Exterior & Interior -->
              <div class="col-md-6">
                <h6 class="text-sunset-orange mb-3"><i class="fas fa-home me-2"></i>Exterior & Interior</h6>
                <!-- Exterior Info -->
                <div v-if="hasExteriorInfo" class="mb-3">
                  <h6 class="text-muted mb-2">Exterior</h6>
                  <div class="detail-grid">
                    <div v-if="property.exterior?.yearBuilt" class="detail-item">
                      <span class="detail-label">Year Built:</span>
                      <span class="detail-value">{{ property.exterior.yearBuilt }}</span>
                    </div>
                    <div v-if="property.exterior?.lotSize" class="detail-item">
                      <span class="detail-label">Lot Size:</span>
                      <span class="detail-value">{{ property.exterior.lotSize }}</span>
                    </div>
                    <div v-if="property.exterior?.roofType" class="detail-item">
                      <span class="detail-label">Roof Type:</span>
                      <span class="detail-value">{{ property.exterior.roofType }}</span>
                    </div>
                    <div v-if="property.exterior?.exteriorMaterial" class="detail-item">
                      <span class="detail-label">Exterior Material:</span>
                      <span class="detail-value">{{ property.exterior.exteriorMaterial }}</span>
                    </div>
                    <div v-if="property.exterior?.landscaping" class="detail-item">
                      <span class="detail-label">Landscaping:</span>
                      <span class="detail-value">{{ property.exterior.landscaping }}</span>
                    </div>
                  </div>
                </div>

                <!-- Interior Info -->
                <div v-if="hasInteriorInfo">
                  <h6 class="text-muted mb-2">Interior</h6>
                  <div class="detail-grid">
                    <div v-if="property.interior?.flooring" class="detail-item">
                      <span class="detail-label">Flooring:</span>
                      <span class="detail-value">{{ property.interior.flooring }}</span>
                    </div>
                    <div v-if="property.interior?.heating" class="detail-item">
                      <span class="detail-label">Heating:</span>
                      <span class="detail-value">{{ property.interior.heating }}</span>
                    </div>
                    <div v-if="property.interior?.cooling" class="detail-item">
                      <span class="detail-label">Cooling:</span>
                      <span class="detail-value">{{ property.interior.cooling }}</span>
                    </div>
                    <div v-if="property.interior?.basement" class="detail-item">
                      <span class="detail-label">Basement:</span>
                      <span class="detail-value">{{ property.interior.basement }}</span>
                    </div>
                    <div v-if="property.interior?.laundry" class="detail-item">
                      <span class="detail-label">Laundry:</span>
                      <span class="detail-value">{{ property.interior.laundry }}</span>
                    </div>
                    <div v-if="property.interior?.fireplace" class="detail-item">
                      <span class="detail-label">Fireplace:</span>
                      <span class="detail-value">{{ property.interior.fireplace }}</span>
                    </div>
                    <div v-if="property.interior?.appliances && property.interior.appliances.length > 0" class="detail-item">
                      <span class="detail-label">Appliances:</span>
                      <span class="detail-value">{{ property.interior.appliances.join(', ') }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Parking, Location, Building, and HOA -->
              <div class="col-md-6">
                <!-- Parking -->
                <h6 class="text-sunset-orange mb-3"><i class="fas fa-car me-2"></i>Parking</h6>
                <div v-if="hasParkingInfo" class="detail-grid mb-4">
                  <div v-if="property.parking?.type" class="detail-item">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">{{ property.parking.type }}</span>
                  </div>
                  <div v-if="property.parking?.spaces" class="detail-item">
                    <span class="detail-label">Spaces:</span>
                    <span class="detail-value">{{ property.parking.spaces }}</span>
                  </div>
                  <div v-if="property.parking?.garageType" class="detail-item">
                    <span class="detail-label">Garage Type:</span>
                    <span class="detail-value">{{ property.parking.garageType }}</span>
                  </div>
                  <div v-if="property.parking?.description" class="detail-item">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">{{ property.parking.description }}</span>
                  </div>
                </div>
                <div v-else class="text-muted mb-4">
                  <i class="fas fa-info-circle me-2"></i>No parking information available
                </div>

                <!-- Location Details -->
                <div v-if="hasLocationInfo" class="mb-4">
                  <h6 class="text-sunset-orange mb-3"><i class="fas fa-map-marker-alt me-2"></i>Location Details</h6>
                  <div class="detail-grid">
                    <div v-if="property.location?.county" class="detail-item">
                      <span class="detail-label">County:</span>
                      <span class="detail-value">{{ property.location.county }}</span>
                    </div>
                    <div v-if="property.location?.neighborhood" class="detail-item">
                      <span class="detail-label">Neighborhood:</span>
                      <span class="detail-value">{{ property.location.neighborhood }}</span>
                    </div>
                    <div v-if="property.location?.schoolDistrict" class="detail-item">
                      <span class="detail-label">School District:</span>
                      <span class="detail-value">{{ property.location.schoolDistrict }}</span>
                    </div>
                    <div v-if="property.location?.walkScore" class="detail-item">
                      <span class="detail-label">Walk Score:</span>
                      <span class="detail-value">{{ property.location.walkScore }}/100</span>
                    </div>
                  </div>
                </div>

                <!-- Building Information -->
                <div v-if="hasBuildingInfo" class="mb-4">
                  <h6 class="text-sunset-orange mb-3"><i class="fas fa-building me-2"></i>Building Information</h6>
                  <div class="detail-grid">
                    <div v-if="property.building?.stories" class="detail-item">
                      <span class="detail-label">Stories:</span>
                      <span class="detail-value">{{ property.building.stories }}</span>
                    </div>
                    <div v-if="property.building?.totalUnits" class="detail-item">
                      <span class="detail-label">Total Units:</span>
                      <span class="detail-value">{{ property.building.totalUnits }}</span>
                    </div>
                    <div v-if="property.building?.petPolicy" class="detail-item">
                      <span class="detail-label">Pet Policy:</span>
                      <span class="detail-value">{{ property.building.petPolicy }}</span>
                    </div>
                    <div v-if="property.building?.accessibility && property.building.accessibility.length > 0" class="detail-item">
                      <span class="detail-label">Accessibility:</span>
                      <span class="detail-value">{{ property.building.accessibility.join(', ') }}</span>
                    </div>
                    <div v-if="property.building?.utilities && property.building.utilities.length > 0" class="detail-item">
                      <span class="detail-label">Utilities:</span>
                      <span class="detail-value">{{ property.building.utilities.join(', ') }}</span>
                    </div>
                    <div v-if="property.building?.security && property.building.security.length > 0" class="detail-item">
                      <span class="detail-label">Security:</span>
                      <span class="detail-value">{{ property.building.security.join(', ') }}</span>
                    </div>
                  </div>
                </div>

                <!-- HOA Information -->
                <div v-if="property.hoa && property.hoa.hasHOA">
                  <h6 class="text-sunset-orange mb-3"><i class="fas fa-users me-2"></i>HOA Information</h6>
                  <div class="detail-grid">
                    <div v-if="property.hoa.fee" class="detail-item">
                      <span class="detail-label">HOA Fee:</span>
                      <span class="detail-value">${{ property.hoa.fee }} {{ property.hoa.frequency || 'Monthly' }}</span>
                    </div>
                    <div v-if="property.hoa.amenities && property.hoa.amenities.length > 0" class="detail-item">
                      <span class="detail-label">Amenities:</span>
                      <span class="detail-value">{{ property.hoa.amenities.join(', ') }}</span>
                    </div>
                    <div v-if="property.hoa.restrictions" class="detail-item">
                      <span class="detail-label">Restrictions:</span>
                      <span class="detail-value">{{ property.hoa.restrictions }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Property Details Description Boxes -->
          <div class="row mt-4">
            <div class="col-md-4 mb-3">
              <div class="property-details-info-box">
                <div class="info-icon">
                  <i class="fas fa-home"></i>
                </div>
                <h5>Exterior & Interior</h5>
                <p>Detailed information about the property's construction, materials, and interior features.</p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="property-details-info-box">
                <div class="info-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <h5>Location & Building</h5>
                <p>Neighborhood details, building information, and accessibility features for your convenience.</p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="property-details-info-box">
                <div class="info-icon">
                  <i class="fas fa-car"></i>
                </div>
                <h5>Parking & HOA</h5>
                <p>Parking arrangements, HOA information, and community amenities available to residents.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mortgage Calculator Section (For Sale Properties Only) - Separate Bottom Section -->
  <section v-if="property && property.type === 'sale'" class="mortgage-calculator-section py-5 bg-dark">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="text-center mb-4">
            <h2 class="text-white mb-2">Mortgage Calculator</h2>
            <p class="text-white-50">Calculate your monthly payments for this property</p>
          </div>

          <!-- Mortgage Calculator Description Boxes -->
          <div class="row mb-4">
            <div class="col-md-4 mb-3">
              <div class="mortgage-info-box">
                <div class="info-icon">
                  <i class="fas fa-calculator"></i>
                </div>
                <h5>Easy Calculations</h5>
                <p>Get instant estimates of your monthly mortgage payments including principal, interest, taxes, and insurance.</p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="mortgage-info-box">
                <div class="info-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h5>Compare Options</h5>
                <p>Adjust loan terms, down payment amounts, and interest rates to find the perfect financing solution for you.</p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="mortgage-info-box">
                <div class="info-icon">
                  <i class="fas fa-home"></i>
                </div>
                <h5>Plan Your Budget</h5>
                <p>Understand the full cost of homeownership and make informed decisions about your property purchase.</p>
              </div>
            </div>
          </div>
          <div class="mortgage-calculator-card bg-white rounded-3 p-4 shadow-lg">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label fw-bold">Home Price</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input v-model.number="mortgageCalc.homePrice" type="number" class="form-control" @input="calculateMortgage">
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Down Payment</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input v-model.number="mortgageCalc.downPayment" type="number" class="form-control" @input="calculateMortgage">
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Interest Rate</label>
                  <div class="input-group">
                    <input v-model.number="mortgageCalc.interestRate" type="number" step="0.01" class="form-control" @input="calculateMortgage">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Loan Term</label>
                  <div class="input-group">
                    <input v-model.number="mortgageCalc.loanTerm" type="number" class="form-control" @input="calculateMortgage">
                    <span class="input-group-text">years</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mortgage-result p-4 bg-light rounded h-100 d-flex flex-column justify-content-center">
                  <h4 class="text-center mb-3">Monthly Payment</h4>
                  <div class="text-center mb-4">
                    <h2 class="text-sunset-orange mb-2">${{ formatPrice(mortgageCalc.monthlyPayment) }}</h2>
                    <p class="text-muted">Principal & Interest</p>
                  </div>
                  <div class="mortgage-breakdown">
                    <div class="d-flex justify-content-between mb-2">
                      <span>Loan Amount:</span>
                      <span class="fw-bold">${{ formatPrice(mortgageCalc.loanAmount) }}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <span>Total Interest:</span>
                      <span class="fw-bold">${{ formatPrice(mortgageCalc.totalInterest) }}</span>
                    </div>
                    <div class="d-flex justify-content-between border-top pt-2">
                      <span class="fw-bold">Total Cost:</span>
                      <span class="fw-bold text-sunset-orange">${{ formatPrice(mortgageCalc.totalCost) }}</span>
                    </div>
                  </div>

                  <!-- Get Pre-Qualified Button in Calculator -->
                  <div class="text-center mt-4 pt-3 border-top">
                    <div class="mb-2">
                      <img src="/businessimages/ExchangeBank.png" alt="Exchange Bank" class="exchange-bank-logo-small">
                    </div>
                    <button @click="openPrequalificationModal" class="btn btn-exchange-bank">
                      <i class="fas fa-check-circle me-2"></i>Get Pre-Qualified Now
                    </button>
                    <p class="small text-muted mt-2 mb-0">Start your mortgage application with Exchange Bank</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Social Media Section (For All Properties) -->
  <section v-if="property" class="social-media-section py-5 bg-dark">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="text-center mb-4">
            <h2 class="text-white mb-2">{{ getSocialMediaContent('title') }}</h2>
            <p class="text-white-50">{{ getSocialMediaContent('subtitle') }}</p>
          </div>

          <!-- Social Media Cards -->
          <div class="row mb-4">
            <div class="col-md-3 mb-3">
              <div class="social-info-box">
                <div class="info-icon">
                  <i class="fab fa-facebook-f"></i>
                </div>
                <h5>{{ getSocialMediaPlatform('facebook', 'title') }}</h5>
                <p>{{ getSocialMediaPlatform('facebook', 'description') }}</p>
                <a :href="getSocialMediaPlatform('facebook', 'url')" target="_blank" class="btn btn-social-facebook">
                  <i class="fab fa-facebook-f me-2"></i>Follow Us
                </a>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="social-info-box">
                <div class="info-icon">
                  <i class="fab fa-instagram"></i>
                </div>
                <h5>{{ getSocialMediaPlatform('instagram', 'title') }}</h5>
                <p>{{ getSocialMediaPlatform('instagram', 'description') }}</p>
                <a :href="getSocialMediaPlatform('instagram', 'url')" target="_blank" class="btn btn-social-instagram">
                  <i class="fab fa-instagram me-2"></i>Follow Us
                </a>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="social-info-box">
                <div class="info-icon">
                  <i class="fab fa-twitter"></i>
                </div>
                <h5>{{ getSocialMediaPlatform('twitter', 'title') }}</h5>
                <p>{{ getSocialMediaPlatform('twitter', 'description') }}</p>
                <a :href="getSocialMediaPlatform('twitter', 'url')" target="_blank" class="btn btn-social-twitter">
                  <i class="fab fa-twitter me-2"></i>Follow Us
                </a>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="social-info-box">
                <div class="info-icon">
                  <i class="fab fa-tiktok"></i>
                </div>
                <h5>{{ getSocialMediaPlatform('tiktok', 'title') }}</h5>
                <p>{{ getSocialMediaPlatform('tiktok', 'description') }}</p>
                <a :href="getSocialMediaPlatform('tiktok', 'url')" target="_blank" class="btn btn-social-tiktok">
                  <i class="fab fa-tiktok me-2"></i>Follow Us
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Information Card -->
          <div class="contact-info-card bg-white rounded-3 p-4 shadow-lg">
            <div class="row align-items-center">
              <div class="col-md-6">
                <h4 class="text-dark mb-3">{{ getSocialMediaContent('contactTitle') }}</h4>
                <p class="text-muted mb-3">{{ getSocialMediaContent('contactSubtitle') }}</p>
                <div class="contact-details">
                  <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-phone text-sunset-orange me-3"></i>
                    <span class="text-dark">{{ getSocialMediaContent('contactPhone') }}</span>
                  </div>
                  <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-envelope text-sunset-orange me-3"></i>
                    <span class="text-dark">{{ getSocialMediaContent('contactEmail') }}</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="fas fa-map-marker-alt text-sunset-orange me-3"></i>
                    <span class="text-dark">{{ getSocialMediaContent('contactAddress') }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 text-center">
                <div class="rental-cta">
                  <h5 class="text-dark mb-3">{{ getSocialMediaContent('ctaTitle') }}</h5>
                  <router-link to="/contact" class="btn btn-sunset-gradient btn-lg mb-2">
                    <i class="fas fa-envelope me-2"></i>Contact Us Today
                  </router-link>
                  <p class="small text-muted mb-0">{{ getSocialMediaContent('ctaSubtitle') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Loading State with Skeleton -->
  <div v-else>
    <div v-if="property === null" class="property-loading-skeleton">
      <!-- Skeleton Carousel -->
      <div class="container-fluid p-0 mb-5">
        <div class="skeleton-carousel" style="height: 200px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite;">
        </div>
      </div>

      <!-- Skeleton Content -->
      <div class="container">
        <div class="row justify-content-center mb-4">
          <div class="col-lg-8 text-center">
            <div class="skeleton-line skeleton-title mb-3"></div>
            <div class="skeleton-line skeleton-subtitle mb-4"></div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8">
            <div class="skeleton-section mb-4">
              <div class="skeleton-line skeleton-heading mb-3"></div>
              <div class="skeleton-line mb-2"></div>
              <div class="skeleton-line mb-2"></div>
              <div class="skeleton-line skeleton-short"></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="skeleton-section">
              <div class="skeleton-line skeleton-heading mb-3"></div>
              <div class="skeleton-line mb-2"></div>
              <div class="skeleton-line skeleton-short"></div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div class="text-center mt-5">
          <div class="spinner-border text-primary mb-3" role="status" style="width: 2rem; height: 2rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-muted">Loading property details...</p>
        </div>
      </div>
    </div>

    <div v-else class="container text-center d-flex align-items-center justify-content-center" style="min-height: 70vh;">
      <div class="alert alert-warning">
        <h4>Property Not Found</h4>
        <p>The property you're looking for could not be found.</p>
        <router-link to="/properties" class="btn btn-primary">Back to Properties</router-link>
      </div>
    </div>
  </div>

  <!-- Image Modal -->
  <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
    <div class="image-modal-container">
      <button class="image-modal-close" @click="closeImageModal">
        <i class="fas fa-times"></i>
      </button>

      <div class="image-modal-content">
        <div class="image-modal-main">
          <img :src="getImageUrl(allImages[currentModalImageIndex])"
               :alt="`Property Image ${currentModalImageIndex + 1}`"
               class="modal-main-image">
        </div>

        <!-- Modal Navigation -->
        <button v-if="allImages.length > 1"
                class="image-modal-nav image-modal-prev"
                @click.stop="previousModalImage">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button v-if="allImages.length > 1"
                class="image-modal-nav image-modal-next"
                @click.stop="nextModalImage">
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Image Counter -->
        <div class="image-modal-counter">
          {{ currentModalImageIndex + 1 }} / {{ allImages.length }}
        </div>

        <!-- Thumbnail Strip -->
        <div v-if="allImages.length > 1" class="image-modal-thumbnails">
          <div class="thumbnail-strip">
            <img v-for="(image, index) in allImages"
                 :key="index"
                 :src="getImageUrl(image)"
                 :alt="`Thumbnail ${index + 1}`"
                 class="modal-thumbnail"
                 :class="{ 'active': index === currentModalImageIndex }"
                 @click.stop="currentModalImageIndex = index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyDetail',
  data() {
    return {
      property: null,
      allImages: [],
      currentThumbnailIndex: 0,
      showContactForm: false,
      showTourForm: false,
      showImageModal: false,
      currentModalImageIndex: 0,
      mortgageCalc: {
        homePrice: 0,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyPayment: 0,
        loanAmount: 0,
        totalInterest: 0,
        totalCost: 0
      },
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'email'
      },
      tourForm: {
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        tourType: 'in-person',
        message: ''
      },
      tourTimeOptions: [
        { value: '8:00 AM - 10:00 AM', label: '8:00 AM - 10:00 AM' },
        { value: '10:00 AM - 12:00 PM', label: '10:00 AM - 12:00 PM' },
        { value: '12:00 PM - 2:00 PM', label: '12:00 PM - 2:00 PM' },
        { value: '2:00 PM - 4:00 PM', label: '2:00 PM - 4:00 PM' },
        { value: '4:00 PM - 6:00 PM', label: '4:00 PM - 6:00 PM' }
      ],
      socialMediaContent: null,
      disclosures: null
    }
  },
  computed: {
    hasExteriorInfo() {
      return this.property?.exterior && Object.keys(this.property.exterior).length > 0
    },
    hasInteriorInfo() {
      return this.property?.interior && Object.keys(this.property.interior).length > 0
    },
    hasParkingInfo() {
      return this.property?.parking && Object.keys(this.property.parking).length > 0
    },
    hasLocationInfo() {
      return this.property?.location && Object.keys(this.property.location).length > 0
    },
    hasBuildingInfo() {
      return this.property?.building && Object.keys(this.property.building).length > 0
    }
  },
  async mounted() {
    // Fetch property and social media content in parallel for faster loading
    await Promise.all([
      this.fetchProperty(),
      this.fetchSocialMediaContent()
    ])

    if (this.property && this.property.type === 'sale') {
      this.mortgageCalc.homePrice = this.property.price || 0
      this.mortgageCalc.downPayment = Math.round(this.mortgageCalc.homePrice * 0.2)
      this.calculateMortgage()
    }
    // Initialize carousel and tooltips after data is loaded
    this.$nextTick(() => {
      this.initializeCarousel()
      this.initializeTooltips()
    })
  },
  methods: {
    async fetchProperty() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/properties/${id}`)
        if (response.ok) {
          this.property = await response.json()
          console.log('Property loaded:', this.property) // Debug log
          // Ensure thumbnail is first, then add other images
          this.allImages = []
          if (this.property.thumbnail) {
            this.allImages.push(this.property.thumbnail)
          }
          if (this.property.images && this.property.images.length > 0) {
            // Add other images, but avoid duplicating the thumbnail
            const otherImages = this.property.images.filter(img => img !== this.property.thumbnail)
            this.allImages = [...this.allImages, ...otherImages]
          }
          // If no thumbnail but has images, use first image as thumbnail
          if (!this.property.thumbnail && this.property.images && this.property.images.length > 0) {
            this.allImages = this.property.images
          }
        } else {
          console.error('Property not found:', response.status)
          // Set property to empty object to stop loading spinner
          this.property = {}
        }
      } catch (error) {
        console.error('Error fetching property:', error)
        // Set property to empty object to stop loading spinner
        this.property = {}
      }
    },
    async fetchSocialMediaContent() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content`)
        if (response.ok) {
          const content = await response.json()
          console.log('Content loaded:', content) // Debug log
          console.log('Disclosures:', content.disclosures) // Debug log
          this.socialMediaContent = content
          this.disclosures = content.disclosures
        }
      } catch (error) {
        console.error('Error fetching social media content:', error)
      }
    },
    getSocialMediaContent(field) {
      if (!this.socialMediaContent || !this.property) return ''

      const contentType = this.property.type === 'sale' ? 'socialMediaSales' : 'socialMediaRentals'
      const content = this.socialMediaContent[contentType]

      if (!content) return ''

      return content[field] || ''
    },
    getSocialMediaPlatform(platform, field) {
      if (!this.socialMediaContent || !this.property) return ''

      const contentType = this.property.type === 'sale' ? 'socialMediaSales' : 'socialMediaRentals'
      const content = this.socialMediaContent[contentType]

      if (!content || !content[platform]) return ''

      return content[platform][field] || ''
    },
    getImageUrl(image) {
      if (typeof image === 'string') {
        return image.startsWith('http') ? image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${image}`
      }
      return image?.url || '/placeholder-image.jpg'
    },
    formatPrice(price) {
      return new Intl.NumberFormat().format(price)
    },
    getStatusClass(status) {
      return {
        'status-available': status === 'available',
        'status-pending': status === 'pending',
        'status-sold': status === 'sold'
      }
    },
    getStatusText(status) {
      const statusMap = {
        'available': 'Available',
        'pending': 'Pending',
        'sold': 'Sold'
      }
      return statusMap[status] || 'Available'
    },
    openImageModal(image) {
      const imageIndex = this.allImages.findIndex(img => img === image)
      this.currentModalImageIndex = imageIndex >= 0 ? imageIndex : 0
      this.showImageModal = true
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    },
    openPrequalificationModal() {
      // Open Exchange Bank pre-qualification in new tab
      window.open('https://eb-us.com/pre-qualify-app/', '_blank')
    },
    closeImageModal() {
      this.showImageModal = false
      document.body.style.overflow = 'auto' // Restore scrolling
    },
    nextModalImage() {
      this.currentModalImageIndex = (this.currentModalImageIndex + 1) % this.allImages.length
    },
    previousModalImage() {
      this.currentModalImageIndex = this.currentModalImageIndex === 0
        ? this.allImages.length - 1
        : this.currentModalImageIndex - 1
    },
    onImageLoad() {
      // Image load handler
    },
    goToThumbnailSlide(index) {
      this.currentThumbnailIndex = index
      const carousel = document.getElementById('thumbnailCarousel')
      if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel)
        bsCarousel.to(index)
      }
    },
    getAgentImageUrl(photo) {
      return photo || '/default-agent.jpg'
    },
    handleAgentImageError(event) {
      event.target.src = '/default-agent.jpg'
    },
    calculateMortgage() {
      const principal = this.mortgageCalc.homePrice - this.mortgageCalc.downPayment
      const monthlyRate = this.mortgageCalc.interestRate / 100 / 12
      const numPayments = this.mortgageCalc.loanTerm * 12

      if (principal > 0 && monthlyRate > 0 && numPayments > 0) {
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

        this.mortgageCalc.monthlyPayment = Math.round(monthlyPayment)
        this.mortgageCalc.loanAmount = principal
        this.mortgageCalc.totalCost = Math.round(monthlyPayment * numPayments)
        this.mortgageCalc.totalInterest = this.mortgageCalc.totalCost - principal
      } else {
        this.mortgageCalc.monthlyPayment = 0
        this.mortgageCalc.loanAmount = 0
        this.mortgageCalc.totalCost = 0
        this.mortgageCalc.totalInterest = 0
      }
    },
    async submitContactForm() {
      try {
        const response = await fetch('http://localhost:5000/api/contact/agent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            propertyId: this.property._id,
            propertyAddress: this.property.address,
            agentEmail: this.property.agent?.email,
            agentName: this.property.agent?.name,
            clientName: this.contactForm.name,
            clientEmail: this.contactForm.email,
            clientPhone: this.contactForm.phone || '',
            message: this.contactForm.message || 'No additional message',
            subject: `Property Inquiry - ${this.property.address}`
          })
        })

        if (response.ok) {
          alert('✅ Your message has been sent to the agent! They will contact you soon.')
          this.showContactForm = false
          this.contactForm = {
            name: '',
            email: '',
            phone: '',
            message: '',
            preferredContact: 'email'
          }
        } else {
          const errorData = await response.json()
          if (errorData.message.includes('inappropriate language')) {
            alert('❌ Please revise your message to remove inappropriate language and try again.')
          } else if (errorData.message.includes('Missing required fields')) {
            alert('❌ Please fill in all required fields and try again.')
          } else {
            alert('❌ ' + (errorData.message || 'Error submitting contact form. Please try again.'))
          }
        }
      } catch (error) {
        console.error('Error submitting contact form:', error)
        alert('Error submitting contact form. Please try again.')
      }
    },
    async submitTourForm() {
      try {
        const response = await fetch('http://localhost:5000/api/contact/tour', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            propertyId: this.property._id,
            propertyAddress: this.property.address,
            agentEmail: this.property.agent?.email,
            agentName: this.property.agent?.name,
            clientName: this.tourForm.name,
            clientEmail: this.tourForm.email,
            clientPhone: this.tourForm.phone || '',
            message: this.tourForm.message || 'No additional message',
            selectedDate: this.tourForm.preferredDate,
            selectedTime: this.tourForm.preferredTime,
            subject: `Tour Request - ${this.property.address}`
          })
        })

        if (response.ok) {
          alert('✅ Tour request sent successfully! The agent will contact you within 24 hours to confirm.')
          this.showTourForm = false
          this.tourForm = {
            name: '',
            email: '',
            phone: '',
            preferredDate: '',
            preferredTime: '',
            message: ''
          }
        } else {
          const errorData = await response.json()
          if (errorData.message.includes('inappropriate language')) {
            alert('❌ Please revise your message to remove inappropriate language and try again.')
          } else if (errorData.message.includes('Missing required fields')) {
            alert('❌ Please fill in all required fields and try again.')
          } else {
            alert('❌ ' + (errorData.message || 'Error submitting tour request. Please try again.'))
          }
        }
      } catch (error) {
        console.error('Error submitting tour request:', error)
        alert('Error submitting tour request. Please try again.')
      }
    },
    initializeCarousel() {
      const carouselElement = document.getElementById('propertyCarousel')
      if (carouselElement && window.bootstrap) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 5000,
          pause: 'hover',
          ride: 'carousel'
        })
      }
    },
    initializeTooltips() {
      if (window.bootstrap) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new window.bootstrap.Tooltip(tooltipTriggerEl)
        })
      }
    }
  }
}
</script>

<style scoped>
.property-detail-page {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f4 100%);
  min-height: 100vh;
  padding-top: 80px;
  color: #333333;
}

.detail-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 80%, rgba(235, 164, 114, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(161, 94, 59, 0.06) 0%, transparent 50%),
    linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f4 100%);
}

/* Cube Carousel Styles */
.cube-carousel {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.cube-slide {
  position: relative;
  overflow: hidden;
}

.cube-image {
  transition: transform 0.6s ease;
}

.cube-fade-image {
  animation: fadeIn 1s ease-in-out;
}

.cube-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(235, 164, 114, 0.1), rgba(161, 94, 59, 0.1));
  pointer-events: none;
}

.cube-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 3s infinite;
}

.carousel-text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  padding: 40px 0 30px;
  z-index: 10;
  pointer-events: none;
}

.carousel-title {
  font-size: 3rem;
  font-weight: 300;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 10px;
  opacity: 1 !important;
  visibility: visible !important;
}

.carousel-subtitle {
  font-size: 2rem;
  font-weight: 300;
  opacity: 0.9 !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  visibility: visible !important;
}

/* Ensure carousel fade doesn't affect text overlay */
.carousel-fade .carousel-text-overlay {
  opacity: 1 !important;
  visibility: visible !important;
  transition: none !important;
}

.cube-nav {
  background: rgba(255,255,255,0.2);
  border: none;
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
}

.cube-nav:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.1);
}

.cube-arrow {
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.5));
}



@keyframes fadeIn {
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Property Gallery Styles */
.property-gallery-section {
  background: rgba(248, 239, 229, 0.95);
  border-radius: 15px;
  padding: 5px;
  box-shadow: 0 10px 60px rgba(0,0,0,0.4);
  border: 1px solid rgba(235, 164, 114, 0.3);
  height: 610px;
  min-height: 500px;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #a79f96;
}

.gallery-title {
  font-size: 1.4rem;
  font-weight: 300;
  color: #2f4955; /* midnight-black */
  margin: 0;
  text-align: center;
  flex: 1;
}

.gallery-count {
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.main-image-container {
  position: relative;
  height: 450px;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}

.main-thumbnail-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 10px;
}

.main-image-container:hover .main-thumbnail-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 1.2rem;
  pointer-events: none;
}

.main-image-container:hover .image-overlay {
  opacity: 1;
}

.image-overlay i {
  font-size: 2rem;
  margin-bottom: 10px;
}

.thumbnail-grid-image {
  width: 100%;
  height: 120px; /* Increased from 80px */
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail-grid-image:hover,
.thumbnail-grid-image.active-thumbnail {
  border-color: #EBA472;
  transform: scale(1.05);
}

.view-all-box {
  width: 100%;
  height: 120px; /* Increased from 80px to match thumbnail-grid-image */
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.8), rgba(161, 94, 59, 0.8));
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-box:hover {
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.9), rgba(161, 94, 59, 0.9));
  transform: scale(1.05);
}

/* Property Info Styles */
.property-info-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 239, 229, 0.95)); /* modern-white to warm sunset tint */
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15), 0 0 20px rgba(235, 164, 114, 0.1);
  border: 2px solid rgba(235, 164, 114, 0.4); /* warm sunset border */
  backdrop-filter: blur(10px);
  height: auto;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.property-status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.status-available {
  background-color: #28a745;
}

.status-dot.status-pending {
  background-color: #ffc107;
}

.status-dot.status-sold {
  background-color: #dc3545;
}

/* Glowing Status Buttons */
.status-button {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 2px solid;
  transition: all 0.3s ease;
  animation: statusGlow 2s ease-in-out infinite alternate;
}

.status-button.status-available {
  color: #29813e;
  border-color: #005514;
  background: rgba(40, 167, 69, 0.1);
  box-shadow: 0 0 8px rgba(40, 167, 69, 0.3);
}

.status-button.status-pending {
  color: #ffc107;
  border-color: #ffc107;
  background: rgba(255, 193, 7, 0.1);
  box-shadow: 0 0 15px rgba(255, 193, 7, 0.3);
}

.status-button.status-sold {
  color: #dc3545;
  border-color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
  box-shadow: 0 0 15px rgba(220, 53, 69, 0.3);
}

.status-button.status-rented {
  color: #6f42c1;
  border-color: #6f42c1;
  background: rgba(111, 66, 193, 0.1);
  box-shadow: 0 0 15px rgba(111, 66, 193, 0.3);
}

@keyframes statusGlow {
  from {
    box-shadow: 0 0 10px currentColor;
  }
  to {
    box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
  }
}

.property-title {
  color: #000000 !important; /* midnight-black */
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.property-subtitle {
  color: #4A4A4A !important; /* slate-gray - better contrast */
  font-weight: 500;
}

.price-glow {
  text-shadow: 0 0 10px rgba(235, 164, 114, 0.6), 0 0 20px rgba(235, 164, 114, 0.4), 0 0 30px rgba(235, 164, 114, 0.2);
  animation: priceGlow 2s ease-in-out infinite alternate;
}

@keyframes priceGlow {
  from {
    text-shadow: 0 0 10px rgba(235, 164, 114, 0.6), 0 0 20px rgba(235, 164, 114, 0.4), 0 0 30px rgba(235, 164, 114, 0.2);
  }
  to {
    text-shadow: 0 0 15px rgba(235, 164, 114, 0.8), 0 0 25px rgba(235, 164, 114, 0.6), 0 0 35px rgba(235, 164, 114, 0.4);
  }
}

.status-text {
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.property-stat {
  text-align: center;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.8); /* modern-white with transparency */
  border: 1px solid rgba(235, 164, 114, 0.3); /* warm sunset border */
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.property-stat:hover {
  background: rgba(235, 164, 114, 0.1); /* warm sunset tint on hover */
  border-color: rgba(235, 164, 114, 0.6);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(235, 164, 114, 0.2);
}

.property-stat i {
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #EBA472; /* warm sunset for icons */
}

.property-stat h6 {
  color: #000000; /* midnight-black for numbers */
  font-weight: 700;
}

.property-stat small {
  color: #4A4A4A; /* slate-gray for labels */
  font-weight: 500;
}

.feature-badge {
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  color: white;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.feature-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(235, 164, 114, 0.3);
}

/* Property Details Section */
.property-details-section {
  background: #f8f9fa;
}

.property-details-info-box {
  background: white;
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(235, 164, 114, 0.2);
  height: 100%;
}

.property-details-info-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border-color: rgba(235, 164, 114, 0.4);
}

.property-details-info-box .info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 1.5rem;
}

.property-details-info-box h5 {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 15px;
}

.property-details-info-box p {
  color: #6c757d;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}

/* Property Detail Cards */
.property-detail-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(235, 164, 114, 0.2);
  overflow: hidden;
}

.property-detail-card .card-header {
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  color: white;
  padding: 15px 20px;
  border: none;
}

.property-detail-card .card-body {
  padding: 20px;
}

.detail-grid {
  display: grid;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f8f9fa;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

.detail-value {
  color: #495057;
  text-align: right;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Contact Section */
.contact-section {
  /*
  Background Color Options (choose one):
  - Very Light: rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.95)
  - Light: rgba(248, 249, 250, 0.98), rgba(240, 242, 245, 0.95)
  - Medium Light: rgba(245, 246, 247, 0.95), rgba(235, 237, 240, 0.95)
  - Current: rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.95)
  */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.95));
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08), 0 0 15px rgba(235, 164, 114, 0.08);
  border: 1px solid rgba(235, 164, 114, 0.2);
  position: static;
  max-height: none;
  overflow-y: visible;
  overflow-x: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-section.forms-closed {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  overflow-x: hidden;
}

.contact-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 0 25px rgba(235, 164, 114, 0.2);
}

.contact-header {
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  color: white;
  padding: 20px 25px;
  border-radius: 15px 15px 0 0;
  position: relative;
  overflow: hidden;
  margin: -2px -2px 0 -2px;
}

.contact-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 3s infinite;
}

.contact-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}

.contact-body {
  padding: 30px;
  background: linear-gradient(145deg, rgba(129, 82, 50, 0.9), rgba(206, 146, 90, 0.9));
  color: #ffffff;
}

.property-type-status {
  text-align: center;
}

/* Status Dot for Badge */
.status-dot-container {
  position: absolute;
  top: -6px;
  left: -6px;
  z-index: 10;
}

.property-type-badge {
  position: relative;
}

.status-dot-price {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  animation: statusPulse 2s ease-in-out infinite;
}

.status-dot-price::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  animation: statusGlowRing 2s ease-in-out infinite;
}

.status-dot-price.status-available {
  background-color: #28a745;
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.6);
}

.status-dot-price.status-available::before {
  background: radial-gradient(circle, rgba(40, 167, 69, 0.3) 0%, transparent 70%);
}

.status-dot-price.status-pending {
  background-color: #ffc107;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
}

.status-dot-price.status-pending::before {
  background: radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, transparent 70%);
}

.status-dot-price.status-sold {
  background-color: #dc3545;
  box-shadow: 0 0 10px rgba(220, 53, 69, 0.6);
}

.status-dot-price.status-sold::before {
  background: radial-gradient(circle, rgba(220, 53, 69, 0.3) 0%, transparent 70%);
}

.status-dot-price.status-rented {
  background-color: #6f42c1;
  box-shadow: 0 0 10px rgba(111, 66, 193, 0.6);
}

.status-dot-price.status-rented::before {
  background: radial-gradient(circle, rgba(111, 66, 193, 0.3) 0%, transparent 70%);
}

@keyframes statusPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes statusGlowRing {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.2;
  }
}

.price-display-card {
  background: #ffffff; /* modern-white */
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  text-align: center;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.price-amount-container {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
}

.price-amount {
  font-size: 3.5rem; /* enlarged */
  font-weight: 500; /* thicker */
  box-shadow: 0 3px 25px rgba(27, 27, 27, 0.363);
  color: #000000; /* midnight-black */
}

.price-period {
  font-size: 1rem;
  color: #4A4A4A; /* slate-gray */
}

.property-type-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.property-type-badge.sale {
  background: linear-gradient(135deg, #28a745, #0b6430);
  color: white;
}

.property-type-badge.rental {
  background: linear-gradient(135deg, #28a745, #0b6430);
  color: white;
}

.btn-sunset-gradient {
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  border: none;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-sunset-gradient:hover {
  background: linear-gradient(135deg, #D4956A, #8B4A32);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(235, 164, 114, 0.3);
  color: white;
}

.btn-outline-dark {
  border: 2px solid #ffffff;
  color: #ffffff;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 25px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.btn-outline-dark:hover {
  background: #ffffff;
  color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.text-sunset-orange {
  color: #EBA472 !important;
}

/* Exchange Bank Styles */
.exchange-bank-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.exchange-bank-logo-small {
  height: 30px;
  width: auto;
  object-fit: contain;
}

.btn-exchange-bank {
  background: linear-gradient(135deg, #571b1b, #5c0202);
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
}

.btn-exchange-bank:hover {
  background: linear-gradient(135deg, #491313, #160404);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
  color: white;
}

.prequalified-section {
  backdrop-filter: blur(10px);
}

/* Mortgage Info Boxes */
.mortgage-info-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  height: 100%;
  border: 1px solid rgba(235, 164, 114, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mortgage-info-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.mortgage-info-box .info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 1.5rem;
}

.mortgage-info-box h5 {
  color: #000000;
  font-weight: 600;
  margin-bottom: 15px;
}

.mortgage-info-box p {
  color: #4A4A4A;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.contact-form,
.tour-form {
  border-top: 2px solid #f8f9fa;
  padding-top: 20px;
}

.contact-form .form-control,
.tour-form .form-control,
.contact-form .form-select,
.tour-form .form-select {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px 12px;
  transition: border-color 0.3s ease;
}

.contact-form .form-control:focus,
.tour-form .form-control:focus,
.contact-form .form-select:focus,
.tour-form .form-select:focus {
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

/* Mortgage Calculator Section */
.mortgage-calculator-section {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border-top: 3px solid #EBA472;
}

.mortgage-calculator-card {
  border: 1px solid rgba(235, 164, 114, 0.3);
}

.mortgage-result {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
  border: 2px solid rgba(235, 164, 114, 0.2);
}

.mortgage-breakdown {
  border-top: 2px solid rgba(235, 164, 114, 0.3);
  padding-top: 15px;
}

/* Social Media Section */
.social-media-section {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border-top: 3px solid #EBA472;
}

.social-info-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  height: 100%;
  border: 1px solid rgba(235, 164, 114, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-info-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.social-info-box .info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #EBA472, #A15E3B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 1.5rem;
}

.social-info-box h5 {
  color: #000000;
  font-weight: 600;
  margin-bottom: 15px;
}

.social-info-box p {
  color: #4A4A4A;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.btn-social-facebook {
  background: #1877f2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-facebook:hover {
  background: #166fe5;
  color: white;
  transform: translateY(-2px);
}

.btn-social-instagram {
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-instagram:hover {
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Fix Instagram button alignment */
.social-info-box .btn {
  margin-top: auto;
}

.btn-social-twitter {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-twitter:hover {
  background: #0d8bd9;
  color: white;
  transform: translateY(-2px);
}

.btn-social-tiktok {
  background: #000000;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-social-tiktok:hover {
  background: #333333;
  color: white;
  transform: translateY(-2px);
}

.contact-info-card {
  border: 1px solid rgba(235, 164, 114, 0.3);
}

.contact-details i {
  width: 20px;
  text-align: center;
}

.rental-cta {
  padding: 20px;
  background: linear-gradient(135deg, rgba(235, 164, 114, 0.1), rgba(161, 94, 59, 0.05));
  border-radius: 10px;
}

/* Image Modal Styles */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.image-modal-container {
  position: relative;
  width: 90%;
  height: 90%;
  max-width: 1200px;
  max-height: 800px;
}

.image-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(235, 164, 114, 0.8);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10001;
  transition: background 0.3s ease;
}

.image-modal-close:hover {
  background: rgba(235, 164, 114, 1);
}

.image-modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-modal-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.modal-main-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.image-modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(235, 164, 114, 0.8);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10001;
}

.image-modal-nav:hover {
  background: rgba(235, 164, 114, 1);
  transform: translateY(-50%) scale(1.1);
}

.image-modal-prev {
  left: 20px;
}

.image-modal-next {
  right: 20px;
}

.image-modal-counter {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 10001;
}

.image-modal-thumbnails {
  height: 80px;
  overflow-x: auto;
  padding: 10px 0;
}

.thumbnail-strip {
  display: flex;
  gap: 10px;
  padding: 0 10px;
}

.modal-thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.modal-thumbnail:hover,
.modal-thumbnail.active {
  opacity: 1;
  border-color: #EBA472;
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-title {
    font-size: 1.5rem;
    font-weight: 300;
  }

  .carousel-subtitle {
    font-size: 0.9rem;
    font-weight: 300;
  }

  .property-stat {
    padding: 10px;
  }

  .contact-section {
    position: static;
    margin-top: 30px;
  }

  .price-amount {
    font-size: 1.5rem;
  }
}

/* Disclosure Statements Styling */
.disclosure-container {
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  border: 1px solid rgba(235, 164, 114, 0.2);
  margin-top: 15px;
}

/* Skeleton Loading Styles */
.property-loading-skeleton {
  animation: fadeIn 0.3s ease-in;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.skeleton-line {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 10px;
}

.skeleton-title {
  height: 32px;
  width: 60%;
  margin: 0 auto 15px auto;
}

.skeleton-subtitle {
  height: 20px;
  width: 40%;
  margin: 0 auto 20px auto;
}

.skeleton-heading {
  height: 24px;
  width: 30%;
}

.skeleton-short {
  width: 70%;
}

.skeleton-section {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
}

.disclosure-text {
  font-size: 0.75rem;
  line-height: 1.4;
  text-align: center;
  margin: 0;
  color: #333333;
  font-weight: 200;
}

/* Specific styling for contact disclosure */
.contact-disclosure {
  color: #444444;
}

/* Specific styling for showing disclosure */
.showing-disclosure {
  color: #444444;
}

/* Alternative styling options - uncomment and modify as needed */
/*
.disclosure-container {
  background: rgba(235, 164, 114, 0.1);
  border: 1px solid rgba(235, 164, 114, 0.3);
  padding: 12px 20px;
}

.disclosure-text {
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.8rem;
}

.contact-disclosure {
  color: #e74c3c;
}

.showing-disclosure {
  color: #27ae60;
}
*/
</style>
