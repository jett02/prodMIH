import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage configurations for different upload types
const createCloudinaryStorage = (folder, allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const timestamp = Date.now();
      const random = Math.round(Math.random() * 1E9);
      const isGif = file.mimetype === 'image/gif';

      return {
        folder: `makeithome/${folder}`,
        allowed_formats: allowedFormats,
        // Different transformations for GIFs vs other images
        transformation: isGif ? [
          // For GIFs: preserve animation, limit size but don't change format
          { width: 1200, height: 800, crop: 'limit', flags: 'animated' }
        ] : [
          // For other images: normal optimization
          { width: 1200, height: 800, crop: 'limit', quality: 'auto', format: 'auto' }
        ],
        public_id: `${folder}-${timestamp}-${random}`,
        // Preserve original format for GIFs
        format: isGif ? 'gif' : undefined
      };
    },
  });
};

// Storage configurations for different types
export const propertyStorage = createCloudinaryStorage('properties');
export const heroStorage = createCloudinaryStorage('hero');
export const teamStorage = createCloudinaryStorage('team');
export const agentStorage = createCloudinaryStorage('agents');

// Multer configurations
export const propertyUpload = multer({
  storage: propertyStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file limit
    files: 50 // Allow up to 50 files
  }
});

export const heroUpload = multer({
  storage: heroStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit to accommodate GIFs
  fileFilter: (req, file, cb) => {
    // Allow images including GIFs
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP, GIF) are allowed!'), false);
    }
  }
});

export const teamUpload = multer({ 
  storage: teamStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const agentUpload = multer({ 
  storage: agentStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default cloudinary;
