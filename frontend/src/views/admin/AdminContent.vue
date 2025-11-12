<template>
  <div class="admin-page">
    <AdminNavbar />

    <div class="container-fluid px-4 py-4 mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <div class="text-center mb-5">
            <h1 class="display-5 fw-bold text-primary mb-3">Content Management</h1>
            <p class="lead text-muted">Update website content, images, and team information</p>
          </div>

          <!-- Search and Filter Bar -->
          <div class="row mb-4">
            <div class="col-12">
              <div class="card shadow-sm">
                <div class="card-body py-3">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-search"></i>
                        </span>
                        <input v-model="searchQuery" type="text" class="form-control"
                               placeholder="Search content sections..."
                               @input="filterSections">
                      </div>
                    </div>
                    <div class="col-md-6 text-end">
                      <div class="btn-group" role="group">
                        <button @click="showAllSections" class="btn btn-outline-primary btn-sm"
                                :class="{ active: activeFilter === 'all' }">
                          All Sections
                        </button>
                        <button @click="filterByCategory('hero')" class="btn btn-outline-primary btn-sm"
                                :class="{ active: activeFilter === 'hero' }">
                          Hero & About
                        </button>
                        <button @click="filterByCategory('banners')" class="btn btn-outline-primary btn-sm"
                                :class="{ active: activeFilter === 'banners' }">
                          Page Banners
                        </button>
                        <button @click="filterByCategory('contact')" class="btn btn-outline-primary btn-sm"
                                :class="{ active: activeFilter === 'contact' }">
                          Contact & Footer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Sections Grid -->

          <!-- Row 1: Hero and About Us -->
          <div class="row g-3 mb-4" id="content-sections">
            <!-- About Us Section -->
            <div class="col-lg-6 content-section" data-category="aboutus" data-keywords="about us mission image company">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('aboutUs')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-building me-2"></i>About Us Page
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.aboutUs }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.aboutUs">
                  <form @submit.prevent="saveAboutUsContent" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Mission Section Image</label>
                      <div class="mb-3">
                        <input type="file"
                               class="form-control"
                               @change="handleMissionImageUpload"
                               accept="image/*"
                               :disabled="isUploading">
                        <small class="text-muted">Upload an image for the Our Mission section (appears on the right side)</small>
                      </div>

                      <!-- Current Mission Image Preview -->
                      <div v-if="content.aboutUs && content.aboutUs.missionImage" class="mb-3">
                        <label class="form-label fw-bold">Current Mission Image:</label>
                        <div class="position-relative d-inline-block">
                          <img :src="getImageUrl(content.aboutUs.missionImage)"
                               alt="Mission Image"
                               class="img-thumbnail"
                               style="max-width: 200px; max-height: 150px;">
                          <button type="button"
                                  class="btn btn-sm btn-danger position-absolute top-0 end-0"
                                  @click="removeMissionImage"
                                  style="transform: translate(50%, -50%);">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>

                      <!-- Placeholder when no image -->
                      <div v-else class="text-center p-4 border border-dashed rounded">
                        <i class="fas fa-image fa-2x text-muted mb-2"></i>
                        <p class="text-muted mb-0">No mission image uploaded</p>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-warm-sunset" :disabled="saving">
                        <i class="fas fa-save me-2"></i>
                        {{ saving ? 'Saving...' : 'Save About Us Content' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Hero and About (Leadership) -->
          <div class="row g-3 mb-4" id="content-sections-2">
            <!-- Hero Section -->
            <div class="col-lg-6 content-section" data-category="hero" data-keywords="hero homepage banner main title subtitle">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('hero')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-star me-2"></i>Homepage Hero Section
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.hero }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.hero">
                  <form @submit.prevent="saveHeroContent" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Main Headline</label>
                      <input v-model="content.hero.title" type="text" 
                             class="form-control form-control-lg" 
                             placeholder="Enter main headline">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Subheadline</label>
                      <textarea v-model="content.hero.subtitle" rows="3" 
                                class="form-control" 
                                placeholder="Enter subheadline"></textarea>
                    </div>
                    
                    <!-- Background Image Upload -->
                    <div class="col-12">
                      <label class="form-label fw-bold">Background Image</label>
                      <div v-if="content.hero.backgroundImage" class="mb-2">
                        <img :src="getImageUrl(content.hero.backgroundImage)" alt="Background" class="img-thumbnail" style="max-height: 100px;">
                        <button @click="content.hero.backgroundImage = ''" type="button" class="btn btn-sm btn-outline-danger ms-2">Remove</button>
                      </div>
                      <input @change="handleHeroBackgroundUpload" type="file" class="form-control" accept="image/*">
                      <small class="form-text text-muted">This image will appear behind the text with low opacity</small>
                    </div>
                    
                    <!-- Foreground Image Upload -->
                    <div class="col-12">
                      <label class="form-label fw-bold">Foreground Image (Right Side)</label>
                      <div v-if="content.hero.foregroundImage" class="mb-2">
                        <img :src="getImageUrl(content.hero.foregroundImage)" alt="Foreground" class="img-thumbnail" style="max-height: 100px;">
                        <button @click="content.hero.foregroundImage = ''" type="button" class="btn btn-sm btn-outline-danger ms-2">Remove</button>
                      </div>
                      <input @change="handleHeroForegroundUpload" type="file" class="form-control" accept="image/*">
                      <small class="form-text text-muted">This image will appear on the right side of the hero section</small>
                    </div>
                    
                    <!-- Company Showcase Image Upload -->
                    <div class="col-12">
                      <label class="form-label fw-bold">Company Showcase Image</label>
                      <div v-if="content.hero.companyImage" class="mb-2">
                        <img :src="getImageUrl(content.hero.companyImage)" alt="Company Showcase" class="img-thumbnail" style="max-height: 100px;">
                        <button @click="content.hero.companyImage = ''" type="button" class="btn btn-sm btn-outline-danger ms-2">Remove</button>
                      </div>
                      <input @change="handleCompanyImageUpload" type="file" class="form-control" accept="image/*">
                      <small class="form-text text-muted">This image will appear next to the company description on the home page</small>
                    </div>

                    <!-- Hero Gallery Media Upload (Carousel) -->
                    <div class="col-12">
                      <label class="form-label fw-bold">Hero Gallery Media (Carousel)</label>
                      <div v-if="content.hero.galleryImages && content.hero.galleryImages.length > 0" class="mb-3">
                        <div class="row g-2">
                          <div v-for="(media, index) in content.hero.galleryImages" :key="index" class="col-auto">
                            <div class="position-relative">
                              <!-- Display video thumbnail or image -->
                              <div v-if="isVideoFile(media)" class="video-thumbnail" style="max-height: 80px; max-width: 80px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-play-circle" style="font-size: 24px; color: #6c757d;"></i>
                              </div>
                              <img v-else :src="getImageUrl(media)" alt="Gallery Media" class="img-thumbnail" style="max-height: 80px; max-width: 80px;">
                              <button @click="removeGalleryImage(index)" type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0" style="padding: 2px 6px; font-size: 10px;">×</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input @change="handleHeroGalleryUpload" type="file" class="form-control" accept="image/*,video/*" multiple>
                      <small class="form-text text-muted">Upload images (JPG, PNG, WebP, GIF) and videos (MP4, MOV, AVI, WebM) for the hero carousel. Videos are limited to 100MB, images to 15MB.</small>
                    </div>
                    
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary btn-lg">
                        <i class="fas fa-save me-2"></i>Save Hero Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- About Section -->
            <div class="col-lg-6 content-section" data-category="hero" data-keywords="about story mission company information">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('about')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-info-circle me-2"></i>About Section
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.about }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.about">
                  <form @submit.prevent="saveAboutContent" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Story Title</label>
                      <input v-model="content.about.storyTitle" type="text" class="form-control"
                             placeholder="Our Story">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Company Story</label>

                      <!-- Font Size Control -->
                      <div class="mb-3">
                        <label class="form-label">Font Size</label>
                        <select v-model="content.about.storyFontSize" class="form-select">
                          <option value="fs-6">Small (fs-6)</option>
                          <option value="fs-5">Medium (fs-5)</option>
                          <option value="fs-4">Large (fs-4) - Default</option>
                          <option value="fs-3">Extra Large (fs-3)</option>
                          <option value="fs-2">XXL (fs-2)</option>
                        </select>
                        <small class="text-muted">Choose the font size for the Company Story text on the About Us page</small>
                      </div>

                      <div class="toolbar mb-2">
                        <button type="button" @click="formatAboutText('story', 'bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatAboutText('story', 'italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatAboutText('story', 'underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatAboutText('story', 'insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatAboutText('story', 'insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertAboutLineBreak('story')" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="aboutStoryEditor"
                           @input="updateAboutStory"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 150px;"
                           v-html="content.about.story"
                           placeholder="Tell your company story">
                      </div>
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Mission Statement</label>
                      <div class="toolbar mb-2">
                        <button type="button" @click="formatAboutText('mission', 'bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatAboutText('mission', 'italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatAboutText('mission', 'underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatAboutText('mission', 'insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatAboutText('mission', 'insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertAboutLineBreak('mission')" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="aboutMissionEditor"
                           @input="updateAboutMission"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 120px;"
                           v-html="content.about.mission"
                           placeholder="Enter mission statement">
                      </div>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-info btn-lg">
                        <i class="fas fa-save me-2"></i>Save About Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Leadership and Values -->
          <div class="row g-3 mb-4">
            <!-- Leadership Section -->
            <div class="col-lg-6 content-section" data-category="leadership" data-keywords="leadership logo banner about team">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('leadership')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-users me-2"></i>Leadership Page
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.leadership }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.leadership">
                  <form @submit.prevent="saveLeadershipContent" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Leadership Banner Logo</label>
                      <div class="mb-3">
                        <input type="file"
                               class="form-control"
                               @change="handleLeadershipLogoUpload"
                               accept="image/*"
                               :disabled="isUploading">
                        <small class="text-muted">Upload a logo for the leadership page banner (appears above the title)</small>
                      </div>

                      <!-- Current Logo Preview -->
                      <div v-if="content.leadership && content.leadership.logo" class="mb-3">
                        <label class="form-label fw-bold">Current Logo:</label>
                        <div class="position-relative d-inline-block">
                          <img :src="getImageUrl(content.leadership.logo)"
                               alt="Leadership Logo"
                               class="img-thumbnail"
                               style="max-width: 200px; max-height: 100px;">
                          <button type="button"
                                  class="btn btn-sm btn-danger position-absolute top-0 end-0"
                                  @click="removeLeadershipLogo"
                                  style="transform: translate(50%, -50%);">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>

                      <!-- Placeholder when no logo -->
                      <div v-else class="text-center p-4 border border-dashed rounded">
                        <i class="fas fa-image fa-2x text-muted mb-2"></i>
                        <p class="text-muted mb-0">No leadership logo uploaded</p>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-warm-sunset" :disabled="saving">
                        <i class="fas fa-save me-2"></i>
                        {{ saving ? 'Saving...' : 'Save Leadership Content' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3: Values and Team -->
          <div class="row g-3 mb-4">
            <!-- Values Section -->
            <div class="col-lg-6 content-section" data-category="hero" data-keywords="values company culture mission vision">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-slate-gray text-white cursor-pointer" @click="toggleSection('values')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-heart me-2"></i>Company Values
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.values }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.values">
                  <form @submit.prevent="saveValuesContent" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Values Section Title</label>
                      <input v-model="content.values.title" type="text" 
                             class="form-control" 
                             placeholder="Our Values">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Values Description</label>
                      <div class="toolbar mb-2">
                        <button type="button" @click="formatValuesText('description', 'bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatValuesText('description', 'italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatValuesText('description', 'underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatValuesText('description', 'insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatValuesText('description', 'insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertValuesLineBreak('description')" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="valuesDescriptionEditor"
                           @input="updateValuesDescription"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 100px;"
                           v-html="content.values.description"
                           placeholder="Brief description of your company values">
                      </div>
                    </div>
                    
                    <!-- Values List -->
                    <div class="col-12">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">Individual Values</h5>
                        <button @click="addValue" type="button" class="btn btn-success btn-sm">
                          <i class="fas fa-plus me-1"></i>Add Value
                        </button>
                      </div>
                      
                      <div v-for="(value, index) in content.values.valuesList" :key="index" class="card mb-3">
                        <div class="card-body">
                          <div class="row g-3">
                            <div class="col-md-4">
                              <label class="form-label">Value Title</label>
                              <input v-model="value.title" type="text" class="form-control" placeholder="e.g., Integrity">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Icon Class</label>
                              <input v-model="value.icon" type="text" class="form-control" placeholder="fas fa-star">
                              <small class="text-muted">FontAwesome icon class</small>
                            </div>
                            <div class="col-md-4 d-flex align-items-end">
                              <button @click="removeValue(index)" type="button" class="btn btn-outline-danger">
                                <i class="fas fa-trash"></i> Remove
                              </button>
                            </div>
                            <div class="col-12">
                              <label class="form-label">Value Description</label>
                              <textarea v-model="value.description" rows="2" class="form-control" 
                                        placeholder="Describe this value"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-12">
                      <button type="submit" class="btn btn-success btn-lg">
                        <i class="fas fa-save me-2"></i>Save Values Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Team Section -->
            <div class="col-lg-6 content-section" data-category="hero" data-keywords="team members staff employees">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-slate-gray text-white cursor-pointer" @click="toggleSection('team')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-users me-2"></i>Team Members
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.team }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.team">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Manage Team</h5>
                    <button @click="showAddTeamMember = true" class="btn btn-success btn-sm">
                      <i class="fas fa-plus me-1"></i>Add Member
                    </button>
                  </div>
                  <div class="row g-4">
                    <div v-for="(member, index) in content.team" :key="index" class="col-lg-6">
                      <div class="card border">
                        <div class="card-body">
                          <div class="d-flex align-items-center mb-3">
                            <img :src="member.photo || '/placeholder-person.jpg'" 
                                 class="rounded-circle me-3" 
                                 style="width: 64px; height: 64px; object-fit: cover;">
                            <div>
                              <h5 class="text-primary mb-1">{{ member.name }}</h5>
                              <p class="text-muted mb-0 small">{{ member.title }}</p>
                              <div v-if="member.linkedin" class="mt-1">
                                <a :href="member.linkedin" target="_blank" class="text-primary small">
                                  <i class="fab fa-linkedin me-1"></i>LinkedIn
                                </a>
                              </div>
                            </div>
                          </div>
                          <p class="text-muted small mb-3">{{ member.bio }}</p>
                          <div v-if="member.specialties && member.specialties.length > 0" class="mb-3">
                            <small class="text-muted d-block mb-1">Specialties:</small>
                            <span v-for="specialty in member.specialties" :key="specialty"
                                  class="badge bg-info text-white me-1 mb-1 small">
                              {{ specialty }}
                            </span>
                          </div>
                          <div class="d-flex gap-2">
                            <button @click="editTeamMember(index)" class="btn btn-sm btn-outline-primary">
                              <i class="fas fa-edit me-1"></i>Edit
                            </button>
                            <button @click="removeTeamMember(index)" class="btn btn-sm btn-outline-danger">
                              <i class="fas fa-trash me-1"></i>Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3: Footer and Contact -->
          <div class="row g-3 mb-4">
            <!-- Footer/Contact Section -->
            <div class="col-lg-6 content-section" data-category="contact" data-keywords="footer contact information phone email address">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-midnight-black text-white cursor-pointer" @click="toggleSection('footer')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-address-book me-2"></i>Footer Contact Information
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.footer }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.footer">
                  <form @submit.prevent="saveFooterContent" class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Company Phone</label>
                      <input v-model="content.footer.phone" type="tel" 
                             class="form-control" 
                             placeholder="(402) XXX-XXXX">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Company Email</label>
                      <input v-model="content.footer.email" type="email" 
                             class="form-control" 
                             placeholder="info@makeithomelc.com">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Chris Email</label>
                      <input v-model="content.footer.chrisEmail" type="email" 
                             class="form-control" 
                             placeholder="chris@makeithomelc.com">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Address</label>
                      <input v-model="content.footer.address" type="text"
                             class="form-control"
                             placeholder="Omaha, Nebraska">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Office Hours</label>
                      <input v-model="content.footer.officeHours" type="text"
                             class="form-control"
                             placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM">
                    </div>

                    <!-- Social Media Links -->
                    <div class="col-12 mt-4">
                      <h6 class="text-warning mb-3">Social Media Links</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Facebook URL</label>
                      <input v-model="content.footer.socialMedia.facebook" type="url"
                             class="form-control"
                             placeholder="https://facebook.com/makeithome">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Twitter URL</label>
                      <input v-model="content.footer.socialMedia.twitter" type="url"
                             class="form-control"
                             placeholder="https://twitter.com/makeithome">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Instagram URL</label>
                      <input v-model="content.footer.socialMedia.instagram" type="url"
                             class="form-control"
                             placeholder="https://instagram.com/makeithome">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">LinkedIn URL</label>
                      <input v-model="content.footer.socialMedia.linkedin" type="url"
                             class="form-control"
                             placeholder="https://linkedin.com/company/makeithome">
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-warning btn-lg">
                        <i class="fas fa-save me-2"></i>Save Footer Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Contact Buttons Section -->
            <div class="col-lg-6 content-section" data-category="contact" data-keywords="contact page buttons phone email location">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-midnight-black text-white cursor-pointer" @click="toggleSection('contact')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-phone me-2"></i>Contact Page Buttons
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.contact }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.contact">
                  <form @submit.prevent="saveContactContent" class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Phone Number</label>
                      <input v-model="content.contact.phone" type="tel" 
                             class="form-control" 
                             placeholder="(402) XXX-XXXX">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Phone Description</label>
                      <input v-model="content.contact.phoneDescription" type="text" 
                             class="form-control" 
                             placeholder="Ready to talk? Give us a call">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Email Address</label>
                      <input v-model="content.contact.email" type="email" 
                             class="form-control" 
                             placeholder="info@makeithome.com">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Email Description</label>
                      <input v-model="content.contact.emailDescription" type="text" 
                             class="form-control" 
                             placeholder="Send us your questions">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Office Address</label>
                      <input v-model="content.contact.address" type="text" 
                             class="form-control" 
                             placeholder="Omaha, Nebraska">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Location Description</label>
                      <input v-model="content.contact.locationDescription" type="text" 
                             class="form-control" 
                             placeholder="Visit our office">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Google Maps Link</label>
                      <input v-model="content.contact.googleMapsLink" type="url" 
                             class="form-control" 
                             placeholder="https://maps.google.com/...">
                      <small class="text-muted">Paste the full Google Maps link here</small>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary btn-lg">
                        <i class="fas fa-save me-2"></i>Save Contact Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 4: Banner Sections -->
          <div class="row g-3 mb-4">
            <!-- Properties Page Banner -->
            <div class="col-lg-4 content-section" data-category="banners" data-keywords="properties banner page header">
              <div class="card shadow-sm admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('propertiesBanner')">
                  <h6 class="card-title mb-0">
                    <i class="fas fa-home me-2"></i>Properties Banner
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.propertiesBanner }"></i>
                  </h6>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.propertiesBanner">
                  <form @submit.prevent="savePropertiesBanner" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Banner Text</label>
                      <input v-model="content.propertiesBanner.text" type="text" 
                             class="form-control" 
                             placeholder="Find your dream home in Omaha, Nebraska">
                      <small class="text-muted">This appears at the top of the Properties page</small>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-info" :disabled="saving">
                        <i class="fas fa-save me-2"></i>
                        {{ saving ? 'Saving...' : 'Save Properties Banner' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Rentals Page Banner -->
            <div class="col-lg-4 content-section" data-category="banners" data-keywords="rentals banner page header">
              <div class="card shadow-sm admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('rentalsBanner')">
                  <h6 class="card-title mb-0">
                    <i class="fas fa-home me-2"></i>Rentals Banner
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.rentalsBanner }"></i>
                  </h6>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.rentalsBanner">
                  <form @submit.prevent="saveRentalsBanner" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Banner Text</label>
                      <input v-model="content.rentalsBanner.text" type="text"
                             class="form-control"
                             placeholder="Find your perfect rental home in Omaha">
                      <small class="text-muted">This appears at the top of the Rentals page</small>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-success" :disabled="saving">
                        <i class="fas fa-save me-2"></i>
                        {{ saving ? 'Saving...' : 'Save Rentals Banner' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Preferred Bidders Page Banner -->
            <div class="col-lg-4 content-section" data-category="banners" data-keywords="preferred bidders contractors banner page header">
              <div class="card shadow-sm admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('preferredBiddersBanner')">
                  <h6 class="card-title mb-0">
                    <i class="fas fa-hammer me-2"></i>Bidders Banner
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.preferredBiddersBanner }"></i>
                  </h6>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.preferredBiddersBanner">
                  <form @submit.prevent="savePreferredBiddersBanner" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Banner Title</label>
                      <input v-model="content.preferredBiddersBanner.title" type="text"
                             class="form-control"
                             placeholder="Preferred Bidders List">
                      <small class="text-muted">Main heading for the Preferred Bidders page</small>
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Banner Description</label>
                      <div class="toolbar mb-2">
                        <button type="button" @click="formatBannerText('bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatBannerText('italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatBannerText('underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatBannerText('insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatBannerText('insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertBannerLineBreak" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="bannerEditor"
                           @input="updateBannerDescription"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 150px;"
                           v-html="content.preferredBiddersBanner.description">
                      </div>
                      <small class="text-muted">Use the toolbar to format text. HTML tags are supported.</small>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-warning" :disabled="saving">
                        <i class="fas fa-save me-2"></i>
                        {{ saving ? 'Saving...' : 'Save Preferred Bidders Banner' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Sell To Us Section -->
          <div class="row g-3 mb-4">
            <div class="col-lg-6 content-section" data-category="sellToUs" data-keywords="sell to us benefits media image video">
              <div class="card shadow-sm h-100 admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('sellToUs')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-home me-2"></i>Sell To Us Section
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.sellToUs }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.sellToUs">
                  <form @submit.prevent="saveSellToUsContent" class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-bold">Benefits Section Media</label>
                      <p class="text-muted small mb-3">Upload an image or video to display next to the "Why Sell to Make It Home?" benefits list.</p>

                      <!-- Current Media Display -->
                      <div v-if="content.sellToUs && content.sellToUs.benefitsMedia" class="mb-3">
                        <div class="current-media-preview">
                          <!-- Video Preview -->
                          <video
                            v-if="isVideoFile(content.sellToUs.benefitsMedia)"
                            :src="getImageUrl(content.sellToUs.benefitsMedia)"
                            class="current-media-item"
                            controls
                            muted
                            style="max-height: 200px; max-width: 100%; border-radius: 8px;"
                          >
                            Your browser does not support the video tag.
                          </video>
                          <!-- Image Preview -->
                          <img
                            v-else
                            :src="getImageUrl(content.sellToUs.benefitsMedia)"
                            alt="Current Benefits Media"
                            class="current-media-item"
                            style="max-height: 200px; max-width: 100%; object-fit: cover; border-radius: 8px;"
                          />
                          <button type="button" class="btn btn-sm btn-danger mt-2" @click="removeBenefitsMedia">
                            <i class="fas fa-trash"></i> Remove Media
                          </button>
                        </div>
                      </div>

                      <!-- Upload Input -->
                      <input
                        type="file"
                        class="form-control"
                        @change="handleBenefitsMediaUpload"
                        accept="image/*,video/*"
                        :disabled="isUploading"
                      />
                      <div class="form-text">
                        Supported formats: JPG, PNG, GIF, MP4, MOV, AVI, WEBM. Max size: 50MB for videos, 10MB for images.
                      </div>

                      <div v-if="isUploading" class="mt-2">
                        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                        <span class="text-muted">Uploading...</span>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-warm-sunset" :disabled="isUploading">
                        <i class="fas fa-save me-2"></i>Save Sell To Us Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Our Vision Section -->
          <div class="row g-3 mb-4">
            <div class="col-12 content-section" data-category="vision" data-keywords="vision mission motivation goals future pillars">
              <div class="card shadow-sm admin-card">
                <div class="card-header bg-warm-sunset text-white cursor-pointer" @click="toggleSection('vision')">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-eye me-2"></i>Our Vision Page Content
                    <i class="fas fa-chevron-down float-end transition-transform" :class="{ 'rotate-180': expandedSections.vision }"></i>
                  </h5>
                </div>
                <div class="card-body collapsible-section" v-show="expandedSections.vision">
                  <form @submit.prevent="saveVisionContent" class="row g-3">
                    <!-- Hero Section -->
                    <div class="col-12">
                      <h6 class="fw-bold text-primary mb-3">Hero Section</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Hero Subtitle</label>
                      <input v-model="content.vision.heroSubtitle" type="text" class="form-control"
                             placeholder="Discover the vision that drives everything we do...">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Main Title</label>
                      <input v-model="content.vision.mainTitle" type="text" class="form-control"
                             placeholder="Our Vision for the Future">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Vision Statement</label>
                      <div class="toolbar mb-2">
                        <button type="button" @click="formatVisionText('statement', 'bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatVisionText('statement', 'italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatVisionText('statement', 'underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatVisionText('statement', 'insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatVisionText('statement', 'insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertVisionLineBreak('statement')" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="visionStatementEditor"
                           @input="updateVisionStatement"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 120px;"
                           v-html="content.vision.statement"
                           placeholder="At Make It Home, we envision a future where...">
                      </div>
                    </div>

                    <!-- Vision Images Section -->
                    <div class="col-12 mt-4">
                      <h6 class="fw-bold text-primary mb-3">Vision Images</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Vision Image 1</label>
                      <div v-if="content.vision.visionImage1" class="mb-2">
                        <img :src="getImageUrl(content.vision.visionImage1)"
                             alt="Current Vision Image 1"
                             style="max-height: 100px; max-width: 200px; object-fit: cover; border-radius: 8px;">
                        <button type="button" class="btn btn-sm btn-danger ms-2" @click="removeVisionImage1">
                          <i class="fas fa-trash"></i> Remove
                        </button>
                      </div>
                      <input type="file" class="form-control" @change="handleVisionImage1Upload"
                             accept="image/*" :disabled="isUploading">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Vision Image 2</label>
                      <div v-if="content.vision.visionImage2" class="mb-2">
                        <img :src="getImageUrl(content.vision.visionImage2)"
                             alt="Current Vision Image 2"
                             style="max-height: 100px; max-width: 200px; object-fit: cover; border-radius: 8px;">
                        <button type="button" class="btn btn-sm btn-danger ms-2" @click="removeVisionImage2">
                          <i class="fas fa-trash"></i> Remove
                        </button>
                      </div>
                      <input type="file" class="form-control" @change="handleVisionImage2Upload"
                             accept="image/*" :disabled="isUploading">
                    </div>

                    <!-- Motivation Section -->
                    <div class="col-12 mt-4">
                      <h6 class="fw-bold text-primary mb-3">Motivation Section</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Motivation Title</label>
                      <input v-model="content.vision.motivationTitle" type="text" class="form-control"
                             placeholder="What Drives Us">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Motivation Image</label>
                      <div v-if="content.vision.motivationImage" class="mb-2">
                        <img :src="getImageUrl(content.vision.motivationImage)"
                             alt="Current Motivation Image"
                             style="max-height: 100px; max-width: 200px; object-fit: cover; border-radius: 8px;">
                        <button type="button" class="btn btn-sm btn-danger ms-2" @click="removeVisionImage">
                          <i class="fas fa-trash"></i> Remove
                        </button>
                      </div>
                      <input type="file" class="form-control" @change="handleVisionImageUpload"
                             accept="image/*" :disabled="isUploading">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Motivation Content</label>
                      <div class="toolbar mb-2">
                        <button type="button" @click="formatVisionText('motivation', 'bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatVisionText('motivation', 'italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatVisionText('motivation', 'underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatVisionText('motivation', 'insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatVisionText('motivation', 'insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertVisionLineBreak('motivation')" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="visionMotivationEditor"
                           @input="updateVisionMotivation"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 120px;"
                           v-html="content.vision.motivation"
                           placeholder="We're motivated by the belief that real estate should be...">
                      </div>
                    </div>

                    <!-- Future Goals Section -->
                    <div class="col-12 mt-4">
                      <h6 class="fw-bold text-primary mb-3">Future Goals Section</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Goals Title</label>
                      <input v-model="content.vision.goalsTitle" type="text" class="form-control"
                             placeholder="Looking Ahead">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Goals Description</label>
                      <input v-model="content.vision.goalsDescription" type="text" class="form-control"
                             placeholder="Our commitment to growth, innovation...">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-bold">Future Goals Content</label>
                      <div class="toolbar mb-2">
                        <button type="button" @click="formatVisionText('futureGoals', 'bold')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-bold"></i>
                        </button>
                        <button type="button" @click="formatVisionText('futureGoals', 'italic')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-italic"></i>
                        </button>
                        <button type="button" @click="formatVisionText('futureGoals', 'underline')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-underline"></i>
                        </button>
                        <button type="button" @click="formatVisionText('futureGoals', 'insertUnorderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button type="button" @click="formatVisionText('futureGoals', 'insertOrderedList')" class="btn btn-sm btn-outline-secondary me-1">
                          <i class="fas fa-list-ol"></i>
                        </button>
                        <button type="button" @click="insertVisionLineBreak('futureGoals')" class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-level-down-alt"></i> BR
                        </button>
                      </div>
                      <div ref="visionFutureGoalsEditor"
                           @input="updateVisionFutureGoals"
                           contenteditable="true"
                           class="bio-editor form-control"
                           style="min-height: 120px;"
                           v-html="content.vision.futureGoals"
                           placeholder="Our vision extends beyond today's transactions...">
                      </div>
                    </div>

                    <!-- Call to Action Section -->
                    <div class="col-12 mt-4">
                      <h6 class="fw-bold text-primary mb-3">Call to Action Section</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">CTA Title</label>
                      <input v-model="content.vision.ctaTitle" type="text" class="form-control"
                             placeholder="Join Our Vision">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">CTA Description</label>
                      <input v-model="content.vision.ctaDescription" type="text" class="form-control"
                             placeholder="Ready to be part of something bigger?">
                    </div>

                    <!-- City Images Section -->
                    <div class="col-12">
                      <hr class="my-4">
                      <h6 class="fw-bold text-primary mb-3">
                        <i class="fas fa-city me-2"></i>City Images Management
                      </h6>
                    </div>

                    <div class="col-12">
                      <label class="form-label fw-bold">City Images Section Title</label>
                      <input v-model="content.vision.cityImagesTitle" type="text" class="form-control"
                             placeholder="Communities We Serve">
                    </div>

                    <div class="col-12">
                      <label class="form-label fw-bold">City Images Section Description</label>
                      <textarea v-model="content.vision.cityImagesDescription" rows="2" class="form-control"
                                placeholder="Discover the vibrant neighborhoods and communities where we're making a difference, one home at a time."></textarea>
                    </div>

                    <div v-for="(cityImage, index) in cityImages" :key="index" class="col-12">
                      <div class="card mb-3">
                        <div class="card-header d-flex justify-content-between align-items-center">
                          <h6 class="mb-0">City {{ index + 1 }}</h6>
                          <button type="button" class="btn btn-sm btn-danger" @click="removeCityImage(index)">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                        <div class="card-body">
                          <div class="row g-3">
                            <div class="col-md-6">
                              <label class="form-label">City Name</label>
                              <input v-model="cityImage.title" type="text" class="form-control" placeholder="City Name">
                            </div>
                            <div class="col-md-6">
                              <label class="form-label">Description</label>
                              <input v-model="cityImage.description" type="text" class="form-control" placeholder="City description">
                            </div>
                            <div class="col-12">
                              <label class="form-label">City Image</label>
                              <div v-if="cityImage.image" class="mb-2">
                                <img :src="cityImage.image" alt="City Image"
                                     style="max-height: 100px; max-width: 200px; object-fit: cover; border-radius: 8px;">
                                <button type="button" class="btn btn-sm btn-danger ms-2" @click="removeCityImageFile(index)">
                                  <i class="fas fa-trash"></i> Remove
                                </button>
                              </div>
                              <input type="file" class="form-control" @change="handleCityImageUpload($event, index)"
                                     accept="image/*" :disabled="isUploading">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="button" class="btn btn-outline-primary" @click="addCityImage">
                        <i class="fas fa-plus me-2"></i>Add City Image
                      </button>
                    </div>

                    <!-- Social Media Section -->
                    <div class="col-12 mt-4">
                      <h6 class="fw-bold text-primary mb-3">Social Media Links</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Section Title</label>
                      <input v-model="content.vision.socialMedia.title" type="text"
                             class="form-control"
                             placeholder="Stay Connected">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Section Subtitle</label>
                      <input v-model="content.vision.socialMedia.subtitle" type="text"
                             class="form-control"
                             placeholder="Follow us on social media for the latest updates...">
                    </div>

                    <!-- Facebook -->
                    <div class="col-12 mt-3">
                      <div class="card border-primary">
                        <div class="card-header bg-primary text-white">
                          <h6 class="mb-0"><i class="fab fa-facebook-f me-2"></i>Facebook</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.vision.socialMedia.facebook.url" type="url"
                                     class="form-control"
                                     placeholder="https://facebook.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.vision.socialMedia.facebook.title" type="text"
                                     class="form-control"
                                     placeholder="Facebook">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.vision.socialMedia.facebook.description" type="text"
                                     class="form-control"
                                     placeholder="Stay updated with our latest property listings...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Instagram -->
                    <div class="col-12 mt-3">
                      <div class="card border-danger">
                        <div class="card-header bg-danger text-white">
                          <h6 class="mb-0"><i class="fab fa-instagram me-2"></i>Instagram</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.vision.socialMedia.instagram.url" type="url"
                                     class="form-control"
                                     placeholder="https://instagram.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.vision.socialMedia.instagram.title" type="text"
                                     class="form-control"
                                     placeholder="Instagram">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.vision.socialMedia.instagram.description" type="text"
                                     class="form-control"
                                     placeholder="See behind-the-scenes content and beautiful property photos...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Twitter -->
                    <div class="col-12 mt-3">
                      <div class="card border-info">
                        <div class="card-header bg-info text-white">
                          <h6 class="mb-0"><i class="fab fa-twitter me-2"></i>Twitter</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.vision.socialMedia.twitter.url" type="url"
                                     class="form-control"
                                     placeholder="https://twitter.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.vision.socialMedia.twitter.title" type="text"
                                     class="form-control"
                                     placeholder="Twitter">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.vision.socialMedia.twitter.description" type="text"
                                     class="form-control"
                                     placeholder="Get real-time updates and market insights...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- TikTok -->
                    <div class="col-12 mt-3">
                      <div class="card border-dark">
                        <div class="card-header bg-dark text-white">
                          <h6 class="mb-0"><i class="fab fa-tiktok me-2"></i>TikTok</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.vision.socialMedia.tiktok.url" type="url"
                                     class="form-control"
                                     placeholder="https://tiktok.com/@makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.vision.socialMedia.tiktok.title" type="text"
                                     class="form-control"
                                     placeholder="TikTok">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.vision.socialMedia.tiktok.description" type="text"
                                     class="form-control"
                                     placeholder="Watch fun property tours and real estate tips...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12 mt-4">
                      <button type="submit" class="btn btn-warm-sunset" :disabled="isUploading">
                        <i class="fas fa-save me-2"></i>Save Vision Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Full-width sections -->
          <div class="row g-3 mb-4">
            <!-- Social Media Sales Section -->
            <div class="col-12">
              <div class="card shadow-sm">
                <div class="card-header bg-info text-white">
                  <h3 class="card-title mb-0"><i class="fab fa-facebook me-2"></i>Social Media - Sales Properties</h3>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveSocialMediaSales" class="row g-3">
                    <!-- Header Section -->
                    <div class="col-12">
                      <h5 class="text-info mb-3">Section Header</h5>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Main Title</label>
                      <input v-model="content.socialMediaSales.title" type="text"
                             class="form-control"
                             placeholder="Connect with Make It Home">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Subtitle</label>
                      <input v-model="content.socialMediaSales.subtitle" type="text"
                             class="form-control"
                             placeholder="Follow us on social media...">
                    </div>

                    <!-- Contact Section -->
                    <div class="col-12 mt-4">
                      <h5 class="text-info mb-3">Contact Information</h5>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Contact Title</label>
                      <input v-model="content.socialMediaSales.contactTitle" type="text"
                             class="form-control"
                             placeholder="Questions about this property?">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Contact Subtitle</label>
                      <input v-model="content.socialMediaSales.contactSubtitle" type="text"
                             class="form-control"
                             placeholder="Our team is here to help...">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-bold">Phone</label>
                      <input v-model="content.socialMediaSales.contactPhone" type="tel"
                             class="form-control"
                             placeholder="(555) 123-4567">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-bold">Email</label>
                      <input v-model="content.socialMediaSales.contactEmail" type="email"
                             class="form-control"
                             placeholder="info@makeithome.com">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-bold">Address</label>
                      <input v-model="content.socialMediaSales.contactAddress" type="text"
                             class="form-control"
                             placeholder="123 Main St, Your City, ST 12345">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">CTA Title</label>
                      <input v-model="content.socialMediaSales.ctaTitle" type="text"
                             class="form-control"
                             placeholder="Ready to get started?">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">CTA Subtitle</label>
                      <input v-model="content.socialMediaSales.ctaSubtitle" type="text"
                             class="form-control"
                             placeholder="We'll help you through the entire process">
                    </div>

                    <!-- Social Media Links -->
                    <div class="col-12 mt-4">
                      <h5 class="text-info mb-3">Social Media Links</h5>
                    </div>

                    <!-- Facebook -->
                    <div class="col-12">
                      <div class="card border-primary">
                        <div class="card-header bg-primary text-white">
                          <h6 class="mb-0"><i class="fab fa-facebook-f me-2"></i>Facebook</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaSales.facebook.url" type="url"
                                     class="form-control"
                                     placeholder="https://facebook.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaSales.facebook.title" type="text"
                                     class="form-control"
                                     placeholder="Facebook">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaSales.facebook.description" type="text"
                                     class="form-control"
                                     placeholder="Stay updated with our latest properties...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Instagram -->
                    <div class="col-12">
                      <div class="card border-danger">
                        <div class="card-header bg-danger text-white">
                          <h6 class="mb-0"><i class="fab fa-instagram me-2"></i>Instagram</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaSales.instagram.url" type="url"
                                     class="form-control"
                                     placeholder="https://instagram.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaSales.instagram.title" type="text"
                                     class="form-control"
                                     placeholder="Instagram">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaSales.instagram.description" type="text"
                                     class="form-control"
                                     placeholder="See beautiful photos of our properties...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Twitter -->
                    <div class="col-12">
                      <div class="card border-info">
                        <div class="card-header bg-info text-white">
                          <h6 class="mb-0"><i class="fab fa-twitter me-2"></i>Twitter</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaSales.twitter.url" type="url"
                                     class="form-control"
                                     placeholder="https://twitter.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaSales.twitter.title" type="text"
                                     class="form-control"
                                     placeholder="Twitter">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaSales.twitter.description" type="text"
                                     class="form-control"
                                     placeholder="Get real-time updates on new listings...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- TikTok -->
                    <div class="col-12">
                      <div class="card border-dark">
                        <div class="card-header bg-dark text-white">
                          <h6 class="mb-0"><i class="fab fa-tiktok me-2"></i>TikTok</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaSales.tiktok.url" type="url"
                                     class="form-control"
                                     placeholder="https://tiktok.com/@makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaSales.tiktok.title" type="text"
                                     class="form-control"
                                     placeholder="TikTok">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaSales.tiktok.description" type="text"
                                     class="form-control"
                                     placeholder="Watch virtual tours and behind-the-scenes...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-info btn-lg">
                        <i class="fas fa-save me-2"></i>Save Social Media Sales Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Social Media Rentals Section -->
            <div class="col-12">
              <div class="card shadow-sm">
                <div class="card-header bg-success text-white">
                  <h3 class="card-title mb-0"><i class="fab fa-facebook me-2"></i>Social Media - Rental Properties</h3>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveSocialMediaRentals" class="row g-3">
                    <!-- Header Section -->
                    <div class="col-12">
                      <h5 class="text-success mb-3">Section Header</h5>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Main Title</label>
                      <input v-model="content.socialMediaRentals.title" type="text"
                             class="form-control"
                             placeholder="Connect with Make It Home">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Subtitle</label>
                      <input v-model="content.socialMediaRentals.subtitle" type="text"
                             class="form-control"
                             placeholder="Follow us on social media...">
                    </div>

                    <!-- Contact Section -->
                    <div class="col-12 mt-4">
                      <h5 class="text-success mb-3">Contact Information</h5>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Contact Title</label>
                      <input v-model="content.socialMediaRentals.contactTitle" type="text"
                             class="form-control"
                             placeholder="Questions about this rental?">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Contact Subtitle</label>
                      <input v-model="content.socialMediaRentals.contactSubtitle" type="text"
                             class="form-control"
                             placeholder="Our team is here to help...">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-bold">Phone</label>
                      <input v-model="content.socialMediaRentals.contactPhone" type="tel"
                             class="form-control"
                             placeholder="(555) 123-4567">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-bold">Email</label>
                      <input v-model="content.socialMediaRentals.contactEmail" type="email"
                             class="form-control"
                             placeholder="rentals@makeithome.com">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-bold">Address</label>
                      <input v-model="content.socialMediaRentals.contactAddress" type="text"
                             class="form-control"
                             placeholder="123 Main St, Your City, ST 12345">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">CTA Title</label>
                      <input v-model="content.socialMediaRentals.ctaTitle" type="text"
                             class="form-control"
                             placeholder="Ready to rent?">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-bold">CTA Subtitle</label>
                      <input v-model="content.socialMediaRentals.ctaSubtitle" type="text"
                             class="form-control"
                             placeholder="We'll help you through the entire rental process">
                    </div>

                    <!-- Social Media Links -->
                    <div class="col-12 mt-4">
                      <h5 class="text-success mb-3">Social Media Links</h5>
                    </div>

                    <!-- Facebook -->
                    <div class="col-12">
                      <div class="card border-primary">
                        <div class="card-header bg-primary text-white">
                          <h6 class="mb-0"><i class="fab fa-facebook-f me-2"></i>Facebook</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaRentals.facebook.url" type="url"
                                     class="form-control"
                                     placeholder="https://facebook.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaRentals.facebook.title" type="text"
                                     class="form-control"
                                     placeholder="Facebook">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaRentals.facebook.description" type="text"
                                     class="form-control"
                                     placeholder="Stay updated with our latest rental properties...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Instagram -->
                    <div class="col-12">
                      <div class="card border-danger">
                        <div class="card-header bg-danger text-white">
                          <h6 class="mb-0"><i class="fab fa-instagram me-2"></i>Instagram</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaRentals.instagram.url" type="url"
                                     class="form-control"
                                     placeholder="https://instagram.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaRentals.instagram.title" type="text"
                                     class="form-control"
                                     placeholder="Instagram">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaRentals.instagram.description" type="text"
                                     class="form-control"
                                     placeholder="See beautiful photos of our rental properties...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Twitter -->
                    <div class="col-12">
                      <div class="card border-info">
                        <div class="card-header bg-info text-white">
                          <h6 class="mb-0"><i class="fab fa-twitter me-2"></i>Twitter</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaRentals.twitter.url" type="url"
                                     class="form-control"
                                     placeholder="https://twitter.com/makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaRentals.twitter.title" type="text"
                                     class="form-control"
                                     placeholder="Twitter">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaRentals.twitter.description" type="text"
                                     class="form-control"
                                     placeholder="Get real-time updates on new rental listings...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- TikTok -->
                    <div class="col-12">
                      <div class="card border-dark">
                        <div class="card-header bg-dark text-white">
                          <h6 class="mb-0"><i class="fab fa-tiktok me-2"></i>TikTok</h6>
                        </div>
                        <div class="card-body">
                          <div class="row g-2">
                            <div class="col-md-4">
                              <label class="form-label">URL</label>
                              <input v-model="content.socialMediaRentals.tiktok.url" type="url"
                                     class="form-control"
                                     placeholder="https://tiktok.com/@makeithome">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Title</label>
                              <input v-model="content.socialMediaRentals.tiktok.title" type="text"
                                     class="form-control"
                                     placeholder="TikTok">
                            </div>
                            <div class="col-md-4">
                              <label class="form-label">Description</label>
                              <input v-model="content.socialMediaRentals.tiktok.description" type="text"
                                     class="form-control"
                                     placeholder="Watch virtual tours and behind-the-scenes...">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-success btn-lg">
                        <i class="fas fa-save me-2"></i>Save Social Media Rentals Content
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Disclosure Statements Section -->
            <div class="col-12">
              <div class="card shadow-sm">
                <div class="card-header bg-warning text-dark">
                  <h3 class="card-title mb-0"><i class="fas fa-exclamation-triangle me-2"></i>Disclosure Statements</h3>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveDisclosures" class="row g-3">
                    <div class="col-12">
                      <p class="text-muted">These disclosure statements appear under the contact and showing request buttons on property detail pages.</p>
                    </div>

                    <div class="col-12">
                      <label class="form-label fw-bold">Contact Agent Disclosure</label>
                      <textarea v-model="content.disclosures.contactAgent"
                                rows="3"
                                class="form-control"
                                placeholder="Enter disclosure text for contact agent form..."></textarea>
                      <small class="form-text text-muted">This appears under the "Send Message" button in the Contact Agent form.</small>
                    </div>

                    <div class="col-12">
                      <label class="form-label fw-bold">Request Showing Disclosure</label>
                      <textarea v-model="content.disclosures.requestShowing"
                                rows="3"
                                class="form-control"
                                placeholder="Enter disclosure text for showing request form..."></textarea>
                      <small class="form-text text-muted">This appears under the "Request Showing" button in the Schedule Tour form.</small>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-warning btn-lg">
                        <i class="fas fa-save me-2"></i>Save Disclosure Statements
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- End Content Sections Grid -->
        </div>
        <!-- End col-12 -->
      </div>
      <!-- End row justify-content-center -->
    </div>
    <!-- End container-fluid -->

    <!-- Team Member Modal -->
    <div v-if="showAddTeamMember || editingTeamMember !== null" class="modal d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingTeamMember !== null ? 'Edit Team Member' : 'Add Team Member' }}</h5>
            <button @click="closeTeamMemberForm" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveTeamMember" class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Name <span class="text-danger">*</span></label>
                <input v-model="teamMemberForm.name" type="text" class="form-control" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">Title <span class="text-danger">*</span></label>
                <input v-model="teamMemberForm.title" type="text" class="form-control" required>
              </div>
              <div class="col-12">
                <label class="form-label">Bio</label>
                <div class="mb-2">
                  <div class="btn-toolbar mb-2" role="toolbar">
                    <div class="btn-group btn-group-sm me-2" role="group">
                      <button @click="formatText('bold')" type="button" class="btn btn-outline-secondary">
                        <i class="fas fa-bold"></i>
                      </button>
                      <button @click="formatText('italic')" type="button" class="btn btn-outline-secondary">
                        <i class="fas fa-italic"></i>
                      </button>
                      <button @click="formatText('underline')" type="button" class="btn btn-outline-secondary">
                        <i class="fas fa-underline"></i>
                      </button>
                    </div>
                    <div class="btn-group btn-group-sm me-2" role="group">
                      <button @click="formatText('insertUnorderedList')" type="button" class="btn btn-outline-secondary">
                        <i class="fas fa-list-ul"></i>
                      </button>
                      <button @click="formatText('insertOrderedList')" type="button" class="btn btn-outline-secondary">
                        <i class="fas fa-list-ol"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div ref="bioEditor" 
                     @input="updateBio" 
                     contenteditable="true" 
                     class="form-control bio-editor" 
                     style="min-height: 120px; max-height: 200px; overflow-y: auto;"
                     v-html="teamMemberForm.bio">
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input v-model="teamMemberForm.email" type="email" class="form-control">
              </div>
              <div class="col-md-6">
                <label class="form-label">Phone</label>
                <input v-model="teamMemberForm.phone" type="tel" class="form-control">
              </div>
              <div class="col-12">
                <label class="form-label">LinkedIn Profile</label>
                <input v-model="teamMemberForm.linkedin" type="url" class="form-control" placeholder="https://linkedin.com/in/username">
              </div>
              <div class="col-12">
                <label class="form-label">Specialties</label>
                <div class="mb-2">
                  <div class="input-group">
                    <input v-model="newSpecialty" @keyup.enter="addSpecialty" type="text" class="form-control" placeholder="Enter a specialty (e.g., First-time Buyers, Luxury Homes)">
                    <button @click="addSpecialty" type="button" class="btn btn-outline-primary">
                      <i class="fas fa-plus"></i> Add
                    </button>
                  </div>
                </div>
                <div v-if="teamMemberForm.specialties && teamMemberForm.specialties.length > 0" class="mb-2">
                  <span v-for="(specialty, index) in teamMemberForm.specialties" :key="index"
                        class="badge bg-primary me-2 mb-2 d-inline-flex align-items-center">
                    {{ specialty }}
                    <button @click="removeSpecialty(index)" type="button" class="btn-close btn-close-white ms-2" style="font-size: 0.7em;"></button>
                  </span>
                </div>
                <small class="text-muted">Add specialties that highlight this team member's expertise (e.g., First-time Buyers, Investment Properties, Commercial Real Estate)</small>
              </div>
              <div class="col-12">
                <label class="form-label">Photo</label>
                <div class="mb-3">
                  <input @change="handleTeamPhotoUpload" type="file" accept="image/*" class="form-control">
                </div>
                <div v-if="teamMemberForm.photo" class="mb-3">
                  <img :src="getImageUrl(teamMemberForm.photo)" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                  <div class="mt-2">
                    <button @click="removeTeamPhoto" type="button" class="btn btn-sm btn-outline-danger me-2">
                      <i class="fas fa-trash"></i> Remove Photo
                    </button>
                    <button @click="$refs.teamPhotoInput.click()" type="button" class="btn btn-sm btn-outline-primary">
                      <i class="fas fa-camera"></i> Replace Photo
                    </button>
                  </div>
                </div>
                <input ref="teamPhotoInput" @change="handleTeamPhotoUpload" type="file" accept="image/*" class="d-none">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="closeTeamMemberForm" class="btn btn-secondary">Cancel</button>
            <button @click="saveTeamMember" class="btn btn-primary">Save Team Member</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Popup -->
    <div v-if="showPopup" class="popup-overlay" @click="showPopup = false">
      <div class="popup-content" :class="popupType" @click.stop>
        <div class="popup-icon">
          <i v-if="popupType === 'success'" class="fas fa-check-circle"></i>
          <i v-else class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="popup-message">{{ popupMessage }}</div>
        <button @click="showPopup = false" class="popup-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue'
import axios from 'axios'

export default {
  name: 'AdminContent',
  components: {
    AdminNavbar
  },
  data() {
    return {
      content: {
        hero: {
          title: '',
          subtitle: '',
          backgroundImage: '',
          foregroundImage: '',
          companyImage: '',
          galleryImages: []
        },
        propertiesBanner: {
          text: ''
        },
        rentalsBanner: {
          text: ''
        },
        preferredBiddersBanner: {
          title: '',
          description: ''
        },
        about: {
          storyTitle: 'Our Story',
          story: 'At Make It Home, we believe that finding the right property is just the beginning...',
          mission: 'We flip homes with intention, creating spaces people want to live in...',
          storyFontSize: 'fs-4'
        },
        aboutUs: {
          missionImage: ''
        },
        leadership: {
          logo: ''
        },
        values: {
          title: 'Our Values',
          description: 'These core values guide everything we do at Make It Home LLC.',
          valuesList: []
        },
        team: [],
        footer: {
          phone: '',
          email: '',
          chrisEmail: '',
          address: '',
          officeHours: '',
          socialMedia: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
          }
        },
        socialMediaSales: {
          title: 'Connect with Make It Home',
          subtitle: 'Follow us on social media for the latest property listings and real estate updates',
          contactTitle: 'Questions about this property?',
          contactSubtitle: 'Our team is here to help you with all your real estate needs.',
          contactPhone: '(555) 123-4567',
          contactEmail: 'info@makeithome.com',
          contactAddress: '123 Main St, Your City, ST 12345',
          ctaTitle: 'Ready to get started?',
          ctaSubtitle: "We'll help you through the entire process",
          facebook: {
            url: 'https://facebook.com/makeithome',
            title: 'Facebook',
            description: 'Stay updated with our latest properties and community news.'
          },
          instagram: {
            url: 'https://instagram.com/makeithome',
            title: 'Instagram',
            description: 'See beautiful photos of our properties and get inspired.'
          },
          twitter: {
            url: 'https://twitter.com/makeithome',
            title: 'Twitter',
            description: 'Get real-time updates on new listings and market insights.'
          },
          tiktok: {
            url: 'https://tiktok.com/@makeithome',
            title: 'TikTok',
            description: 'Watch virtual tours and behind-the-scenes content of our properties.'
          }
        },
        socialMediaRentals: {
          title: 'Connect with Make It Home',
          subtitle: 'Follow us on social media for the latest rental listings and updates',
          contactTitle: 'Questions about this rental?',
          contactSubtitle: 'Our team is here to help you find the perfect rental property.',
          contactPhone: '(555) 123-4567',
          contactEmail: 'rentals@makeithome.com',
          contactAddress: '123 Main St, Your City, ST 12345',
          ctaTitle: 'Ready to rent?',
          ctaSubtitle: "We'll help you through the entire rental process",
          facebook: {
            url: 'https://facebook.com/makeithome',
            title: 'Facebook',
            description: 'Stay updated with our latest rental properties and community news.'
          },
          instagram: {
            url: 'https://instagram.com/makeithome',
            title: 'Instagram',
            description: 'See beautiful photos of our rental properties and get inspired.'
          },
          twitter: {
            url: 'https://twitter.com/makeithome',
            title: 'Twitter',
            description: 'Get real-time updates on new rental listings and market insights.'
          },
          tiktok: {
            url: 'https://tiktok.com/@makeithome',
            title: 'TikTok',
            description: 'Watch virtual tours and behind-the-scenes content of our properties.'
          }
        },
        disclosures: {
          contactAgent: 'By submitting this form, you consent to receive marketing communications from Make It Home. Message and data rates may apply.',
          requestShowing: 'By requesting a showing, you agree to our terms of service and privacy policy. We will contact you to confirm your appointment.'
        },
        sellToUs: {
          benefitsMedia: ''
        },
        vision: {
          heroSubtitle: '',
          mainTitle: '',
          statement: '',
          visionImage1: '',
          visionImage2: '',
          motivationTitle: '',
          motivation: '',
          motivationImage: '',
          goalsTitle: '',
          goalsDescription: '',
          futureGoals: '',
          ctaTitle: '',
          ctaDescription: '',
          socialMedia: {
            title: 'Stay Connected',
            subtitle: 'Follow us on social media for the latest updates, property listings, and community news.',
            facebook: {
              url: 'https://facebook.com/makeithome',
              title: 'Facebook',
              description: 'Stay updated with our latest property listings and community news.'
            },
            instagram: {
              url: 'https://instagram.com/makeithome',
              title: 'Instagram',
              description: 'See behind-the-scenes content and beautiful property photos.'
            },
            twitter: {
              url: 'https://twitter.com/makeithome',
              title: 'Twitter',
              description: 'Get real-time updates and market insights from our team.'
            },
            tiktok: {
              url: 'https://tiktok.com/@makeithome',
              title: 'TikTok',
              description: 'Watch fun property tours and real estate tips.'
            }
          }
        },
        contact: {
          phone: '',
          phoneDescription: 'Ready to talk? Give us a call',
          email: '',
          emailDescription: 'Send us your questions',
          address: '',
          locationDescription: 'Visit our office',
          googleMapsLink: ''
        }
      },
      cityImages: [
        {
          title: 'Omaha',
          description: 'Serving the heart of Nebraska with quality homes and exceptional service.',
          image: ''
        },
        {
          title: 'Bellevue',
          description: 'Building communities in this growing suburban area.',
          image: ''
        }
      ],
      showAddTeamMember: false,
      editingTeamMember: null,
      teamMemberForm: {
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        photo: '',
        linkedin: '',
        specialties: []
      },
      newSpecialty: '',
      saving: false,
      searchQuery: '',
      activeFilter: 'all',
      expandedSections: {
        hero: false,
        about: false,
        aboutUs: false,
        leadership: false,
        values: false,
        propertiesBanner: false,
        rentalsBanner: false,
        preferredBiddersBanner: false,
        team: false,
        footer: false,
        contact: false,
        sellToUs: false,
        vision: false
      },
      showPopup: false,
      popupMessage: '',
      popupType: 'success', // 'success' or 'error'
      isUploading: false
    }
  },
  async mounted() {
    // Ensure auth header is set
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    await this.loadContent()
  },
  methods: {
    async loadContent() {
      try {
        console.log('=== ADMIN CONTENT DEBUG ===')
        console.log('Auth token:', sessionStorage.getItem('adminToken'))
        
        const response = await axios.get('/api/admin/content')
        console.log('Content response:', response.data)
        
        this.content = {
          hero: response.data.hero || {
            title: '',
            subtitle: '',
            backgroundImage: '',
            foregroundImage: '',
            companyImage: ''
          },
          about: response.data.about || {
            storyTitle: 'Our Story',
            story: '',
            mission: '',
            storyFontSize: 'fs-4'
          },
          aboutUs: response.data.aboutUs || {
            missionImage: ''
          },
          leadership: response.data.leadership || {
            logo: ''
          },
          values: response.data.values || {
            title: 'Our Values',
            description: '',
            valuesList: []
          },
          team: response.data.team || [],
          footer: response.data.footer || {},
          socialMediaSales: response.data.socialMediaSales || this.content.socialMediaSales,
          socialMediaRentals: response.data.socialMediaRentals || this.content.socialMediaRentals,
          disclosures: response.data.disclosures || this.content.disclosures,
          contact: response.data.contact || {
            phone: '',
            phoneDescription: 'Ready to talk? Give us a call',
            email: '',
            emailDescription: 'Send us your questions',
            address: '',
            locationDescription: 'Visit our office',
            googleMapsLink: ''
          },
          propertiesBanner: response.data.propertiesBanner || {
            text: ''
          },
          rentalsBanner: response.data.rentalsBanner || {
            text: ''
          },
          preferredBiddersBanner: response.data.preferredBiddersBanner || {
            title: 'Preferred Bidders List',
            description: `Let's Make It Home: One Flip, One Crew, One Win at a Time.<br>
                         Bring your skills. Bring your hustle. Join our Preferred Bidders List and build with us.<br><br>
                         At Make It Home, we believe great projects start with great partners. If you'd like to be considered for our Preferred Bidders List, please complete the form below. To keep the process clear and consistent, we only accept submissions here. Once we've reviewed your information, our team will follow up within 10 business days with next steps.`
          },
          sellToUs: response.data.sellToUs || {
            benefitsMedia: ''
          },
          vision: response.data.vision || {
            heroSubtitle: '',
            mainTitle: '',
            statement: '',
            visionImage1: '',
            visionImage2: '',
            motivationTitle: '',
            motivation: '',
            motivationImage: '',
            goalsTitle: '',
            goalsDescription: '',
            futureGoals: '',
            ctaTitle: '',
            ctaDescription: '',
            cityImagesTitle: '',
            cityImagesDescription: '',
            socialMedia: {
              title: 'Stay Connected',
              subtitle: 'Follow us on social media for the latest updates, property listings, and community news.',
              facebook: {
                url: 'https://facebook.com/makeithome',
                title: 'Facebook',
                description: 'Stay updated with our latest property listings and community news.'
              },
              instagram: {
                url: 'https://instagram.com/makeithome',
                title: 'Instagram',
                description: 'See behind-the-scenes content and beautiful property photos.'
              },
              twitter: {
                url: 'https://twitter.com/makeithome',
                title: 'Twitter',
                description: 'Get real-time updates and market insights from our team.'
              },
              tiktok: {
                url: 'https://tiktok.com/@makeithome',
                title: 'TikTok',
                description: 'Watch fun property tours and real estate tips.'
              }
            }
          }
        }

        // Load city images if they exist
        if (response.data.vision && response.data.vision.cityImages) {
          this.cityImages = response.data.vision.cityImages
        }

        console.log('Final content loaded:', this.content)
      } catch (error) {
        console.error('Error loading content:', error)
        console.error('Error response:', error.response)
      }
    },
    async saveHeroContent() {
      try {
        await axios.put('/api/admin/content/hero', this.content.hero)
        alert('Hero content saved successfully!')
      } catch (error) {
        console.error('Error saving hero content:', error)
        alert('Error saving content. Please try again.')
      }
    },
    async saveAboutContent() {
      try {
        await axios.put('/api/admin/content/about', this.content.about)
        alert('About content saved successfully!')
      } catch (error) {
        console.error('Error saving about content:', error)
        alert('Error saving content. Please try again.')
      }
    },
    async saveAboutUsContent() {
      try {
        this.saving = true
        await axios.put('/api/admin/content/about-us', this.content.aboutUs)
        this.showSuccessPopup('About Us content saved successfully!')
      } catch (error) {
        console.error('Error saving About Us content:', error)
        this.showErrorPopup('Error saving About Us content. Please try again.')
      } finally {
        this.saving = false
      }
    },
    async handleMissionImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('missionImage', file)

          const response = await axios.post('/api/admin/content/upload-mission-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Ensure aboutUs object exists
          if (!this.content.aboutUs) {
            this.content.aboutUs = {}
          }

          this.content.aboutUs.missionImage = response.data.imageUrl
          this.showSuccessPopup('Mission image uploaded successfully!')
        } catch (error) {
          console.error('Error uploading mission image:', error)
          this.showErrorPopup('Error uploading image. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = '' // Clear the input
        }
      }
    },
    removeMissionImage() {
      if (confirm('Are you sure you want to remove the mission image?')) {
        this.content.aboutUs.missionImage = ''
        this.showSuccessPopup('Mission image removed. Remember to save changes.')
      }
    },
    async saveLeadershipContent() {
      try {
        this.saving = true
        await axios.put('/api/admin/content/leadership', this.content.leadership)
        this.showSuccessPopup('Leadership content saved successfully!')
      } catch (error) {
        console.error('Error saving Leadership content:', error)
        this.showErrorPopup('Error saving Leadership content. Please try again.')
      } finally {
        this.saving = false
      }
    },
    async handleLeadershipLogoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('leadershipLogo', file)

          const response = await axios.post('/api/admin/content/upload-leadership-logo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Ensure leadership object exists
          if (!this.content.leadership) {
            this.content.leadership = {}
          }

          this.content.leadership.logo = response.data.imageUrl
          this.showSuccessPopup('Leadership logo uploaded successfully!')
        } catch (error) {
          console.error('Error uploading leadership logo:', error)
          this.showErrorPopup('Error uploading logo. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = '' // Clear the input
        }
      }
    },
    removeLeadershipLogo() {
      if (confirm('Are you sure you want to remove the leadership logo?')) {
        this.content.leadership.logo = ''
        this.showSuccessPopup('Leadership logo removed. Remember to save changes.')
      }
    },
    async saveFooterContent() {
      try {
        await axios.put('/api/admin/content/footer', this.content.footer)
        this.showSuccessPopup('Footer content saved successfully!')
      } catch (error) {
        console.error('Error saving footer content:', error)
        this.showErrorPopup('Error saving footer content. Please try again.')
      }
    },
    async saveContactContent() {
      try {
        await axios.put('/api/admin/content/contact', {
          contact: this.content.contact
        })
        alert('Contact content saved successfully!')
      } catch (error) {
        console.error('Error saving contact content:', error)
        alert('Error saving contact content')
      }
    },
    async saveSocialMediaSales() {
      try {
        await axios.put('/api/admin/content/social-media-sales', this.content.socialMediaSales)
        alert('Social Media Sales content saved successfully!')
      } catch (error) {
        console.error('Error saving social media sales content:', error)
        alert('Error saving content. Please try again.')
      }
    },
    async saveSocialMediaRentals() {
      try {
        await axios.put('/api/admin/content/social-media-rentals', this.content.socialMediaRentals)
        alert('Social Media Rentals content saved successfully!')
      } catch (error) {
        console.error('Error saving social media rentals content:', error)
        alert('Error saving content. Please try again.')
      }
    },
    async saveDisclosures() {
      try {
        await axios.put('/api/admin/content/disclosures', this.content.disclosures)
        alert('Disclosure statements saved successfully!')
      } catch (error) {
        console.error('Error saving disclosure statements:', error)
        alert('Error saving disclosure statements. Please try again.')
      }
    },
    async saveSellToUsContent() {
      try {
        await axios.put('/api/admin/content/sell-to-us', this.content.sellToUs)
        this.showSuccessPopup('Sell To Us content saved successfully!')
      } catch (error) {
        console.error('Error saving Sell To Us content:', error)
        alert('Error saving content. Please try again.')
      }
    },
    async handleBenefitsMediaUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('benefitsMedia', file)

          const response = await axios.post('/api/admin/content/upload-benefits-media', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Ensure sellToUs object exists
          if (!this.content.sellToUs) {
            this.content.sellToUs = {}
          }

          this.content.sellToUs.benefitsMedia = response.data.mediaUrl
          this.showSuccessPopup('Media uploaded successfully!')
        } catch (error) {
          console.error('Error uploading benefits media:', error)
          alert('Error uploading media. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = '' // Clear the input
        }
      }
    },
    removeBenefitsMedia() {
      if (confirm('Are you sure you want to remove this media?')) {
        // Ensure sellToUs object exists
        if (!this.content.sellToUs) {
          this.content.sellToUs = {}
        }
        this.content.sellToUs.benefitsMedia = ''
      }
    },
    async saveVisionContent() {
      try {
        // Include city images in the vision content
        const visionData = {
          ...this.content.vision,
          cityImages: this.cityImages
        }
        await axios.put('/api/admin/content/vision', visionData)
        this.showSuccessPopup('Vision content saved successfully!')
      } catch (error) {
        console.error('Error saving vision content:', error)
        alert('Error saving content. Please try again.')
      }
    },
    async handleVisionImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('visionImage', file)

          const response = await axios.post('/api/admin/content/upload-vision-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Ensure vision object exists
          if (!this.content.vision) {
            this.content.vision = {}
          }

          this.content.vision.motivationImage = response.data.imageUrl
          this.showSuccessPopup('Vision image uploaded successfully!')
        } catch (error) {
          console.error('Error uploading vision image:', error)
          alert('Error uploading image. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = '' // Clear the input
        }
      }
    },
    removeVisionImage() {
      if (confirm('Are you sure you want to remove this image?')) {
        // Ensure vision object exists
        if (!this.content.vision) {
          this.content.vision = {}
        }
        this.content.vision.motivationImage = ''
      }
    },
    async handleVisionImage1Upload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('visionImage1', file)

          const response = await axios.post('/api/admin/content/upload-vision-image1', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Ensure vision object exists
          if (!this.content.vision) {
            this.content.vision = {}
          }

          this.content.vision.visionImage1 = response.data.imageUrl
          this.showSuccessPopup('Vision Image 1 uploaded successfully!')
        } catch (error) {
          console.error('Error uploading vision image 1:', error)
          alert('Error uploading image. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = '' // Clear the input
        }
      }
    },
    async handleVisionImage2Upload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('visionImage2', file)

          const response = await axios.post('/api/admin/content/upload-vision-image2', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Ensure vision object exists
          if (!this.content.vision) {
            this.content.vision = {}
          }

          this.content.vision.visionImage2 = response.data.imageUrl
          this.showSuccessPopup('Vision Image 2 uploaded successfully!')
        } catch (error) {
          console.error('Error uploading vision image 2:', error)
          alert('Error uploading image. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = '' // Clear the input
        }
      }
    },
    removeVisionImage1() {
      if (confirm('Are you sure you want to remove Vision Image 1?')) {
        // Ensure vision object exists
        if (!this.content.vision) {
          this.content.vision = {}
        }
        this.content.vision.visionImage1 = ''
      }
    },
    removeVisionImage2() {
      if (confirm('Are you sure you want to remove Vision Image 2?')) {
        // Ensure vision object exists
        if (!this.content.vision) {
          this.content.vision = {}
        }
        this.content.vision.visionImage2 = ''
      }
    },
    formatVisionText(field, command) {
      const editorRef = `vision${field.charAt(0).toUpperCase() + field.slice(1)}Editor`
      document.execCommand(command, false, null)
      this.$refs[editorRef].focus()
    },
    insertVisionLineBreak(field) {
      const editorRef = `vision${field.charAt(0).toUpperCase() + field.slice(1)}Editor`
      document.execCommand('insertHTML', false, '<br>')
      this.$refs[editorRef].focus()
    },
    updateVisionStatement() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.visionStatementEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the content
      const newContent = this.$refs.visionStatementEditor.innerHTML
      if (this.content.vision.statement !== newContent) {
        this.content.vision.statement = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.visionStatementEditor, cursorPosition)
          }
        })
      }
    },
    updateVisionMotivation() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.visionMotivationEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the content
      const newContent = this.$refs.visionMotivationEditor.innerHTML
      if (this.content.vision.motivation !== newContent) {
        this.content.vision.motivation = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.visionMotivationEditor, cursorPosition)
          }
        })
      }
    },
    updateVisionFutureGoals() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.visionFutureGoalsEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the content
      const newContent = this.$refs.visionFutureGoalsEditor.innerHTML
      if (this.content.vision.futureGoals !== newContent) {
        this.content.vision.futureGoals = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.visionFutureGoalsEditor, cursorPosition)
          }
        })
      }
    },
    formatAboutText(field, command) {
      const editorRef = `about${field.charAt(0).toUpperCase() + field.slice(1)}Editor`
      document.execCommand(command, false, null)
      this.$refs[editorRef].focus()
    },
    insertAboutLineBreak(field) {
      const editorRef = `about${field.charAt(0).toUpperCase() + field.slice(1)}Editor`
      document.execCommand('insertHTML', false, '<br>')
      this.$refs[editorRef].focus()
    },
    updateAboutStory() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.aboutStoryEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the content
      const newContent = this.$refs.aboutStoryEditor.innerHTML
      if (this.content.about.story !== newContent) {
        this.content.about.story = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.aboutStoryEditor, cursorPosition)
          }
        })
      }
    },
    updateAboutMission() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.aboutMissionEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the content
      const newContent = this.$refs.aboutMissionEditor.innerHTML
      if (this.content.about.mission !== newContent) {
        this.content.about.mission = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.aboutMissionEditor, cursorPosition)
          }
        })
      }
    },
    formatValuesText(field, command) {
      const editorRef = `values${field.charAt(0).toUpperCase() + field.slice(1)}Editor`
      document.execCommand(command, false, null)
      this.$refs[editorRef].focus()
    },
    insertValuesLineBreak(field) {
      const editorRef = `values${field.charAt(0).toUpperCase() + field.slice(1)}Editor`
      document.execCommand('insertHTML', false, '<br>')
      this.$refs[editorRef].focus()
    },
    updateValuesDescription() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.valuesDescriptionEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the content
      const newContent = this.$refs.valuesDescriptionEditor.innerHTML
      if (this.content.values.description !== newContent) {
        this.content.values.description = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.valuesDescriptionEditor, cursorPosition)
          }
        })
      }
    },
    addCityImage() {
      this.cityImages.push({
        title: '',
        description: '',
        image: ''
      })
    },
    removeCityImage(index) {
      if (confirm('Are you sure you want to remove this city image?')) {
        this.cityImages.splice(index, 1)
      }
    },
    removeCityImageFile(index) {
      if (confirm('Are you sure you want to remove this image?')) {
        this.cityImages[index].image = ''
      }
    },
    async handleCityImageUpload(event, index) {
      const file = event.target.files[0]
      if (file) {
        try {
          this.isUploading = true
          const formData = new FormData()
          formData.append('cityImage', file)

          const response = await axios.post('/api/admin/upload/city-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          this.cityImages[index].image = response.data.imageUrl
          this.showSuccessPopup('City image uploaded successfully!')
        } catch (error) {
          console.error('Error uploading city image:', error)
          alert('Error uploading image. Please try again.')
        } finally {
          this.isUploading = false
          event.target.value = ''
        }
      }
    },
    editTeamMember(index) {
      this.editingTeamMember = index
      const member = this.content.team[index]
      
      this.teamMemberForm = {
        name: member.name || '',
        title: member.title || '',
        bio: member.bio || '',
        email: member.email || '',
        phone: member.phone || '',
        photo: member.photo || '',
        linkedin: member.linkedin || '',
        specialties: member.specialties ? [...member.specialties] : []
      }
      
      this.showAddTeamMember = true
      
      // Set bio content after modal is shown
      this.$nextTick(() => {
        if (this.$refs.bioEditor) {
          this.$refs.bioEditor.innerHTML = member.bio || ''
        }
      })
    },
    removeTeamMember(index) {
      if (confirm('Are you sure you want to remove this team member?')) {
        this.content.team.splice(index, 1)
        this.saveTeamContent()
      }
    },
    saveTeamMember() {
      // Validate required fields
      if (!this.teamMemberForm.name || !this.teamMemberForm.name.trim()) {
        alert('Name is required!')
        return
      }
      
      if (!this.teamMemberForm.title || !this.teamMemberForm.title.trim()) {
        alert('Title is required!')
        return
      }

      // Create clean team member object with all required fields
      const teamMember = {
        name: this.teamMemberForm.name.trim(),
        title: this.teamMemberForm.title.trim(),
        bio: this.teamMemberForm.bio || '',
        email: this.teamMemberForm.email || '',
        phone: this.teamMemberForm.phone || '',
        photo: this.teamMemberForm.photo || '',
        linkedin: this.teamMemberForm.linkedin || '',
        specialties: this.teamMemberForm.specialties || []
      }

      if (this.editingTeamMember !== null) {
        this.content.team[this.editingTeamMember] = teamMember
      } else {
        this.content.team.push(teamMember)
      }
      
      this.closeTeamMemberForm()
      this.saveTeamContent()
    },
    closeTeamMemberForm() {
      this.showAddTeamMember = false
      this.editingTeamMember = null
      this.teamMemberForm = {
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        photo: '',
        linkedin: '',
        specialties: []
      }
      this.newSpecialty = ''
    },
    async saveTeamContent() {
      try {
        // Filter out any invalid team members before saving
        const validTeamMembers = this.content.team.filter(member => 
          member.name && member.name.trim() && member.title && member.title.trim()
        )
        
        console.log('Saving team content:', validTeamMembers)
        const response = await axios.put('/api/admin/content/team', { 
          team: validTeamMembers 
        })
        console.log('Team save response:', response.data)
        
        // Update local content with the validated data
        this.content.team = validTeamMembers
        
        alert('Team content saved successfully!')
      } catch (error) {
        console.error('Error saving team content:', error)
        console.error('Error details:', error.response?.data)
        alert(`Error saving content: ${error.response?.data?.message || error.message}`)
      }
    },
    async handleHeroBackgroundUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          const formData = new FormData()
          formData.append('heroBackground', file)
          
          const response = await axios.post('/api/admin/content/upload-hero-background', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          
          this.content.hero.backgroundImage = response.data.imageUrl
        } catch (error) {
          console.error('Error uploading background image:', error)
          alert('Error uploading image. Please try again.')
        }
      }
    },
    
    async handleHeroForegroundUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          const formData = new FormData()
          formData.append('heroForeground', file)
          
          const response = await axios.post('/api/admin/content/upload-hero-foreground', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          
          this.content.hero.foregroundImage = response.data.imageUrl
        } catch (error) {
          console.error('Error uploading foreground image:', error)
          alert('Error uploading image. Please try again.')
        }
      }
    },
    
    getImageUrl(imagePath) {
      if (!imagePath) return '/placeholder-home.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return `http://localhost:5000${imagePath}`
    },
    async handleTeamPhotoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          const formData = new FormData()
          formData.append('photo', file)
          
          const response = await axios.post('/api/admin/content/team/upload-photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          
          this.teamMemberForm.photo = response.data.photoUrl
        } catch (error) {
          console.error('Error uploading team photo:', error)
          alert('Error uploading photo. Please try again.')
        }
      }
    },
    removeTeamPhoto() {
      this.teamMemberForm.photo = ''
    },
    formatText(command) {
      document.execCommand(command, false, null)
      this.$refs.bioEditor.focus()
    },
    updateBio() {
      // Save cursor position
      const selection = window.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
      let cursorPosition = null

      if (range) {
        // Create a temporary range to calculate cursor position
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(this.$refs.bioEditor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPosition = preCaretRange.toString().length
      }

      // Update the bio content
      const newContent = this.$refs.bioEditor.innerHTML
      if (this.teamMemberForm.bio !== newContent) {
        this.teamMemberForm.bio = newContent

        // Restore cursor position after Vue updates the DOM
        this.$nextTick(() => {
          if (cursorPosition !== null) {
            this.setCursorPosition(this.$refs.bioEditor, cursorPosition)
          }
        })
      }
    },
    setCursorPosition(element, position) {
      try {
        const range = document.createRange()
        const selection = window.getSelection()

        let currentPosition = 0
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        )

        let node
        while (node = walker.nextNode()) {
          const nodeLength = node.textContent.length
          if (currentPosition + nodeLength >= position) {
            range.setStart(node, position - currentPosition)
            range.setEnd(node, position - currentPosition)
            break
          }
          currentPosition += nodeLength
        }

        selection.removeAllRanges()
        selection.addRange(range)
      } catch (error) {
        // Fallback: just focus the element
        element.focus()
      }
    },
    addSpecialty() {
      if (this.newSpecialty && this.newSpecialty.trim()) {
        const specialty = this.newSpecialty.trim()
        if (!this.teamMemberForm.specialties.includes(specialty)) {
          this.teamMemberForm.specialties.push(specialty)
          this.newSpecialty = ''
        }
      }
    },
    removeSpecialty(index) {
      this.teamMemberForm.specialties.splice(index, 1)
    },
    formatBannerText(command) {
      document.execCommand(command, false, null)
      this.$refs.bannerEditor.focus()
    },
    updateBannerDescription() {
      this.content.preferredBiddersBanner.description = this.$refs.bannerEditor.innerHTML
    },
    insertBannerLineBreak() {
      document.execCommand('insertHTML', false, '<br>')
      this.$refs.bannerEditor.focus()
    },

    // Section Toggle Method
    toggleSection(sectionName) {
      this.expandedSections[sectionName] = !this.expandedSections[sectionName]
    },

    // Search and Filter Methods
    filterSections() {
      const sections = document.querySelectorAll('.content-section')
      const query = this.searchQuery.toLowerCase()

      sections.forEach(section => {
        const keywords = section.dataset.keywords.toLowerCase()
        const title = section.querySelector('.card-title').textContent.toLowerCase()

        if (keywords.includes(query) || title.includes(query) || query === '') {
          section.style.display = 'block'
        } else {
          section.style.display = 'none'
        }
      })
    },

    showAllSections() {
      this.activeFilter = 'all'
      this.searchQuery = ''
      const sections = document.querySelectorAll('.content-section')
      sections.forEach(section => {
        section.style.display = 'block'
      })
    },

    filterByCategory(category) {
      this.activeFilter = category
      this.searchQuery = ''
      const sections = document.querySelectorAll('.content-section')

      sections.forEach(section => {
        if (section.dataset.category === category) {
          section.style.display = 'block'
        } else {
          section.style.display = 'none'
        }
      })
    },
    addValue() {
      this.content.values.valuesList.push({
        title: '',
        description: '',
        icon: 'fas fa-star'
      })
    },
    removeValue(index) {
      if (confirm('Are you sure you want to remove this value?')) {
        this.content.values.valuesList.splice(index, 1)
      }
    },
    async saveValuesContent() {
      try {
        await axios.put('/api/admin/content/values', this.content.values)
        alert('Values content saved successfully!')
      } catch (error) {
        console.error('Error saving values content:', error)
        alert('Error saving values content. Please try again.')
      }
    },
    async handleCompanyImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        try {
          const formData = new FormData()
          formData.append('companyImage', file)

          const response = await axios.post('/api/admin/content/upload-company-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          this.content.hero.companyImage = response.data.imageUrl
        } catch (error) {
          console.error('Error uploading company image:', error)
          alert('Error uploading image. Please try again.')
        }
      }
    },

    async handleHeroGalleryUpload(event) {
      const files = event.target.files
      if (files && files.length > 0) {
        try {
          // Validate files before upload
          const validationResult = this.validateUploadFiles(files)
          if (!validationResult.valid) {
            alert(validationResult.message)
            event.target.value = '' // Clear the input
            return
          }

          console.log('=== CLIENT-SIDE UPLOAD DEBUG ===')
          console.log('Files to upload:', files.length)
          for (let i = 0; i < files.length; i++) {
            console.log(`File ${i + 1}:`, {
              name: files[i].name,
              type: files[i].type,
              size: files[i].size,
              sizeInMB: (files[i].size / (1024 * 1024)).toFixed(2)
            })
          }

          const formData = new FormData()
          for (let i = 0; i < files.length; i++) {
            formData.append('heroImages', files[i])
          }

          const response = await axios.post('/api/admin/content/upload-hero-gallery', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          // Initialize galleryImages array if it doesn't exist
          if (!this.content.hero.galleryImages) {
            this.content.hero.galleryImages = []
          }

          // Add new images to the gallery
          this.content.hero.galleryImages.push(...response.data.imageUrls)

          // Clear the file input
          event.target.value = ''

          // Show appropriate success message
          let successMessage = `${response.data.imageUrls.length} file(s) uploaded successfully!`
          if (response.data.message) {
            successMessage += '\n\n' + response.data.message
          }

          alert(successMessage)
        } catch (error) {
          console.error('=== CLIENT-SIDE UPLOAD ERROR ===', error)
          console.error('Error response:', error.response?.data)
          console.error('Error status:', error.response?.status)

          let errorMessage = 'Error uploading files. Please try again.'
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message
          } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error
          }

          alert(errorMessage)
        }
      }
    },

    validateUploadFiles(files) {
      const maxImageSize = 15 * 1024 * 1024 // 15MB
      const maxVideoSize = 100 * 1024 * 1024 // 100MB
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime']

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const isImage = allowedImageTypes.includes(file.type)
        const isVideo = allowedVideoTypes.includes(file.type)

        if (!isImage && !isVideo) {
          return {
            valid: false,
            message: `File "${file.name}" is not a supported format. Please use JPG, PNG, WebP, GIF, MP4, MOV, AVI, or WebM files.`
          }
        }

        if (isImage && file.size > maxImageSize) {
          return {
            valid: false,
            message: `Image "${file.name}" is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Images must be under 15MB.`
          }
        }

        if (isVideo && file.size > maxVideoSize) {
          return {
            valid: false,
            message: `Video "${file.name}" is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Videos must be under 100MB.`
          }
        }
      }

      return { valid: true }
    },

    removeGalleryImage(index) {
      if (this.content.hero.galleryImages && index >= 0 && index < this.content.hero.galleryImages.length) {
        this.content.hero.galleryImages.splice(index, 1)
      }
    },

    isVideoFile(filePath) {
      if (!filePath) return false
      const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.m4v']
      const lowerPath = filePath.toLowerCase()
      return videoExtensions.some(ext => lowerPath.includes(ext))
    },

    showSuccessPopup(message) {
      this.popupMessage = message
      this.popupType = 'success'
      this.showPopup = true
      setTimeout(() => {
        this.showPopup = false
      }, 3000)
    },

    showErrorPopup(message) {
      this.popupMessage = message
      this.popupType = 'error'
      this.showPopup = true
      setTimeout(() => {
        this.showPopup = false
      }, 4000)
    },
    async savePropertiesBanner() {
      this.saving = true
      try {
        await axios.post('/api/admin/content/properties-banner', {
          text: this.content.propertiesBanner.text
        })
        this.showSuccess('Properties banner updated successfully!')
      } catch (error) {
        console.error('Error saving properties banner:', error)
        this.showError('Failed to save properties banner')
      } finally {
        this.saving = false
      }
    },
    async saveRentalsBanner() {
      this.saving = true
      try {
        await axios.post('/api/admin/content/rentals-banner', {
          text: this.content.rentalsBanner.text
        })
        this.showSuccess('Rentals banner updated successfully!')
      } catch (error) {
        console.error('Error saving rentals banner:', error)
        this.showError('Failed to save rentals banner')
      } finally {
        this.saving = false
      }
    },

    async savePreferredBiddersBanner() {
      this.saving = true
      try {
        await axios.post('/api/admin/content/preferred-bidders-banner', {
          title: this.content.preferredBiddersBanner.title,
          description: this.content.preferredBiddersBanner.description
        })
        this.showSuccess('Preferred Bidders banner updated successfully!')
      } catch (error) {
        console.error('Error saving preferred bidders banner:', error)
        this.showError('Failed to save preferred bidders banner')
      } finally {
        this.saving = false
      }
    },

    // Success and Error notification methods
    showSuccess(message) {
      // Create and show success toast
      const toast = document.createElement('div')
      toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed'
      toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999;'
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="fas fa-check-circle me-2"></i>${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `
      document.body.appendChild(toast)

      // Initialize and show toast
      const bsToast = new bootstrap.Toast(toast, { delay: 4000 })
      bsToast.show()

      // Remove from DOM after hiding
      toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast)
      })
    },

    showError(message) {
      // Create and show error toast
      const toast = document.createElement('div')
      toast.className = 'toast align-items-center text-white bg-danger border-0 position-fixed'
      toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999;'
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="fas fa-exclamation-circle me-2"></i>${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `
      document.body.appendChild(toast)

      // Initialize and show toast
      const bsToast = new bootstrap.Toast(toast, { delay: 4000 })
      bsToast.show()

      // Remove from DOM after hiding
      toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast)
      })
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
}

.card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

/* Admin Card Styles */
.admin-card {
  align-self: flex-start;
  min-height: 120px;
  width: 100%;
}

.admin-card .card-body {
  padding: 1.25rem;
}

/* Banner sections maintain consistent width */
.col-lg-4 .admin-card {
  width: 100%;
  max-width: 100%;
  flex-shrink: 0;
}

.col-lg-4 .admin-card .card-header,
.col-lg-4 .admin-card .card-body {
  width: 100%;
  box-sizing: border-box;
}

/* Ensure cards expand independently */
.content-section {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content-section .card {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content-section .card-body {
  flex: 1;
  width: 100%;
}

/* Specific styling for banner sections in 3-column layout */
.col-lg-4.content-section {
  width: 100%;
  margin-bottom: 1.5rem;
}

.col-lg-4.content-section .card {
  width: 100%;
  transition: height 0.3s ease;
  min-height: 120px;
}

/* Prevent width changes during expansion */
.collapsible-section {
  width: 100%;
  box-sizing: border-box;
}

.card-header {
  border-radius: 12px 12px 0 0 !important;
  border-bottom: none;
  font-weight: 600;
  padding: 1rem 1.25rem;
}

.card-header h5 {
  font-size: 1rem;
  font-weight: 600;
}

.card-header h6 {
  font-size: 0.95rem;
  font-weight: 600;
}

.form-control:focus {
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

.modal {
  z-index: 1050;
}

.bio-editor {
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  min-height: 120px;
}

.bio-editor:focus {
  outline: none;
  border-color: #EBA472;
  box-shadow: 0 0 0 0.2rem rgba(235, 164, 114, 0.25);
}

.bio-editor p {
  margin-bottom: 0.5rem;
}

.bio-editor ul, .bio-editor ol {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}

/* Search and Filter Styling */
.input-group-text {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  color: #6c757d;
}

.btn-group .btn.active {
  background-color: #EBA472;
  border-color: #EBA472;
  color: white;
}

.btn-outline-primary:hover {
  background-color: #EBA472;
  border-color: #EBA472;
}

/* Content Section Animations */
.content-section {
  transition: all 0.3s ease;
}

.content-section[style*="display: none"] {
  opacity: 0;
  transform: scale(0.95);
}

/* Toast Notifications */
.toast {
  min-width: 300px;
  font-weight: 500;
}

.toast .toast-body {
  padding: 1rem;
}

/* Improved spacing */
.card-body {
  padding: 1.5rem;
}

.form-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.75rem;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

/* Container and Grid improvements */
.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
}

/* Row spacing */
.row.g-3 {
  margin-bottom: 1.5rem;
}

.row.g-3:last-child {
  margin-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .col-lg-4, .col-lg-6 {
    margin-bottom: 1.5rem;
  }

  .admin-card,
  .admin-card-small {
    max-height: none;
  }
}

@media (max-width: 767.98px) {
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .card-header {
    padding: 0.75rem 1rem;
  }

  .card-body {
    padding: 1rem;
  }
}

/* Search highlight effect */
.content-section:target {
  animation: highlight 2s ease-in-out;
}

@keyframes highlight {
  0% { background-color: rgba(235, 164, 114, 0.1); }
  100% { background-color: transparent; }
}

/* Collapsible Section Styling */
.cursor-pointer {
  cursor: pointer;
}

.transition-transform {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.card-header:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.collapsible-section {
  display: none !important;
  transition: all 0.3s ease;
}

.collapsible-section[style*="display: block"] {
  display: block !important;
  animation: slideDown 0.3s ease;
}

/* Force show when v-show is active */
.collapsible-section:not([style*="display: none"]) {
  display: block !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark theme adjustments */
.card {
  background-color: #2d2d2d;
  border: 1px solid #404040;
}

.card-body {
  background-color: #2d2d2d;
  color: #ffffff;
}

.form-control, .form-select, .bio-editor {
  background-color: #404040;
  border-color: #555555;
  color: #ffffff;
}

.form-control:focus, .form-select:focus, .bio-editor:focus {
  background-color: #4a4a4a;
  border-color: #EBA472;
  color: #ffffff;
}

.form-control::placeholder {
  color: #aaaaaa;
}

.form-label {
  color: #ffffff;
}

.text-muted {
  color: #aaaaaa !important;
}

.input-group-text {
  background-color: #404040;
  border-color: #555555;
  color: #ffffff;
}

/* Branding Kit Colors */
.bg-warm-sunset {
  background-color: #EBA472 !important;
}

.bg-midnight-black {
  background-color: #000000 !important;
}

.bg-slate-gray {
  background-color: #4A4A4A !important;
}

.bg-modern-white {
  background-color: #FFFFFF !important;
  color: #000000 !important;
}

/* Success/Error Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

.popup-content.success {
  border-left: 4px solid #28a745;
}

.popup-content.error {
  border-left: 4px solid #dc3545;
}

.popup-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.popup-content.success .popup-icon {
  color: #28a745;
}

.popup-content.error .popup-icon {
  color: #dc3545;
}

.popup-message {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
}

.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-close:hover {
  background: #f0f0f0;
  color: #333;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>



