# SAT Practice App

A React web application for SAT test preparation with AI-powered tutoring.

## Features

- **Two SAT sections** — Reading & Writing and Math (digital SAT format)
- **Timed practice** — per-section countdown timers
- **AI Tutor** — click "Ask AI" on any question for step-by-step explanations (powered by Pollinations.ai, free, no API key)
- **Score summary** — detailed review with explanations after test completion
- **Question navigation** — jump between questions, track answered status

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Docker

```bash
docker build -t sat-practice-app .
docker run -p 8080:80 sat-practice-app
```

Open http://localhost:8080

## AWS Deployment

Deploys as a static site on S3 + CloudFront:

```powershell
.\deploy.ps1
```

Requires AWS CLI configured with appropriate permissions.

## Tech Stack

- React 19 + Vite
- React Router
- Pollinations.ai (free AI chat)
- Nginx (Docker serving)
- AWS S3 + CloudFront (production hosting)
