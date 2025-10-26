import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  hero: {
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    backgroundImage: { type: String, default: '' },
    foregroundImage: { type: String, default: '' },
    companyImage: { type: String, default: '' },
    galleryImages: [{ type: String }] // Array of image paths for carousel
  },
  about: {
    story: { type: String, default: '' },
    mission: { type: String, default: '' }
  },
  values: {
    title: { type: String, default: 'Our Values' },
    description: { type: String, default: '' },
    valuesList: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, default: 'fas fa-star' }
    }]
  },
  team: [{
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    photo: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    specialties: [{ type: String }]
  }],
  contact: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    phoneDescription: { type: String, default: 'Ready to talk? Give us a call' },
    emailDescription: { type: String, default: 'Send us your questions' },
    locationDescription: { type: String, default: 'Visit our office' },
    googleMapsLink: { type: String, default: '' }
  },
  footer: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    chrisEmail: { type: String, default: '' },
    address: { type: String, default: '' },
    officeHours: { type: String, default: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM' },
    socialMedia: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' }
    }
  },
  socialMediaSales: {
    title: { type: String, default: 'Connect with Make It Home' },
    subtitle: { type: String, default: 'Follow us on social media for the latest property listings and real estate updates' },
    contactTitle: { type: String, default: 'Questions about this property?' },
    contactSubtitle: { type: String, default: 'Our team is here to help you with all your real estate needs.' },
    contactPhone: { type: String, default: '(555) 123-4567' },
    contactEmail: { type: String, default: 'info@makeithome.com' },
    contactAddress: { type: String, default: '123 Main St, Your City, ST 12345' },
    ctaTitle: { type: String, default: 'Ready to get started?' },
    ctaSubtitle: { type: String, default: "We'll help you through the entire process" },
    facebook: {
      url: { type: String, default: 'https://facebook.com/makeithome' },
      title: { type: String, default: 'Facebook' },
      description: { type: String, default: 'Stay updated with our latest properties and community news.' }
    },
    instagram: {
      url: { type: String, default: 'https://instagram.com/makeithome' },
      title: { type: String, default: 'Instagram' },
      description: { type: String, default: 'See beautiful photos of our properties and get inspired.' }
    },
    twitter: {
      url: { type: String, default: 'https://twitter.com/makeithome' },
      title: { type: String, default: 'Twitter' },
      description: { type: String, default: 'Get real-time updates on new listings and market insights.' }
    },
    tiktok: {
      url: { type: String, default: 'https://tiktok.com/@makeithome' },
      title: { type: String, default: 'TikTok' },
      description: { type: String, default: 'Watch virtual tours and behind-the-scenes content of our properties.' }
    }
  },
  socialMediaRentals: {
    title: { type: String, default: 'Connect with Make It Home' },
    subtitle: { type: String, default: 'Follow us on social media for the latest rental listings and updates' },
    contactTitle: { type: String, default: 'Questions about this rental?' },
    contactSubtitle: { type: String, default: 'Our team is here to help you find the perfect rental property.' },
    contactPhone: { type: String, default: '(555) 123-4567' },
    contactEmail: { type: String, default: 'rentals@makeithome.com' },
    contactAddress: { type: String, default: '123 Main St, Your City, ST 12345' },
    ctaTitle: { type: String, default: 'Ready to rent?' },
    ctaSubtitle: { type: String, default: "We'll help you through the entire rental process" },
    facebook: {
      url: { type: String, default: 'https://facebook.com/makeithome' },
      title: { type: String, default: 'Facebook' },
      description: { type: String, default: 'Stay updated with our latest rental properties and community news.' }
    },
    instagram: {
      url: { type: String, default: 'https://instagram.com/makeithome' },
      title: { type: String, default: 'Instagram' },
      description: { type: String, default: 'See beautiful photos of our rental properties and get inspired.' }
    },
    twitter: {
      url: { type: String, default: 'https://twitter.com/makeithome' },
      title: { type: String, default: 'Twitter' },
      description: { type: String, default: 'Get real-time updates on new rental listings and market insights.' }
    },
    tiktok: {
      url: { type: String, default: 'https://tiktok.com/@makeithome' },
      title: { type: String, default: 'TikTok' },
      description: { type: String, default: 'Watch virtual tours and behind-the-scenes content of our properties.' }
    }
  },
  disclosures: {
    contactAgent: {
      type: String,
      default: 'By submitting this form, you consent to receive marketing communications from Make It Home. Message and data rates may apply.'
    },
    requestShowing: {
      type: String,
      default: 'By requesting a showing, you agree to our terms of service and privacy policy. We will contact you to confirm your appointment.'
    }
  },
  sellToUs: {
    benefitsMedia: { type: String, default: '' } // Image or video URL for the benefits section
  },
  vision: {
    heroSubtitle: { type: String, default: '' },
    mainTitle: { type: String, default: '' },
    statement: { type: String, default: '' },
    motivationTitle: { type: String, default: '' },
    motivation: { type: String, default: '' },
    motivationImage: { type: String, default: '' },
    goalsTitle: { type: String, default: '' },
    goalsDescription: { type: String, default: '' },
    futureGoals: { type: String, default: '' },
    ctaTitle: { type: String, default: '' },
    ctaDescription: { type: String, default: '' },
    cityImagesTitle: { type: String, default: '' },
    cityImagesDescription: { type: String, default: '' },
    cityImages: [{
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      image: { type: String, default: '' }
    }],
    socialMedia: {
      title: { type: String, default: 'Stay Connected' },
      subtitle: { type: String, default: 'Follow us on social media for the latest updates, property listings, and community news.' },
      facebook: {
        url: { type: String, default: 'https://facebook.com/makeithome' },
        title: { type: String, default: 'Facebook' },
        description: { type: String, default: 'Stay updated with our latest property listings and community news.' }
      },
      instagram: {
        url: { type: String, default: 'https://instagram.com/makeithome' },
        title: { type: String, default: 'Instagram' },
        description: { type: String, default: 'See behind-the-scenes content and beautiful property photos.' }
      },
      twitter: {
        url: { type: String, default: 'https://twitter.com/makeithome' },
        title: { type: String, default: 'Twitter' },
        description: { type: String, default: 'Get real-time updates and market insights from our team.' }
      },
      tiktok: {
        url: { type: String, default: 'https://tiktok.com/@makeithome' },
        title: { type: String, default: 'TikTok' },
        description: { type: String, default: 'Watch fun property tours and real estate tips.' }
      }
    }
  },
  preferredBiddersBanner: {
    title: {
      type: String,
      default: 'Preferred Bidders List'
    },
    description: {
      type: String,
      default: `Let's Make It Home: One Flip, One Crew, One Win at a Time.<br>
               Bring your skills. Bring your hustle. Join our Preferred Bidders List and build with us.<br><br>
               At Make It Home, we believe great projects start with great partners. If you'd like to be considered for our Preferred Bidders List, please complete the form below. To keep the process clear and consistent, we only accept submissions here. Once we've reviewed your information, our team will follow up within 10 business days with next steps.`
    }
  },
  propertiesBanner: {
    text: { type: String, default: 'Find your dream home in Omaha, Nebraska' }
  },
  rentalsBanner: {
    text: { type: String, default: 'Find your perfect rental home in Omaha' }
  }
}, {
  timestamps: true
});

export default mongoose.model('Content', contentSchema);








