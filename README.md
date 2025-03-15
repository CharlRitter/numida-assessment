# Numida Assessment

Tested on:
- Python 3.11
- Node v22.14.0

## Description

## Setup

1. Clone the repository:
  ```bash
  git clone https://github.com/CharlRitter/numida-assessment.git
  cd numida-assessment
  ```

### Server
1. Change directory to the server folder
  ```bash
    cd server
  ```

2. Create a virtual environment:
  ```bash
  make venv
  ```

3. Activate the virtual environment & install the required dependencies:
  ```bash
  make install
  ```

4. Run the server
  ```bash
  make run
  ```

OR

2. Build and run the server
  ```bash
  docker compose up --build
  ```

3. Confirm your application is available at http://localhost:2024

### Web Client
1. Change directory to the web folder
  ```bash
    cd web
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

#### Development:
1. Start the development server:
  ```bash
  npm run dev
  ```

#### Production:
1. Build the project for production:
  ```bash
  npm run build
  ```

2. Preview the production build:
  ```bash
  npm run preview
  ```

## Other commands
### Server

1. Run tests to verify application behaviour:
  ```bash
  make test
  ```

2. Run lint checks to enforce code style:
  ```bash
  make lint
  ```

3. Run lint fixes to enforce code style:
  ```bash
  make lint-fix
  ```

4. Clean the virtual environment and remove cache files:
  ```bash
  make clean
  ```

5. Display a list of available commands and their descriptions:
  ```bash
  make help
  ```

### Web Client
1. Compile GraphQL code:
  ```bash
  npm run compile
  ```

2. Run lint checks:
  ```bash
  npm run lint
  ```

3. Automatically fix lint issues:
  ```bash
  npm run lint-fix
  ```

5. Run Playwright tests:
  ```bash
  npm run test
  ```

6. Run UI tests with Playwright Test UI:
  ```bash
  npm run test-ui
  ```

7. Show the test report:
  ```bash
  npm run test-report
  ```

## ToDo Items
### Server
 - Build an image with semantic versioning on CICD.
 - Build and upload a docker image on CICD.
 - Better structuring of the file structure

### Web Client
 - Use a component library, like AntD.
 - Add light & dark mode.
 - Use theming tokens (CSS vars) to dictate theme
 - Add redux to manage global state for api calls
 - Better structuring of the file structure
