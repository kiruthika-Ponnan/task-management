#!/bin/bash

# Install Docker Desktop if not installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Create frontend .env file
echo "Creating frontend .env file..."
echo "REACT_APP_API_URL=http://localhost:4000/api" > .env

# Install the missing @types/node package
echo "Installing @types/node..."
npm install --save-dev @types/node

# Go back to the root directory
cd ..

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "Error: Docker is not running. Please start Docker Desktop from your Applications folder."
    echo "After starting Docker Desktop, run this script again."
    exit 1
fi

# Start the application
echo "Starting the application..."
docker-compose up