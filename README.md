# BOILERPLATE-NODE-DDD-TS

Minimalist boilerplate for **nodejs**, designed for vertical and horizontal scalability.

## Technologies

- Koa
- Redis 6
- MongoDB 4
- Swagger 3
- Typescript
- Webpack 5
- Socket 4
- Eslint
- Prettier
- Jest

## Installation

```bash
git clone https://github.com/ExperimentsLabs/boilerplate-node-ddd-ts
cd boilerplate-node-ddd-ts
yarn
```

Then, you will need to create a .env file in the root of the project

```bash
PROJECT_MODE=development
PROJECT_NAME=example-name
SERVER_HOSTNAME=localhost
SERVER_PORT=8000
SWAGGER_HOSTNAME=localhost
SWAGGER_API_DOCS=true
JWT_SECRET_KEY=shhhh
MONGODB_HOSTNAME=127.0.0.1
MONGODB_PORT=27017
MONGODB_DATABASE=example-dev
MONGODB_USERNAME=
MONGODB_PASSWORD=
```
## Scripts

### start

Start the project in development mode with the .env file that is in the root

```bash
yarn start
```

### test

Run the unit tests

```bash
yarn test
```

### build

Compile the project

```bash
yarn build
```