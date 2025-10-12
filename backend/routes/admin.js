import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import Property from '../models/Property.js';
import Contact from '../models/Content.js';
import Content from '../models/Content.js';
import Agent from '../models/Agent.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/team/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Configure multer for property images
const propertyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/properties/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const propertyUpload = multer({ storage: propertyStorage });

// Configure multer for hero images
const heroStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/hero/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'hero-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const heroUpload = multer({ storage: heroStorage });

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
    
    const thumbnailUrl = `/uploads/properties/${req.file.filename}`;
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
    
    const imageUrl = `/uploads/properties/${req.file.filename}`;
    console.log('Gallery image uploaded:', imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple property gallery images - increase limit
router.post('/properties/upload-images', propertyUpload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => `/uploads/properties/${file.filename}`);
    console.log('Gallery images uploaded:', imageUrls);
    res.json({ imageUrls });
  } catch (error) {
    console.error('Error uploading images:', error);
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
router.post('/content/team/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const photoUrl = `/uploads/team/${req.file.filename}`;
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

// Ensure uploads directory exists
const uploadsDir = 'uploads/agents/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for agent photo uploads
const agentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'agent-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const agentUpload = multer({ 
  storage: agentStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Agent photo upload
router.post('/agents/upload-photo', agentUpload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No photo uploaded' });
  }
  
  const photoUrl = `/uploads/agents/${req.file.filename}`;
  res.json({ photoUrl });
});

// Upload multiple hero gallery images
router.post('/content/upload-hero-gallery', heroUpload.array('heroImages', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => `/uploads/hero/${file.filename}`);
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
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/hero/${req.file.filename}`;
    console.log('Hero background uploaded:', imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading hero background:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload hero foreground image with automatic resizing
router.post('/content/upload-hero-foreground', heroUpload.single('heroForeground'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Resize image to 1024x1000px (or maintain aspect ratio with max dimensions)
    const resizedImagePath = req.file.path.replace(path.extname(req.file.path), '-resized' + path.extname(req.file.path));
    
    await sharp(req.file.path)
      .resize(1024, 1000, {
        fit: 'inside', // This maintains aspect ratio without cropping
        withoutEnlargement: true
      })
      .jpeg({ quality: 85 })
      .toFile(resizedImagePath);
    
    // Delete original file and use resized version
    fs.unlinkSync(req.file.path);
    
    const imageUrl = `/uploads/hero/${path.basename(resizedImagePath)}`;
    console.log('Hero foreground uploaded and resized:', imageUrl);
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
    
    const imageUrl = `/uploads/hero/${req.file.filename}`;
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

export default router;







































