# Meal Prep Application

A modern web application built with Next.js for managing meal preparation and restaurant services. This application provides a platform for restaurants to manage their meal prep services and for customers to browse and order prepared meals.

## Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom components
- **Database**: Supabase with PostgreSQL
- **Authentication**: Supabase Auth with Google OAuth
- **Code Quality**: Biome for formatting and linting
- **Development**: Turbopack for faster development experience

## Features

### Core Features
- **Multi-tenant Architecture**: Supports multiple restaurants with tenant isolation
- **Admin Dashboard**: Restaurant management interface for meals, orders, and customers
- **Super-Admin Dashboard**: Global management interface for all tenants
- **Customer Interface**: Browse and order prepared meals from specific restaurants
- **Authentication**: Google OAuth integration with role-based access control
- **Landing Page**: Client-facing marketing website

### User Roles
- **Super-Admin**: Global access across all tenants
- **Admin**: Tenant-scoped access to restaurant management
- **Customers**: Browse and order meals from restaurants

### Technical Features
- Modern UI components with Radix UI primitives
- Responsive design with Tailwind CSS v4
- Code formatting and linting with Biome
- Type-safe development with TypeScript

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
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
bun dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard routes and authentication
│   │   ├── (dashboard)/   # Protected admin dashboard pages
│   │   ├── auth/          # Admin authentication callbacks
│   │   └── login/         # Admin login pages
│   ├── super-admin/       # Super-admin dashboard routes
│   │   ├── (dashboard)/   # Protected super-admin pages
│   │   ├── auth/          # Super-admin authentication callbacks
│   │   └── login/         # Super-admin login pages
│   ├── [restaurantSlug]/  # Dynamic restaurant customer pages
│   └── (components)/      # Landing page components
├── components/            # Reusable UI components
│   ├── custom/            # Custom business logic components
│   └── ui/                # Base UI components (Radix UI wrappers)
├── hooks/                 # Custom React hooks
├── lib/                   # Type definitions and utilities
├── public/               # Static assets
└── utils/                # Database and authentication utilities
```

## Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun run build` - Build the application for production
- `bun start` - Start the production server
- `bun run lint` - Run ESLint for code linting
- `bun run check` - Run Biome checks for code formatting and imports
- `bun run format` - Auto-format code using Biome

## Authentication & Authorization

This application implements a multi-tenant authentication system with role-based access control:

### Authentication Methods
- **Google OAuth**: Primary authentication method for admin users
- **Supabase Auth**: Backend authentication service
- **Email Verification**: OTP-based email confirmation system

### User Roles & Access
- **Super-Admin**: Global access across all restaurant tenants
  - Manage all restaurants and their data
  - Access to super-admin dashboard at `/super-admin`
- **Admin**: Tenant-scoped access to specific restaurant
  - Manage their restaurant's meals, orders, and customers
  - Access to admin dashboard at `/admin`
- **Customers**: Browse and order from specific restaurants
  - Access restaurant pages via `/[restaurantSlug]`

### Database Structure
- **`superusers`**: Global administrators with cross-tenant access
- **`users`**: Restaurant administrators with `tenant_id` scoping
- **Multi-tenant isolation**: All admin data is scoped by `tenant_id`


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Deployed on Vercel
