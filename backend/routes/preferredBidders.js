import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PreferredBidder from '../models/PreferredBidder.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = 'uploads/preferred-bidders/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}-${sanitizedOriginalName}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Allow documents and images
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 20 // Maximum 20 files total
  }
});

// Profanity filter function (basic implementation)
const containsProfanity = (text) => {
  if (!text) return false;
  const profanityList = ['spam', 'scam', 'fake', 'fraud']; // Add more as needed
  const lowerText = text.toLowerCase();
  return profanityList.some(word => lowerText.includes(word));
};

const cleanProfanity = (text) => {
  if (!text) return text;
  let cleanText = text;
  const profanityList = ['spam', 'scam', 'fake', 'fraud'];
  profanityList.forEach(word => {
    const regex = new RegExp(word, 'gi');
    cleanText = cleanText.replace(regex, '*'.repeat(word.length));
  });
  return cleanText;
};

// Submit preferred bidder application
router.post('/', upload.fields([
  { name: 'insuranceCOI', maxCount: 1 },
  { name: 'projectFiles', maxCount: 10 },
  { name: 'capabilityStatement', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      companyName,
      primaryContact,
      phone,
      email,
      businessAddress,
      businessLicense,
      contractorLicense,
      insuranceInfo,
      bondingStatus,
      bondingDetails,
      yearsInBusiness,
      crewSize,
      tradesServices,
      otherTradesDetails,
      serviceArea,
      broaderAreaDetails,
      recentProjects,
      references,
      oshaViolations,
      litigationHistory,
      violationsExplanation,
      agreeToProvideDocuments,
      agreeToSiteRules
    } = req.body;

    // Validate required fields
    const requiredFields = {
      companyName,
      primaryContact,
      phone,
      email,
      businessAddress,
      insuranceInfo,
      bondingStatus,
      yearsInBusiness,
      crewSize,
      serviceArea,
      oshaViolations,
      litigationHistory,
      agreeToProvideDocuments,
      agreeToSiteRules
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return res.status(400).json({ 
          message: `Missing required field: ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}` 
        });
      }
    }

    // Validate agreements
    if (agreeToProvideDocuments !== 'true' || agreeToSiteRules !== 'true') {
      return res.status(400).json({ 
        message: 'You must agree to all compliance requirements to submit your application.' 
      });
    }

    // Parse JSON fields
    let parsedTradesServices = [];
    let parsedReferences = [];
    
    try {
      parsedTradesServices = JSON.parse(tradesServices || '[]');
      parsedReferences = JSON.parse(references || '[]');
    } catch (error) {
      return res.status(400).json({ message: 'Invalid data format in form submission.' });
    }

    // Validate trades services
    if (!parsedTradesServices || parsedTradesServices.length === 0) {
      return res.status(400).json({ message: 'Please select at least one trade/service.' });
    }

    // Validate references (at least 2)
    if (!parsedReferences || parsedReferences.length < 2) {
      return res.status(400).json({ message: 'Please provide at least 2 references.' });
    }

    // Check for profanity
    const textFields = [companyName, primaryContact, recentProjects, violationsExplanation];
    for (const field of textFields) {
      if (field && containsProfanity(field)) {
        return res.status(400).json({ 
          message: 'Your submission contains inappropriate language. Please revise and try again.' 
        });
      }
    }

    // Process file uploads
    const fileFields = {};
    if (req.files) {
      if (req.files.insuranceCOI) {
        fileFields.insuranceCOI = `/uploads/preferred-bidders/${req.files.insuranceCOI[0].filename}`;
      }
      if (req.files.projectFiles) {
        fileFields.projectFiles = req.files.projectFiles.map(file => 
          `/uploads/preferred-bidders/${file.filename}`
        );
      }
      if (req.files.capabilityStatement) {
        fileFields.capabilityStatement = `/uploads/preferred-bidders/${req.files.capabilityStatement[0].filename}`;
      }
    }

    // Create new preferred bidder application
    const preferredBidder = new PreferredBidder({
      companyName: cleanProfanity(companyName),
      primaryContact: cleanProfanity(primaryContact),
      phone,
      email: email.toLowerCase(),
      businessAddress,
      businessLicense,
      contractorLicense,
      insuranceInfo,
      bondingStatus,
      bondingDetails,
      yearsInBusiness: parseInt(yearsInBusiness),
      crewSize: parseInt(crewSize),
      tradesServices: parsedTradesServices,
      otherTradesDetails,
      serviceArea,
      broaderAreaDetails,
      recentProjects: cleanProfanity(recentProjects),
      references: parsedReferences,
      oshaViolations,
      litigationHistory,
      violationsExplanation: cleanProfanity(violationsExplanation),
      agreeToProvideDocuments: true,
      agreeToSiteRules: true,
      ...fileFields,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await preferredBidder.save();

    res.status(201).json({ 
      message: 'Application submitted successfully! We will review your information and follow up within 10 business days.',
      applicationId: preferredBidder._id
    });

  } catch (error) {
    console.error('Error submitting preferred bidder application:', error);
    
    // Clean up uploaded files if there was an error
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }
    
    res.status(500).json({ message: 'Error submitting application. Please try again.' });
  }
});

// Get all applications (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const applications = await PreferredBidder.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await PreferredBidder.countDocuments(query);
    
    res.json({
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single application (admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const application = await PreferredBidder.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    
    const application = await PreferredBidder.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewNotes,
        reviewedBy: req.user.email,
        reviewedAt: new Date()
      },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
