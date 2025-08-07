# Taste Haven Restaurant Ordering App

## Overview

Taste Haven is a full-stack web application for a restaurant food ordering system. The application allows customers to browse a menu, add items to their cart, and place orders with delivery information. Built with a modern tech stack including React, Express, PostgreSQL, and shadcn/ui components, it provides a seamless online ordering experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

### Premium Design System Implementation
- **Date**: January 6, 2025
- **Changes**: Implemented comprehensive premium food-themed design system
  - Color palette: Deep orange (#FF6F00), rich red (#D84315), soft cream (#FFF3E0)
  - Typography: Inter font family for modern, professional look
  - Premium component classes with hover effects and animations
  - Enhanced visual hierarchy across all pages

### Logo Creation and Branding
- **Date**: January 6, 2025
- **Changes**: Created custom SVG logo for Taste Haven
  - Main logo: Plate with steam, fork & spoon icons, "Taste Haven" text
  - Icon version: Simplified version for favicon and small displays
  - Integrated logo into navbar and footer components
  - Updated HTML meta tags and page title

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme (warm orange theme)
- **State Management**: 
  - Zustand for cart state management with persistence
  - TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for menu items and orders
- **Data Storage**: In-memory storage with sample data (prepared for database integration)
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with Vite integration in development mode

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (via Neon serverless)
- **Schema**: Defined in shared TypeScript files with proper type inference
- **Tables**: 
  - `menu_items`: Restaurant menu with categories, pricing, and availability
  - `orders`: Customer orders with contact info, items, and pricing breakdown

### Authentication & Authorization
- Currently using basic session-based approach with connect-pg-simple
- No complex user authentication system implemented
- Orders are processed without user accounts (guest checkout)

### Build & Deployment
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Development**: Single command starts both frontend and backend
- **Production**: Static frontend served by Express with API routes
- **Environment**: Configured for Replit deployment with error overlays

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **zustand**: Client-side state management for cart functionality

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Form & Validation
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration with Zod validation
- **zod**: Schema validation for both client and server
- **drizzle-zod**: Integration between Drizzle and Zod for type safety

### Development Tools
- **vite**: Fast build tool and development server
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for development

### Third-party Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Unsplash**: Image hosting for menu item photos (via CDN URLs)
- **Replit**: Development and hosting platform integration