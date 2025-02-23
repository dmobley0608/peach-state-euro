FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy env file before the rest of the files
COPY .env .env.local

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3003

CMD ["npm", "start"]
