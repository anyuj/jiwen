FROM oven/bun:1.3.14 AS base

WORKDIR /app

FROM base AS build-tools
ENV TURBO_TELEMETRY_DISABLED=1
RUN bun add -g turbo@2.9.18

FROM build-tools AS pruner
COPY . .
RUN turbo prune app --docker --out-dir out

FROM build-tools AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .

RUN bun install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

ENV NODE_ENV=production

RUN turbo run build --filter=app --only

FROM oven/bun:1.3.14-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

COPY --from=installer --chown=bun:bun /app/apps/app/.output ./apps/app/.output

USER bun
WORKDIR /app/apps/app
EXPOSE 8080

ENTRYPOINT ["bun", "run", ".output/server/index.mjs"]
