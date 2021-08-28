install:
	npm install

test:
	npm run test

coverage:
	npm run test -- --coverage

lint:
	npx eslint .
