# Backend Learning & Project Plan

## 1. Goal

Build a real-world full-stack project while systematically learning backend development.

The main goal is **not only to build the application**, but to understand how the backend works internally and how frontend, backend, databases, caching, authentication, real-time communication, and infrastructure interact with each other.

### Current background

* 3+ years of frontend development experience
* Strong knowledge of React / Next.js / TypeScript
* Basic backend knowledge
* Some experience with NestJS
* Goal: become confident with backend concepts and eventually be able to work as a full-stack developer

---

# 2. Project

## AI Marketplace

We will build an AI Marketplace / platform that allows users to interact with AI-related products or services.

The project should be complex enough to demonstrate real backend concepts without becoming unnecessarily large.

The project will include:

* User registration and authentication
* User profiles
* Roles and permissions
* AI products/services
* Search and filtering
* Favorites
* Conversations / chat
* Real-time notifications
* File uploads
* Background processing
* Caching
* Database relations
* Admin functionality

The exact business functionality can evolve during development.

---

# 3. Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query

## Backend

* NestJS
* TypeScript
* Prisma
* PostgreSQL
* Redis
* Socket.IO
* JWT
* BullMQ

## Infrastructure

* Docker
* Docker Compose
* Turborepo

---

# 4. Monorepo Structure

The project will be organized as a monorepo.

```text
ai-marketplace/

├── apps/
│   ├── frontend/        # Next.js
│   └── backend/         # NestJS
│
├── packages/
│   ├── shared-types/
│   ├── eslint-config/
│   └── ts-config/
│
├── docs/
│   └── backend-learning-plan.md
│
├── docker-compose.yml
├── package.json
└── turbo.json
```

The purpose of the monorepo is also educational: understand how frontend and backend applications can share types and configuration while remaining separate applications.

---

# 5. Backend Learning Roadmap

## Phase 1 — NestJS Fundamentals

### Learn

* NestJS architecture
* Modules
* Controllers
* Services
* Dependency Injection
* Providers
* DTOs
* Pipes
* Validation
* Exception filters
* Guards
* Interceptors
* Middleware
* Configuration
* Environment variables

### Build

Create the initial backend structure:

```text
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── chat/
│   ├── notifications/
│   └── common/
```

### Goal

Understand how a request travels through a NestJS application:

```text
HTTP Request
    ↓
Middleware
    ↓
Guard
    ↓
Controller
    ↓
Service
    ↓
Database
    ↓
Response
```

---

# 6. Phase 2 — SQL & PostgreSQL

PostgreSQL will be the primary database.

## Learn SQL

* SELECT
* INSERT
* UPDATE
* DELETE
* WHERE
* ORDER BY
* GROUP BY
* HAVING
* LIMIT / OFFSET
* JOIN
* INNER JOIN
* LEFT JOIN
* Subqueries
* Aggregations

## Database concepts

* Tables
* Rows
* Columns
* Primary keys
* Foreign keys
* Constraints
* Unique constraints
* Indexes
* Transactions
* ACID
* Normalization

## Relationships

Implement and understand:

### One-to-One

```text
User → Profile
```

### One-to-Many

```text
User → Products
```

### Many-to-Many

```text
Users ↔ Products
```

For example:

```text
users
products
favorites
```

where `favorites` connects users and products.

## Goal

Be able to understand what Prisma generates and what actually happens in PostgreSQL.

---

# 7. Phase 3 — Prisma ORM

Use Prisma as the primary ORM.

## Learn

* Prisma schema
* Models
* Relations
* Migrations
* Prisma Client
* CRUD
* Filtering
* Sorting
* Pagination
* Nested queries
* Transactions
* Relations
* Indexes

Example:

```ts
const users = await prisma.user.findMany({
  include: {
    profile: true,
    products: true,
  },
});
```

## Important rule

Do not treat Prisma as a replacement for SQL knowledge.

We should always understand:

```text
Prisma query
      ↓
Generated SQL
      ↓
PostgreSQL
```

Later, briefly study TypeORM to understand the alternative ORM approach and recognize it in existing NestJS projects.

---

# 8. Phase 4 — Authentication & Authorization

Implement a complete authentication system.

## Registration

```text
POST /auth/register
```

* Email
* Password
* Password hashing
* Validation

## Login

```text
POST /auth/login
```

Use:

* Access Token
* Refresh Token

## Learn

* Authentication vs Authorization
* JWT
* Access tokens
* Refresh tokens
* Password hashing
* Cookies
* HTTP-only cookies
* Guards
* Roles
* Permissions
* RBAC

Example:

```text
USER
ADMIN
MODERATOR
```

## Backend flow

```text
Request
   ↓
JWT
   ↓
Auth Guard
   ↓
User
   ↓
Role Guard
   ↓
Controller
```

---

# 9. Phase 5 — Redis

Redis will be used as more than just a cache.

## Learn

* In-memory databases
* Key-value storage
* TTL
* Expiration
* Caching
* Rate limiting
* Sessions
* Pub/Sub
* Queues

## Use Redis for

### 1. Caching

Example:

```text
product:123
search:ai:page:1
```

Flow:

```text
Request
   ↓
Redis
   ↓
Cache hit → return data
```

If there is no cache:

```text
Request
   ↓
Redis miss
   ↓
PostgreSQL
   ↓
Save result to Redis
   ↓
Return response
```

### 2. Rate limiting

Example:

```text
100 requests / minute
```

### 3. Background jobs

Use:

```text
BullMQ + Redis
```

Example:

```text
User uploads file
        ↓
Create background job
        ↓
Redis
        ↓
Worker
        ↓
Process file
        ↓
Update database
        ↓
Notify user
```

---

# 10. Phase 6 — WebSockets

Implement real-time communication using Socket.IO and NestJS WebSockets.

## Use cases

### Chat

```text
User A
   ↓
WebSocket
   ↓
Backend
   ↓
User B
```

### Notifications

For example:

```text
"You received a new message"
```

### Real-time status

```text
Online
Offline
Typing...
```

## Learn

* WebSocket vs HTTP
* Persistent connections
* Socket.IO
* WebSocket Gateway
* Events
* Rooms
* Broadcasting
* Authentication with WebSockets
* Connection lifecycle

---

# 11. Phase 7 — Background Jobs

Use BullMQ + Redis.

Implement jobs such as:

* File processing
* Email sending
* Notifications
* AI processing simulation
* Cleanup tasks

Understand:

```text
HTTP Request
      ↓
Create Job
      ↓
Redis
      ↓
Queue
      ↓
Worker
      ↓
Process
      ↓
Database
```

Learn:

* Queues
* Workers
* Jobs
* Retries
* Delayed jobs
* Failed jobs
* Job status

---

# 12. Phase 8 — File Uploads

Implement file uploading.

Learn:

* Multipart/form-data
* File validation
* File size limits
* MIME types
* Object storage concepts
* Presigned URLs

The ideal architecture should eventually look like:

```text
Frontend
   ↓
Backend
   ↓
Generate presigned URL
   ↓
Object Storage
   ↓
Upload directly
```

The backend should not necessarily handle large files directly.

---

# 13. Phase 9 — API Design

Build a proper REST API.

Learn:

* REST
* HTTP methods
* Status codes
* Request / response structure
* DTOs
* Validation
* Pagination
* Filtering
* Sorting
* Error handling
* API versioning
* Idempotency

Example:

```text
GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

Understand why:

```text
GET   → idempotent
PUT   → idempotent
POST  → generally not idempotent
```

---

# 14. Phase 10 — Docker

Containerize the project.

Services:

```text
frontend
backend
postgres
redis
```

Example:

```text
Docker Compose
       ↓
┌───────────────┐
│ Frontend      │
├───────────────┤
│ Backend       │
├───────────────┤
│ PostgreSQL    │
├───────────────┤
│ Redis         │
└───────────────┘
```

Learn:

* Docker images
* Containers
* Dockerfile
* Docker Compose
* Volumes
* Networks
* Environment variables
* Container communication

---

# 15. Phase 11 — Testing

Learn backend testing.

## Unit tests

Test services independently.

## Integration tests

Test:

```text
API
 ↓
Service
 ↓
Database
```

## E2E tests

Test complete user flows:

```text
Register
 ↓
Login
 ↓
Create product
 ↓
Search product
 ↓
Send message
```

---

# 16. Phase 12 — Architecture

After the basic application works, study backend architecture.

Learn:

* Separation of concerns
* Dependency Injection
* SOLID
* Repository pattern
* Service layer
* DTO layer
* Domain modules
* Error handling
* Logging
* Configuration
* Environment separation

Possible architecture:

```text
Controller
    ↓
Service
    ↓
Repository / Prisma
    ↓
PostgreSQL
```

---

# 17. Database Strategy

The project should intentionally use different storage technologies for different purposes.

```text
PostgreSQL
    ↓
Primary persistent relational data

Redis
    ↓
Cache
Sessions
Rate limiting
Queues
Temporary data

Object Storage
    ↓
Files

Optional NoSQL
    ↓
Learn later after SQL + Redis
```

Do not introduce NoSQL just for the sake of using it.

The goal is to understand **why** a particular database is chosen.

---

# 18. Optional Phase — NoSQL

After PostgreSQL and Redis are understood, study a NoSQL database.

Possible choice:

```text
DynamoDB
```

Learn:

* NoSQL concepts
* Partition keys
* Sort keys
* Access patterns
* Denormalization
* Eventual consistency
* CAP theorem
* SQL vs NoSQL trade-offs

The important question should always be:

> Why would I choose NoSQL instead of PostgreSQL for this particular problem?

---

# 19. Final Architecture

The target architecture will eventually look approximately like this:

```text
                         ┌───────────────┐
                         │   Next.js     │
                         │   Frontend    │
                         └───────┬───────┘
                                 │
                         HTTP / WebSocket
                                 │
                                 ▼
                         ┌───────────────┐
                         │    NestJS     │
                         │    Backend    │
                         └───────┬───────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
       ┌───────────┐       ┌───────────┐       ┌───────────┐
       │ PostgreSQL│       │   Redis   │       │  Storage  │
       │           │       │           │       │           │
       └───────────┘       └─────┬─────┘       └───────────┘
                                 │
                                 ▼
                           ┌───────────┐
                           │  BullMQ   │
                           │  Workers  │
                           └───────────┘
```

---

# 20. Learning Principles

This project should be treated as a **learning project**, not only a coding project.

For every technology, answer three questions:

### 1. What is it?

Example:

> Redis is an in-memory key-value data store.

### 2. Why do we need it?

Example:

> We use Redis for fast temporary data access, caching, rate limiting, and queues.

### 3. What problem does it solve?

Example:

> It prevents us from querying PostgreSQL for data that can be served from a fast cache.

---

# 21. Priority

The order matters.

### High priority

1. NestJS
2. PostgreSQL
3. SQL
4. Prisma
5. Authentication
6. Authorization
7. Redis
8. WebSockets
9. Background jobs
10. Docker

### Medium priority

11. File uploads
12. Testing
13. Backend architecture
14. API design
15. Performance
16. Logging

### Later

17. DynamoDB / NoSQL
18. Advanced distributed systems
19. Microservices
20. Deployment / AWS

---

# 22. Definition of Done

The project should eventually allow a user to:

```text
Register
   ↓
Login
   ↓
View profile
   ↓
Browse products
   ↓
Search / filter
   ↓
Create a product
   ↓
Upload files
   ↓
Interact with another user
   ↓
Send real-time messages
   ↓
Receive notifications
```

Behind the scenes:

```text
PostgreSQL
   → persistent data

Prisma
   → database access

Redis
   → cache / rate limit / temporary data

BullMQ
   → background jobs

WebSockets
   → real-time communication

JWT
   → authentication

NestJS
   → backend architecture

Docker
   → local infrastructure

Turborepo
   → monorepo
```

---

# 23. How We Will Work Together

When continuing this project, use this document as the source of truth for the learning roadmap.

For each phase:

1. Learn the theory
2. Explain the concept in simple terms
3. Implement it in the project
4. Debug real problems
5. Review the architecture
6. Connect the implementation to frontend concepts
7. Prepare interview questions
8. Move to the next phase only after the concept is understood

The priority is **understanding over speed**.

We should avoid blindly copying NestJS/Prisma/Redis code. Whenever possible, understand what happens underneath the abstraction.
