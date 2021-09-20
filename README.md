# BOILERPLATE-NODE-DDD-TS

domain-driven-design + clean-architecture + hexagonal-architecture + CQRS

## Installation

```bash
git clone https://github.com/ExperimentsLabs/boilerplate-node-ddd-ts
cd boilerplate-node-ddd-ts
yarn
```

Then, you will need to create a **.env** file in the root of the project

```bash
PROJECT_MODE=development
PROJECT_NAME=example-name
SERVER_HOSTNAME=localhost
SERVER_PORT=8000
SWAGGER_HOSTNAME=localhost
SWAGGER_API_DOCS=true
JWT_SECRET_KEY=shhhh
RABBITMQ_HOSTNAME=localhost
RABBITMQ_PORT=5624
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
MONGODB_HOSTNAME=127.0.0.1
MONGODB_PORT=27017
MONGODB_DATABASE=example-dev
MONGODB_USERNAME=
MONGODB_PASSWORD=

```

## Scripts

### start

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

### build and run

Compile the project and run it

```bash
yarn serve
```
