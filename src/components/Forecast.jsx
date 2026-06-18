import { getWeatherInfo, formatDayShort } from '../api/weather';

export default function HourlyForecast({ weather }) {
  const { hourly } = weather;
  const now = new Date();
  const currentHour = now.getHours();

  const hours = hourly.time
    .map((time, i) => ({
      time,
      temp: hourly.temperature_2m[i],
      code: hourly.weather_code[i],
      rain: hourly.precipitation_probability[i],
      hour: new Date(time).getHours(),
    }))
    .filter((h) => h.hour >= currentHour)
    .slice(0, 24);

  return (
    <section className="panel">
      <h2 className="panel-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Hourly Forecast
      </h2>
      <div className="hourly-scroll">
        {hours.map((h) => {
          const info = getWeatherInfo(h.code);
          const label =
            h.hour === currentHour
              ? 'Now'
              : new Date(h.time).toLocaleTimeString([], { hour: 'numeric' });

          return (
            <div className="hourly-item" key={h.time}>
              <span className="hourly-time">{label}</span>
              <span className="hourly-icon">{info.icon}</span>
              <span className="hourly-temp">{Math.round(h.temp)}°</span>
              {h.rain > 0 && <span className="hourly-rain">{h.rain}%</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function DailyForecast({ weather }) {
  const { daily } = weather;

  return (
    <section className="panel">
      <h2 className="panel-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        7-Day Forecast
      </h2>
      <div className="daily-list">
        {daily.time.map((day, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          const rain = daily.precipitation_probability_max[i];

          return (
            <div className="daily-item" key={day}>
              <span className="daily-day">{formatDayShort(day)}</span>
              <span className="daily-icon">{info.icon}</span>
              <span className="daily-label">{info.label}</span>
              {rain > 0 && <span className="daily-rain">{rain}%</span>}
              <span className="daily-temps">
                <span className="temp-high">{Math.round(daily.temperature_2m_max[i])}°</span>
                <span className="temp-low">{Math.round(daily.temperature_2m_min[i])}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
