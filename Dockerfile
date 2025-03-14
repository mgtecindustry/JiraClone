# Stage 1: Base
FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /

# Stage 2: Dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 3: Builder
FROM base AS builder
COPY --from=deps /node_modules ./node_modules
COPY . .  

# Construim aplicația
RUN npm run build || echo 'Ignoring build errors'

# Stage 4: Runner (Production)
FROM base AS runner
WORKDIR /

ENV NODE_ENV=production

# Copiem fișierele necesare din builder
COPY --from=builder /public ./public
COPY --from=builder /.next ./.next

# Copiem package.json pentru a instala doar dependențele de producție
COPY package.json package-lock.json* ./

RUN npm install --production

# Expunem portul pe care rulează aplicația
EXPOSE 3000

CMD ["node", ".next/standalone"]
