# -----------------------------------------------------
# Stage 1: Install dependencies
# -----------------------------------------------------
    FROM node:20-alpine AS deps
    WORKDIR /app
    
    COPY package.json package-lock.json* ./
    RUN npm ci
    
    # -----------------------------------------------------
    # Stage 2: Build application
    # -----------------------------------------------------

    # Stage 2: Build
    FROM node:20-alpine AS builder
    WORKDIR /app

    # Copiamos dependencias
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .

    # Build-args para prerendering
    ARG NEXT_PUBLIC_SWAPI_BASE_URL
    ARG IS_DOCKER

    ENV NEXT_PUBLIC_SWAPI_BASE_URL=$NEXT_PUBLIC_SWAPI_BASE_URL
    ENV IS_DOCKER=$IS_DOCKER


    RUN npm run build
    
    # -----------------------------------------------------
    # Stage 3: Production runtime
    # -----------------------------------------------------
    FROM node:20-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
    
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    
    EXPOSE 3000
    
    USER nextjs
    
    CMD ["node", "server.js"]