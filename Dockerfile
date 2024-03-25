FROM node:21-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
#COPY .env.production.sample .env.production
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 9005

ENV NEXTJS_PORT 9005
ENV DIRECT_AUTH_DATABASE_URL=""
ENV DIRECT_CHAT_DATABASE_URL=""
ENV DATABASE_URL_ACCELERATE=""
ENV POSTGRES_USER=""
ENV POSTGRES_PASSWORD=""
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=""
ENV CLOUDFLARE_TURNSTILE_SECRET_KEY=""
ENV NEXTAUTH_URL=""
ENV NEXTAUTH_SECRET=""
ENV SMTP_GMAIL_EMAIL=""
ENV SMTP_GMAIL_PASSWORD=""
ENV JWT_USER_ID_SECRET=""
ENV AUTH_GOOGLE_ID=""
ENV AUTH_GOOGLE_SECRET=""
ENV WEBSOCKET_PORT=""
ENV NODE_ENV=production

CMD ["node", "server.js"]