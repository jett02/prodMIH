<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
    <div class="container">
      <!-- Brand with Logo -->
      <router-link class="navbar-brand fw-bold text-warm-sunset d-flex align-items-center" to="/">
        <img v-if="logoLoaded" :src="logoUrl" alt="Make It Home Logo" class="logo me-2">
        <span>Make It Home LLC</span>
      </router-link>

      <!-- Mobile toggle -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link text-slate-gray" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-slate-gray" to="/properties">Buy</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-slate-gray" to="/rentals">Rentals</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-slate-gray" to="/upcoming">Upcoming</router-link>
          </li>
          <li class="nav-item dropdown dropdown-hover">
            <a class="nav-link dropdown-toggle text-slate-gray" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a>
            <ul class="dropdown-menu" aria-labelledby="servicesDropdown">
              <li><router-link class="dropdown-item text-slate-gray" to="/mortgage-calculator">Mortgage Calculator</router-link></li>
              <li><router-link class="dropdown-item text-slate-gray" to="/preferred-bidders">Preferred Bidders List</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-slate-gray" to="/agents">Agents</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-slate-gray" to="/about">About</router-link>
          </li>
        </ul>
        <router-link to="/contact" class="btn btn-warm-sunset">Contact Us</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      logoUrl: '/businessimages/makeitHomePNG.PNG',
      logoLoaded: true
    }
  },
  mounted() {
    this.loadLogo()
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
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
  background-color: #FFFFFF !important;
}

.logo {
  height: 40px;
  width: auto;
}

.navbar-brand {
  color: #EBA472 !important;
  font-weight: bold;
}

.nav-link {
  font-weight: 500;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
  color: #4A4A4A !important;
}

.nav-link:hover {
  color: #EBA472 !important;
}

.dropdown-item {
  color: #4A4A4A !important;
}

.dropdown-item:hover {
  background-color: #EDE0D4;
  color: #EBA472 !important;
}

.btn-warm-sunset {
  background-color: #EBA472;
  border-color: #EBA472;
  color: #FFFFFF;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-warm-sunset:hover {
  background-color: #A15E3B;
  border-color: #A15E3B;
  color: #FFFFFF;
  text-decoration: none;
}

.router-link-active .nav-link {
  color: #EBA472 !important;
  font-weight: 600;
}

/* Cube-style dropdown hover effects */
.dropdown-hover > .dropdown-menu {
  transition: all 0.2s ease-in-out;
  display: block;
  pointer-events: none;
  opacity: 0;
  margin: 10px 0 0 0;
  transform: translateY(-10px);
}

.dropdown-hover:hover > .dropdown-menu {
  opacity: 1;
  pointer-events: auto;
  margin: 0;
  transform: translateY(0);
}

.dropdown-hover > .dropdown-toggle::after {
  transition: transform 0.2s ease;
}

.dropdown-hover:hover > .dropdown-toggle::after {
  transform: rotate(180deg);
}

.dropdown-menu {
  border: none;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 0.5rem 0;
  background: #FFFFFF;
  min-width: 200px;
}

.dropdown-item {
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
}

.dropdown-item:hover {
  background-color: #EDE0D4;
  color: #EBA472 !important;
  transform: translateX(5px);
}

.dropdown-item:focus {
  background-color: #EDE0D4;
  color: #EBA472 !important;
}

/* Remove Bootstrap's default dropdown arrow behavior */
.dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  transition: transform 0.2s ease;
}

.dropdown-hover > .dropdown-toggle::after {
  transition: transform 0.2s ease;
}

.dropdown-hover:hover > .dropdown-toggle::after {
  transform: rotate(180deg);
}

/* Smooth hover transition for nav links */
.nav-link {
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #EBA472 0%, #A15E3B 100%);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::before {
  width: 80%;
}
</style>




