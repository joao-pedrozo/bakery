# Bakery App - Bun Workspace

This is a monorepo using Bun workspaces with an API backend and a Nuxt.js frontend.

## Project Structure

```
├── packages/
│   ├── api/          # Elysia.js backend API
│   │   ├── src/
│   │   │   ├── db/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── queue/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/          # Nuxt.js frontend
│       ├── pages/
│       ├── assets/
│       ├── app.vue
│       ├── nuxt.config.ts
│       └── package.json
├── docker-compose.yml
├── package.json      # Root workspace configuration
└── README.md
```

## Prerequisites

- [Bun](https://bun.sh/) installed
- Docker and Docker Compose (for MongoDB and Redis)

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Infrastructure Services

```bash
bun run docker:up
```

This will start:

- MongoDB on port 27017
- Redis on port 6379
- MongoDB test instance on port 27018

### 3. Development

#### Run API only

```bash
bun run dev
# or
bun run --filter=api dev
```

#### Run Web only

```bash
bun run dev:web
# or
bun run --filter=web dev
```

#### Run both API and Web

```bash
bun run dev:all
```

### 4. Access Applications

- **API**: http://localhost:3000
- **Web**: http://localhost:3001 (Nuxt default port)

## Available Scripts

### Root Level Scripts

- `bun run dev` - Start API development server
- `bun run dev:web` - Start Web development server
- `bun run dev:all` - Start both API and Web servers
- `bun run test` - Run tests
- `bun run docker:up` - Start Docker services
- `bun run docker:down` - Stop Docker services
- `bun run docker:logs` - View Docker logs

### API Package Scripts

- `bun run dev` - Start development server with watch mode
- `bun run test` - Run API tests
- `bun run test:integration` - Run integration tests

### Web Package Scripts

- `bun run dev` - Start Nuxt development server
- `bun run build` - Build for production
- `bun run generate` - Generate static site
- `bun run preview` - Preview production build

## Technology Stack

### Backend (API)

- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: MongoDB with Mongoose
- **Queue**: BullMQ with Redis
- **Language**: TypeScript

### Frontend (Web)

- **Framework**: Nuxt.js 3.14.0
- **Runtime**: Bun
- **Language**: TypeScript/Vue.js

### Infrastructure

- **Containerization**: Docker Compose
- **Database**: MongoDB 7.0
- **Cache/Queue**: Redis 7

## Development Notes

- The API runs on port 3000
- The Web frontend runs on port 3001 (Nuxt default)
- MongoDB runs on port 27017
- Redis runs on port 6379
- Test MongoDB runs on port 27018

## Testing

```bash
# Run all tests
bun run test

# Run API tests only
bun run --filter=api test

# Setup test environment
bun run test:setup

# Cleanup test environment
bun run test:cleanup
```

## Contributing

1. Make your changes
2. Run tests: `bun run test`
3. Commit using conventional commits: `bun run commit`
