<p align="center">
  <img src="https://img.icons8.com/fluency/96/calendar.png" alt="Eventra Logo" width="80" />
</p>

<h1 align="center">Eventra</h1>

<p align="center">
  <strong>The Ultimate Event Discovery & Creation Platform</strong><br />
  Discover, create, and manage amazing events with ease. A high-performance, AI-enhanced platform for modern event management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Convex-Backend-24A69A?style=for-the-badge&logo=convex&logoColor=white" alt="Convex" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

---

## 🌟 Overview

**Eventra** is a state-of-the-art event management SaaS platform built for speed and elegance. Whether you're an organizer looking to host a global conference or an attendee searching for local workshops, Eventra provides the tools to connect, register, and manage everything in one place.

Powered by a real-time backend and enhanced with AI, Eventra offers a seamless experience from discovery to registration.

## ✨ Key Features

- 📅 **Seamless Event Creation** — Host events with ease using our intuitive creation suite, complete with location services and date picking.
- 🔍 **Real-time Discovery** — Instantly search and filter through thousands of events with lightning-fast reactive updates powered by Convex.
- 🎟️ **Instant Registration** — Securely register for events and receive unique QR codes for easy check-in.
- 🤖 **AI-Enhanced Details** — Leverage Google Gemini to generate compelling event descriptions and assist in event planning.
- 🖼️ **Unsplash Integration** — Beautiful, high-quality event banners integrated directly from the Unsplash library.
- 🔐 **Premium Authentication** — Secure, modern login experience powered by Clerk with full support for dark mode.
- 📊 **Dynamic Dashboard** — Track your registrations, managed events, and attendee lists in a sleek, unified dashboard.
- 🎨 **Modern Aesthetics** — A stunning, responsive UI built with Tailwind CSS v4, Framer Motion, and Glassmorphism effects.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **Convex** account (for real-time backend)
- **Clerk** account (for authentication)
- **Google AI Studio** API Key (for Gemini features)
- **Unsplash** Access Key (for image integration)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/eventra.git

# Navigate to project
cd eventra

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory and populate it with your credentials:

```env
# Convex Configuration
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_JWT_ISSUER_DOMAIN=

# Third-Party Integrations
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
GEMINI_API_KEY=
```

### 3. Launch Development Environment

```bash
# Start the Next.js dev server
npm run dev

# In a separate terminal, start the Convex dev environment
npx convex dev
```

Visit `http://localhost:3000` to explore Eventra.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 15+](https://nextjs.org) | High-performance React framework |
| **Backend** | [Convex](https://convex.dev) | Real-time database and serverless functions |
| **Authentication** | [Clerk](https://clerk.com) | Modern identity and user management |
| **AI Engine** | [Google Gemini](https://ai.google.dev) | AI-powered event content assistance |
| **Animations** | [Framer Motion](https://motion.dev) | Fluid UI transitions and micro-interactions |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Cutting-edge utility-first styling |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Crafted with precision for the modern event ecosystem.
</p>
