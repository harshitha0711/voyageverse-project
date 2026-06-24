import React, { useState, useEffect } from 'react';
import { Cloud, ThermometerSun, Clock, Sun, CloudRain, Snowflake } from 'lucide-react';
import { apiFetch } from '../api';

export default function WeatherWidget({ city, country }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/weather?city=${city}&country=${country}`)
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city, country]);

  const getLocalTime = (timezone) => {
    const localTime = new Date(new Date().getTime() + timezone * 1000);
    return localTime.toUTCString().slice(17, 22); // HH:MM
  };

  if (loading) return <div className="weather-card loading">Loading...</div>;
  if (!weather || !weather.main) return <div className="weather-card error">Weather N/A</div>;

  // Dynamic colors based on weather condition
  const condition = weather.weather[0].main.toLowerCase();
  let bgGradient = 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'; // default clouds
  let Icon = Cloud;
  let iconColor = '#60A5FA';

  if (condition === 'clear') {
    bgGradient = 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)';
    Icon = Sun;
    iconColor = '#F59E0B';
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    bgGradient = 'linear-gradient(135deg, #f1f2b5 0%, #135058 100%)';
    Icon = CloudRain;
    iconColor = '#3B82F6';
  } else if (condition.includes('snow')) {
    bgGradient = 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)';
    Icon = Snowflake;
    iconColor = '#9CA3AF';
  }

  // Modern vibrant styling
  const cardStyle = {
    background: bgGradient,
    color: condition.includes('rain') || condition.includes('snow') ? '#F9FAFB' : '#1F2937',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  const textStyle = {
    color: condition.includes('rain') || condition.includes('snow') ? '#E5E7EB' : '#4B5563',
  };

  return (
    <div className="weather-card" style={cardStyle}>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.25rem', color: cardStyle.color }}>
        <Icon size={24} color={iconColor} fill={iconColor} />
        {city}
      </h4>
      <div className="weather-details" style={textStyle}>
        <div className="w-item" style={{ fontWeight: '600', color: cardStyle.color, fontSize: '1.1rem' }}>
          <ThermometerSun size={18} color="#EF4444" /> 
          <span>{weather.main.temp.toFixed(1)}°C</span>
        </div>
        <div className="w-item">
          <Cloud size={16} color={iconColor} />
          <span className="capitalize">{weather.weather[0].description}</span>
        </div>
        <div className="w-item">
          <Clock size={16} color="#8B5CF6" />
          <span>{getLocalTime(weather.timezone)} Local Time</span>
        </div>
      </div>
    </div>
  );
}
