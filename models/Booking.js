import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  travelers: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  budget: {
    type: Number,
    required: false
  },
  notes: {
    type: String,
    trim: true,
    required: false
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
