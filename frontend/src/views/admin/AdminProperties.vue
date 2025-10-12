<template>
  <div class="admin-page admin-properties-container">
    <AdminNavbar />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-primary">Property Management</h1>
          <p class="text-gray-300">Manage your property listings</p>
        </div>
        <button @click="showAddForm = true" class="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
          + Add New Property
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button @click="activeTab = 'all'" 
                    :class="activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
              All Properties ({{ properties.length }})
            </button>
            <button @click="activeTab = 'sale'" 
                    :class="activeTab === 'sale' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
              For Sale ({{ saleProperties.length }})
            </button>
            <button @click="activeTab = 'rental'" 
                    :class="activeTab === 'rental' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
              For Rent ({{ rentalProperties.length }})
            </button>
            <button @click="activeTab = 'upcoming'" 
                    :class="activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
              Upcoming ({{ upcomingProperties.length }})
            </button>
          </nav>
        </div>
      </div>

      <!-- Properties Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="property in filteredProperties" :key="property._id"
             class="property-card bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary">
          <!-- Property Image -->
          <div class="relative h-32 overflow-hidden">
            <img :src="getImageUrl(property.thumbnail || property.images?.[0])"
                 class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                 @error="handleImageError" />
            <!-- Status Badge -->
            <div class="absolute top-3 left-3">
              <span class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(property.status)">
                {{ property.status.charAt(0).toUpperCase() + property.status.slice(1) }}
              </span>
            </div>
            <!-- Type Badge -->
            <div class="absolute top-3 right-3">
              <span class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="property.type === 'sale' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'">
                {{ property.type === 'sale' ? 'Sale' : 'Rental' }}
              </span>
            </div>
          </div>

          <!-- Property Info -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1 truncate">{{ property.title }}</h3>
            <p class="text-sm text-gray-600 mb-2 truncate">{{ property.address }}</p>
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg font-bold text-primary">${{ formatPrice(property.price) }}</span>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-bed mr-1"></i>{{ property.bedrooms }}
                <i class="fas fa-bath ml-2 mr-1"></i>{{ property.bathrooms }}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button @click="editProperty(property)"
                      class="flex-1 bg-primary hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                <i class="fas fa-edit mr-1"></i>Edit
              </button>
              <button @click="deleteProperty(property._id)"
                      class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                <i class="fas fa-trash mr-1"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Add/Edit Property Modal -->
      <div v-if="showAddForm || editingProperty" class="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-primary to-blue-600 px-6 py-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold">
                  {{ editingProperty ? 'Edit Property' : 'Add New Property' }}
                </h3>
                <p class="text-blue-100 text-sm mt-1">
                  {{ editingProperty ? 'Update property information' : 'Create a new property listing' }}
                </p>
              </div>
              <button @click="closeForm" class="text-white hover:text-gray-200 transition-colors">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="overflow-y-auto max-h-[calc(80vh-120px)] p-6">

          <form @submit.prevent="saveProperty" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Address *</label>
                <input v-model="propertyForm.address" type="text" required 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Property Description</label>
                <input v-model="propertyForm.title" type="text" required 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                       placeholder="e.g. Beautiful 3-bedroom home with modern updates">
              </div>
            </div>

            <!-- Status Selection and Future Type -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Property Status *</label>
                <select v-model="propertyForm.status" required @change="handleStatusChange"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              
              <!-- Show type selection for non-upcoming OR future type for upcoming -->
              <div v-if="propertyForm.status !== 'upcoming'">
                <label class="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                <select v-model="propertyForm.type" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="sale">For Sale</option>
                  <option value="rental">For Rent</option>
                </select>
              </div>
              
              <div v-else>
                <label class="block text-sm font-medium text-gray-700 mb-2">Future Property Type *</label>
                <select v-model="propertyForm.futureType" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select future type...</option>
                  <option value="sale">Will be For Sale</option>
                  <option value="rental">Will be For Rent</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">This will be the property type when it's no longer upcoming</p>
              </div>
            </div>

            <!-- Price field - different label for upcoming -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ propertyForm.status === 'upcoming' ? 'Estimated Price' : 'Price' }} *
                </label>
                <input v-if="propertyForm.status === 'upcoming'"
                       type="number" 
                       v-model="propertyForm.estimatedPrice" 
                       required
                       placeholder="Estimated price"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <input v-else
                       type="number" 
                       v-model="propertyForm.price" 
                       required
                       placeholder="Property price"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <div class="grid md:grid-cols-4 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Building Type</label>
                <select v-model="propertyForm.buildingType" required 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="house">House</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condo/Apartment</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Bedrooms</label>
                <input v-model="propertyForm.bedrooms" type="number" required 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Bathrooms</label>
                <input v-model="propertyForm.bathrooms" type="number" step="0.5" required 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Square Feet</label>
                <input v-model="propertyForm.sqft" type="number" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Neighborhood</label>
              <input v-model="propertyForm.neighborhood" type="text" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Features (comma separated)</label>
              <input v-model="featuresString" type="text" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     placeholder="e.g. Garage, Pool, Fireplace">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Description</label>
              <textarea v-model="propertyForm.description" rows="4" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Property description..."></textarea>
            </div>

            <!-- Thumbnail Image -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Thumbnail Image</label>
              <input @change="handleThumbnailUpload" type="file" accept="image/*" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <div v-if="propertyForm.thumbnail" class="mt-2 flex items-center gap-3">
                <img :src="getImageUrl(propertyForm.thumbnail)" class="h-8 w-12 object-cover rounded">
                <button @click="removeThumbnail" type="button" class="text-red-600 text-xs hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>

            <!-- Gallery Images -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
              <div class="space-y-2">
                <input @change="handleGalleryImageUpload" type="file" accept="image/*" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                       placeholder="Add single image">
                <input @change="handleBulkGalleryUpload" type="file" accept="image/*" multiple
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                       placeholder="Add multiple images">
                <p class="text-xs text-gray-500">Use first input for single images, second for multiple images at once</p>
              </div>
              <div v-if="propertyForm.images && propertyForm.images.length" class="mt-4">
                <div class="grid grid-cols-8 gap-1">
                  <div v-for="(image, index) in propertyForm.images" :key="index" class="relative">
                    <img :src="getImageUrl(image)" class="h-8 w-8 object-cover rounded">
                    <button @click="removeGalleryImage(index)" type="button"
                            class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs hover:bg-red-600" style="font-size: 10px;">
                      ×
                    </button>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ propertyForm.images.length }} image(s) uploaded</p>
              </div>
            </div>

            <!-- Extended Property Information Sections -->
            <div class="mt-8 border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Extended Property Information</h3>

              <!-- Exterior Information -->
              <div class="mb-6">
                <h4 class="text-md font-medium text-gray-700 mb-3" style="color: #000 !important; font-weight: bold;">Exterior</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Lot Size</label>
                    <input v-model="propertyForm.exterior.lotSize" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., 0.25 acres, 10,000 sq ft">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                    <input v-model="propertyForm.exterior.yearBuilt" type="number"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., 2020">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Roof Type</label>
                    <input v-model="propertyForm.exterior.roofType" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Asphalt Shingle, Tile, Metal">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Exterior Material</label>
                    <input v-model="propertyForm.exterior.exteriorMaterial" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Brick, Vinyl, Stucco">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Landscaping</label>
                    <input v-model="propertyForm.exterior.landscaping" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Mature trees, Garden, Lawn">
                  </div>
                </div>
              </div>

              <!-- Interior Information -->
              <div class="mb-6">
                <h4 class="text-md font-medium text-gray-700 mb-3" style="color: #000 !important; font-weight: bold;">Interior</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Flooring</label>
                    <input v-model="propertyForm.interior.flooring" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Hardwood, Carpet, Tile">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Heating</label>
                    <input v-model="propertyForm.interior.heating" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Central Air, Gas, Electric">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Cooling</label>
                    <input v-model="propertyForm.interior.cooling" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Central AC, Window Units">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Basement</label>
                    <select v-model="propertyForm.interior.basement"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Basement Type</option>
                      <option value="None">None</option>
                      <option value="Finished">Finished</option>
                      <option value="Unfinished">Unfinished</option>
                      <option value="Partial">Partial</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Laundry</label>
                    <input v-model="propertyForm.interior.laundry" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., In-unit, Hookups, Shared">
                  </div>
                  <div>
                    <label class="flex items-center">
                      <input v-model="propertyForm.interior.fireplace" type="checkbox" class="mr-2">
                      <span class="text-sm font-medium text-gray-700">Has Fireplace</span>
                    </label>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Appliances (comma-separated)</label>
                    <input v-model="appliancesString" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., Refrigerator, Dishwasher, Washer/Dryer">
                  </div>
                </div>
              </div>

              <!-- Parking Information -->
              <div class="mb-6">
                <h4 class="text-md font-medium text-gray-700 mb-3" style="color: #000 !important; font-weight: bold;">Parking</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Parking Type</label>
                    <select v-model="propertyForm.parking.type"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Parking Type</option>
                      <option value="Garage">Garage</option>
                      <option value="Carport">Carport</option>
                      <option value="Driveway">Driveway</option>
                      <option value="Street">Street Parking</option>
                      <option value="None">No Parking</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Spaces</label>
                    <input v-model="propertyForm.parking.spaces" type="number"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="e.g., 2">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Garage Type</label>
                    <select v-model="propertyForm.parking.garageType"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Garage Type</option>
                      <option value="Attached">Attached</option>
                      <option value="Detached">Detached</option>
                      <option value="Built-in">Built-in</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Parking Description</label>
                    <input v-model="propertyForm.parking.description" type="text"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="Additional parking details">
                  </div>
                </div>
              </div>
            </div>

            <!-- HOA Information -->
            <div class="mb-6">
              <h4 class="text-md font-medium text-gray-700 mb-3" style="color: #000 !important; font-weight: bold;">HOA Information</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="flex items-center">
                    <input v-model="propertyForm.hoa.hasHOA" type="checkbox" class="mr-2">
                    <span class="text-sm font-medium text-gray-700">Has HOA</span>
                  </label>
                </div>
                <div v-if="propertyForm.hoa.hasHOA">
                  <label class="block text-sm font-medium text-gray-700 mb-2">HOA Fee ($)</label>
                  <input v-model="propertyForm.hoa.fee" type="number"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., 150">
                </div>
                <div v-if="propertyForm.hoa.hasHOA">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Fee Frequency</label>
                  <select v-model="propertyForm.hoa.frequency"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Frequency</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>
                <div v-if="propertyForm.hoa.hasHOA" class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">HOA Amenities (comma-separated)</label>
                  <input v-model="hoaAmenitiesString" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Pool, Gym, Tennis Court">
                </div>
                <div v-if="propertyForm.hoa.hasHOA" class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">HOA Restrictions</label>
                  <textarea v-model="propertyForm.hoa.restrictions"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            rows="3" placeholder="Any HOA restrictions or rules"></textarea>
                </div>
              </div>
            </div>

            <!-- Location Information -->
            <div class="mb-6">
              <h4 class="text-md font-medium text-gray-700 mb-3" style="color: #000 !important; font-weight: bold;">Location Details</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">County</label>
                  <input v-model="propertyForm.location.county" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Los Angeles County">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                  <input v-model="propertyForm.location.neighborhood" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Downtown, Westside">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">School District</label>
                  <input v-model="propertyForm.location.schoolDistrict" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., LAUSD">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Walk Score (0-100)</label>
                  <input v-model="propertyForm.location.walkScore" type="number" min="0" max="100"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., 85">
                </div>
              </div>
            </div>

            <!-- Building Information -->
            <div class="mb-6">
              <h4 class="text-md font-medium text-gray-700 mb-3" style="color: #000 !important; font-weight: bold;">Building Information</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Number of Stories</label>
                  <input v-model="propertyForm.building.stories" type="number"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., 2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Total Units (for condos/apartments)</label>
                  <input v-model="propertyForm.building.totalUnits" type="number"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., 50">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Pet Policy</label>
                  <input v-model="propertyForm.building.petPolicy" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Cats allowed, No pets, Pet deposit required">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Accessibility Features (comma-separated)</label>
                  <input v-model="accessibilityString" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Wheelchair accessible, Elevator">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Utilities (comma-separated)</label>
                  <input v-model="utilitiesString" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Electric, Gas, Water, Internet">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Security Features (comma-separated)</label>
                  <input v-model="securityString" type="text"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                         placeholder="e.g., Gated community, Security system, Doorman">
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" style="color: #000 !important; font-weight: bold;">Assigned Agent</label>
              <select v-model="propertyForm.agent"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">No Agent Assigned</option>
                <option v-for="agent in agents" :key="agent._id" :value="agent._id">
                  {{ agent.name }} - {{ agent.title }}
                </option>
              </select>
            </div>

            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeForm" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                {{ saving ? 'Saving...' : (editingProperty ? 'Update Property' : 'Create Property') }}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import axios from 'axios'

export default {
  name: 'AdminProperties',
  components: {
    AdminNavbar
  },
  data() {
    return {
      properties: [],
      agents: [],
      activeTab: 'all',
      showAddForm: false,
      editingProperty: null,
      saving: false,
      propertyForm: {
        title: '',
        address: '',
        price: '',
        estimatedPrice: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        description: '',
        type: 'sale',
        futureType: '', // Add this field
        buildingType: 'house',
        status: 'available',
        neighborhood: '',
        features: [],
        thumbnail: '',
        images: [],

        // Extended Property Information
        exterior: {
          lotSize: '',
          yearBuilt: '',
          roofType: '',
          exteriorMaterial: '',
          landscaping: ''
        },
        interior: {
          flooring: '',
          heating: '',
          cooling: '',
          appliances: [],
          fireplace: false,
          basement: '',
          laundry: ''
        },
        parking: {
          type: '',
          spaces: '',
          garageType: '',
          description: ''
        },
        hoa: {
          hasHOA: false,
          fee: '',
          frequency: '',
          amenities: [],
          restrictions: ''
        },
        location: {
          county: '',
          neighborhood: '',
          schoolDistrict: '',
          walkScore: ''
        },
        building: {
          stories: '',
          totalUnits: '',
          petPolicy: '',
          accessibility: [],
          utilities: [],
          security: []
        }
      }
    }
  },
  computed: {
    // String handlers for comma-separated fields
    appliancesString: {
      get() {
        return Array.isArray(this.propertyForm.interior.appliances)
          ? this.propertyForm.interior.appliances.join(', ')
          : ''
      },
      set(value) {
        this.propertyForm.interior.appliances = value ? value.split(',').map(s => s.trim()).filter(s => s) : []
      }
    },
    hoaAmenitiesString: {
      get() {
        return Array.isArray(this.propertyForm.hoa.amenities)
          ? this.propertyForm.hoa.amenities.join(', ')
          : ''
      },
      set(value) {
        this.propertyForm.hoa.amenities = value ? value.split(',').map(s => s.trim()).filter(s => s) : []
      }
    },
    accessibilityString: {
      get() {
        return Array.isArray(this.propertyForm.building.accessibility)
          ? this.propertyForm.building.accessibility.join(', ')
          : ''
      },
      set(value) {
        this.propertyForm.building.accessibility = value ? value.split(',').map(s => s.trim()).filter(s => s) : []
      }
    },
    utilitiesString: {
      get() {
        return Array.isArray(this.propertyForm.building.utilities)
          ? this.propertyForm.building.utilities.join(', ')
          : ''
      },
      set(value) {
        this.propertyForm.building.utilities = value ? value.split(',').map(s => s.trim()).filter(s => s) : []
      }
    },
    securityString: {
      get() {
        return Array.isArray(this.propertyForm.building.security)
          ? this.propertyForm.building.security.join(', ')
          : ''
      },
      set(value) {
        this.propertyForm.building.security = value ? value.split(',').map(s => s.trim()).filter(s => s) : []
      }
    },

    saleProperties() {
      return this.properties.filter(p => p.type === 'sale')
    },
    rentalProperties() {
      return this.properties.filter(p => p.type === 'rental')
    },
    upcomingProperties() {
      return this.properties.filter(p => p.status === 'upcoming')
    },
    filteredProperties() {
      switch(this.activeTab) {
        case 'sale':
          return this.saleProperties
        case 'rental':
          return this.rentalProperties
        case 'upcoming':
          return this.upcomingProperties
        default:
          return this.properties
      }
    },
    featuresString: {
      get() {
        return Array.isArray(this.propertyForm.features) ? this.propertyForm.features.join(', ') : ''
      },
      set(value) {
        this.propertyForm.features = value.split(',').map(f => f.trim()).filter(f => f)
      }
    }
  },
  async mounted() {
    // Ensure auth header is set
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    await this.loadProperties()
    await this.loadAgents()
  },
  methods: {
    async loadProperties() {
      try {
        console.log('=== ADMIN PROPERTIES DEBUG ===')
        console.log('Auth token:', sessionStorage.getItem('adminToken'))
        console.log('Axios headers:', axios.defaults.headers.common['Authorization'])
        
        const response = await axios.get('/api/admin/properties')
        console.log('Properties response:', response.data)
        this.properties = response.data
      } catch (error) {
        console.error('Error loading properties:', error)
        console.error('Error response:', error.response)
        if (error.response?.status === 401) {
          console.log('Redirecting to login due to 401')
          this.$router.push('/admin/login')
        }
      }
    },
    async loadAgents() {
      try {
        const response = await axios.get('/api/admin/agents')
        this.agents = response.data.filter(agent => agent.isActive)
      } catch (error) {
        console.error('Error loading agents:', error)
      }
    },
    editProperty(property) {
      this.editingProperty = property
      this.propertyForm = {
        ...property,
        features: Array.isArray(property.features) ? [...property.features] : [],
        images: Array.isArray(property.images) ? [...property.images] : [],
        thumbnail: property.thumbnail || '',
        futureType: property.futureType || '', // Include future type

        // Handle nested objects with defaults
        exterior: {
          lotSize: property.exterior?.lotSize || '',
          yearBuilt: property.exterior?.yearBuilt || '',
          roofType: property.exterior?.roofType || '',
          exteriorMaterial: property.exterior?.exteriorMaterial || '',
          landscaping: property.exterior?.landscaping || ''
        },
        interior: {
          flooring: property.interior?.flooring || '',
          heating: property.interior?.heating || '',
          cooling: property.interior?.cooling || '',
          appliances: Array.isArray(property.interior?.appliances) ? [...property.interior.appliances] : [],
          fireplace: property.interior?.fireplace || false,
          basement: property.interior?.basement || '',
          laundry: property.interior?.laundry || ''
        },
        parking: {
          type: property.parking?.type || '',
          spaces: property.parking?.spaces || '',
          garageType: property.parking?.garageType || '',
          description: property.parking?.description || ''
        },
        hoa: {
          hasHOA: property.hoa?.hasHOA || false,
          fee: property.hoa?.fee || '',
          frequency: property.hoa?.frequency || '',
          amenities: Array.isArray(property.hoa?.amenities) ? [...property.hoa.amenities] : [],
          restrictions: property.hoa?.restrictions || ''
        },
        location: {
          county: property.location?.county || '',
          neighborhood: property.location?.neighborhood || '',
          schoolDistrict: property.location?.schoolDistrict || '',
          walkScore: property.location?.walkScore || ''
        },
        building: {
          stories: property.building?.stories || '',
          totalUnits: property.building?.totalUnits || '',
          petPolicy: property.building?.petPolicy || '',
          accessibility: Array.isArray(property.building?.accessibility) ? [...property.building.accessibility] : [],
          utilities: Array.isArray(property.building?.utilities) ? [...property.building.utilities] : [],
          security: Array.isArray(property.building?.security) ? [...property.building.security] : []
        }
      }
    },
    closeForm() {
      this.showAddForm = false
      this.editingProperty = null
      this.resetForm()
    },
    resetForm() {
      this.propertyForm = {
        title: '',
        address: '',
        price: '',
        estimatedPrice: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        description: '',
        type: 'sale',
        futureType: '', // Reset future type
        buildingType: 'house',
        status: 'available',
        neighborhood: '',
        features: [],
        thumbnail: '',
        images: [],

        // Extended Property Information
        exterior: {
          lotSize: '',
          yearBuilt: '',
          roofType: '',
          exteriorMaterial: '',
          landscaping: ''
        },
        interior: {
          flooring: '',
          heating: '',
          cooling: '',
          appliances: [],
          fireplace: false,
          basement: '',
          laundry: ''
        },
        parking: {
          type: '',
          spaces: '',
          garageType: '',
          description: ''
        },
        hoa: {
          hasHOA: false,
          fee: '',
          frequency: '',
          amenities: [],
          restrictions: ''
        },
        location: {
          county: '',
          neighborhood: '',
          schoolDistrict: '',
          walkScore: ''
        },
        building: {
          stories: '',
          totalUnits: '',
          petPolicy: '',
          accessibility: [],
          utilities: [],
          security: []
        }
      }
    },
    async handleThumbnailUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          const formData = new FormData()
          formData.append('thumbnail', file)
          
          const response = await axios.post('/api/admin/properties/upload-thumbnail', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          
          this.propertyForm.thumbnail = response.data.thumbnailUrl
        } catch (error) {
          console.error('Error uploading thumbnail:', error)
          alert('Error uploading thumbnail. Please try again.')
        }
      }
    },
    async handleBulkGalleryUpload(event) {
      const files = Array.from(event.target.files)
      if (files.length > 0) {
        try {
          const formData = new FormData()
          files.forEach(file => {
            formData.append('images', file)
          })
          
          const response = await axios.post('/api/admin/properties/upload-images', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          
          this.propertyForm.images.push(...response.data.imageUrls)
          event.target.value = ''
        } catch (error) {
          console.error('Error uploading images:', error)
          alert('Error uploading images. Please try again.')
        }
      }
    },
    removeThumbnail() {
      this.propertyForm.thumbnail = ''
    },
    removeGalleryImage(index) {
      this.propertyForm.images.splice(index, 1)
    },
    async saveProperty() {
      this.saving = true
      try {
        const propertyData = {
          ...this.propertyForm,
          features: Array.isArray(this.propertyForm.features) 
            ? this.propertyForm.features 
            : (this.propertyForm.features || '').split(',').map(f => f.trim()).filter(f => f),
          images: this.propertyForm.images || [],
          thumbnail: this.propertyForm.thumbnail || ''
        }
        
        // For upcoming properties, don't send type field but include futureType
        if (propertyData.status === 'upcoming') {
          delete propertyData.type;
          // Ensure futureType is set
          if (!propertyData.futureType) {
            alert('Please select what type this property will be when it\'s no longer upcoming.');
            this.saving = false;
            return;
          }
        } else {
          // For non-upcoming properties, remove futureType
          delete propertyData.futureType;
        }
        
        console.log('Saving property data:', propertyData)
        
        if (this.editingProperty) {
          await axios.put(`/api/admin/properties/${this.editingProperty._id}`, propertyData)
        } else {
          await axios.post('/api/admin/properties', propertyData)
        }
        
        await this.loadProperties()
        this.closeForm()
        alert('Property saved successfully!')
      } catch (error) {
        console.error('Error saving property:', error)
        console.error('Error response:', error.response?.data)
        alert(`Error saving property: ${error.response?.data?.message || error.message}`)
      }
      this.saving = false
    },
    async deleteProperty(id) {
      if (confirm('Are you sure you want to delete this property?')) {
        try {
          await axios.delete(`/api/admin/properties/${id}`)
          await this.loadProperties()
          alert('Property deleted successfully!')
        } catch (error) {
          console.error('Error deleting property:', error)
          alert('Error deleting property. Please try again.')
        }
      }
    },
    getStatusClass(status) {
      const classes = {
        available: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        sold: 'bg-red-100 text-red-800',
        rented: 'bg-primary bg-opacity-20 text-primary'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    formatPrice(price) {
      return new Intl.NumberFormat().format(price)
    },
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `http://localhost:5000${imagePath}`
    },
    handleImageError(event) {
      event.target.src = '/placeholder-home.jpg'
    },
    handleStatusChange() {
      if (this.propertyForm.status === 'upcoming') {
        // For upcoming properties, clear the current type and require future type
        this.propertyForm.type = ''
        if (!this.propertyForm.futureType) {
          this.propertyForm.futureType = 'sale' // Default future type
        }
      } else {
        // For non-upcoming properties, clear future type and set current type
        this.propertyForm.futureType = ''
        if (!this.propertyForm.type) {
          this.propertyForm.type = 'sale'
        }
      }
    }
  }
}
</script>






























/* Add these styles to ensure proper table layout */
.admin-properties-table {
  table-layout: fixed;
  width: 100%;
}

.admin-properties-table th:nth-child(1) { width: 40%; } /* Property column */
.admin-properties-table th:nth-child(2) { width: 10%; } /* Type column */
.admin-properties-table th:nth-child(3) { width: 15%; } /* Price column */
.admin-properties-table th:nth-child(4) { width: 15%; } /* Status column */
.admin-properties-table th:nth-child(5) { width: 20%; } /* Actions column */

.admin-properties-table img {
  width: 48px !important;
  height: 48px !important;
  object-fit: cover !important;
  border-radius: 8px !important;
  flex-shrink: 0 !important;
}

.admin-properties-table .property-info {
  min-width: 0;
  flex: 1;
}

.admin-properties-table .property-info div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Modern Admin Styling - Enhanced */
.admin-properties-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

/* Property Card Styling */
.property-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.property-card img {
  transition: transform 0.3s ease;
}

.property-card:hover img {
  transform: scale(1.05);
}

/* Enhanced Form Modal */
.fixed.inset-0 {
  background: rgba(34, 34, 34, 0.8);
  backdrop-filter: blur(8px);
}

.bg-white.rounded-lg.shadow-xl {
  background: rgba(255, 255, 255, 0.98) !important;
  border-radius: 20px !important;
  box-shadow: 0 25px 80px rgba(34, 34, 34, 0.15) !important;
  border: 1px solid rgba(240, 141, 52, 0.2);
  position: relative;
  overflow: hidden;
}

.bg-white.rounded-lg.shadow-xl::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f08d34 0%, #f7cc76 50%, #d34f2d 100%);
  z-index: 1;
}

/* Form Headers */
.text-lg.font-semibold.text-gray-800 {
  color: #222222 !important;
  font-weight: 700 !important;
  font-size: 1.5rem !important;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem !important;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(240, 141, 52, 0.2);
}

/* Form Sections */
.mt-8.border-t.pt-6 {
  margin-top: 2rem !important;
  padding-top: 2rem !important;
  border-top: 2px solid rgba(240, 141, 52, 0.1) !important;
}

.text-md.font-medium.text-gray-700 {
  color: #555555 !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  margin-bottom: 1rem !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Form Inputs */
.w-full.px-3.py-2.border.border-gray-300.rounded-md {
  border: 2px solid rgba(187, 187, 187, 0.3) !important;
  border-radius: 10px !important;
  padding: 0.75rem 1rem !important;
  transition: all 0.3s ease !important;
  background: rgba(255, 255, 255, 0.9);
}

.w-full.px-3.py-2.border.border-gray-300.rounded-md:focus {
  border-color: #f08d34 !important;
  box-shadow: 0 0 0 3px rgba(240, 141, 52, 0.1) !important;
  outline: none !important;
}

/* Buttons */
.bg-primary {
  background: linear-gradient(135deg, #f08d34 0%, #d34f2d 100%) !important;
  border: none !important;
  border-radius: 10px !important;
  padding: 0.75rem 2rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease !important;
}

.bg-primary:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(240, 141, 52, 0.3) !important;
}

.border.border-gray-300.rounded-md.text-gray-700 {
  border: 2px solid rgba(187, 187, 187, 0.3) !important;
  border-radius: 10px !important;
  padding: 0.75rem 2rem !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.border.border-gray-300.rounded-md.text-gray-700:hover {
  border-color: #555555 !important;
  background: rgba(85, 85, 85, 0.05) !important;
}






