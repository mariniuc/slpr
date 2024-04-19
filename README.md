## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# to start the app in docker mode, with all the services run:
$ docker compose up

# to start the app in debug mode, change in the docker-compose.yaml dev with debug as bellow:
command: npm run start:debug reservations
# and add the debug port as bellow:
ports:
      - "9229:9229"

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

