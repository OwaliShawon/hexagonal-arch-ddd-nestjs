# Alarms CQRS Module

This module demonstrates the **CQRS (Command Query Responsibility Segregation)** pattern in the hexagonal architecture.

## 📚 What is CQRS?

CQRS separates read and write operations into different models:
- **Commands**: Handle write operations (CREATE, UPDATE, DELETE)
- **Queries**: Handle read operations (GET, LIST)
- **Events**: Represent things that happened in the domain

## 📁 Structure

```
cqrs/
├── commands/               # Write operations
│   ├── create-alarm.command.ts
│   └── create-alarm.command-handler.ts
├── queries/                # Read operations
│   ├── get-alarms.query.ts
│   └── get-alarms.query-handler.ts
├── events/                 # Domain events & handlers
│   └── alarm-created.event-handler.ts
└── alarms-cqrs.module.ts  # CQRS module configuration
```

## 🔄 Flow Diagram

### Command Flow (Write)
```
Controller → Service → CommandBus → CommandHandler → Repository → Database
                                         ↓
                                    EventBus → EventHandler → Read DB
```

### Query Flow (Read)
```
Controller → Service → QueryBus → QueryHandler → Repository → Read Database
```

## 💡 Components Explained

### Commands
**Purpose**: Represent an intent to change state
- `CreateAlarmCommand`: Contains data needed to create an alarm
- `CreateAlarmCommandHandler`: Executes the business logic to create an alarm

**Example**:
```typescript
// Command: Just data, no logic
export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    // ... more fields
  ) {}
}

// Handler: Contains business logic
@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler {
  async execute(command: CreateAlarmCommand) {
    // 1. Create domain entity
    // 2. Save to write database
    // 3. Publish domain event
  }
}
```

### Queries
**Purpose**: Retrieve data without modifying state
- `GetAlarmsQuery`: Represents a request to get all alarms
- `GetAlarmsQueryHandler`: Fetches alarms from read model

**Example**:
```typescript
// Query: Usually empty or contains filter criteria
export class GetAlarmsQuery {}

// Handler: Fetches data
@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler {
  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.repository.findAll(); // Read from read database
  }
}
```

### Events
**Purpose**: React to things that happened
- `AlarmCreatedEventHandler`: Updates the read model when an alarm is created

**Example**:
```typescript
@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler {
  async handle(event: AlarmCreatedEvent) {
    // Update read model (materialized view)
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      // ... transform domain model to read model
    });
  }
}
```

## 🎯 Benefits

1. **Separation of Concerns**: Read and write logic are completely separate
2. **Scalability**: Can scale read and write databases independently
3. **Flexibility**: Different database types for reads (MongoDB) and writes (PostgreSQL)
4. **Performance**: Optimized read models for queries
5. **Maintainability**: Clear responsibilities for each component

## 🗄️ Database Strategy

- **Write Database (PostgreSQL)**: Stores the source of truth with full relational data
- **Read Database (MongoDB)**: Stores denormalized views optimized for queries
- **Event Handler**: Keeps read database in sync with write database

## 🔌 How to Use

### 1. Create a new alarm (Command)
```bash
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "High CPU Usage",
    "severity": "high",
    "triggeredAt": "2026-01-28T00:00:00.000Z",
    "items": [
      {"name": "Server-1", "type": "CPU"}
    ]
  }'
```

### 2. Get all alarms (Query)
```bash
curl http://localhost:3000/alarms
```

## 📖 Learning Path

1. Start with **Commands**: Understand how write operations work
2. Study **Queries**: See how read operations are separated
3. Explore **Events**: Learn how to keep systems in sync
4. Compare with **Non-CQRS**: See `alarms.service.ts` for the facade pattern

## 🔗 Related Patterns

- **Event Sourcing**: Store all changes as events (not implemented here)
- **Materialized Views**: Pre-computed query results (implemented in read DB)
- **Hexagonal Architecture**: CQRS fits perfectly in the application layer
