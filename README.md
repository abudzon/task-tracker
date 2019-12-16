# TaskTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Steps to run the Task Tracker application:
- Run command `npm run json-server` in order to have access to mock data.
- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`.

## Annotation:
Mock data are placed outside `src` folder for purpose, because Angular-CLI is listening on every file change within this folder. Simultaneously,
JSON-Server is updating `mock-tasks.json` file whenever user interact with Tasks. In order to prevent page from reloading, `mocks` folder has been moved outside `src`.  
 
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
