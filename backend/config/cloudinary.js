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
    params: {
      folder: `makeithome/${folder}`,
      allowed_formats: allowedFormats,
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto', format: 'auto' }
      ],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const random = Math.round(Math.random() * 1E9);
        return `${folder}-${timestamp}-${random}`;
      },
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
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
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
