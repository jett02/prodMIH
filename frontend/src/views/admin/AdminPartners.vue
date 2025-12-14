<template>
  <div class="admin-partners">
    <!-- Header Section - Always Visible -->
    <div class="header-section d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded" style="min-height: 80px; border: 2px solid #007bff;">
      <div>
        <h2 class="mb-0">Manage Partners</h2>
        <p class="text-muted mb-0">Add and manage your business partners</p>
        <small class="text-info">Partners count: {{ partners.length }}</small>
      </div>
      <button class="btn btn-primary btn-lg" @click="showCreateModal" style="z-index: 1000; position: relative;">
        <i class="fas fa-plus me-2"></i>Add New Partner
      </button>
    </div>

    <!-- Partners List -->
    <div class="card">
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else-if="partners.length === 0" class="text-center py-5">
          <i class="fas fa-handshake fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">No partners yet</h5>
          <p class="text-muted mb-3">Add your first partner to get started.</p>
          <button class="btn btn-primary" @click="showCreateModal">
            <i class="fas fa-plus me-2"></i>Add Your First Partner
          </button>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Title</th>
                <th>Contact</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="partner in partners" :key="partner._id">
                <td>
                  <img 
                    :src="partner.logo" 
                    :alt="partner.title"
                    class="partner-thumb"
                    @error="handleImageError"
                  >
                </td>
                <td>
                  <div>
                    <strong>{{ partner.title }}</strong>
                    <div class="text-muted small">{{ truncateText(partner.description, 50) }}</div>
                  </div>
                </td>
                <td>
                  <div class="small">
                    <div v-if="partner.phone">📞 {{ partner.phone }}</div>
                    <div v-if="partner.email">✉️ {{ partner.email }}</div>
                    <div v-if="partner.website">🌐 {{ partner.website }}</div>
                  </div>
                </td>
                <td>{{ partner.order }}</td>
                <td>
                  <span :class="partner.isActive ? 'badge bg-success' : 'badge bg-secondary'">
                    {{ partner.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="editPartner(partner)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger" @click="deletePartner(partner)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal fade" id="partnerModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingPartner ? 'Edit Partner' : 'Add New Partner' }}</h5>
            <button type="button" class="btn-close" @click="hideModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePartner">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Title *</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="partnerForm.title"
                      required
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Order</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="partnerForm.order"
                      min="0"
                    >
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Description *</label>
                <textarea 
                  class="form-control" 
                  rows="3"
                  v-model="partnerForm.description"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Logo *</label>
                <div class="d-flex align-items-center gap-3">
                  <input 
                    type="file" 
                    class="form-control" 
                    @change="handleLogoUpload"
                    accept="image/*"
                    ref="logoInput"
                  >
                  <button 
                    type="button" 
                    class="btn btn-outline-primary"
                    @click="uploadLogo"
                    :disabled="!selectedLogo || uploading"
                  >
                    {{ uploading ? 'Uploading...' : 'Upload' }}
                  </button>
                </div>
                <div v-if="partnerForm.logo" class="mt-2">
                  <img :src="partnerForm.logo" alt="Logo preview" class="logo-preview">
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Phone</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      v-model="partnerForm.phone"
                    >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      v-model="partnerForm.email"
                    >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Website</label>
                    <input 
                      type="url" 
                      class="form-control" 
                      v-model="partnerForm.website"
                      placeholder="https://example.com"
                    >
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    v-model="partnerForm.isActive"
                    id="isActive"
                  >
                  <label class="form-check-label" for="isActive">
                    Active (visible on website)
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="savePartner"
              :disabled="saving || !partnerForm.title || !partnerForm.description || !partnerForm.logo"
            >
              {{ saving ? 'Saving...' : (editingPartner ? 'Update Partner' : 'Create Partner') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminPartners',
  data() {
    return {
      partners: [],
      loading: true,
      saving: false,
      uploading: false,
      editingPartner: null,
      selectedLogo: null,
      partnerForm: {
        title: '',
        description: '',
        logo: '',
        phone: '',
        email: '',
        website: '',
        order: 0,
        isActive: true
      }
    }
  },
  async mounted() {
    await this.loadPartners()
  },
  methods: {
    async loadPartners() {
      try {
        this.loading = true
        const token = sessionStorage.getItem('adminToken')
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/partners`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.partners = response.data
      } catch (error) {
        console.error('Error loading partners:', error)
        alert('Error loading partners')
      } finally {
        this.loading = false
      }
    },

    showCreateModal() {
      this.editingPartner = null
      this.resetForm()
      this.showModal()
    },

    editPartner(partner) {
      this.editingPartner = partner
      this.partnerForm = { ...partner }
      this.showModal()
    },

    showModal() {
      // Try multiple ways to show the modal
      const modalElement = document.getElementById('partnerModal')
      if (modalElement) {
        // Try Bootstrap 5 method
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modal = new bootstrap.Modal(modalElement)
          modal.show()
        } else {
          // Fallback: manually show modal
          modalElement.classList.add('show')
          modalElement.style.display = 'block'
          modalElement.setAttribute('aria-modal', 'true')
          modalElement.setAttribute('role', 'dialog')

          // Add backdrop
          const backdrop = document.createElement('div')
          backdrop.className = 'modal-backdrop fade show'
          backdrop.id = 'modal-backdrop'
          document.body.appendChild(backdrop)
          document.body.classList.add('modal-open')
        }
      }
    },

    hideModal() {
      const modalElement = document.getElementById('partnerModal')
      if (modalElement) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modal = bootstrap.Modal.getInstance(modalElement)
          if (modal) modal.hide()
        } else {
          // Fallback: manually hide modal
          modalElement.classList.remove('show')
          modalElement.style.display = 'none'
          modalElement.removeAttribute('aria-modal')
          modalElement.removeAttribute('role')

          // Remove backdrop
          const backdrop = document.getElementById('modal-backdrop')
          if (backdrop) backdrop.remove()
          document.body.classList.remove('modal-open')
        }
      }
    },

    resetForm() {
      this.partnerForm = {
        title: '',
        description: '',
        logo: '',
        phone: '',
        email: '',
        website: '',
        order: 0,
        isActive: true
      }
      this.selectedLogo = null
      if (this.$refs.logoInput) {
        this.$refs.logoInput.value = ''
      }
    },

    handleLogoUpload(event) {
      this.selectedLogo = event.target.files[0]
    },

    async uploadLogo() {
      if (!this.selectedLogo) return

      try {
        this.uploading = true
        const formData = new FormData()
        formData.append('logo', this.selectedLogo)

        const token = sessionStorage.getItem('adminToken')
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/partners/upload-logo`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        this.partnerForm.logo = response.data.logoUrl
        this.selectedLogo = null
        this.$refs.logoInput.value = ''
      } catch (error) {
        console.error('Error uploading logo:', error)
        alert('Error uploading logo')
      } finally {
        this.uploading = false
      }
    },

    async savePartner() {
      try {
        this.saving = true
        const token = sessionStorage.getItem('adminToken')
        
        if (this.editingPartner) {
          await axios.put(
            `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/partners/${this.editingPartner._id}`,
            this.partnerForm,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/partners`,
            this.partnerForm,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        }

        this.hideModal()
        await this.loadPartners()
      } catch (error) {
        console.error('Error saving partner:', error)
        alert('Error saving partner')
      } finally {
        this.saving = false
      }
    },

    async deletePartner(partner) {
      if (!confirm(`Are you sure you want to delete "${partner.title}"?`)) return

      try {
        const token = sessionStorage.getItem('adminToken')
        await axios.delete(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/partners/${partner._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        await this.loadPartners()
      } catch (error) {
        console.error('Error deleting partner:', error)
        alert('Error deleting partner')
      }
    },

    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text
    },

    handleImageError(event) {
      event.target.src = '/businessimages/placeholder-logo.png'
    }
  }
}
</script>

<style scoped>
.header-section {
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.partner-thumb {
  width: 60px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.logo-preview {
  width: 100px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
}

/* Make sure buttons are visible */
.admin-partners .btn {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-partners .btn-lg {
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}
</style>
