# Next-Gen Learning Dashboard 🎓

A futuristic, highly animated education platform dashboard built with Next.js 14, Supabase, and Framer Motion.

## 🚀 Live Demo

[Your Vercel link will go here after deployment]

## 📋 Features

- Bento Grid Dashboard layout
- Server-Side data fetching from Supabase
- Framer Motion animations (staggered page loads, spring hovers)
- Collapsible sidebar with layout animations
- Dynamic course cards with animated progress bars
- Activity chart with clickable day details
- Complete settings page with profile editing
- Dark theme with glowing gradients

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (PostgreSQL database)
- Framer Motion (Animations)
- Lucide React (Icons)

## 🏗️ Architecture Decisions

### Server vs Client Components

| Component | Type | Reason |
|-----------|------|--------|
| Dashboard page.tsx | Server | Direct Supabase data fetching |
| Courses page | Client | Interactive hover states |
| Activity page | Client | Clickable bars and popups |
| Settings page | Client | Form inputs and toggles |
| Sidebar | Client | Collapsible state management |

### Why This Split?

Server Components fetch data from Supabase directly without exposing secrets to the client. Client Components handle animations, state, and user interactions.

## 📦 Environment Variables

Create a `.env.local` file in the root directory with:
NEXT_PUBLIC_SUPABASE_URL=https://ikstvgeozgxenkktrlfg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrc3R2Z2Vvemd4ZW5ra3RybGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDYwMzYsImV4cCI6MjA5NTg4MjAzNn0.X0bgNQ-zWpoqepxdItkn1ldc5W4cmg4dLr9e02at0q8


## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/learning-dashboard.git

# Go into the project
cd learning-dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev




