# Docker Infrastructure Setup

## Overview
This document describes the Docker infrastructure setup for the backend Express application, supporting multiple environments (development, staging, and production).

## Infrastructure Components

### 1. Base Dockerfile
- Uses multi-stage builds for optimization
- Separate stages for development and production
- Alpine-based Node.js images for smaller footprint

### 2. Development Environment
- Hot-reloading enabled
- Volume mounts for live code updates
- Exposed ports for easy debugging
- PostgreSQL container with persistent volume

### 3. Production Environment
- Optimized build process
- Production-only dependencies
- Proper restart policies
- Secure PostgreSQL setup

## Usage

### Development
```bash
# Start development environment
docker-compose up --build

# Initialize database
docker-compose exec api npm run db:init

# View logs
docker-compose logs -f api
```

### Production
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f api
```

### Environment Variables
Each environment uses different environment variables:

Development:
- NODE_ENV=development
- Database credentials (defined in docker-compose.yml)

Production:
- NODE_ENV=production
- Secure database credentials (should be configured in deployment)

## Security Considerations
1. Production database credentials should be managed via secrets
2. Production builds should undergo security scanning
3. Use non-root user in production containers
4. Implement proper logging and monitoring

## Deployment
1. Push images to container registry
2. Use orchestration tool (e.g., Kubernetes, ECS)
3. Configure SSL/TLS termination
4. Set up monitoring and alerting

## Next Steps
1. Add health checks to containers
2. Implement CI/CD pipeline
3. Add container metrics collection
4. Set up backup strategy for database 