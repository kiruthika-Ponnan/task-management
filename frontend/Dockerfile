FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY public/ public/
COPY src/ src/

# Start the app
EXPOSE 3000
CMD ["npm", "start"] 