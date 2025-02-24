DC = docker-compose
D =  doсker
APP_FILE = docker/docker-compose.yml
ONRENDER_FILE = docker/Dockerfile.prod
IMAGE_NAME = volodymyrquo/online-store-api

.PHONY: app
app:
	${DC} -f ${APP_FILE}  up -d --build


.PHONY: app-down
app-down:
	${DC} -f ${APP_FILE}  down

.PHONY: render-neon
render-neon:
	${D} build --no-cache --build-arg ENV_FILE=.env.production -t ${IMAGE_NAME} -f ${ONRENDER_FILE} .
 