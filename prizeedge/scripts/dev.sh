#!/bin/bash

# PrizeEdge Development Startup Script

echo "🎯 Starting PrizeEdge Development Environment"
echo "=============================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL=postgresql://prizeedge:prizeedge123@localhost:5432/prizeedge
REDIS_URL=redis://localhost:6379

# API Configuration
API_URL=http://localhost:8000
WS_URL=ws://localhost:8000

# Environment
NODE_ENV=development
ENVIRONMENT=development

# Security
SECRET_KEY=prizeedge-dev-secret-key-2025
JWT_SECRET=prizeedge-jwt-secret-2025

# Features
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true
ENABLE_REAL_TIME=true
EOF
    echo "✅ .env file created"
fi

# Build and start services
echo "🚀 Building and starting services..."
docker-compose up --build -d

echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are healthy
echo "🔍 Checking service health..."

# Check PostgreSQL
if docker exec prizeedge-postgres pg_isready -U prizeedge -d prizeedge > /dev/null 2>&1; then
    echo "✅ PostgreSQL is ready"
else
    echo "❌ PostgreSQL is not ready"
fi

# Check Redis
if docker exec prizeedge-redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is ready"
else
    echo "❌ Redis is not ready"
fi

# Check Backend
if curl -f http://localhost:8000/v1/health > /dev/null 2>&1; then
    echo "✅ Backend API is ready"
else
    echo "⚠️  Backend API is starting..."
fi

echo ""
echo "🎉 PrizeEdge Development Environment is ready!"
echo ""
echo "📱 Mobile App: http://localhost:19000"
echo "💻 Web Dashboard: http://localhost:3000"
echo "🔧 API Server: http://localhost:8000"
echo "🗄️  PostgreSQL: localhost:5432"
echo "📦 Redis: localhost:6379"
echo ""
echo "To stop services: docker-compose down"
echo "To view logs: docker-compose logs -f"
echo ""
echo "Happy developing! 🚀"