# SAT Practice App

A React web application for SAT test preparation with AI-powered tutoring.

## Features

- **Two SAT sections** — Reading & Writing and Math (digital SAT format)
- **Timed practice** — per-section countdown timers
- **AI Tutor** — click "Ask AI" on any question for step-by-step explanations (powered by Pollinations.ai, free, no API key needed)
- **Score summary** — detailed review with explanations after test completion
- **Question navigation** — jump between questions, track answered status

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 (Vite dev server with hot reload)

## Production Server

```bash
npm install
npm run build
npm start
```

Open http://localhost:3000 (Express serves the built app + AI proxy)

## Docker

```bash
docker build -t sat-practice-app .
docker run -p 3000:3000 sat-practice-app
```

Open http://localhost:3000

## AWS Deployment (EC2)

Deploys to a free-tier EC2 instance with Docker:

```powershell
.\deploy.ps1 -KeyPairName your-key-pair-name
```

Then SSH into EC2 and run:

```bash
sudo docker load -i sat-practice-app.tar
sudo docker run -d -p 3000:3000 --restart always --name sat-app sat-practice-app
```

Requires AWS CLI configured with EC2 and CloudFormation permissions.

## Architecture

```
Browser → Express Server (port 3000)
            ├── GET / → React app (static files from dist/)
            └── POST /api/chat → Pollinations.ai (server-side proxy)
```

The Express server proxies AI requests to avoid browser CORS restrictions.

## Tech Stack

- React 19 + Vite (frontend)
- Express (backend / API proxy)
- React Router (navigation)
- Pollinations.ai (free AI chat, no API key)
- Docker (containerization)
- AWS EC2 (production hosting)
