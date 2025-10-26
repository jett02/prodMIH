import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import propertyRoutes from './routes/properties.js';
import contactRoutes from './routes/contact.js';
import rentalRoutes from './routes/rentals.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import agentRoutes from './routes/agents.js';
import preferredBiddersRoutes from './routes/preferredBidders.js';
import Partner from './models/Partner.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Increase body size limits for file uploads (especially GIFs)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Increase timeout for large file uploads
app.use((req, res, next) => {
  // Set timeout to 5 minutes for upload routes
  if (req.path.includes('/upload')) {
    req.setTimeout(300000); // 5 minutes
    res.setTimeout(300000); // 5 minutes
  }
  next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/makeithome')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Public Partners Route (must be before admin routes)
app.get('/api/partners', async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 });
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ message: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/preferred-bidders', preferredBiddersRoutes);

// Email confirmation route (using contact routes for email functionality)
app.use('/api', contactRoutes);

// Public content route
app.get('/api/content', async (req, res) => {
  try {
    const Content = (await import('./models/Content.js')).default;
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
      await content.save();
    }

    // Ensure banner sections exist for public access
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
    res.status(500).json({ message: error.message });
  }
});

// Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Make It Home API Server is running!',
    endpoints: {
      properties: '/api/properties',
      contact: '/api/contact',
      rentals: '/api/rentals',
      auth: '/api/auth',
      admin: '/api/admin'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







