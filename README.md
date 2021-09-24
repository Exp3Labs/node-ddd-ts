# NODE-DDD-TS

domain-driven-design + clean-architecture + hexagonal-architecture + CQRS

## Installation

```bash
git clone https://github.com/Exp3Labs/node-ddd-ts
cd node-ddd-ts
yarn
```

Then, you will need to create a **.env** file in the root of the project

```bash
PROJECT_NAME=example-name
PROJECT_MODE=development

SERVER_HOSTNAME=localhost
SERVER_PORT=8000

SWAGGER_IS_PUBLIC=true
SWAGGER_HTML_ENDPOINT=/swagger-html
SWAGGER_JSON_ENDPOINT=/swagger-json

JWT_SECRET_KEY=shhhh

MONGODB_HOSTNAME=127.0.0.1
MONGODB_PORT=27017
MONGODB_DATABASE=example-dev
MONGODB_USERNAME=
MONGODB_PASSWORD=

EVENT_BUS_RABBITMQ_HOSTNAME=4.tcp.ngrok.io
EVENT_BUS_RABBITMQ_PORT=16526
EVENT_BUS_RABBITMQ_USERNAME=guest
EVENT_BUS_RABBITMQ_PASSWORD=guest
EVENT_BUS_RABBITMQ_QUEUE=event.bus.queue
EVENT_BUS_RABBITMQ_EXCHANGE=event.bus.exchange
EVENT_BUS_RABBITMQ_RETRIES=5
EVENT_BUS_RABBITMQ_INTERVAL=1000
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
