# Numida Assessment

Tested on:
- Python 3.11
- Node v22.14.0

## Description

This project is a full-stack assessment application for Numida. The server, built in Python using Flask and GraphQL, manages loan and payment data. The web client, powered by Vite, React, and Tailwind CSS, provides an interactive UI to view existing loans and add new payments. The system demonstrates integration between REST endpoints and GraphQL queries to maintain updated front-end state. It also includes testing using Playwright & PyTest, comprehensive linting, and CI/CD integration ideas.

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
- **CICD Enhancements:**
  - Build an image with semantic versioning on CICD.
  - Automate build and upload of the Docker image onto CICD.
- **Architecture & Performance:**
  - Improve file and module organization.
  - Implement pagination and filtering for large datasets.
  - Optimize query performance with proper indexing and caching.
- **Testing & Logging:**
  - Expand integration and unit tests.
  - Enhance logging and error handling to aid in troubleshooting.

### Web Client
- **UI/UX Improvements:**
  - Integrate a component library (e.g., Ant Design) for more consistent UI elements.
  - Implement responsive design improvements to better support mobile and tablet devices.
  - Add light/dark mode toggling and theming tokens (using CSS Variables) for a customizable appearance.
- **State Management:**
  - Integrate Redux (or a similar state management library) to better manage global state and API call status.
- **Feature Enhancements:**
  - Implement pagination and filtering of loan records.
  - Improve accessibility (a11y) across the application.
  - Expand end-to-end test coverage and add visual regression tests.
- **Code Organization & Testing:**
  - Refactor the file structure for improved maintainability.
  - Improve unit test coverage across components.
  - Integrate additional performance metrics and error monitoring tools.
