DC = docker-compose
APP_FILE = docker-compose.yml


.PHONY: app
app:
	${DC} -f ${APP_FILE}  up


.PHONY: app-down
app-down:
	${DC} -f ${APP_FILE}  down
