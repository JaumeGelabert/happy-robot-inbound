# I set an alias for the node version (easier reference)
FROM node:20-alpine AS base

# STAGE 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# STAGE 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# To deploy to railway, we need to set the environment variables
ARG FMCSA_WEB_KEY
ARG API_KEY
ARG NEXT_PUBLIC_HAPPYROBOT_BASE
ARG HAPPYROBOT_API_KEY
ARG HAPPYROBOT_ORG_ID

RUN npm run build

# STAGE 3: Production runtime
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy the db.json file for the API routes
COPY --from=builder /app/db.json ./db.json

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set runtime environment variables from build args
ARG FMCSA_WEB_KEY
ARG API_KEY
ARG NEXT_PUBLIC_HAPPYROBOT_BASE
ARG HAPPYROBOT_API_KEY
ARG HAPPYROBOT_ORG_ID

ENV FMCSA_WEB_KEY=$FMCSA_WEB_KEY
ENV API_KEY=$API_KEY
ENV NEXT_PUBLIC_HAPPYROBOT_BASE=$NEXT_PUBLIC_HAPPYROBOT_BASE
ENV HAPPYROBOT_API_KEY=$HAPPYROBOT_API_KEY
ENV HAPPYROBOT_ORG_ID=$HAPPYROBOT_ORG_ID

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]