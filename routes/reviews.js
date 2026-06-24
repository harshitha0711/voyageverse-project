import express from 'express';
import Review from '../models/Review.js';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews (public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(20);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/reviews/my
// @desc    Get current user's reviews (protected)
router.get('/my', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review (protected)
router.post('/', protect, async (req, res) => {
  const { destination, rating, comment } = req.body;

  if (!destination || !rating || !comment) {
    return res.status(400).json({ message: 'Destination, rating and comment are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const user = await User.findById(req.user.id).select('name email');
    const displayName = user.name || user.email.split('@')[0];

    const review = await Review.create({
      user: req.user.id,
      userName: displayName,
      destination,
      rating: Number(rating),
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (protected, owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
