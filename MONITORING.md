# Monitoring Stack Setup

This project includes a complete monitoring stack with Loki, Prometheus, and Grafana for log aggregation, metrics, and visualization.

## Services

### Loki (Port 3100)
- **Purpose**: Log aggregation system
- **URL**: http://localhost:3100
- **Configuration**: `loki-config.yml`
- **Data**: Stored in Docker volume `loki_data`

### Prometheus (Port 9090)
- **Purpose**: Metrics collection and storage
- **URL**: http://localhost:9090
- **Configuration**: `prometheus.yml`
- **Data**: Stored in Docker volume `prometheus_data`

### Grafana (Port 3001)
- **Purpose**: Visualization and dashboards
- **URL**: http://localhost:3001
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin`
- **Data**: Stored in Docker volume `grafana_data`
- **Datasources**: Auto-configured for Loki and Prometheus

## Getting Started

1. **Start the monitoring stack**:
   ```bash
   docker-compose up -d
   ```

2. **Start your NestJS application**:
   ```bash
   npm run start:dev
   ```

3. **Access Grafana**:
   - Open http://localhost:3001
   - Login with admin/admin
   - Navigate to "Explore" to query logs from Loki
   - Navigate to "Dashboards" to create custom dashboards

## Viewing Logs in Grafana

1. Go to **Explore** (compass icon in sidebar)
2. Select **Loki** as the datasource
3. Use LogQL queries to filter logs:
   ```logql
   {app="hexagonal-nestjs"}
   {app="hexagonal-nestjs"} |= "error"
   {app="hexagonal-nestjs", environment="development"} | json
   ```

## LogQL Examples

```logql
# All logs from the application
{app="hexagonal-nestjs"}

# Only error logs
{app="hexagonal-nestjs"} | json | level="error"

# Logs containing specific text
{app="hexagonal-nestjs"} |= "AppController"

# Logs from last 5 minutes
{app="hexagonal-nestjs"} [5m]

# Rate of logs per second
rate({app="hexagonal-nestjs"}[1m])
```

## Creating Dashboards

1. In Grafana, go to **Dashboards** → **New** → **New Dashboard**
2. Add a panel
3. Select **Loki** or **Prometheus** as datasource
4. Build your query using LogQL (for Loki) or PromQL (for Prometheus)
5. Save the dashboard

## Stopping the Stack

```bash
docker-compose down
```

To remove all data volumes:
```bash
docker-compose down -v
```

## Troubleshooting

- **Logs not appearing in Loki**: Check that the NestJS app is running and Winston is configured correctly
- **Connection errors**: Ensure all services are running: `docker-compose ps`
- **Grafana can't reach Loki**: Check the datasource configuration in Grafana settings
