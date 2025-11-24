import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: '' },
  bio: { type: String, default: '' },
  company: { type: String, default: 'Make It Home' },
  agencyLogo: { type: String, default: '' }, // New field for agency logo
  license: { type: String, default: '' },
  specialties: [{ type: String }],
  socialMedia: {
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Agent', agentSchema);