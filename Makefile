.PHONY: help build up down dev logs clean restart

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the Docker image
	docker compose build

up: ## Start the production container
	docker compose up -d

down: ## Stop and remove containers
	docker compose down

dev: ## Start the development container
	docker compose --profile dev up rickdex-dev

logs: ## Show container logs
	docker compose logs -f

clean: ## Remove containers, images, and volumes
	docker compose down -v
	docker system prune -f

restart: ## Restart the containers
	docker compose restart

shell: ## Open shell in running container
	docker exec -it rickdex-app sh
