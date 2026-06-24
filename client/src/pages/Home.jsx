import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api';
import WeatherWidget from '../components/WeatherWidget';
import toast from 'react-hot-toast';
import { Calendar, Users, DollarSign, MapPin, Edit2, Trash2, Heart, Star, Send } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  
  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingForm, setBookingForm] = useState({ destination: '', date: '', travelers: 1, budget: '', notes: '' });
  const [editingId, setEditingId] = useState(null);
  
  // Wishlist state
  const [wishlist, setWishlist] = useState([]);
  
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ destination: '', rating: 0, comment: '' });

  // Load data
  useEffect(() => {
    fetchReviews();
    if (user) {
      fetchBookings();
      fetchWishlist();
    }
  }, [user]);

  // --- Fetch Methods ---
  const fetchBookings = async () => {
    try {
      const data = await apiFetch('/bookings');
      setBookings(data || []);
    } catch (e) { console.error('Failed to fetch bookings', e); }
  };

  const fetchWishlist = async () => {
    try {
      const data = await apiFetch('/wishlist');
      setWishlist(data || []);
    } catch (e) { console.error('Failed to fetch wishlist', e); }
  };

  const fetchReviews = async () => {
    try {
      const data = await apiFetch('/reviews');
      setReviews(data || []);
    } catch (e) { console.error('Failed to fetch reviews', e); }
  };

  // --- Booking Handlers ---
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiFetch(`/bookings/${editingId}`, { method: 'PUT', body: JSON.stringify(bookingForm) });
      } else {
        await apiFetch('/bookings', { method: 'POST', body: JSON.stringify(bookingForm) });
      }
      setBookingForm({ destination: '', date: '', travelers: 1, budget: '', notes: '' });
      setEditingId(null);
      fetchBookings();
      toast.success(editingId ? 'Trip updated successfully!' : 'Trip booked successfully!');
    } catch (e) { toast.error('Booking failed: ' + e.message); }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Cancel this trip?")) return;
    try {
      await apiFetch(`/bookings/${id}`, { method: 'DELETE' });
      fetchBookings();
      toast.success('Trip cancelled.');
    } catch (e) { toast.error('Failed to delete: ' + e.message); }
  };

  const editBooking = (b) => {
    setEditingId(b._id);
    setBookingForm({ destination: b.destination, date: b.date, travelers: b.travelers, budget: b.budget || '', notes: b.notes || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Wishlist Handler ---
  const toggleWishlist = async (dest) => {
    if (!user) {
      toast.error("Please sign in to save destinations");
      return;
    }
    const isWishlisted = wishlist.includes(dest);
    try {
      const data = await apiFetch('/wishlist', {
        method: isWishlisted ? 'DELETE' : 'POST',
        body: JSON.stringify({ destination: dest })
      });
      setWishlist(data);
      toast.success(isWishlisted ? `Removed ${dest} from wishlist` : `Added ${dest} to wishlist`);
    } catch (e) { toast.error('Wishlist error: ' + e.message); }
  };

  // --- Review Handlers ---
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.rating) {
      toast.error('Please select a star rating');
      return;
    }
    try {
      await apiFetch('/reviews', { method: 'POST', body: JSON.stringify(reviewForm) });
      setReviewForm({ destination: '', rating: 0, comment: '' });
      fetchReviews();
      toast.success('Review posted!');
    } catch (e) { toast.error('Failed to post review: ' + e.message); }
  };
  
  const deleteReview = async (id) => {
    if (!window.confirm("Delete your review?")) return;
    try {
      await apiFetch(`/reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
      toast.success('Review deleted.');
    } catch (e) { toast.error('Failed to delete review'); }
  };

  const destinations = ['Rome', 'London', 'Paris', 'Tokyo', 'Bali'];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore The World With <span>VoyageVerse</span></h1>
          <p>Plan, book, and share your dream destinations seamlessly.</p>
        </div>
      </section>

      {/* Weather Widget Section */}
      <section className="weather-section">
        <h2>Current Conditions</h2>
        <div className="weather-grid">
          <WeatherWidget city="Rome" country="IT" />
          <WeatherWidget city="London" country="GB" />
          <WeatherWidget city="Paris" country="FR" />
        </div>
      </section>

      {/* Popular Destinations / Wishlist */}
      <section className="destinations-section">
        <h2>Popular Destinations</h2>
        <div className="dest-chips">
          {destinations.map(d => (
            <div key={d} className="dest-chip">
              <MapPin size={16} /> {d}
              <button 
                className={`wishlist-btn ${wishlist.includes(d) ? 'active' : ''}`}
                onClick={() => toggleWishlist(d)}
                title="Toggle Wishlist"
              >
                <Heart size={16} fill={wishlist.includes(d) ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      {user ? (
        <section className="booking-section">
          <div className="booking-grid">
            {/* Booking Form */}
            <div className="booking-form-card">
              <h3>{editingId ? 'Edit Trip' : 'Plan a New Trip'}</h3>
              <form onSubmit={handleBookingSubmit} className="b-form">
                <div className="form-group">
                  <label>Destination</label>
                  <input type="text" required value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} placeholder="e.g. Paris" />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Travelers</label>
                    <input type="number" min="1" required value={bookingForm.travelers} onChange={e => setBookingForm({...bookingForm, travelers: parseInt(e.target.value)})} />
                  </div>
                  <div className="form-group">
                    <label>Budget ($)</label>
                    <input type="number" value={bookingForm.budget} onChange={e => setBookingForm({...bookingForm, budget: e.target.value})} placeholder="Optional" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea rows="2" value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})} placeholder="Any special requests?"></textarea>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn">{editingId ? 'Update Trip' : 'Book Now'}</button>
                  {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setBookingForm({ destination: '', date: '', travelers: 1, budget: '', notes: '' }); }}>Cancel</button>}
                </div>
              </form>
            </div>

            {/* My Bookings */}
            <div className="my-bookings">
              <h3>My Upcoming Trips</h3>
              {bookings.length === 0 ? (
                <div className="empty-state">No trips planned yet. Time to book!</div>
              ) : (
                <div className="bookings-list">
                  {bookings.map(b => (
                    <div key={b._id} className="booking-card">
                      <div className="bc-header">
                        <h4>{b.destination}</h4>
                        <span className="status-badge upcoming">Upcoming</span>
                      </div>
                      <div className="bc-details">
                        <span><Calendar size={14}/> {b.date}</span>
                        <span><Users size={14}/> {b.travelers} {b.travelers > 1 ? 'Travelers' : 'Traveler'}</span>
                        {b.budget && <span><DollarSign size={14}/> {b.budget}</span>}
                      </div>
                      <div className="bc-actions">
                        <button onClick={() => editBooking(b)} className="btn-icon"><Edit2 size={14}/></button>
                        <button onClick={() => deleteBooking(b._id)} className="btn-icon danger"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="cta-section">
          <h2>Ready to plan your next adventure?</h2>
          <p>Sign in to start booking and saving your favorite destinations.</p>
        </section>
      )}

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-header">
          <h2>Traveler Reviews</h2>
        </div>
        
        {user && (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <h4>Share your experience</h4>
            <div className="form-group-row">
              <input type="text" required placeholder="Destination" value={reviewForm.destination} onChange={e => setReviewForm({...reviewForm, destination: e.target.value})} className="review-dest-input" />
              <div className="star-rating">
                {[1,2,3,4,5].map(star => (
                  <Star 
                    key={star} 
                    size={24} 
                    className={star <= reviewForm.rating ? 'active' : ''} 
                    onClick={() => setReviewForm({...reviewForm, rating: star})}
                    fill={star <= reviewForm.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
            <div className="review-input-group">
              <input type="text" required placeholder="Write a comment..." value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} />
              <button type="submit" className="btn btn-icon"><Send size={18} /></button>
            </div>
          </form>
        )}

        <div className="reviews-grid">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map(r => (
              <div key={r._id} className="review-card">
                <div className="rc-header">
                  <div className="avatar">{(r.userName || 'U')[0].toUpperCase()}</div>
                  <div className="rc-meta">
                    <strong>{r.userName}</strong>
                    <span>📍 {r.destination}</span>
                  </div>
                </div>
                <div className="rc-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} className={i < r.rating ? "active" : "inactive"} />)}
                </div>
                <p>"{r.comment}"</p>
                {user && r.user === user._id && (
                  <button onClick={() => deleteReview(r._id)} className="delete-review"><Trash2 size={14}/></button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
