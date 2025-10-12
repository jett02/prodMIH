<template>
  <nav class="navbar navbar-expand-lg navbar-sticky navbar-dark bg-black">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img v-if="logoLoaded" :src="logoUrl" alt="Make It Home Logo" class="logo">
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ThemedNavbar',
  data() {
    return {
      logoUrl: '/businessimages/makeitHomePNG.PNG',
      logoLoaded: true // Set to true by default to prevent flashing
    }
  },
  mounted() {
    // Only load logo if not already cached
    if (!this.logoLoaded) {
      this.loadLogo()
    }
  },
  methods: {
    loadLogo() {
      const logoVariations = [
        '/businessimages/makeitHomePNG.PNG',
        '/businessimages/makeitHomePNG.png',
        '/businessimages/makeitHomePNG.jpg',
        '/businessimages/makeitHomePNG.jpeg'
      ]
      
      this.tryLoadLogo(logoVariations, 0)
    },
    tryLoadLogo(variations, index) {
      if (index >= variations.length) {
        this.logoLoaded = false
        console.warn('Logo not found in any format')
        return
      }
      
      const img = new Image()
      img.onload = () => {
        this.logoUrl = variations[index]
        this.logoLoaded = true
        console.log('Logo loaded successfully from:', variations[index])
      }
      img.onerror = () => {
        console.warn('Logo not found at:', variations[index])
        this.tryLoadLogo(variations, index + 1)
      }
      img.src = variations[index]
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleNavClick(route) {
      // Only scroll to top if staying on the same route
      if (this.$route.path === route) {
        this.scrollToTop()
      }
      // For different routes, let the router handle it without scrolling
    }
  },
  watch: {
    '$route'() {
      this.scrollToTop()
    }
  }
}
</script>

<style scoped>
.nav-item {
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #f97316, #ea580c);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover::after,
.nav-item.router-link-active::after {
  width: 80%;
}

.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}

.dropdown-menu {
  transition: all 0.3s ease;
  border: none;
  background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.dropdown-item {
  color: #e5e7eb;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
}
</style>




















