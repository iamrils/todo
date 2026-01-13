# Todo App - Authentication & Todo List Web Application

A full-stack web application for managing todos with authentication, built using Next.js, PostgreSQL, and modern React libraries.

## Features

- **User Authentication**: Sign up and login functionality with secure password hashing
- **Todo Management**: Create, read, update, and delete todos
- **Filtering & Search**: Search todos by title or description, filter by completion status
- **Pagination**: Display todos with page navigation (10 items per page)
- **Protected Routes**: All todo operations require authentication
- **Responsive UI**: Clean and intuitive user interface with Tailwind CSS
- **Data Persistence**: PostgreSQL database with Prisma ORM

## Tech Stack

| Category         | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | Next.js 15 (App Router)      |
| Language         | TypeScript                   |
| Frontend         | React 19                     |
| Database         | PostgreSQL                   |
| ORM              | Prisma                       |
| Authentication   | NextAuth.js                  |
| Data Fetching    | TanStack Query (React Query) |
| Data Display     | TanStack Table               |
| State Management | Zustand                      |
| Styling          | Tailwind CSS                 |
| UI Components    | shadcn/ui                    |
| Form Handling    | React Hook Form              |
| Icons            | Lucide React                 |

## Project Structure

```
sti/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/route.ts    # NextAuth API route
│   │   │   ├── todos/
│   │   │   │   ├── route.ts                   # GET/POST todos
│   │   │   │   └── [id]/route.ts              # GET/PUT/DELETE specific todo
│   │   │   └── register/route.ts              # User registration
│   │   ├── login/page.tsx                     # Login page
│   │   ├── register/page.tsx                  # Registration page
│   │   ├── todos/
│   │   │   ├── page.tsx                       # Todo list with pagination
│   │   │   ├── create/page.tsx                # Create todo page
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx                   # Todo detail page
│   │   │   │   └── edit/page.tsx              # Edit todo page
│   │   ├── layout.tsx                         # Root layout
│   │   ├── page.tsx                           # Home redirect
│   │   ├── globals.css                        # Global Tailwind CSS
│   │   └── providers.tsx                      # React Query provider
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx                     # Button component
│   │   │   ├── input.tsx                      # Input component
│   │   │   ├── label.tsx                      # Label component
│   │   │   ├── dialog.tsx                     # Dialog component
│   │   │   └── textarea.tsx                   # Textarea component
│   │   ├── TodoForm.tsx                       # Reusable todo form
│   │   └── DeleteConfirmationDialog.tsx       # Delete confirmation modal
│   ├── lib/
│   │   ├── auth.ts                            # NextAuth configuration
│   │   ├── prisma.ts                          # Prisma client
│   │   ├── store.ts                           # Zustand store
│   │   └── utils.ts                           # Utility functions
│   └── middleware.ts                          # Route protection middleware
├── prisma/
│   ├── schema.prisma                          # Database schema
│   └── seed.js                                # Database seeding script
├── tailwind.config.ts                         # Tailwind CSS config
├── tsconfig.json                              # TypeScript config
├── package.json                               # Dependencies
└── README.md                                  # This file
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL 12+ (or Docker)
- npm or pnpm
- Docker & Docker Compose (for containerized development)

### Option 1: Local Development (Recommended)

#### 1. Clone and Install

```bash
cd todo
pnpm install
```

#### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sti_db"
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret key with:

```bash
openssl rand -base64 32
```

#### 3. Database Setup

```bash
# Ensure PostgreSQL is running and create database
createdb sti_db

# Run Prisma migrations
pnpm db:push

# Seed the database with sample data
pnpm db:seed
```

#### 4. Run the Application

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Option 2: Docker Development (Hot Reload)

The application includes Docker setup for development with hot reload support.

#### 1. Environment Variables

Create a `.env.local` file (optional, defaults are provided):

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/sti_db"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="sti_db"
DB_PORT="5432"
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
APP_PORT="3000"
```

#### 2. Start with Docker Compose

```bash
docker-compose up
```

This will:

- Start PostgreSQL database
- Build and start the Next.js application
- Run database migrations
- Seed the database
- Enable hot reload for code changes

The application will be available at `http://localhost:3000`

#### 3. Stop the Application

```bash
docker-compose down
```

### 5. Test Credentials

After seeding, use these credentials to login:

- **Email**: test@example.com
- **Password**: password123

## Architecture Overview

### Frontend Architecture

- **Page-based routing**: Next.js App Router for intuitive page structure
- **Component composition**: Reusable components (TodoForm, DeleteConfirmationDialog)
- **Data fetching**: TanStack Query for server state management with automatic caching
- **UI state**: shadcn/ui components for consistent, accessible interface
- **Client-side state**: Zustand for lightweight, global state management
- **Session management**: SessionProvider from NextAuth.js for client-side session access

### Backend Architecture

- **API routes**: Next.js API routes for RESTful endpoints
- **Authentication**: NextAuth.js v4 with Credentials provider for session management
- **Authorization**:
  - Next.js middleware for page-level route protection
  - API route guards using `getServerSession` for authenticated endpoints
  - Automatic CSRF token handling
- **Database**: Prisma ORM for type-safe database operations
- **Validation**: Server-side validation for all API endpoints

### Middleware Implementation

The application uses Next.js middleware (`src/middleware.ts`) to:

- Protect todo-related pages from unauthenticated access
- Redirect unauthorized users to login page
- Allow public access to login and register pages
- Skip middleware for API routes (allowing NextAuth to handle them)
- Redirect authenticated users away from login/register pages

### Database Schema

```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String?
  password  String
  todos     Todo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean @default(false)
  userId      Int
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Key Technical Decisions & Justifications

### 1. State Management: Zustand

**Choice**: Zustand for todo detail state management

**Justification**:

- **Simplicity**: Minimal boilerplate compared to Redux or Context API
- **Performance**: Zustand uses shallow comparison, avoiding unnecessary re-renders
- **Bundle size**: Small library (~2KB) with no external dependencies
- **Use case fit**: Perfect for managing a single todo entity's state across detail and edit pages
- **Alternatives considered**:
  - Redux: Would be overkill for this simple use case with verbose boilerplate
  - React Context: Would require additional hooks and more code; not optimized for frequent updates
  - React Query cache: Could work but is better suited for server state, not client-side mutations

The store in [lib/store.ts](src/lib/store.ts) manages the selected todo during navigation between detail, edit, and list pages, enabling smooth transitions without refetching.

### 2. Data Fetching: TanStack Query (React Query)

**Choice**: TanStack Query for server state management

**Justification**:

- **Automatic caching**: Eliminates manual cache management and prevents duplicate requests
- **Synchronization**: Automatically refreshes stale data in the background
- **Development experience**: Query hooks simplify async data handling in React
- **Built-in pagination support**: Integrates seamlessly with paginated APIs
- **Refetching**: One-line refetch on mutations keeps UI in sync with server

### 3. Data Display: TanStack Table

**Choice**: TanStack Table for todo list display

**Justification**:

- **Headless design**: Complete flexibility in styling and customization with Tailwind CSS
- **Performance**: Efficient virtual scrolling for large datasets (though pagination limits our need)
- **Composition**: Build complex tables from simple primitives
- **Type safety**: Full TypeScript support for column definitions
- **Features**: Easy to add sorting, filtering, and other table features in the future

### 4. Authentication: NextAuth.js v4

**Choice**: NextAuth.js v4 with Credentials provider and SessionProvider

**Justification**:

- **Built for Next.js**: Seamless integration with App Router and middleware
- **Session management**: Automatic handling of JWT tokens and session cookies
- **Security**: Secure password hashing with bcryptjs, CSRF protection by default
- **Flexibility**: Credentials provider for custom authentication logic
- **Middleware integration**: Easy route protection with Next.js middleware
- **Client-side session**: SessionProvider wrapper enables `useSession()` hook in components

**Implementation Details**:

- Uses `getServerSession(authOptions)` in API routes for server-side session verification
- SessionProvider wraps the application for client-side session access
- Middleware verifies `next-auth.session-token` cookie to protect routes
- CSRF tokens handled automatically by NextAuth.js

### 5. UI Framework: shadcn/ui with Tailwind CSS

**Choice**: shadcn/ui components with Tailwind CSS styling

**Justification**:

- **Composable**: Copy-paste components that can be customized
- **Unstyled foundation**: Tailwind CSS allows complete design control
- **Accessibility**: Built on Radix UI with proper ARIA labels
- **Consistency**: Tailwind's utility classes ensure consistent styling across the app
- **No runtime overhead**: Components are just React with CSS, no JavaScript dependencies

### 6. Development Environment: Docker

**Choice**: Docker with Docker Compose for local development

**Justification**:

- **Consistency**: Same environment across development, testing, and production
- **Hot reload**: Volume mounts enable file watching for instant updates
- **Database**: PostgreSQL container eliminates local database setup
- **Simplicity**: Single `docker-compose up` command to start entire stack
- **Isolation**: Project dependencies isolated from system
- **Team productivity**: New team members can start developing with one command

## API Endpoints

### Authentication

- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `POST /api/register` - User registration

### Todos

- `GET /api/todos` - List todos with pagination, search, and filtering
  - Query params: `page`, `search`, `completed`
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Features Implementation

### Create Todo

- Dedicated form page at `/todos/create`
- Reusable `TodoForm` component handles validation and submission
- Automatic redirect to todo list after successful creation

### Read Todo

- List view at `/todos` with pagination (10 items per page)
- Detail view at `/todos/[id]` shows full todo information
- Server-side pagination with filtering and search

### Update Todo

- Edit page at `/todos/[id]/edit` reuses `TodoForm` component
- Pre-populated with todo data for smooth editing experience
- Automatic redirect to detail view after successful update

### Delete Todo

- Confirmation dialog prevents accidental deletion
- Removes todo immediately after user confirmation
- Updates list view automatically

### Search & Filter

- Search by title or description (case-insensitive)
- Filter by completion status (All, Pending, Completed)
- Automatic pagination reset when filters change

## Security Features

1. **Protected Routes**: Middleware redirects unauthenticated users to login
2. **Protected API**: All API routes verify user authentication and authorization
3. **Password Hashing**: bcryptjs with salt rounds = 10
4. **CSRF Protection**: NextAuth.js handles CSRF tokens automatically
5. **Session Management**: Secure JWT-based sessions with configurable expiration
6. **Data Isolation**: Users can only access their own todos via database constraints

## Performance Optimizations

1. **Query Caching**: TanStack Query caches API responses with 5-minute stale time
2. **Pagination**: 10 items per page limits data transfer and rendering
3. **Lazy Loading**: Components load data only when needed
4. **Image Optimization**: Next.js Image component for optimized images (if used)
5. **Code Splitting**: Automatic route-based code splitting with Next.js App Router

## Database Seeding

The seed script creates:

- 1 test user (test@example.com)
- 22 sample todos with realistic titles and descriptions
- Supports pagination and filtering feature testing

Run seeding with:

```bash
pnpm db:seed
```

## Future Enhancements

1. **Collaborative features**: Real-time todo sharing and comments
2. **Due dates**: Add deadline management for todos
3. **Categories/Tags**: Organize todos by category or tags
4. **Recurring todos**: Support for repeating tasks
5. **Push notifications**: Remind users of upcoming deadlines
6. **Export/Import**: Export todos to CSV or JSON
7. **Mobile app**: React Native version of the application

## Troubleshooting

### Database Connection Issues (Local Development)

- Ensure PostgreSQL is running: `pg_isrunning`
- Check `DATABASE_URL` format in `.env.local`
- Verify database exists: `psql -l | grep sti_db`

### Docker Development Issues

- **Containers won't start**:
  - Ensure Docker daemon is running
  - Check port 3000 and 5432 are not in use
  - Run `docker-compose logs` to see detailed error messages
- **Hot reload not working**:
  - Verify volume mount in `docker-compose.yml`: `.:/app`
  - Restart container: `docker-compose restart`
- **Database connection fails in Docker**:
  - Use service name `postgres` instead of `localhost` in connection string
  - Ensure both services are on the same network
  - Check `depends_on` and `healthcheck` in docker-compose.yml

### Authentication Not Working

- Verify `NEXTAUTH_SECRET` is set in `.env.local` or environment
- Ensure `SessionProvider` wrapper is present in `src/app/providers.tsx`
- Clear browser cookies and try again
- Check NextAuth logs in browser console for detailed errors
- Verify middleware allows API routes: `/api/auth/*` paths must be skipped

### API Endpoints Return 401 Unauthorized

- Ensure user is logged in (check for `next-auth.session-token` in cookies)
- Verify the session token is valid
- Check that `getServerSession(authOptions)` is used in API routes

### Seed Script Fails

- Ensure database is created: `createdb sti_db` (local) or wait for container to start (Docker)
- Run migrations first: `pnpm db:push`
- Check database user has proper permissions
- For Docker: Ensure PostgreSQL healthcheck passes before app starts

## Development Notes

### TypeScript & Code Quality

- TypeScript ensures type safety throughout the application
- ESLint configured for code quality and consistency
- React Hook Form minimizes re-renders during form input
- Environment variables required for database and authentication
- All API routes implement proper error handling and validation

### Authentication Flow

1. **Login Page** (`/login`):

   - User submits email and password
   - `signIn("credentials", {...})` from NextAuth client library
   - NextAuth sends credentials to `/api/auth/callback/credentials`

2. **API Route** (`/api/auth/[...nextauth]`):

   - NextAuth handler processes the Credentials provider
   - Calls `authorize()` function in `authOptions` to verify credentials
   - On success: Creates JWT token and session cookie
   - On failure: Returns error

3. **Middleware** (`src/middleware.ts`):

   - Checks for `next-auth.session-token` cookie
   - Protects routes: redirects unauthenticated users to `/login`
   - Allows `/api/*` routes through (NextAuth handles them)
   - Redirects authenticated users away from `/login` and `/register`

4. **Protected API Routes**:

   - Use `getServerSession(authOptions)` to verify session
   - Extract user ID from session
   - Perform database operations with user context
   - Return 401 if unauthorized

5. **Client-Side Session**:
   - `SessionProvider` wrapper enables `useSession()` hook
   - Components can access current user session
   - Automatic refresh of stale sessions

### Database Integration

- Prisma schema defines User and Todo models
- Database enforces data isolation: `onDelete: Cascade` ensures todos are deleted with user
- All queries parameterized to prevent SQL injection
- Migrations managed with `pnpm db:push`

### Styling Approach

- Tailwind CSS utility classes for all styling
- shadcn/ui provides accessible component primitives
- Custom styles in `src/app/globals.css` for global overrides
- Responsive design using Tailwind breakpoints (mobile-first)

## License

This project is part of a skill assessment and is provided as-is for evaluation purposes.
