<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Hexagonal Architecture + CQRS with NestJS

A production-ready implementation of **Hexagonal Architecture** (Ports & Adapters) combined with **CQRS** (Command Query Responsibility Segregation) pattern using NestJS.

## 🎯 What You'll Learn

This project demonstrates:
- **Hexagonal Architecture**: Clean separation of concerns with ports and adapters
- **CQRS Pattern**: Separate read and write models for scalability
- **Domain-Driven Design**: Rich domain models with business logic
- **Event-Driven Architecture**: Domain events for loose coupling
- **Multiple Databases**: PostgreSQL for writes, MongoDB for reads
- **Repository Pattern**: Abstract data access through ports
- **Factory Pattern**: Create complex domain objects
- **Value Objects**: Immutable, validated domain concepts

## 📁 Project Structure

```
src/
├── alarms/
│   ├── application/
│   │   ├── cqrs/                    # 🎯 CQRS Module - Start Here!
│   │   │   ├── commands/            # Write operations
│   │   │   ├── queries/             # Read operations
│   │   │   ├── events/              # Event handlers
│   │   │   ├── alarms-cqrs.module.ts
│   │   │   └── README.md            # Detailed CQRS guide
│   │   ├── ports/                   # Repository interfaces
│   │   └── alarms.service.ts
│   ├── domain/                      # Business logic (no dependencies)
│   │   ├── alarm.ts                 # Aggregate root
│   │   ├── alarm-item.ts            # Entity
│   │   ├── factories/               # Domain object creation
│   │   ├── value-objects/           # Immutable concepts
│   │   ├── events/                  # Domain events
│   │   └── read-models/             # Query models
│   ├── infrastructure/              # Technical implementations
│   │   └── persistence/
│   │       ├── orm/                 # PostgreSQL + MongoDB
│   │       └── in-memory/           # Testing
│   └── presenters/
│       └── http/                    # REST API controllers
└── core/                            # Shared infrastructure

```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Databases
```bash
# Start PostgreSQL (write DB) and MongoDB (read DB)
docker-compose up -d
```

### 3. Run the Application
```bash
# Development mode with auto-reload
npm run start:dev
```

### 4. Test the API
```bash
# Create an alarm (writes to PostgreSQL, then syncs to MongoDB)
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "High CPU Usage",
    "severity": "high",
    "triggeredAt": "2026-01-28T12:00:00.000Z",
    "items": [
      {"name": "Server-1", "type": "CPU"}
    ]
  }'

# Get all alarms (reads from MongoDB)
curl http://localhost:3000/alarms
```

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Visual architecture diagrams and flow charts
- **[TESTING.md](TESTING.md)** - Comprehensive testing guide with examples
- **[src/alarms/application/cqrs/README.md](src/alarms/application/cqrs/README.md)** - CQRS pattern explained

## 🎓 Learning Path

1. **Start with CQRS Module** - Read `src/alarms/application/cqrs/README.md`
2. **Understand the Flow** - See [ARCHITECTURE.md](ARCHITECTURE.md) diagrams
3. **Run Tests** - Follow [TESTING.md](TESTING.md) guide
4. **Explore Domain** - Check `src/alarms/domain/` for business logic
5. **Study Persistence** - Compare ORM vs In-Memory implementations

## 🏗️ Key Concepts

### Hexagonal Architecture (Ports & Adapters)
- **Ports**: Interfaces defining what the application needs (repositories)
- **Adapters**: Implementations that connect to external systems (PostgreSQL, MongoDB)
- **Domain**: Pure business logic with no framework dependencies

### CQRS Pattern
- **Commands**: Change state (CreateAlarmCommand → PostgreSQL)
- **Queries**: Read data (GetAlarmsQuery → MongoDB)
- **Events**: Synchronize read/write models (AlarmCreatedEvent)

### Benefits
- ✅ Testable - Mock any infrastructure dependency
- ✅ Scalable - Independent read/write databases
- ✅ Maintainable - Clear separation of concerns
- ✅ Flexible - Easy to swap implementations (in-memory vs ORM)

## 🔧 Technologies

- **NestJS** - Framework
- **TypeScript** - Language
- **PostgreSQL** - Write database (source of truth)
- **MongoDB** - Read database (query optimization)
- **TypeORM** - PostgreSQL ORM
- **Mongoose** - MongoDB ODM
- **Docker** - Database containers

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# hexagonal-arch-ddd-nestjs
