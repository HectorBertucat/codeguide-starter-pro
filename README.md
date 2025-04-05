[![CodeGuide](/codeguide-backdrop.svg)](https://codeguide.dev)


# Seoptimizer - Internal SEO Tool

Seoptimizer is an internal web-based tool designed for SEO agencies to streamline client work management and task execution. It features a powerful SEO Writing Tool that guides content creation through step-by-step reasoning and competitor analysis.

## Features

- **SEO Writing Tool:** Craft high-quality, SEO-optimized content through a guided multi-step process:
  - Keyword analysis with YourText.guru integration
  - Content structure generation
  - AI-powered content creation
  - Semantic analysis and competitor benchmarking

- **Role-Based Access Control:**
  - Internal team dashboard with full access to all features
  - Client interface with curated reports and comment functionality

- **Task Management:**
  - Manage articles, backlinks, and technical SEO tasks
  - Track progress and deadlines for each client

- **AI Model Integration:**
  - Supports multiple AI models (Claude 3.5 Sonnet, GPT-4, Gemini 2.5 Pro)
  - Custom model selection for different content types

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Supabase/Postgres, Clerk Auth
- **DevOps:** Docker, GitHub Actions
- **AI & Integrations:** OpenAI, Claude, Gemini, YourText.guru

## Middleware

Authentication middleware is handled by `middleware.ts` using Clerk (`clerkMiddleware`). It checks for a valid session (`userId`) on protected routes (currently `/dashboard/**` and `/seo-tool/**`) defined using `createRouteMatcher`. If a user is not authenticated when accessing a protected route, they are redirected to `/sign-in` with the original destination preserved as a `redirect_url` parameter.

*Note:* There have been inconsistencies between runtime behavior and linter/type checking regarding the usage of `auth()` within the middleware. The current implementation uses a manual check for `userId` and `NextResponse.redirect` as the most stable approach observed during development.

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- Python 3.x (for headless browser automation)
- Supabase account
- Clerk Auth account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/seoptimizer.git
   cd seoptimizer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your own credentials for:
   - Clerk Auth
   - Supabase
   - AI model APIs (if applicable)

4. Run the development server:
   ```
   npm run dev
   ```

5. Visit `http://localhost:3000` to see the application.

## Project Structure

- `/app`: Next.js 14 App Router pages and API routes
- `/components`: Reusable UI components
- `/services`: API client services for data fetching
- `/lib`: Utility functions and database types
- `/supabase`: Supabase migration files
- `/public`: Static assets

## Development Workflow

### Database Migrations

Migrations are stored in the `/supabase/migrations` directory. When you make changes to the database schema, create a new migration file with a timestamp.

### Adding New Features

1. Create the appropriate UI components in `/components`
2. Add API routes in `/app/api`
3. Create service functions in `/services`
4. Implement the frontend pages in `/app`

## Deployment

The application is configured to be deployed on a Hostinger VPS with the following specs:
- 2 vCPUs
- 8GB RAM
- 100GB NVMe storage

Deployment is handled via GitHub Actions with Docker for containerization.

## License

[Your License Here]

## Contributing

[Contribution Guidelines]
