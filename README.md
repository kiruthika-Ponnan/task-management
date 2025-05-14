# Task Management Application

A full-stack task management application built with React, Node.js, and PostgreSQL.

## Features

- User authentication (registration and login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- User-specific task lists
- Modern, responsive UI with Tailwind CSS
- Real-time error handling and loading states

## Demo

[![Task Management App Demo](https://img.youtube.com/vi/eiZA-2tYIeg/maxresdefault.jpg)](https://youtu.be/eiZA-2tYIeg)

Click the image above to watch the demo video on YouTube.

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Zustand for state management
- Axios for API communication

### Backend
- Node.js with Express
- TypeScript
- TypeORM for database management
- JWT for authentication
- Zod for input validation

### Database
- PostgreSQL
- Migrations for schema management
- Triggers for timestamp handling

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Bash shell (for setup script)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management
```

2. Run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

The setup script will:
- Create necessary environment files
- Set up default environment variables
- Initialize the database with required tables
- Install dependencies for both frontend and backend
- Build the Docker images
- Start the application


The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000


## Project Structure

```
task-management/
├── frontend/           # React application
├── backend/           # Express API server
├── db/                # Database initialization
├── docker-compose.yml # Docker configuration
└── setup.sh           # Setup script for initial configuration
```

## Codebase Overview

### Frontend Architecture
The frontend is built with React and TypeScript, featuring a modern component-based architecture:
- `components/` - Reusable UI components (forms, buttons, task items)
- `pages/` - Main application views (login, registration, dashboard)
- `store/` - Zustand stores for state management (auth, tasks)
- `api/` - API integration layer with axios
- `types/` - TypeScript interfaces and type definitions
- `utils/` - Helper functions and utilities

### Backend Architecture
The backend follows a layered architecture pattern:
- `controllers/` - Request handlers for auth and tasks
- `entities/` - TypeORM entities for User and Task
- `middleware/` - Authentication and validation middleware
- `routes/` - API route definitions
- `services/` - Business logic layer
- `config/` - Configuration management

### Database Schema
PostgreSQL database with two main tables:
- `users` - Stores user information and authentication details
- `tasks` - Stores task data with foreign key relationship to users

### Docker Configuration
The application uses a multi-container setup with Docker Compose:

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://user:password@db:5433/taskdb
      - JWT_SECRET=your-secret-key

  db:
    image: postgres:15
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=taskdb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Key features of the Docker setup:
- Isolated containers for each service
- Volume mounting for database persistence
- Environment variable configuration
- Inter-container networking
- Hot-reload enabled for development

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Tasks
- GET /api/tasks - Get all tasks for authenticated user
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

