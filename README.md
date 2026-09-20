# CampusCycle AI

CampusCycle AI turns discarded campus items into reusable resources. Students can scan an item, receive AI-assisted triage, and match it with nearby campus demand.

## Features

- Image-based item analysis with mock results for local demos
- Reuse, repair, recycle, disposal, and manual-review recommendations
- Campus demand matching with compatibility scores
- Pairing confirmation with confetti feedback
- 3D hover tilt on match cards
- Crimson safety warning and glitch treatment for hazardous results
- Scroll-driven journey, aurora atmosphere, and process film strip
- Admin impact dashboard and AWS reference architecture preview

## Run Locally

Requirements: Node.js 20.19 or newer.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Demo Scan Results

When no API endpoint is configured, the app selects a mock result from the uploaded filename:

| Filename contains | Result |
| --- | --- |
| `hazard`, `chemical`, or `unknown` | Manual review safety warning |
| `cable`, `hdmi`, or `wire` | Reusable HDMI cable with a campus match |
| Anything else | Repairable table fan with campus matches |

## Commands

```powershell
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build
npm run lint      # Run Oxlint
```

## API Configuration

Set `VITE_API_BASE_URL` to an API that exposes a `POST /analyze` endpoint. If it is not set, the app uses the local mock analyzer.

```powershell
$env:VITE_API_BASE_URL = "https://your-api.example.com"
npm run dev
```
