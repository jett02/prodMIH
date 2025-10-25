import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String, // Cloudinary URL
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  website: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0 // For sorting partners
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for sorting
partnerSchema.index({ order: 1, createdAt: 1 });

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
