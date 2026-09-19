# Bookify Technical System Design

## 1. Overview

Bookify is a .NET 10 backend application for managing apartment and booking workflows. The repository follows a Clean Architecture pattern with four main layers:

- Bookify.Api — HTTP/GraphQL presentation layer
- Bookify.Application — use cases, MediatR orchestration, validation, and cross-cutting behavior
- Bookify.Domain — core business rules and domain entities
- Bookify.Infrastructure — persistence, repositories, and external integrations

The solution is designed around a MongoDB-backed domain model where users, apartments, and bookings are represented as aggregate-like entities with domain logic embedded in the model itself.

---

## 2. Business Domain and Scope

The repo centers on a rental/booking domain:

- Users: identity and contact information
- Apartments: property metadata, address, amenities, pricing
- Bookings: reservation lifecycle, date range, pricing, status transitions

The domain logic includes:
- Apartment pricing calculation based on duration and amenities
- Booking state transitions:
  - Reserve
  - Confirm
  - Reject
  - Cancel
  - Complete
- Overlap validation to prevent conflicting reservations for the same apartment

This indicates the system is intended to support short-term accommodation or room rental operations, not a generic CRUD application.

---

## 3. System Goals

### Functional goals
- Create and query users
- Manage apartment catalog data
- Reserve apartments for a date range
- Validate booking conflicts
- Track booking lifecycle status and pricing
- Expose the system via GraphQL and OpenAPI

### Non-functional goals
- Clean separation of business logic from infrastructure
- MongoDB-first persistence strategy
- Observability via OpenTelemetry, Elasticsearch, Grafana, and Kibana
- Structured logging and request tracing
- Transaction-aware persistence patterns

---

## 4. High-Level Architecture

### Layered Architecture

```text
Client / API Consumer
        |
        v
Bookify.Api
  - GraphQL schema
  - REST/OpenAPI surface
  - request routing
        |
        v
Bookify.Application
  - MediatR commands/queries
  - validation
  - logging behavior
        |
        v
Bookify.Domain
  - User / Apartment / Booking entities
  - value objects
  - domain rules and events
        |
        v
Bookify.Infrastructure
  - MongoDB repositories
  - UnitOfWork
  - Mongo serializer registration
  - external service adapters
```

### Observability runtime

The repository includes a dedicated observability stack:

- Elasticsearch
- Grafana
- Kibana
- Monstache
- OpenTelemetry Collector
- MongoDB

This stack is intended to support logs, metrics, traces, and Mongo-to-search indexing.

---

## 5. Runtime and Technology Stack

### Core platform
- .NET 10
- C#
- ASP.NET Core
- GraphQL using Hot Chocolate
- MongoDB via MongoDB.Driver

### Key libraries
- MediatR — command/query dispatch
- FluentValidation — request validation
- Serilog — structured logging
- Scalar.AspNetCore — API reference UI
- OpenTelemetry integration — telemetry export
- MongoDB BSON serialization — domain value object mapping

---

## 6. API Architecture

### Presentation layer
The API project starts in `src/Bookify.Api/Program.cs`.

Main behaviors:
- registers custom Serilog
- adds controllers
- enables OpenAPI
- configures DI via `AddServices`
- ensures Mongo collections exist
- uses request logging
- exposes Scalar API docs in development
- maps controllers
- maps GraphQL endpoint

This indicates the system supports:
- GraphQL as the primary interaction model
- OpenAPI/Scalar for developer documentation
- conventional ASP.NET Core controller routing

### GraphQL model
The dependency injection layer registers:
- `UserQueries`
- `ApartmentQueries`
- `BookingQueries`
- `UserMutations`
- `ApartmentMutations`
- `BookingMutations`

Core examples include:
- `GetUsersAsync`
- `GetUserByIdAsync`
- `CreateUserAsync`

The GraphQL layer is integrated with MediatR commands and uses a `ValidationExceptionErrorFilter`.

---

## 7. Domain Model

### User
`User` is an aggregate root-like entity with:
- `FirstName`
- `LastName`
- `Email`

It is backed by strongly typed value objects:
- `FirstName`
- `LastName`
- `EmailAddress`

This is a strong DDD pattern: raw strings are wrapped in value objects to enforce domain meaning.

### Apartment
`Apartment` includes:
- `Name`
- `Description`
- `Address`
- `Price`
- `CleaningFee`
- `Amenities`
- `LastBookedOn`

Business rule:
- `Calculate(DateRange period)` determines the price breakdown:
  - daily rate
  - cleaning fee
  - amenity surcharge
  - total price

This is an actual domain calculation, not just a persistence property.

### Booking
`Booking` is the most complex aggregate and includes:
- apartment reference
- user reference
- reservation duration
- pricing fields
- booking status
- timestamps for booking lifecycle

Statuses likely include:
- Reserved
- Confirmed
- Rejected
- Cancelled
- Completed

Business rules:
- `Reserve` creates a booking and updates apartment `LastBookedOn`
- `Confirm` transitions from Reserved to Confirmed
- `Cancel` only works for valid states and before start date
- `Reject` transitions from Reserved to Rejected
- `Complete` transitions from Confirmed to Completed

This indicates a state machine-like business process around rental reservations.

---

## 8. Persistence Design

### Database
The system uses MongoDB as the primary database with:
- `bookify` database
- collections:
  - `User`
  - `Apartment`
  - `Booking`

The startup code ensures required collections exist automatically.

### Persistence pattern
Infrastructure registers repositories:
- `IUserRepository`
- `IApartmentRepository`
- `IBookingRepository`

Each repository is implemented as a generic Mongo repository base, with `BookingRepository` adding a custom overlap check.

### Transaction handling
`UnitOfWork` supports:
- `BeginTransactionAsync`
- `CommitAsync`
- `RollbackAsync`
- session access

This suggests the system expects transactional coordination for multi-document operations, especially around booking creation and lifecycle updates.

### Serialization
Mongo serializer registration is explicitly configured for:
- `Id`
- `FirstName`
- `LastName`
- `EmailAddress`
- `ApartmentName`
- `ApartmentDescription`
- `Currency`

This is important because the domain uses custom value objects and strong IDs, and Mongo needs explicit mapping.

---

## 9. Application Layer Design

The application layer is built around CQRS via MediatR.

### Pattern
- commands represent write operations
- queries represent read operations
- validation is registered as a behavior
- logging is registered as a behavior

Evidence from the DI configuration:
- `RegisterServicesFromAssemblies`
- `LoggingBehavior<,>`
- `ValidationBehavior<,>`

This is a standard pipeline for:
- validation
- centralized logging
- cross-cutting concerns around commands and queries

### Example command
`CreateUserCommand` is a simple command carrying:
- `FirstName`
- `LastName`
- `Email`

The architecture is clearly designed to keep domain logic out of the API layer.

---

## 10. Dependency Injection and Composition Root

The composition root is in the API layer.

### AddServices flow
- configures MongoDB connection
- sets Mongo conventions
- registers infrastructure
- registers application
- configures GraphQL types and mutations
- adds validation error handling

This makes the API project the composition root for the application, which is consistent with layered ASP.NET Core architecture.

---

## 11. Observability and Operations

### Observability stack
The repository includes a dedicated observability deployment under `deploy/observability` with:
- Elasticsearch
- Kibana
- Grafana
- Monstache
- OTLP collector
- MongoDB

### Why it matters
This design supports:
- tracing application requests
- collecting logs from the API
- indexing MongoDB collections into Elasticsearch
- creating dashboards and data views in Grafana/Kibana

### Operational details
The repo includes runbooks for:
- Podman networking/firewall issues
- MongoDB connectivity
- Elasticsearch/Grafana/Kibana health checks
- Monstache indexing problems

This indicates the project is treated as a real deployment environment rather than a toy app.

---

## 12. Security and Authorization

The application currently includes:
- `app.UseAuthorization();`
- but no explicit authentication policy or user identity enforcement appears in the repository evidence reviewed

This means the system is currently structurally ready for authorization, but it does not show a clearly implemented auth model in the files examined.

Potential follow-up security requirements would include:
- JWT auth
- role-based authorization
- apartment ownership or booking permissions
- tenant/host separation

---

## 13. Deployment Model

The system is intended for local development and operational observation on Docker Compose.

### Local deployment pattern
- Start MongoDB and observability stack via Docker Compose
- Run the API project using .NET 10
- Connect to MongoDB using the configured connection string:
  `mongodb://localhost:27017/?replicaSet=rs0&directConnection=true`

### Configuration
`appsettings.json` includes:
- Serilog OpenTelemetry export
- OTLP endpoint: `http://localhost:4317`
- MongoDB connection string
- database name: `bookify`

This is a well-structured development configuration for a distributed backend.

---

## 14. Scalability and Extensibility

### Strengths
- Clean architecture boundaries
- Strong domain model
- Value object discipline
- CQRS + MediatR
- MongoDB document model
- Rich observability support
- Transaction and repository abstractions

### Potential scalability concerns
- The repo is currently backend-only; there is no user-facing frontend
- GraphQL is broad and exposes domain operations directly
- Booking overlap logic may need indexing and query optimization as dataset grows
- Domain rules are embedded in entities, which is good for consistency but may need careful versioning as business rules evolve
- Auth and authorization are not yet clearly implemented

---

## 15. Risks and Gaps

The design is strong, but a few gaps are visible from the repository evidence:

1. No clear authentication model
2. No explicit API rate limiting
3. No front-end application in the repository
4. No obvious distributed cache layer
5. No explicit background worker or event processor
6. GraphQL schema is only partially evidenced in code; the repo suggests more entity operations than are visible in the documents reviewed

---

## 16. Summary

Bookify is a modern .NET 10 backend system designed around Clean Architecture and domain-driven principles. Its design emphasizes:
- GraphQL-first API access
- MongoDB persistence
- strong domain modeling
- CQRS and MediatR
- infrastructure-level observability
- transaction-aware data access

The solution is well suited for a rental/booking management domain and has a solid foundation for evolution into a larger service platform. The main future work areas are richer authorization, deeper API contract design, and expanded operational tooling.

---

## 17. Suggested Architecture Diagram

```text
+------------------+      +---------------------------+
| API Clients      | ---> | Bookify.Api               |
| (GraphQL, REST)  |      | - GraphQL schema          |
|                  |      | - OpenAPI/Scalar          |
+------------------+      | - DI composition root     |
                          +-------------+-------------+
                                       |
                                       v
                          +---------------------------+
                          | Bookify.Application       |
                          | - MediatR handlers        |
                          | - validation              |
                          | - logging behavior        |
                          +-------------+-------------+
                                       |
                                       v
                          +---------------------------+
                          | Bookify.Domain            |
                          | - User                   |
                          | - Apartment              |
                          | - Booking                |
                          | - value objects          |
                          | - pricing + rules        |
                          +-------------+-------------+
                                       |
                                       v
                          +---------------------------+
                          | Bookify.Infrastructure    |
                          | - Mongo repositories     |
                          | - UnitOfWork             |
                          | - Mongo serializers      |
                          +-------------+-------------+
                                       |
                                       v
                          +---------------------------+
                          | MongoDB + Observability   |
                          | - bookify collections     |
                          | - Elasticsearch          |
                          | - Grafana/Kibana        |
                          | - OTLP telemetry        |
                          +---------------------------+
```
