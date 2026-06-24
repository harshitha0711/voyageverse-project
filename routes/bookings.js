import express from 'express';
import Booking from '../models/Booking.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Apply protection to all booking routes
router.use(protect);

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', async (req, res) => {
  const { destination, date, travelers, budget, notes, status } = req.body;

  if (!destination || !date) {
    return res.status(400).json({ message: 'Destination and date are required' });
  }

  try {
    const booking = await Booking.create({
      user: req.user.id,
      destination,
      date,
      travelers,
      budget,
      notes,
      status: status || 'upcoming'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings for the logged-in user
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update a booking
router.put('/:id', async (req, res) => {
  const { destination, date, travelers, budget, notes } = req.body;

  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check user ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this booking' });
    }

    // Update fields
    booking.destination = destination || booking.destination;
    booking.date = date || booking.date;
    booking.travelers = travelers !== undefined ? travelers : booking.travelers;
    booking.budget = budget !== undefined ? budget : booking.budget;
    booking.notes = notes !== undefined ? notes : booking.notes;
    booking.status = status || booking.status;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check user ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
