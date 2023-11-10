# Cycle Around The World API

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Development Server

```bash
# Run the development server
npm run dev
```

Visit http://localhost:3001/api/v1 to access the API locally.

### Production Server

Production Server The production server URL is http://ec2-54-169-172-202.ap-southeast-1.compute.amazonaws.com:3001/api/v1.

### OpenAPI Specification

The API follows the OpenAPI 3.0 standard. You can find the full OpenAPI specification in the [open api docs](/src/api/docs/index.json) file.

### Authentication

To authenticate, obtain a JWT token by making a POST request to /auth/login with valid credentials.

```json
{
  "username": "admin",
  "password": "admin"
}
```

### Spot Endpoints

- Get List of Spots

  - `GET /spots`
  - Requires authentication.

- Get Spot Details by Name slug

  - `GET /spots/{slug}`
  - Requires authentication.

- Calculate Cycling Trip

  - `POST /spots/{name}/calculate`
  - Requires authentication.

- Estimate Arrival Date
  - `GET /spots/{name}/estimate`
  - Requires authentication.

### Scripts

- `npm run lint`: Run ESLint to lint TypeScript files.
- `npm run lint:fix`: Run ESLint and fix fixable issues.
- `npm run format`: Format code using Prettier.
- `npm run test`: Run Jest tests.
- `npm run test:coverage`: Run Jest tests with coverage.
