# Meal Prep Application

A modern web application built with Next.js for managing meal preparation and restaurant services. This application provides a platform for restaurants to manage their meal prep services and for customers to browse and order prepared meals.

## Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Development**: Turbopack for faster development experience

## Features

- Restaurant management system
- Customer-facing interface for browsing and ordering meals
- Admin dashboard for managing restaurants and orders
- Modern UI components with Radix UI
- Responsive design with Tailwind CSS
- Landing page for clients.

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm, yarn, pnpm, or bun package manager
- Supabase account and project setup

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd meal-prep
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard routes
│   ├── restaurant/        # Restaurant management routes
│   ├── [restaurantSlug]/  # Dynamic restaurant pages
│   └── (components)/      # Shared components
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── utils/                # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Deployed on Vercel
