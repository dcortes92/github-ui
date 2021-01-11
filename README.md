[![Netlify Status](https://api.netlify.com/api/v1/badges/4e3d3b28-b0c4-43e8-94cf-ccd94e45d401/deploy-status)](https://app.netlify.com/sites/affectionate-poincare-b5f9c5/deploys)

# GitHub Client

Web Application that communicates with GitHub's REST API.

## Build
This is a react web application. It needs node and npm. Yarn can also build the application.
* Checkout the repository and open a terminal
* Run `npm install` or `yarn install`
* Run `npm run start` or `yarn start` 
* It should open the default browser

## Production build
Run `npm run build` or `yarn build`. The build will create a `dist` folder with the production output.

## Tests
* `npm run test:unit` or `yarn test:unit` will run the unit tests.
* `npm run test:integration` or `yarn test:integration` will run the integration tests.
* `npm run test:e2e` or `yarn test:e2e` will run the end-to-end tests. Each of these will save a screenshot in the root folder with the test result.
* `npm run test` or `yarn test` will run all unit, integration and e2e tests in sequence.

## Demo

Live demo available [here](https://affectionate-poincare-b5f9c5.netlify.app).