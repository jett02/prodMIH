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
const createCloudinaryStorage = (folder, allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mov', 'avi', 'webm']) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const timestamp = Date.now();
      const random = Math.round(Math.random() * 1E9);
      const isGif = file.mimetype === 'image/gif';
      const isVideo = file.mimetype.startsWith('video/');

      return {
        folder: `makeithome/${folder}`,
        allowed_formats: allowedFormats,
        resource_type: isVideo ? 'video' : 'image',
        // Different transformations for different file types
        transformation: isVideo ? [
          // For videos: optimize for web, limit size
          { width: 1200, height: 800, crop: 'limit', quality: 'auto', format: 'mp4' }
        ] : isGif ? [
          // For GIFs: preserve animation, limit size but don't change format
          { width: 1200, height: 800, crop: 'limit', flags: 'animated' }
        ] : [
          // For other images: normal optimization
          { width: 1200, height: 800, crop: 'limit', quality: 'auto', format: 'auto' }
        ],
        // Enable async processing for large videos
        eager_async: isVideo,
        eager: isVideo ? [
          { width: 1200, height: 800, crop: 'limit', quality: 'auto', format: 'mp4' }
        ] : undefined,
        public_id: `${folder}-${timestamp}-${random}`,
        // Preserve original format for GIFs, optimize videos to MP4
        format: isGif ? 'gif' : isVideo ? 'mp4' : undefined
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
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit to accommodate videos
  fileFilter: (req, file, cb) => {
    // Allow images and videos
    const allowedMimes = [
      // Images
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      // Videos
      'video/mp4',
      'video/mov',
      'video/avi',
      'video/webm',
      'video/quicktime'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP, GIF) and video files (MP4, MOV, AVI, WebM) are allowed!'), false);
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
