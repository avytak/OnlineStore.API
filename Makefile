DC = docker-compose
APP_FILE = docker/docker-compose.yml
D = docker
IMG_NAME = online-store-api

.PHONY: app
app:
	${DC} -f ${APP_FILE}  up


.PHONY: app-down
app-down:
	${DC} -f ${APP_FILE}  down

.PHONY: docker
docker:
	${D} build -t ${IMG_NAME} .
