# OpenRouter – Multi-Provider LLM Gateway

OpenRouter is a scalable backend service that provides a unified API to interact with multiple Large Language Model (LLM) providers such as OpenAI, Claude, Gemini, and others.  
The system is designed with reliability, provider failover, credit management, and clean architecture in mind, making it suitable for building production-grade AI applications.

---

## Features

### 🤖 Multi-Provider LLM Support
- Unified interface for multiple LLM providers
- Currently supports:
  - OpenAI
  - Claude
  - Gemini
  - DeepSeek
- Easily extensible to add new providers

---

### 🔄 Provider Failover
- Automatic provider switching if one provider fails
- Improves reliability and uptime
- Ensures requests are completed even when a provider is unavailable

---

### 💳 Credit & Usage Management
- Tracks user credits
- Deducts credits per request
- Prevents usage when credits are exhausted
- Designed for SaaS-style AI APIs

---

### 🔐 Authentication & API Keys
- Secure API key based authentication
- Users can create and manage API keys
- Each request is validated using API keys

---

### ⚡ Transaction Safety
- Database transactions ensure:
  - Atomic credit deduction
  - Request tracking
  - Data consistency

---

### 📊 Request Logging
- Logs every LLM request
- Stores provider used
- Stores responses and metadata
- Helps debugging and analytics

---

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

### LLM Providers
- OpenAI
- Claude (Anthropic)
- Gemini (Google)
- DeepSeek

### Database
- PostgreSQL

### Infrastructure
- Turborepo (Monorepo architecture)
- Environment-based configuration
- Modular provider architecture

---

## Project Structure

```
openrouter
│
├── apps
│   ├── api-backend          
│   └── dashboard-frontend   
|   └── primary-backend
│
├── packages
│   ├── db                   
│   └── config              
│
└── turbo.json              
```

---

## How It Works

### 1️⃣ API Request

Client sends a request to the OpenRouter API with:

- API Key
- Model name
- Prompt / messages

---

### 2️⃣ Authentication

The system:

- Validates API key
- Fetches associated user
- Checks remaining credits

---

### 3️⃣ Provider Selection

The router selects the appropriate provider based on:

- Requested model
- Provider availability
- Failover logic

---

### 4️⃣ Provider Execution

Request is sent to the provider:

- OpenAI
- Claude
- Gemini
- DeepSeek

If a provider fails, the router automatically switches to another provider.

---

### 5️⃣ Response Handling

The system:

- Stores request metadata
- Deducts user credits
- Returns the LLM response to the client

---

## Run Locally

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Git

---

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/openrouter.git
cd openrouter
```

---

### Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

---

### Setup Environment Variables

Create a `.env` file in the backend:

```
DATABASE_URL=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
DEEPSEEK_API_KEY=
JWT_SECRET=
```

---

### Run Database Migration

```bash
npx prisma migrate dev
```

---

### Start the Development Server

```bash
npm run dev
```

---
