-include .env
.DEFAULT_GOAL:=help
.PHONY: start stop migrate create-migration destroy tests logs
DOCKER_COMPOSE_AVAILABLE := $(shell docker compose 2>/dev/null)

init: req copy-env ## Init the project
	docker compose build --no-cache --progress plain
	cd omni-api; npm i;
	cd omni-ui; npm i;

start: req ## Will start the docker containers
	@if ! [ -f .env ]; then echo "No env file. Run make copy-env or make init"; exit 1; fi
	docker compose up

sb: req ## Will start the docker containers but in the background (faster, logs viewable with docker logs
	@if ! [ -f .env ]; then echo "No env file. Run make copy-env or make init"; exit 1; fi
	docker compose up -d

stop: ## Will stop docker containers that are currently running
	docker compose down

build-verbose: ## docker compose build but with the progress in plain format #debug
	docker compose build --no-cache --progress plain

migrate: ## Will run the migrations queued to be run
	docker compose exec api npm run typeorm migration:run

migrate-down: ## Will revert the last migration
	docker compose exec api npm run typeorm migration:revert

re-sync: ## Will re-sync schema
	docker compose exec api npm run typeorm schema:drop
	docker compose exec api npm run typeorm schema:sync

reset-db: ## Will drop the db, run the migrations, and seed
	docker compose exec api npm run typeorm schema:drop
	docker compose exec api npm run typeorm migration:run
	make seeds

seeds: ## Will reload seeds into the local db
	@docker compose exec api npm run seed

create-migration: ## Will create a migration file by checking the schema and db. Can be run like this: name=init make create-migration
	docker compose exec api npm run typeorm migration:generate "src/infrastructure/database/migrations/${name}"

req:
ifndef DOCKER_COMPOSE_AVAILABLE
    $(error "docker compose not installed @see https://docs.docker.com/compose/install/compose-plugin/")
endif

copy-env:
	@if ! [ -e .env ]; then cp .env.example .env; fi

help: ## Prints the help about targets.
	@printf "Usage:             make [\033[34mtarget\033[0m]\n"
	@printf "Default:           \033[34m%s\033[0m\n" $(.DEFAULT_GOAL)
	@printf "Targets:\n"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf " \033[34m%-17s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
start-without-localstack:
	docker compose up api sg-db --no-deps
