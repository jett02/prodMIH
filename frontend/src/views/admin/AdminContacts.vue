<template>
  <div class="min-h-screen" style="background-color: #EDE0D4;">
    <AdminNavbar />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold brand-heading" style="color: #000000;">Contact Inquiries</h1>
        <p class="brand-body" style="color: #4A4A4A;">Manage customer inquiries and leads</p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6">
        <div class="border-b" style="border-color: #4A4A4A;">
          <nav class="-mb-px flex space-x-8">
            <button @click="activeTab = 'all'" 
                    :class="activeTab === 'all' ? 'border-warm-sunset text-warm-sunset' : 'border-transparent text-slate-gray hover:text-midnight-black hover:border-slate-gray'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm font-poppins"
                    :style="activeTab === 'all' ? 'border-color: #EBA472; color: #EBA472;' : 'color: #4A4A4A;'">
              All Inquiries ({{ contacts.length }})
            </button>
            <button @click="activeTab = 'unread'" 
                    :class="activeTab === 'unread' ? 'border-warm-sunset text-warm-sunset' : 'border-transparent text-slate-gray hover:text-midnight-black hover:border-slate-gray'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm font-poppins"
                    :style="activeTab === 'unread' ? 'border-color: #EBA472; color: #EBA472;' : 'color: #4A4A4A;'">
              Unread ({{ unreadCount }})
            </button>
            <button @click="activeTab = 'sell'" 
                    :class="activeTab === 'sell' ? 'border-warm-sunset text-warm-sunset' : 'border-transparent text-slate-gray hover:text-midnight-black hover:border-slate-gray'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm font-poppins"
                    :style="activeTab === 'sell' ? 'border-color: #EBA472; color: #EBA472;' : 'color: #4A4A4A;'">
              Sell Inquiries
            </button>
            <button @click="activeTab = 'rental'" 
                    :class="activeTab === 'rental' ? 'border-warm-sunset text-warm-sunset' : 'border-transparent text-slate-gray hover:text-midnight-black hover:border-slate-gray'"
                    class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm font-poppins"
                    :style="activeTab === 'rental' ? 'border-color: #EBA472; color: #EBA472;' : 'color: #4A4A4A;'">
              Rental Inquiries
            </button>
          </nav>
        </div>
      </div>

      <!-- Contacts Inbox -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Contacts List -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4 bg-gradient-to-r from-primary to-blue-600 text-white">
              <h3 class="font-bold text-lg">Inbox</h3>
              <p class="text-blue-100 text-sm">{{ filteredContacts.length }} messages</p>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div v-for="contact in filteredContacts" :key="contact._id"
                   class="contact-item p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                   :class="{ 'bg-blue-50 border-l-4 border-l-primary': selectedContact && selectedContact._id === contact._id, 'font-bold': !contact.read }"
                   @click="viewContact(contact)">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center mb-1">
                      <div class="w-2 h-2 rounded-full mr-2"
                           :class="contact.read ? 'bg-gray-300' : 'bg-primary'"></div>
                      <h4 class="text-sm font-medium text-gray-900 truncate">{{ contact.name }}</h4>
                    </div>
                    <p class="text-xs text-gray-500 mb-1">{{ contact.email }}</p>
                    <p class="text-sm text-gray-600 truncate">{{ contact.message }}</p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-gray-400">{{ formatDate(contact.createdAt) }}</span>
                      <span v-if="contact.type" class="px-2 py-1 text-xs rounded-full"
                            :class="getTypeClass(contact.type)">
                        {{ contact.type }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Details -->
        <div class="lg:col-span-2">
          <div v-if="selectedContact" class="bg-white rounded-xl shadow-lg overflow-hidden">
            <!-- Contact Header -->
            <div class="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-bold text-gray-900">{{ selectedContact.name }}</h2>
                  <p class="text-gray-600">{{ selectedContact.email }}</p>
                  <p v-if="selectedContact.phone" class="text-gray-600">{{ selectedContact.phone }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span v-if="selectedContact.type" class="px-3 py-1 text-sm rounded-full"
                        :class="getTypeClass(selectedContact.type)">
                    {{ selectedContact.type }}
                  </span>
                  <button @click="toggleRead(selectedContact)"
                          class="px-3 py-1 text-sm rounded-lg transition-colors duration-200"
                          :class="selectedContact.read ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-primary text-white hover:bg-blue-700'">
                    {{ selectedContact.read ? 'Mark Unread' : 'Mark Read' }}
                  </button>
                  <button @click="deleteContact(selectedContact._id)"
                          class="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- Contact Message -->
            <div class="p-6">
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Message</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-700 whitespace-pre-wrap">{{ selectedContact.message }}</p>
                </div>
              </div>

              <!-- Property Information (if applicable) -->
              <div v-if="selectedContact.propertyAddress" class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Property Interest</h3>
                <div class="bg-blue-50 rounded-lg p-4">
                  <p class="text-blue-800 font-medium">{{ selectedContact.propertyAddress }}</p>
                </div>
              </div>

              <!-- Contact Preferences -->
              <div v-if="selectedContact.preferredContact" class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Contact Preference</h3>
                <p class="text-gray-600">{{ selectedContact.preferredContact }}</p>
              </div>

              <!-- Tour Information (if applicable) -->
              <div v-if="selectedContact.preferredDate" class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Tour Request</h3>
                <div class="bg-green-50 rounded-lg p-4">
                  <p class="text-green-800">
                    <strong>Date:</strong> {{ selectedContact.preferredDate }}<br>
                    <strong>Time:</strong> {{ selectedContact.preferredTime }}
                  </p>
                </div>
              </div>

              <!-- Timestamp -->
              <div class="text-sm text-gray-500 border-t pt-4">
                <p>Received: {{ formatFullDate(selectedContact.createdAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-white rounded-xl shadow-lg p-12 text-center">
            <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Select a Message</h3>
            <p class="text-gray-600">Choose a contact from the list to view details</p>
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
  name: 'AdminContacts',
  components: {
    AdminNavbar
  },
  data() {
    return {
      contacts: [],
      selectedContact: null,
      activeTab: 'all'
    }
  },
  computed: {
    filteredContacts() {
      switch (this.activeTab) {
        case 'unread':
          return this.contacts.filter(c => !c.read)
        case 'sell':
          return this.contacts.filter(c => c.inquiryType.toLowerCase().includes('sell'))
        case 'rental':
          return this.contacts.filter(c => c.inquiryType.toLowerCase().includes('rent'))
        default:
          return this.contacts
      }
    },
    unreadCount() {
      return this.contacts.filter(c => !c.read).length
    }
  },
  async mounted() {
    await this.loadContacts()
  },
  methods: {
    async loadContacts() {
      try {
        const response = await axios.get('/api/admin/contacts')
        this.contacts = response.data
      } catch (error) {
        console.error('Error loading contacts:', error)
      }
    },
    viewContact(contact) {
      this.selectedContact = contact
      if (!contact.read) {
        this.markAsRead(contact._id)
      }
    },
    async markAsRead(contactId) {
      try {
        await axios.put(`/api/admin/contacts/${contactId}/read`)
        const contact = this.contacts.find(c => c._id === contactId)
        if (contact) {
          contact.read = true
        }
        if (this.selectedContact && this.selectedContact._id === contactId) {
          this.selectedContact.read = true
        }
      } catch (error) {
        console.error('Error marking contact as read:', error)
      }
    },
    async deleteContact(contactId) {
      if (confirm('Are you sure you want to delete this contact?')) {
        try {
          await axios.delete(`/api/admin/contacts/${contactId}`)
          this.contacts = this.contacts.filter(c => c._id !== contactId)
          if (this.selectedContact && this.selectedContact._id === contactId) {
            this.selectedContact = null
          }
          alert('Contact deleted successfully!')
        } catch (error) {
          console.error('Error deleting contact:', error)
          alert('Error deleting contact. Please try again.')
        }
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString()
    },
    formatFullDate(dateString) {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    getTypeClass(type) {
      const typeClasses = {
        'contact': 'bg-blue-100 text-blue-800',
        'tour': 'bg-green-100 text-green-800',
        'inquiry': 'bg-purple-100 text-purple-800',
        'general': 'bg-gray-100 text-gray-800'
      }
      return typeClasses[type?.toLowerCase()] || 'bg-gray-100 text-gray-800'
    },
    toggleRead(contact) {
      this.markAsRead(contact._id)
    }
  }
}
</script>




