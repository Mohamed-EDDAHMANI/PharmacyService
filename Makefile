# ---------------------------------
# Variables
# ---------------------------------
BASE_URL = http://localhost:3002

# ---------------------------------
# Docker Commands
# ---------------------------------

build:
	docker-compose -p pharmacyservice -f docker/docker-compose.yml build app

up:
	docker-compose -p pharmacyservice -f docker/docker-compose.yml up

down:
	docker-compose -p pharmacyservice -f docker/docker-compose.yml down

# ---------------------------------
# Monitoring Commands
# ---------------------------------

logs:
	docker logs pharmacyService_app -f

status:
	docker ps

health:
	curl -s $(BASE_URL)/health