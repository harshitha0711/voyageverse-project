import express from 'express';

const router = express.Router();

// @route   GET /api/weather
// @desc    Get weather for a specific city and country
router.get('/', async (req, res) => {
  const { city, country } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city || !country) {
    return res.status(400).json({ message: 'City and country are required' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch weather data' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
