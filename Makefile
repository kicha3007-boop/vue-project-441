install:
	npm ci

setup: install build

start:
	npm run dev

build:
	npm run build

serve:
	npm run preview

test:
	npm test

lint:
	npm run lint

lint-fix:
	npm run lint:fix

.PHONY: install setup start build serve test lint lint-fix
