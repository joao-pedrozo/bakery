# Cake Baking Application 🍰

A Node.js application built with Elysia, MongoDB, and BullMQ that simulates a cake baking process with background job processing.

## Features

- **Cake Management**: Create and manage cakes with different flavors, sizes, and cooking times
- **Background Processing**: Uses BullMQ with Redis to process cake baking jobs asynchronously
- **Real-time Status Updates**: Cakes transition through states (pending → cooking → done/failed)
- **RESTful API**: Clean API endpoints for cake operations
- **Database Integration**: MongoDB for persistent storage
- **Comprehensive Testing**: Integration tests for all service functions

## Tech Stack

- **Framework**: [Elysia](https://elysiajs.com/) - Fast and lightweight web framework
- **Database**: MongoDB with Mongoose ODM
- **Queue**: BullMQ with Redis for background job processing
- **Runtime**: Bun

## Prerequisites

- [Bun](https://bun.sh/) installed
- Docker and Docker Compose
- Git

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd bakery
bun install
```

### 2. Start Services

```bash
# Start MongoDB and Redis containers
bun run docker:up
```

### 3. Run the Application

```bash
# Development mode with hot reload
bun run dev
```

The server will start at `http://localhost:3000`

## API Endpoints

### Users

- `GET /users` - List all users
- `POST /users` - Create a new user

### Posts

- `GET /posts` - List all posts with author details
- `POST /posts` - Create a new post

### Cakes 🍰

- `GET /cakes` - List all cakes
- `POST /cakes` - Request a new cake to be baked

#### Create Cake Example

```bash
curl -X POST http://localhost:3000/cakes \
  -H "Content-Type: application/json" \
  -d '{
    "flavor": "chocolate",
    "size": "large",
    "cookingTime": 5000
  }'
```

#### Cake Response

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "flavor": "chocolate",
  "size": "large",
  "cookingTime": 5000,
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Cake Model

| Field         | Type   | Required | Default   | Description                                    |
| ------------- | ------ | -------- | --------- | ---------------------------------------------- |
| `flavor`      | String | ✅       | -         | Cake flavor (e.g., "chocolate", "vanilla")     |
| `size`        | String | ❌       | "medium"  | Size: "small", "medium", or "large"            |
| `cookingTime` | Number | ❌       | 3000      | Cooking time in milliseconds                   |
| `status`      | String | ❌       | "pending" | Status: "pending", "cooking", "done", "failed" |
| `createdAt`   | Date   | ❌       | Date.now  | Creation timestamp                             |
| `updatedAt`   | Date   | ❌       | Date.now  | Last update timestamp                          |

## Background Processing

The application uses BullMQ with Redis to process cake baking jobs:

1. **Job Creation**: When a cake is created via API, it's automatically added to the queue
2. **Processing**: Background worker picks up jobs and simulates cooking time
3. **Status Updates**: Cake status transitions from "pending" → "cooking" → "done"
4. **Error Handling**: Failed jobs are marked as "failed"

### Queue Configuration

- **Queue Name**: `cake-queue`
- **Redis Connection**: `redis://localhost:6379`
- **Job Retention**: 100 completed/failed jobs
- **Default Cooking Time**: 3 seconds

## Testing

### Run All Tests

```bash
bun test
```

### Run Specific Test Suites

```bash
# Cake service tests
bun test src/services/cakeService.spec.ts

# User service tests
bun test src/services/userService.spec.ts
```

### Test Database Setup

```bash
# Setup test database
bun run test:setup

# Run tests
bun test

# Cleanup
bun run test:cleanup
```

## Docker Services

The application uses Docker Compose for local development:

- **MongoDB**: `localhost:27017` (main database)
- **MongoDB Test**: `localhost:27018` (test database)
- **Redis**: `localhost:6379` (queue processing)

### Docker Commands

```bash
# Start all services
bun run docker:up

# Stop all services
bun run docker:down

# View logs
bun run docker:logs
```

## Project Structure

```
src/
├── db/
│   └── index.ts          # Database connection
├── models/
│   ├── userModel.ts      # User schema
│   ├── postModel.ts      # Post schema
│   └── cakeModel.ts      # Cake schema
├── services/
│   ├── userService.ts    # User business logic
│   ├── cakeService.ts    # Cake business logic
│   └── *.spec.ts         # Service tests
├── routes/
│   ├── userRoutes.ts     # User endpoints
│   ├── postRoutes.ts     # Post endpoints
│   └── cakeRoutes.ts     # Cake endpoints
├── queue/
│   └── cakeQueue.ts      # BullMQ queue and worker
└── index.ts              # Application entry point
```

## Environment Variables

| Variable    | Default                                 | Description               |
| ----------- | --------------------------------------- | ------------------------- |
| `MONGO_URI` | `mongodb://localhost:27017/elysia_demo` | MongoDB connection string |
| `REDIS_URL` | `redis://localhost:6379`                | Redis connection string   |

## Development

### Adding New Features

1. Create model in `src/models/`
2. Implement service logic in `src/services/`
3. Add routes in `src/routes/`
4. Write tests in `src/services/*.spec.ts`
5. Register routes in `src/index.ts`

### Code Style

- Use TypeScript for type safety
- Follow existing patterns for consistency
- Write comprehensive tests for new features
- Use meaningful variable and function names

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests to ensure everything works
6. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Happy Baking! 🍰✨**
