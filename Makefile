.PHONY: docker

docker:
	docker run --rm -v "$(PWD)":/app -w /app node:24-alpine sh -c "npm ci --ignore-engines && npm run build"
