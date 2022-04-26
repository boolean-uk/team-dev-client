### Team Dev Client

Client repository for team dev project.

### Quick Start

Clone this repository

```sh
$ git clone git@github.com:boolean-uk/team-dev-client.git && cd team-dev-client
$ npm ci # install dependencies
$ npm start
# then point your browser to localhost:3000
```

Update the env file:
* Copy .env.example to .env
* Set REACT_APP_API_URL to your local server (i.e. http://localhost:4000)
* Set REACT_APP_USER_TOKEN to whatever key you want to use for the local storage token


### Run tests

Cypress setup: https://docs.cypress.io/guides/getting-started/installing-cypress

```sh
$ npx cypress open
```

### Contribution

