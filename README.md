# Happy Robot Inbound

A Next.js application with Docker support for both development and production environments.

## Important Notes

> ⚠️ **FMCSA API Access**: If you try to hit the FMCSA API, make sure you use a US IP, otherwise you may get 403 errors.

> 🌐 **Live Demo**: See a deployed version here: [https://happy-robot-inbound-production.up.railway.app/](https://happy-robot-inbound-production.up.railway.app/) (deployed in a US server to easy access FMCSA API)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/) (version 20.0+)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- [Git](https://git-scm.com/downloads) (to clone the repository)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd happy-robot-inbound
```

### 2. Environment Variables Setup

The application requires several environment variables. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local 
# OR create manually:
touch .env.local
```

Add the following environment variables to your `.env.local` file:

```env
# API Configuration
API_KEY=your-api-key-here
FMCSA_WEB_KEY=your-fmcsa-web-key
NEXT_PUBLIC_HAPPYROBOT_BASE=localhost:port
HAPPYROBOT_API_KEY=your-happyrobot-api-key
HAPPYROBOT_ORG_ID=your-organization-id
```

> **Note**: Replace the placeholder values with your actual API keys and configuration values.

## Running with Docker

### Option 1: Development Mode (Recommended for Development)

For development with hot reloading:

```bash
# Using npm script (recommended)
npm run docker:dev
```

This will:
- Build the development Docker image
- Start the application on `http://localhost:3001`
- Enable hot reloading for code changes
- Mount your local code directory for real-time updates

### Option 2: Production Mode

For production-like environment:

```bash
# Using npm script (recommended)
npm run docker:prod
```

This will:
- Build the production Docker image
- Start the application on `http://localhost:3000`
- Use optimized production build

## Accessing the Application

Once the container is running:

- **Development mode**: Open [http://localhost:3001](http://localhost:3001)
- **Production mode**: Open [http://localhost:3000](http://localhost:3000)
