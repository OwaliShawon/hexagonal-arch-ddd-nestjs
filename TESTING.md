# CQRS Hexagonal Architecture - Testing Guide

## 📋 Prerequisites

1. **Docker** - For running PostgreSQL and MongoDB
2. **Node.js** - v18 or higher
3. **npm** - Package manager

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Databases
```bash
# Start PostgreSQL (write DB) and MongoDB (read DB)
docker-compose up -d

# Verify databases are running
docker-compose ps
```

### 3. Start the Application
```bash
# Development mode with auto-reload
npm run start:dev

# The application will start on http://localhost:3000
```

## 🧪 Testing the CQRS Implementation

### Test 1: Create an Alarm (Command)
```bash
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "High CPU Usage",
    "severity": "high",
    "triggeredAt": "2026-01-28T12:00:00.000Z",
    "items": [
      {
        "name": "Server-1",
        "type": "CPU"
      },
      {
        "name": "Server-2",
        "type": "CPU"
      }
    ]
  }'
```

**What happens:**
1. Controller receives the request
2. Service sends command to CommandBus
3. CreateAlarmCommandHandler executes
4. Alarm is saved to PostgreSQL (write DB)
5. AlarmCreatedEvent is published
6. AlarmCreatedEventHandler updates MongoDB (read DB)

### Test 2: Get All Alarms (Query)
```bash
curl http://localhost:3000/alarms
```

**What happens:**
1. Controller receives the request
2. Service sends query to QueryBus
3. GetAlarmsQueryHandler executes
4. Data is fetched from MongoDB (read DB)
5. Returns denormalized data optimized for reading

### Test 3: Create Multiple Alarms
```bash
# Critical alarm
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Database Connection Failed",
    "severity": "critical",
    "triggeredAt": "2026-01-28T12:05:00.000Z",
    "items": [
      {"name": "DB-Primary", "type": "CONNECTION"}
    ]
  }'

# Medium severity
curl -X POST http://localhost:3000/alarms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slow Response Time",
    "severity": "medium",
    "triggeredAt": "2026-01-28T12:10:00.000Z",
    "items": [
      {"name": "API-Gateway", "type": "LATENCY"}
    ]
  }'
```

## 🔍 Verify Data in Databases

### Check PostgreSQL (Write Database)
```bash
# Connect to PostgreSQL
docker exec -it hexagonal-write-db-1 psql -U postgres -d alarms_db

# Query alarms table
SELECT * FROM alarms;

# Query alarm_items table
SELECT * FROM alarm_items;

# Exit
\q
```

### Check MongoDB (Read Database)
```bash
# Connect to MongoDB
docker exec -it hexagonal-read-db-1 mongosh vf-read-db

# Query materialized views
db.materializedalarmviews.find().pretty()

# Exit
exit
```

## 📊 Comparing CQRS vs Traditional Approach

### CQRS Structure (NEW)
```
src/alarms/application/
├── cqrs/                    # ← All CQRS components isolated here
│   ├── commands/            # Write operations
│   ├── queries/             # Read operations  
│   ├── events/              # Event handlers
│   └── alarms-cqrs.module.ts
├── ports/                   # Interfaces (repositories)
└── alarms.service.ts        # Facade (uses CommandBus/QueryBus)
```

### Benefits You Can Observe

1. **Separation of Concerns**
   - Write model in PostgreSQL (relational)
   - Read model in MongoDB (document)
   - Each optimized for its purpose

2. **Scalability**
   - Can scale read/write databases independently
   - Add read replicas for MongoDB without affecting writes

3. **Performance**
   - Writes: Full ACID compliance in PostgreSQL
   - Reads: Fast denormalized queries from MongoDB

4. **Maintainability**
   - Clear structure in `/cqrs` folder
   - Each handler has single responsibility
   - Easy to add new commands/queries

## 🎓 Learning Exercises

### Exercise 1: Add an "Acknowledge Alarm" Command
1. Create `acknowledge-alarm.command.ts`
2. Create `acknowledge-alarm.command-handler.ts`
3. Publish an `AlarmAcknowledgedEvent`
4. Update the read model

### Exercise 2: Add a "Get Alarm by ID" Query
1. Create `get-alarm-by-id.query.ts`
2. Create `get-alarm-by-id.query-handler.ts`
3. Add new repository method
4. Test with curl

### Exercise 3: Add Validation
1. Install `class-validator` and `class-transformer`
2. Add validation decorators to DTOs
3. Enable global validation pipe
4. Test with invalid data

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if containers are running
docker-compose ps

# View logs
docker-compose logs write-db
docker-compose logs read-db

# Restart containers
docker-compose restart
```

### Application Not Starting
```bash
# Check for compilation errors
npm run build

# Run linter
npm run lint

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Data Sync Issues
If write and read databases are out of sync:
1. Check event handler logs in console
2. Verify MongoDB connection in core.module.ts
3. Check if events are being published

## 📚 Additional Resources

- **CQRS Pattern**: https://martinfowler.com/bliki/CQRS.html
- **Event Sourcing**: https://martinfowler.com/eaaDev/EventSourcing.html
- **Hexagonal Architecture**: https://alistair.cockburn.us/hexagonal-architecture/
- **NestJS CQRS**: https://docs.nestjs.com/recipes/cqrs

## 🧹 Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (deletes all data)
docker-compose down -v
```
