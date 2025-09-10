# NestJS BDD Boilerplate

A production-ready NestJS application boilerplate with Behavior-Driven Development (BDD) testing, Clean Architecture principles, and comprehensive authentication system.

## 🚀 Features

- **Clean Architecture**: Well-structured codebase following Domain-Driven Design principles
- **BDD Testing**: Cucumber.js integration for behavior-driven development
- **Authentication**: JWT and Google OAuth2 authentication strategies
- **Database**: Prisma ORM with PostgreSQL
- **Email Service**: Nodemailer integration with template support
- **API Documentation**: Swagger/OpenAPI integration
- **Validation**: Class-validator and class-transformer for DTOs
- **Security**: Passport.js strategies, bcrypt password hashing
- **Code Quality**: ESLint, Prettier, Husky, and Commitlint
- **Type Safety**: Full TypeScript support

## 📁 Project Structure

```
src/
├─ application/      # Application services / use-cases
│  ├─ auth/         # Authentication business logic
│  └─ user/         # User management business logic
├─ common/           # Shared utilities, decorators, constants, DTOs
│  ├─ constants/    # Application constants
│  ├─ decorators/   # Custom decorators
│  ├─ dto/          # Shared DTOs
│  ├─ service/      # Common services
│  ├─ types/        # Type definitions
│  └─ utils/        # Utility functions
├─ core/             # Core logic (exceptions, interceptors, guards)
│  ├─ exceptions/   # Custom exceptions
│  ├─ filters/      # Exception filters
│  ├─ interceptors/ # Response interceptors
│  ├─ middleware/   # Custom middleware
│  └─ pipes/        # Validation pipes
├─ domain/user/      # Domain entities and business logic
│  ├─ user.entity.ts
│  ├─ user.repository.interface.ts
│  └─ user.repository.ts
├─ infrastructure/   # Database, API integrations, repositories
│  ├─ auth/         # Authentication strategies and guards
│  ├─ config/       # Configuration modules
│  ├─ database/     # Database configuration
│  ├─ mail/         # Email service
│  ├─ storage/      # File storage service
│  └─ third-party/  # External API integrations
├─ presentation/     # Controllers, GraphQL resolvers, API endpoints
│  └─ controllers/  # REST API controllers
├─ app.module.ts     # Root module
└─ main.ts           # Entry point (bootstrap NestJS)
```

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Google OAuth2
- **Testing**: Jest + Cucumber.js
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator
- **Security**: Passport.js, bcrypt

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- PostgreSQL database
- Google OAuth2 credentials (for Google authentication)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd nest_bdd_boilerplate
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# JWT
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="7d"

# Google OAuth2
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Email Configuration
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-app-password"
MAIL_FROM="your-email@gmail.com"

# Application
PORT=3000
NODE_ENV="development"
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
```

### 5. Start the application

```bash
# Development mode
pnpm start:dev

# Production mode
pnpm build
pnpm start:prod
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

### BDD Tests (Cucumber)

```bash
# Run BDD tests
pnpm test:e2e
```

### Test Structure

```
tests/
├─ features/        # Gherkin feature files
│  └─ user/
│     └─ suspend.feature
└─ steps/           # Step definitions
   └─ user/
      └─ user.step.ts
```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:

- **Swagger UI**: `http://localhost:3000/api`
- **JSON Schema**: `http://localhost:3000/api-json`

## 🔐 Authentication

The application supports two authentication methods:

### 1. JWT Authentication

- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Protected routes require `Authorization: Bearer <token>` header

### 2. Google OAuth2

- Initiate: `GET /auth/google`
- Callback: `GET /auth/google/callback`

## 🏗️ Architecture Principles

### Clean Architecture Layers

1. **Domain Layer** (`domain/`): Contains business entities and repository interfaces
2. **Application Layer** (`application/`): Contains use cases and application services
3. **Infrastructure Layer** (`infrastructure/`): Contains database implementations, external APIs
4. **Presentation Layer** (`presentation/`): Contains controllers and API endpoints

### Key Design Patterns

- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: IoC container for loose coupling
- **Strategy Pattern**: Multiple authentication strategies
- **Interceptor Pattern**: Cross-cutting concerns (logging, response formatting)

## 📝 Available Scripts

```bash
# Development
pnpm start:dev          # Start in development mode
pnpm start:debug        # Start in debug mode

# Building
pnpm build              # Build the application
pnpm start:prod         # Start in production mode

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Run tests with coverage
pnpm test:e2e           # Run BDD tests

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format code with Prettier

# Database
pnpm prisma generate    # Generate Prisma client
pnpm prisma migrate dev # Run database migrations
pnpm prisma studio      # Open Prisma Studio
```

## 🔧 Configuration

### Environment Variables

| Variable               | Description                  | Required                  |
| ---------------------- | ---------------------------- | ------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string | Yes                       |
| `JWT_SECRET`           | Secret key for JWT tokens    | Yes                       |
| `JWT_EXPIRES_IN`       | JWT token expiration time    | Yes                       |
| `GOOGLE_CLIENT_ID`     | Google OAuth2 client ID      | Yes                       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 client secret  | Yes                       |
| `MAIL_HOST`            | SMTP server host             | Yes                       |
| `MAIL_USER`            | SMTP username                | Yes                       |
| `MAIL_PASS`            | SMTP password                | Yes                       |
| `PORT`                 | Application port             | No (default: 3000)        |
| `NODE_ENV`             | Environment mode             | No (default: development) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the UNLICENSED License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Cucumber.js](https://cucumber.io/) - BDD testing framework
- [Passport.js](http://www.passportjs.org/) - Authentication middleware

---

**Happy Coding! 🚀**
