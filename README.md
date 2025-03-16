# Numida Assessment

## Description

This project is a full-stack assessment application for Numida. The server, built in Python using Flask and GraphQL, manages loan and payment data. The web client, powered by Vite, React, and Tailwind CSS, provides an interactive UI to view existing loans and add new payments. The system demonstrates integration between REST endpoints and GraphQL queries to maintain updated front-end state. It also includes testing using Playwright & PyTest, comprehensive linting, and CI/CD integration ideas.

## Tested on:
- Python 3.11
- Node v22.14.0

## Demo

[View Demo](./demo.mp4)

## Setup

1. Clone the repository:
  ```bash
  git clone https://github.com/CharlRitter/numida-assessment.git
  cd numida-assessment
  ```

### Server
#### Option 1: Run with Make
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

#### Option 2: Run with Docker

1. Change directory to the server folder
  ```bash
    cd server
  ```

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

#### Development Mode:
1. Start the development server:
  ```bash
  npm run dev
  ```

#### Production Mode:
1. Build the project for production:
  ```bash
  npm run build
  ```

2. Preview the production build:
  ```bash
  npm run preview
  ```

## Available commands
### Server Commands

| Command        | Description                                        |
|---------------|----------------------------------------------------|
| `make test`   | Run PyTest to verify application behavior.        |
| `make lint`   | Run lint checks to enforce code style.            |
| `make lint-fix` | Auto-fix linting issues.                         |
| `make clean`  | Clean the virtual environment and remove cache files. |
| `make help`   | Display a list of available Make commands.         |

### Web Client Commands

| Command             | Description                                    |
|---------------------|------------------------------------------------|
| `npm run compile`   | Compile GraphQL code.                         |
| `npm run lint`      | Run lint checks for TypeScript and SCSS.      |
| `npm run lint-fix`  | Automatically fix lint issues.                |
| `npm run test`      | Run Playwright tests.                         |
| `npm run test-ui`   | Run UI tests using Playwright Test UI.        |
| `npm run test-report` | Show Playwright test report.               |

## ToDo Items
### Server
- **CICD Enhancements:**
  - Build an image with semantic versioning on CICD.
  - Automate build and upload of the Docker image onto CICD.
- **Architecture & Performance:**
  - Improve file and module organization.
  - Implement pagination and filtering for large datasets.
  - Optimize query performance with proper indexing and caching.
  - Use a Database.
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
  - Spin up a server service with curated mock data and reset it after every test.
