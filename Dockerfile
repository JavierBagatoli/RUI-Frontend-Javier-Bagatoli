FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.20.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "dist/RUI-Frontend-Javier-Bagatoli/browser", "-l", "80"]