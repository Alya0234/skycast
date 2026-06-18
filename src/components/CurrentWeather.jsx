import { getWeatherInfo, formatTime, windDirection } from '../api/weather';

export default function CurrentWeather({ weather, location }) {
  const { current, daily } = weather;
  const info = getWeatherInfo(current.weather_code);
  const isDay = current.is_day === 1;

  return (
    <section className={`hero ${isDay ? 'hero-day' : 'hero-night'}`}>
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-location">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <div>
            <h1>{location.name}</h1>
            <p>{[location.admin1, location.country].filter(Boolean).join(', ')}</p>
          </div>
        </div>

        <div className="hero-main">
          <span className="hero-icon">{info.icon}</span>
          <div className="hero-temp">
            <span className="temp-value">{Math.round(current.temperature_2m)}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>

        <p className="hero-condition">{info.label}</p>
        <p className="hero-feels">
          Feels like {Math.round(current.apparent_temperature)}°C
        </p>

        <div className="hero-stats">
          <Stat label="Humidity" value={`${current.relative_humidity_2m}%`} />
          <Stat label="Wind" value={`${Math.round(current.wind_speed_10m)} km/h ${windDirection(current.wind_direction_10m)}`} />
          <Stat
            label="Sunrise"
            value={formatTime(daily.sunrise[0])}
          />
          <Stat
            label="Sunset"
            value={formatTime(daily.sunset[0])}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}
