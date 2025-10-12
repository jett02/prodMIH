import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['general-inquiry', 'sell-to-us', 'property-inquiry'], 
    default: 'general-inquiry' 
  },
  subject: String,
  propertyId: String, // For property inquiries
  agentEmail: String, // For property inquiries
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);


