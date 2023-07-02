# Build Stage
FROM node:18-alpine AS build-stage
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install 
RUN npm ci 

COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS production-stage
WORKDIR /app

COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/.next ./.next

RUN npm install --only=production --ignore-scripts

CMD ["npm", "start"]
