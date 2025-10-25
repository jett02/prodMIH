import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import Property from '../models/Property.js';
import Contact from '../models/Content.js';
import Content from '../models/Content.js';
import Agent from '../models/Agent.js';
import Partner from '../models/Partner.js';
import { authenticateToken } from './auth.js';
import {
  propertyUpload,
  heroUpload,
  teamUpload,
  agentUpload
} from '../config/cloudinary.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Note: Upload configurations are now imported from cloudinary.js

// Test Cloudinary configuration
router.get('/test-cloudinary', (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
    apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
    config: cloudinary.config()
  });
});

// Test email configuration
router.get('/test-email', async (req, res) => {
  try {
    const emailService = (await import('../services/emailService.js')).default;

    // Check environment variables
    const emailConfig = {
      AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID ? 'Set' : 'Not Set',
      AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET ? 'Set' : 'Not Set',
      AZURE_TENANT_ID: process.env.AZURE_TENANT_ID ? 'Set' : 'Not Set',
      EMAIL_FROM: process.env.EMAIL_FROM,
      COMPANY_EMAIL: process.env.COMPANY_EMAIL,
      BACKUP_AGENT_EMAIL: process.env.BACKUP_AGENT_EMAIL
    };

    console.log('Email config check:', emailConfig);

    // Try to verify the email service
    await emailService.verify();

    res.json({
      status: 'success',
      message: 'Email service verified successfully',
      config: emailConfig
    });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      config: {
        AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID ? 'Set' : 'Not Set',
        AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET ? 'Set' : 'Not Set',
        AZURE_TENANT_ID: process.env.AZURE_TENANT_ID ? 'Set' : 'Not Set',
        EMAIL_FROM: process.env.EMAIL_FROM,
        COMPANY_EMAIL: process.env.COMPANY_EMAIL,
        BACKUP_AGENT_EMAIL: process.env.BACKUP_AGENT_EMAIL
      }
    });
  }
});

// Test upload endpoint
router.post('/test-upload', heroUpload.single('testImage'), (req, res) => {
  try {
    console.log('=== TEST UPLOAD DEBUG ===');
    console.log('File received:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      success: true,
      file: req.file,
      url: req.file.path
    });
  } catch (error) {
    console.error('=== TEST UPLOAD ERROR ===', error);
    res.status(500).json({ message: error.message });
  }
});

// Test agent upload endpoint - compare with hero upload
router.post('/test-agent-upload', agentUpload.single('testImage'), (req, res) => {
  try {
    console.log('=== TEST AGENT UPLOAD DEBUG ===');
    console.log('File received:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      success: true,
      file: req.file,
      url: req.file.path
    });
  } catch (error) {
    console.error('=== TEST AGENT UPLOAD ERROR ===', error);
    res.status(500).json({ message: error.message });
  }
});

// Test hero upload for comparison
router.post('/test-hero-vs-agent', (req, res) => {
  res.json({
    message: 'Testing upload configurations',
    agentStorage: typeof agentUpload,
    heroStorage: typeof heroUpload
  });
});

// Public content endpoint (no authentication required)
router.get('/content/public', async (req, res) => {
  try {
    console.log('=== BACKEND DEBUG: Loading public content ===')
    let content = await Content.findOne();
    console.log('=== BACKEND DEBUG: Raw content from DB ===', content)
    
    if (!content) {
      console.log('=== BACKEND DEBUG: No content found, creating default ===')
      // Return empty structure if no content exists
      content = {
        hero: {
          title: "Let's Find Your House. We Can Make It Home.",
          subtitle: "You bring the dream—we bring the hustle. We flip homes with intention, rent with care, and build the kind of spaces people want to stay in.",
          backgroundImage: ""
        },
        about: {
          story: "",
          mission: ""
        },
        team: [],
        contact: {
          phone: "402-XXX-XXXX",
          email: "info@makeithome.com",
          address: "Omaha, Nebraska"
        }
      }
    }
    
    console.log('=== BACKEND DEBUG: Returning content with team count ===', content.team?.length || 0)
    res.json(content);
  } catch (error) {
    console.error('=== BACKEND DEBUG: Error loading content ===', error)
    res.status(500).json({ message: error.message });
  }
});

// Apply authentication to all admin routes EXCEPT the public content endpoint
router.use((req, res, next) => {
  if (req.path === '/content/public') {
    return next();
  }
  authenticateToken(req, res, next);
});

// Verify token endpoint
router.get('/verify-token', (req, res) => {
  // If we reach here, the token is valid (middleware passed)
  res.json({ valid: true, user: req.user });
});

// Get all properties for admin
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    console.log('=== FETCHED PROPERTIES ===');
    properties.forEach(prop => {
      console.log(`Property ${prop._id}: thumbnail=${prop.thumbnail}, images=${JSON.stringify(prop.images)}`);
    });
    console.log('=== END FETCH ===');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload property thumbnail
router.post('/properties/upload-thumbnail', propertyUpload.single('thumbnail'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const thumbnailUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Thumbnail uploaded:', thumbnailUrl);
    res.json({ thumbnailUrl });
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload property gallery image
router.post('/properties/upload-image', propertyUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Gallery image uploaded:', imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple property gallery images - increased limit for large galleries
router.post('/properties/upload-images', propertyUpload.array('images', 50), async (req, res) => {
  try {
    console.log('=== PROPERTY GALLERY UPLOAD DEBUG ===');
    console.log('Files received:', req.files?.length || 0);

    if (!req.files || req.files.length === 0) {
      console.log('No files in request');
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => file.path); // Cloudinary returns full URLs
    console.log('Gallery images uploaded successfully:', imageUrls);
    res.json({ imageUrls });
  } catch (error) {
    console.error('=== PROPERTY GALLERY UPLOAD ERROR ===', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new property
router.post('/properties', async (req, res) => {
  try {
    console.log('Creating property with data:', req.body);
    const propertyData = { ...req.body };
    
    // Handle features string conversion
    if (propertyData.features && typeof propertyData.features === 'string') {
      propertyData.features = propertyData.features.split(',').map(f => f.trim()).filter(f => f);
    }
    
    // For upcoming properties, remove type field if it's null/empty
    if (propertyData.status === 'upcoming' && (!propertyData.type || propertyData.type === 'null')) {
      delete propertyData.type;
    }
    
    // Ensure arrays exist
    if (!propertyData.images) propertyData.images = [];
    if (!propertyData.features) propertyData.features = [];
    
    const property = new Property(propertyData);
    const savedProperty = await property.save();
    console.log('Property created:', savedProperty);
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update property
router.put('/properties/:id', async (req, res) => {
  try {
    console.log('Updating property:', req.params.id, 'with data:', req.body);
    const propertyData = { ...req.body };
    
    // Handle features string conversion
    if (propertyData.features && typeof propertyData.features === 'string') {
      propertyData.features = propertyData.features.split(',').map(f => f.trim()).filter(f => f);
    }
    
    // For upcoming properties, remove type field if it's null/empty
    if (propertyData.status === 'upcoming' && (!propertyData.type || propertyData.type === 'null')) {
      delete propertyData.type;
    }
    
    // Ensure arrays exist
    if (!propertyData.images) propertyData.images = [];
    if (!propertyData.features) propertyData.features = [];
    
    propertyData.updatedAt = new Date();
    
    const property = await Property.findByIdAndUpdate(
      req.params.id, 
      propertyData, 
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    console.log('Property updated:', property);
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete property
router.delete('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().populate('propertyId').sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark contact as read
router.put('/contacts/:id/read', async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'Contact marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get content
router.get('/content', async (req, res) => {
  try {
    const content = await Content.findOne();
    console.log('Content retrieved:', JSON.stringify(content, null, 2)); // Debug log
    
    if (!content) {
      return res.json({
        hero: { title: '', subtitle: '', backgroundImage: '', foregroundImage: '', companyImage: '' },
        about: { story: '', mission: '' },
        values: { title: 'Our Values', description: '', valuesList: [] },
        team: [],
        footer: { phone: '', email: '', address: '' },
        contact: {
          phone: '',
          email: '',
          address: '',
          phoneDescription: 'Ready to talk? Give us a call',
          emailDescription: 'Send us your questions',
          locationDescription: 'Visit our office',
          googleMapsLink: ''
        },
        propertiesBanner: { text: '' },
        rentalsBanner: { text: '' },
        preferredBiddersBanner: {
          title: 'Preferred Bidders List',
          description: `Let's Make It Home: One Flip, One Crew, One Win at a Time.<br>
                       Bring your skills. Bring your hustle. Join our Preferred Bidders List and build with us.<br><br>
                       At Make It Home, we believe great projects start with great partners. If you'd like to be considered for our Preferred Bidders List, please complete the form below. To keep the process clear and consistent, we only accept submissions here. Once we've reviewed your information, our team will follow up within 10 business days with next steps.`
        }
      });
    }
    
    // Ensure contact section exists
    if (!content.contact) {
      content.contact = {
        phone: content.footer?.phone || '',
        email: content.footer?.email || '',
        address: content.footer?.address || '',
        phoneDescription: 'Ready to talk? Give us a call',
        emailDescription: 'Send us your questions',
        locationDescription: 'Visit our office',
        googleMapsLink: ''
      };
    }

    // Ensure banner sections exist
    if (!content.propertiesBanner) {
      content.propertiesBanner = { text: 'Find your dream home in Omaha, Nebraska' };
    }
    if (!content.rentalsBanner) {
      content.rentalsBanner = { text: 'Find your perfect rental home in Omaha' };
    }
    if (!content.preferredBiddersBanner) {
      content.preferredBiddersBanner = {
        title: 'Preferred Bidders List',
        description: `Let's Make It Home: One Flip, One Crew, One Win at a Time.<br>
                     Bring your skills. Bring your hustle. Join our Preferred Bidders List and build with us.<br><br>
                     At Make It Home, we believe great projects start with great partners. If you'd like to be considered for our Preferred Bidders List, please complete the form below. To keep the process clear and consistent, we only accept submissions here. Once we've reviewed your information, our team will follow up within 10 business days with next steps.`
      };
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload team member photo
router.post('/content/team/upload-photo', teamUpload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const photoUrl = req.file.path; // Cloudinary returns the full URL in path
    res.json({ photoUrl });
  } catch (error) {
    console.error('Error uploading team photo:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update team content
router.put('/content/team', async (req, res) => {
  try {
    console.log('=== TEAM SAVE DEBUG: Received team data ===', req.body);
    
    let content = await Content.findOne();
    console.log('=== TEAM SAVE DEBUG: Existing content ===', content ? 'Found' : 'Not found');
    
    if (!content) {
      console.log('=== TEAM SAVE DEBUG: Creating new content document ===');
      content = new Content({
        hero: {},
        about: {},
        team: [],
        footer: {}
      });
    }
    
    // Update team data
    content.team = req.body.team || [];
    content.updatedAt = new Date();
    
    console.log('=== TEAM SAVE DEBUG: About to save team with count ===', content.team.length);
    
    const savedContent = await content.save();
    console.log('=== TEAM SAVE DEBUG: Content saved successfully ===', savedContent.team.length);
    
    res.json({ 
      message: 'Team content updated successfully',
      teamCount: savedContent.team.length 
    });
  } catch (error) {
    console.error('=== TEAM SAVE DEBUG: Error saving team content ===', error);
    res.status(500).json({ message: error.message });
  }
});

// Update contact content
router.put('/content/contact', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.contact = req.body.contact;
    content.updatedAt = new Date();
    await content.save();
    res.json({ message: 'Contact content updated successfully' });
  } catch (error) {
    console.error('Error saving contact content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update footer content
router.put('/content/footer', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.footer = req.body;
    await content.save();
    res.json({ message: 'Footer content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update social media sales content
router.put('/content/social-media-sales', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.socialMediaSales = req.body;
    await content.save();
    res.json({ message: 'Social media sales content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update social media rentals content
router.put('/content/social-media-rentals', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.socialMediaRentals = req.body;
    await content.save();
    res.json({ message: 'Social media rentals content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update disclosure statements
router.put('/content/disclosures', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.disclosures = req.body;
    await content.save();
    res.json({ message: 'Disclosure statements updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update hero content
router.put('/content/hero', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    // Ensure galleryImages is preserved
    content.hero = {
      ...content.hero,
      ...req.body,
      galleryImages: req.body.galleryImages || content.hero?.galleryImages || []
    };
    content.updatedAt = new Date();
    await content.save();
    res.json({ message: 'Hero content updated successfully' });
  } catch (error) {
    console.error('Error saving hero content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update about content
router.put('/content/about', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.about = req.body;
    content.updatedAt = new Date();
    await content.save();
    res.json({ message: 'About content updated successfully' });
  } catch (error) {
    console.error('Error saving about content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Agent management routes
router.get('/agents', async (req, res) => {
  try {
    console.log('=== BACKEND DEBUG: Loading agents ===')
    const agents = await Agent.find().sort({ name: 1 });
    console.log('=== BACKEND DEBUG: Found agents count ===', agents.length)
    console.log('=== BACKEND DEBUG: Agents data ===', agents)
    res.json(agents);
  } catch (error) {
    console.error('=== BACKEND DEBUG: Error loading agents ===', error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/agents', async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/agents/:id', async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/agents/:id', async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agent photo upload (using Cloudinary) - temporarily use heroUpload for testing
router.post('/agents/upload-photo', heroUpload.single('photo'), async (req, res) => {
  try {
    console.log('=== AGENT PHOTO UPLOAD ATTEMPT ===');
    console.log('Using heroUpload instead of agentUpload for testing');

    if (!req.file) {
      console.log('No file received');
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    const photoUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Agent photo uploaded successfully using heroUpload:', photoUrl);
    res.json({ photoUrl });
  } catch (error) {
    console.error('Error uploading agent photo with heroUpload:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple hero gallery images
router.post('/content/upload-hero-gallery', heroUpload.array('heroImages', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => file.path); // Cloudinary returns full URLs
    console.log('Hero gallery images uploaded:', imageUrls);
    res.json({ imageUrls });
  } catch (error) {
    console.error('Error uploading hero gallery images:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload hero background image
router.post('/content/upload-hero-background', heroUpload.single('heroBackground'), async (req, res) => {
  try {
    console.log('=== HERO BACKGROUND UPLOAD DEBUG ===');
    console.log('Request received');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Hero background uploaded successfully:', imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('=== HERO BACKGROUND UPLOAD ERROR ===', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload hero foreground image (Cloudinary handles resizing automatically)
router.post('/content/upload-hero-foreground', heroUpload.single('heroForeground'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Cloudinary automatically handles resizing based on our configuration
    const imageUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Hero foreground uploaded:', imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading hero foreground:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload company showcase image
router.post('/content/upload-company-image', heroUpload.single('companyImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Company image uploaded:', imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading company image:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update values content
router.put('/content/values', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }
    content.values = req.body;
    content.updatedAt = new Date();
    await content.save();
    res.json({ message: 'Values content updated successfully' });
  } catch (error) {
    console.error('Error saving values content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Save rentals banner
router.post('/content/rentals-banner', async (req, res) => {
  try {
    const { text } = req.body;

    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    if (!content.rentalsBanner) {
      content.rentalsBanner = {};
    }

    content.rentalsBanner.text = text;
    await content.save();

    res.json({ message: 'Rentals banner updated successfully' });
  } catch (error) {
    console.error('Error saving rentals banner:', error);
    res.status(500).json({ message: error.message });
  }
});

// Save preferred bidders banner
router.post('/content/preferred-bidders-banner', async (req, res) => {
  try {
    const { title, description } = req.body;

    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    if (!content.preferredBiddersBanner) {
      content.preferredBiddersBanner = {};
    }

    content.preferredBiddersBanner.title = title;
    content.preferredBiddersBanner.description = description;
    await content.save();

    res.json({ message: 'Preferred Bidders banner updated successfully' });
  } catch (error) {
    console.error('Error saving preferred bidders banner:', error);
    res.status(500).json({ message: error.message });
  }
});

// ===== PARTNERS ROUTES =====

// Get all partners (admin)
router.get('/partners', authenticateToken, async (req, res) => {
  try {
    const partners = await Partner.find()
      .sort({ order: 1, createdAt: 1 });
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single partner
router.get('/partners/:id', authenticateToken, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    console.error('Error fetching partner:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload partner logo
router.post('/partners/upload-logo', authenticateToken, agentUpload.single('logo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const logoUrl = req.file.path; // Cloudinary returns the full URL in path
    console.log('Partner logo uploaded:', logoUrl);
    res.json({ logoUrl });
  } catch (error) {
    console.error('Error uploading partner logo:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new partner
router.post('/partners', authenticateToken, async (req, res) => {
  try {
    const { title, description, logo, phone, email, website, order, isActive } = req.body;

    // Validate required fields
    if (!title || !description || !logo) {
      return res.status(400).json({ message: 'Title, description, and logo are required' });
    }

    const partner = new Partner({
      title,
      description,
      logo,
      phone,
      email,
      website,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    await partner.save();
    console.log('Partner created successfully:', partner._id);
    res.status(201).json(partner);
  } catch (error) {
    console.error('Error creating partner:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update partner
router.put('/partners/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, logo, phone, email, website, order, isActive } = req.body;

    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Update fields
    if (title !== undefined) partner.title = title;
    if (description !== undefined) partner.description = description;
    if (logo !== undefined) partner.logo = logo;
    if (phone !== undefined) partner.phone = phone;
    if (email !== undefined) partner.email = email;
    if (website !== undefined) partner.website = website;
    if (order !== undefined) partner.order = order;
    if (isActive !== undefined) partner.isActive = isActive;

    await partner.save();
    console.log('Partner updated successfully:', partner._id);
    res.json(partner);
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete partner
router.delete('/partners/:id', authenticateToken, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Delete logo from Cloudinary if it exists
    if (partner.logo) {
      try {
        const publicId = partner.logo.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`makeithome/agents/${publicId}`);
        console.log('Partner logo deleted from Cloudinary');
      } catch (cloudinaryError) {
        console.warn('Could not delete logo from Cloudinary:', cloudinaryError.message);
      }
    }

    await Partner.findByIdAndDelete(req.params.id);
    console.log('Partner deleted successfully:', req.params.id);
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;






























