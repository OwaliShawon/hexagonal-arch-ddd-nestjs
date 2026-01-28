# 📖 Getting Started with CQRS & Hexagonal Architecture

Welcome! This guide will help you understand the CQRS pattern and Hexagonal Architecture implemented in this project.

## 🎯 Start Here - 5 Minute Overview

**What is CQRS?**
- CQRS = Command Query Responsibility Segregation
- Separates write operations (commands) from read operations (queries)
- Allows using different databases for reads and writes
- Improves scalability and performance

**What is Hexagonal Architecture?**
- Also called Ports & Adapters
- Places business logic in the center (domain)
- Uses ports (interfaces) to define contracts
- Uses adapters to implement ports with external systems
- Makes code testable and flexible

## 📚 Documentation Files (Read in Order)

### 1. **[SUMMARY.md](SUMMARY.md)** ⭐ START HERE
- High-level overview of what's implemented
- File structure guide
- Quick start instructions
- Learning path recommendations

### 2. **[ARCHITECTURE.md](ARCHITECTURE.md)**
- Visual architecture diagrams
- Data flow diagrams
- Layer descriptions
- Before/after comparison

### 3. **[src/alarms/application/cqrs/README.md](src/alarms/application/cqrs/README.md)**
- Deep dive into CQRS pattern
- Component explanations (Commands, Queries, Events)
- Benefits and use cases
- Database strategy

### 4. **[TESTING.md](TESTING.md)**
- Setup instructions
- Testing examples with curl commands
- Database verification
- Troubleshooting guide

## 🏗️ Project Structure

```
src/alarms/
├── application/cqrs/          ← 🎯 START LEARNING HERE
│   ├── commands/              (Write operations)
│   ├── queries/               (Read operations)
│   ├── events/                (Event handlers)
│   └── README.md              (CQRS guide)
├── domain/                    (Business logic)
│   ├── alarm.ts              (Aggregate root)
│   ├── alarm-item.ts         (Entity)
│   └── read-models/          (Query models)
├── infrastructure/            (Technical)
│   ├── persistence/orm/      (PostgreSQL + MongoDB)
│   └── persistence/in-memory/ (For testing)
└── presenters/http/           (REST API)
```

## 🚀 Quick Start (3 Steps)

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start databases
docker-compose up -d

# Step 3: Run the application
npm run start:dev
```

Then test with:
```bash
# Create an alarm (writes to PostgreSQL, syncs to MongoDB)
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","severity":"high","triggeredAt":"2026-01-28T12:00:00Z","items":[]}'

# Get all alarms (reads from MongoDB)
curl http://localhost:3000/alarms
```

## 🎓 Learning Roadmap

### Level 1: Basics (2 hours)
- [ ] Read [SUMMARY.md](SUMMARY.md)
- [ ] Read [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Run [TESTING.md](TESTING.md) setup
- [ ] Test CREATE and GET endpoints

### Level 2: CQRS Details (3 hours)
- [ ] Read [src/alarms/application/cqrs/README.md](src/alarms/application/cqrs/README.md)
- [ ] Study CreateAlarmCommandHandler
- [ ] Study GetAlarmsQueryHandler
- [ ] Study AlarmCreatedEventHandler

### Level 3: Code Exploration (2 hours)
- [ ] Trace request flow in the code
- [ ] Compare ORM vs In-Memory implementations
- [ ] Study domain models
- [ ] Understand repository pattern

### Level 4: Hands-On (4 hours)
- [ ] Add a new command (AcknowledgeAlarmCommand)
- [ ] Add a new query (GetAlarmByIdQuery)
- [ ] Add event handler
- [ ] Test your changes

## 🔑 Key Files to Study

**Must Read:**
1. [src/alarms/application/cqrs/alarms-cqrs.module.ts](src/alarms/application/cqrs/alarms-cqrs.module.ts) - Module organization
2. [src/alarms/application/cqrs/commands/create-alarm.command-handler.ts](src/alarms/application/cqrs/commands/create-alarm.command-handler.ts) - Command handling
3. [src/alarms/application/cqrs/queries/get-alarms.query-handler.ts](src/alarms/application/cqrs/queries/get-alarms.query-handler.ts) - Query handling
4. [src/alarms/application/cqrs/events/alarm-created.event-handler.ts](src/alarms/application/cqrs/events/alarm-created.event-handler.ts) - Event handling

**Domain Logic:**
1. [src/alarms/domain/alarm.ts](src/alarms/domain/alarm.ts) - Aggregate root
2. [src/alarms/domain/alarm-item.ts](src/alarms/domain/alarm-item.ts) - Entity
3. [src/alarms/domain/factories/alarm.factory.ts](src/alarms/domain/factories/alarm.factory.ts) - Factory pattern

**Persistence:**
1. [src/alarms/application/ports/create-alarm.repository.ts](src/alarms/application/ports/create-alarm.repository.ts) - Port definition
2. [src/alarms/infrastructure/persistence/orm/repositories/create-alarm.repository.ts](src/alarms/infrastructure/persistence/orm/repositories/create-alarm.repository.ts) - ORM implementation
3. [src/alarms/infrastructure/persistence/in-memory/repositories/alarm.repository.ts](src/alarms/infrastructure/persistence/in-memory/repositories/alarm.repository.ts) - In-memory implementation

## 💡 Common Questions

**Q: What's the difference between PostgreSQL and MongoDB in this project?**
A: PostgreSQL stores the source of truth (write DB), MongoDB stores denormalized views for fast queries (read DB). They stay in sync through events.

**Q: Why create separate commands and queries?**
A: This separation allows you to:
- Scale reads and writes independently
- Optimize each for its specific purpose
- Keep code organized and maintainable
- More easily add new features

**Q: How do the databases stay in sync?**
A: When an alarm is created:
1. CommandHandler saves to PostgreSQL
2. EventBus publishes AlarmCreatedEvent
3. EventHandler updates MongoDB with the new data

**Q: Can I use only one database?**
A: Yes! The in-memory implementation shows this. For real projects, start simple and add MongoDB later if needed.

## 🧪 Testing Commands

See full guide in [TESTING.md](TESTING.md). Quick reference:

```bash
# Create alarm
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{"name":"High CPU","severity":"high","triggeredAt":"2026-01-28T12:00:00Z","items":[{"name":"Server-1","type":"CPU"}]}'

# Get alarms
curl http://localhost:3000/alarms

# Check PostgreSQL
docker exec -it hexagonal-write-db-1 psql -U postgres -d alarms_db -c "SELECT * FROM alarms;"

# Check MongoDB
docker exec -it hexagonal-read-db-1 mongosh vf-read-db -c "db.materializedalarmviews.find()"
```

## 🎯 Learning Tips

1. **Draw It Out**: Draw the architecture yourself to understand it better
2. **Run It**: Get the application running and test endpoints
3. **Trace It**: Follow code execution step-by-step
4. **Modify It**: Add new commands/queries to practice
5. **Experiment**: Try in-memory vs ORM modes
6. **Read Again**: Re-read docs after hands-on work

## 📞 Need Help?

1. Check [TESTING.md](TESTING.md) troubleshooting section
2. Read error messages carefully
3. Verify databases are running: `docker-compose ps`
4. Check application logs: `npm run start:dev`

## ✅ Success Checklist

- [ ] Application builds successfully
- [ ] Databases are running
- [ ] CREATE endpoint works
- [ ] GET endpoint works
- [ ] Data appears in both databases
- [ ] You can explain what CQRS is
- [ ] You understand the flow of a command
- [ ] You understand the flow of a query
- [ ] You know why events are important

## 🎉 Next Steps

1. Complete all items in Success Checklist
2. Read all documentation files
3. Study the code in src/alarms/application/cqrs/
4. Add a new feature (new command/query)
5. Deploy and use in a real project!

---

**Happy Learning!** 🚀

Start with [SUMMARY.md](SUMMARY.md) →
