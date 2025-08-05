# 🎧 AI Playlist Generator

**AI Playlist Generator** is a full-stack, AI-powered music web application that generates custom Spotify or SoundCloud playlists from natural language prompts. Leveraging **Gemini 2.5** via **Spring AI**, it interprets user intent and curates playlists using user data from Spotify or SoundCloud APIs.

🌐 **Live App**: [aiplaylist.ssingh.net](http://aiplaylist.ssingh.net)

---

## 🖼️ Screenshot

![Screenshot Placeholder](screenshot.png)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (React) with TypeScript
- **Styling**: Tailwind CSS, ShadCN
- **Deployment**: Vercel

### Backend (Java Spring Boot Microservices)
- `api-gateway`: Routes and exposes backend endpoints
- `llm-service`: Integrates **Gemini 2.5** via **Spring AI**
- `spotify-service`: Handles Spotify API operations
- `soundcloud-service`: Handles SoundCloud API operations
- `service-registry`: **Eureka Server** for service discovery

### Cloud & DevOps
- **Dockerized** microservices
- **AWS ECS (Fargate)** for serverless container hosting
- **Application Load Balancer (ALB)** for external traffic routing
- **Only the API Gateway** is exposed — all other services are internal

---

## 🌟 Features

- **🎧 AI-Generated Playlists**  
  Enter prompts like _"chill tracks for coding"_ or _"house party in Ibiza"_ and get personalized playlists.

- **🔄 Dual Platform Integration (Spotify & SoundCloud)**  
  Log in with **Spotify** or **SoundCloud**, and use your **library**, **top tracks**, and **top artists** as inspiration for new playlists.

- **🎚️ Customization Controls**
  - **Length**: Short, Medium, or Long playlists
  - **Popularity Slider**: From underground gems to mainstream hits
  - **Creativity Slider**: Toggle between predictable recommendations and creative exploration (via LLM temperature)

- **☁️ Cloud-Native Architecture**  
  Each microservice is containerized and deployed independently on **ECS Fargate**.

- **🔐 Secure Gateway Access Only**  
  User traffic routes through the **API Gateway**. Internal services communicate securely via **Eureka**.

- **🧠 LLM-Driven Music Curation**  
  Uses **Gemini 2.5** through **Spring AI** for genre/style inference, mood alignment, and playlist theming based on prompt context.
