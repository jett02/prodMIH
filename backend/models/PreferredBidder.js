import mongoose from 'mongoose';

const preferredBidderSchema = new mongoose.Schema({
  // Company Information
  companyName: { type: String, required: true },
  primaryContact: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  businessAddress: { type: String, required: true },
  
  // Business Credentials
  businessLicense: { type: String },
  contractorLicense: { type: String },
  insuranceInfo: { type: String, required: true },
  insuranceCOI: { type: String }, // File path
  bondingStatus: { type: String, enum: ['yes', 'no'], required: true },
  bondingDetails: { type: String },
  
  // Experience & Capabilities
  yearsInBusiness: { type: Number, required: true },
  crewSize: { type: Number, required: true },
  tradesServices: [{ type: String, required: true }],
  otherTradesDetails: { type: String },
  serviceArea: { type: String, enum: ['metro-omaha', 'broader'], required: true },
  broaderAreaDetails: { type: String },
  
  // Performance & Background
  recentProjects: { type: String },
  projectFiles: [{ type: String }], // Array of file paths
  references: [{
    name: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    project: { type: String, required: true }
  }],
  oshaViolations: { type: String, enum: ['yes', 'no'], required: true },
  litigationHistory: { type: String, enum: ['yes', 'no'], required: true },
  violationsExplanation: { type: String },
  
  // Compliance & Verification
  agreeToProvideDocuments: { type: Boolean, required: true },
  agreeToSiteRules: { type: Boolean, required: true },
  capabilityStatement: { type: String }, // File path
  
  // Application Status
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'under-review'], 
    default: 'pending' 
  },
  reviewNotes: { type: String },
  reviewedBy: { type: String },
  reviewedAt: { type: Date },
  
  // Metadata
  submittedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
});

// Index for efficient queries
preferredBidderSchema.index({ email: 1 });
preferredBidderSchema.index({ companyName: 1 });
preferredBidderSchema.index({ status: 1 });
preferredBidderSchema.index({ submittedAt: -1 });

export default mongoose.model('PreferredBidder', preferredBidderSchema);
