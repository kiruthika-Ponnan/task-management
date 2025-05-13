FROM node:18-alpine

WORKDIR /app

# Install netcat for wait-for script
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

# Make scripts executable
RUN chmod +x ./wait-for ./docker-entrypoint.sh

RUN npm run build

EXPOSE 4000

CMD ["./docker-entrypoint.sh"] 