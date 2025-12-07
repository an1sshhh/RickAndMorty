#!/bin/bash

# RickDex Docker Helper Script

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

case "$1" in
    build)
        print_info "Building Docker image..."
        docker compose build
        print_success "Build complete!"
        ;;
    up|start)
        print_info "Starting production container..."
        docker compose up -d
        print_success "Container started! Access at http://localhost:3000"
        ;;
    down|stop)
        print_info "Stopping containers..."
        docker compose down
        print_success "Containers stopped!"
        ;;
    dev)
        print_info "Starting development container..."
        docker compose --profile dev up rickdex-dev
        ;;
    logs)
        docker compose logs -f
        ;;
    restart)
        print_info "Restarting containers..."
        docker compose restart
        print_success "Containers restarted!"
        ;;
    clean)
        print_info "Cleaning up..."
        docker compose down -v
        docker system prune -f
        print_success "Cleanup complete!"
        ;;
    shell)
        print_info "Opening shell in container..."
        docker exec -it rickdex-app sh
        ;;
    rebuild)
        print_info "Rebuilding and restarting..."
        docker compose down
        docker compose build --no-cache
        docker compose up -d
        print_success "Rebuild complete! Access at http://localhost:3000"
        ;;
    *)
        echo "RickDex Docker Helper"
        echo ""
        echo "Usage: ./docker.sh [command]"
        echo ""
        echo "Commands:"
        echo "  build       Build the Docker image"
        echo "  up/start    Start production container"
        echo "  down/stop   Stop containers"
        echo "  dev         Start development container"
        echo "  logs        Show container logs"
        echo "  restart     Restart containers"
        echo "  clean       Remove containers and images"
        echo "  shell       Open shell in container"
        echo "  rebuild     Rebuild from scratch"
        echo ""
        exit 1
        ;;
esac
