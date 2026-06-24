import express from 'express';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// All wishlist routes are protected
router.use(protect);

// @route   GET /api/wishlist
// @desc    Get logged-in user's wishlist
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/wishlist
// @desc    Add a destination to wishlist
router.post('/', async (req, res) => {
  const { destination } = req.body;

  if (!destination) {
    return res.status(400).json({ message: 'Destination is required' });
  }

  try {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(destination)) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    user.wishlist.push(destination);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/wishlist
// @desc    Remove a destination from wishlist
router.delete('/', async (req, res) => {
  const { destination } = req.body;

  if (!destination) {
    return res.status(400).json({ message: 'Destination is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(d => d !== destination);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
