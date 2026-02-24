# 🌌 Star Wars Explorer

Welcome! 👋 This project is a modern web application to explore the **Star Wars Universe** interactively.  
It consumes the **Star Wars API (SWAPI)** and includes a simple AI agent for advanced queries.  
The main focus is on UI design and simple, efficient API consumption.

---

## 🎯 Objective

Build a web application that allows users to:

- Explore characters, planets, starships, and vehicles from Star Wars.
- Interact with an AI-powered chat agent for natural language queries.
- Experience a clean, modern, and responsive interface.

The goal is to demonstrate problem-solving skills in structuring a web app and handling API calls effectively.

---

## 🛠️ Tech Stack

**Stack:**

### Frontend

- **Next.js** (v15+ with App Router)  
- **TypeScript**  
- **Tailwind CSS**  

### Design

- **shadcn/ui**
- Responsive, modern UI/UX  
- Focus on patterns and interactions that make the app intuitive  

### Backend / API

- **Next.js server actions** or Node.js backend  
- Integration with **Star Wars API** ([https://swapi.dev/api/](https://swapi.dev/api/))  
- Endpoint ready for AI agent queries with LLM API key  

---

## 📋 Required Features

### 🌟 Core Features

The application include:

1. **Character Explorer**  
2. **Planet Explorer**  
3. **Starship and Vehicle Explorer**  
4. **Main Dashboard** summarizing relevant data  

### 🤖 AI Agent

Include a simple conversational AI chat that:

- Handles natural language queries about Star Wars  
- Provides answers based on SWAPI data  
- Features a modern chat UI  
- Supports an LLM API key via environment variable (OpenAI, Anthropic, etc.)

---

## 🔧 APIs and Resources

### Star Wars API (SWAPI)

- **Base URL**: [https://swapi.dev/api/](https://swapi.dev/api/)  
- **Main Endpoints**:  
  - `/people/` – Characters  
  - `/planets/` – Planets  
  - `/starships/` – Starships  
  - `/vehicles/` – Vehicles  
  - `/films/` – Films  
  - `/species/` – Species  

### AI Agent Endpoint Example

```ts
POST /api/chat
{
  "message": "How many characters are from Tatooine?",
  "context": "star-wars-universe"
}

## 🐳 Running the App

You can run the application in several ways:

### 1️⃣ Using Docker
Build and run the container:

```bash
docker build -t swapi-explorer .
docker run -p 3000:3000 swapi-explorer


### 2️⃣ Using Docker Compose
Build and start all services:

```bash
docker-compose up --build

### 3️⃣ Running Locally
Clone the repo, install dependencies, and start the app:

```bash
git clone https://github.com/your-username/swapi-explorer.git
cd swapi-explorer
npm install
npm run dev