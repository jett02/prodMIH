import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number },
  estimatedPrice: { type: Number }, // For upcoming properties
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number },
  description: { type: String },
  thumbnail: { type: String, default: '' },
  images: [{ type: String }],
  type: { 
    type: String, 
    enum: ['sale', 'rental'], 
    required: function() {
      return this.status !== 'upcoming'
    }
  },
  futureType: {
    type: String,
    enum: ['sale', 'rental'],
    required: function() {
      return this.status === 'upcoming'
    }
  },
  buildingType: {
    type: String,
    enum: ['house', 'townhouse', 'condo', 'apartment'],
    default: 'house'
  },
  status: { 
    type: String, 
    enum: ['available', 'pending', 'sold', 'rented', 'upcoming'], 
    default: 'available' 
  },
  features: [{ type: String }],

  // Extended Property Information
  exterior: {
    lotSize: { type: String, default: '' },
    yearBuilt: { type: Number },
    roofType: { type: String, default: '' },
    exteriorMaterial: { type: String, default: '' },
    landscaping: { type: String, default: '' }
  },

  interior: {
    flooring: { type: String, default: '' },
    heating: { type: String, default: '' },
    cooling: { type: String, default: '' },
    appliances: [{ type: String }],
    fireplace: { type: Boolean, default: false },
    basement: { type: String, default: '' }, // None, Finished, Unfinished, Partial
    laundry: { type: String, default: '' }
  },

  parking: {
    type: { type: String, default: '' }, // Garage, Carport, Driveway, Street, None
    spaces: { type: Number, default: 0 },
    garageType: { type: String, default: '' }, // Attached, Detached, Built-in
    description: { type: String, default: '' }
  },

  hoa: {
    hasHOA: { type: Boolean, default: false },
    fee: { type: Number, default: 0 },
    frequency: { type: String, default: '' }, // Monthly, Quarterly, Annually
    amenities: [{ type: String }],
    restrictions: { type: String, default: '' }
  },

  location: {
    county: { type: String, default: '' },
    neighborhood: { type: String, default: '' },
    schoolDistrict: { type: String, default: '' },
    walkScore: { type: Number, default: 0 }
  },

  building: {
    stories: { type: Number, default: 1 },
    totalUnits: { type: Number, default: 1 }, // For condos/apartments
    petPolicy: { type: String, default: '' },
    accessibility: [{ type: String }],
    utilities: [{ type: String }],
    security: [{ type: String }]
  },

  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    default: null
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Property', propertySchema);









