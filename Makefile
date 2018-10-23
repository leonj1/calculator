all: docker

ifndef VERSION
  VERSION=$(shell git rev-parse --short HEAD)
endif

DOCKER_REPO=www.dockerhub.us
DOCKER_IMAGE=calculators-ui

compile: 
	npm run build

docker: compile
	docker build -t ${DOCKER_REPO}/${DOCKER_IMAGE}:$(VERSION) .

publish:
	docker push ${DOCKER_REPO}/${DOCKER_IMAGE}:$(VERSION)


