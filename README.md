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

https://github.com/[username]/task-management/blob/main/demo/kiruthika_Ponnan.mov

This repository uses Git LFS to handle the demo video file. To properly clone and view the demo:

1. Make sure you have Git LFS installed:
```bash
git lfs install
```

2. Clone the repository:
```bash
git clone <repository-url>
```

The demo video will be downloaded automatically when you clone the repository.

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

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Tasks
- GET /api/tasks - Get all tasks for authenticated user
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
