import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// Get rental properties
router.get('/', async (req, res) => {
  try {
    const rentals = await Property.find({ type: 'rental' }).sort({ createdAt: -1 });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;