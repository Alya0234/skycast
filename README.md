# SkyCast — Weather App

A beautiful React weather app powered by the free [Open-Meteo API](https://open-meteo.com/) — no API key required.

## Features

- Search any city worldwide with autocomplete
- Use your current location (GPS)
- Current conditions with temperature, humidity, wind, sunrise/sunset
- 24-hour hourly forecast
- 7-day daily forecast
- Day/night themed hero card
- Responsive design for mobile and desktop

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to GitHub Pages

1. Log in to GitHub CLI (one-time):
   ```bash
   gh auth login
   ```
2. Run the publish script from the project folder:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\publish-github.ps1
   ```

The GitHub Actions workflow deploys automatically on every push to `main`.

Live URL: **https://\<your-github-username\>.github.io/weather-app/**

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18
- Vite 6
- Open-Meteo Geocoding + Forecast APIs
