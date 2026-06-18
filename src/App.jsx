import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast, { DailyForecast } from './components/Forecast';
import { getWeather } from './api/weather';

const DEFAULT_CITY = {
  id: 2643743,
  name: 'London',
  latitude: 51.50853,
  longitude: -0.12574,
  country: 'United Kingdom',
  admin1: 'England',
};

export default function App() {
  const [location, setLocation] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city.latitude, city.longitude);
      setWeather(data);
      setLocation(city);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, [fetchWeather]);

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const city = {
          id: 'geo',
          name: 'Your Location',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          country: '',
          admin1: '',
        };
        await fetchWeather(city);
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  }

  return (
    <div className="app">
      <div className="app-bg" aria-hidden="true" />

      <header className="header">
        <div className="brand">
          <span className="brand-icon">⛅</span>
          <span className="brand-name">SkyCast</span>
        </div>
        <div className="header-actions">
          <SearchBar onSelect={fetchWeather} loading={loading} />
          <button
            type="button"
            className="geo-btn"
            onClick={handleUseLocation}
            disabled={loading}
            title="Use my location"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </button>
        </div>
      </header>

      <main className="main">
        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button type="button" onClick={() => fetchWeather(location)}>Retry</button>
          </div>
        )}

        {loading && !weather && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Fetching weather data...</p>
          </div>
        )}

        {weather && (
          <div className={`weather-grid ${loading ? 'loading' : ''}`}>
            <CurrentWeather weather={weather} location={location} />
            <div className="forecast-column">
              <HourlyForecast weather={weather} />
              <DailyForecast weather={weather} />
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        Powered by{' '}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </footer>
    </div>
  );
}
