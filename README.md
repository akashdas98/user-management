# User Management

This is a user management service built using the NestJS framework.

## Table of Contents

- [Installation](#installation)
- [Running the app](#running-the-app)
- [API Documentation](#api-documentation)
- [Test](#test)
- [Configuration](#configuration)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/akashdas98/user-management
   cd user-management
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Running the app

### Development

```sh
npm run start:dev
```

### Production

```sh
npm run build
npm run start:prod
```

## API Documentation

The API documentation is generated using Swagger. Once the app is running in development mode, you can access the Swagger UI at:

```
http://localhost:3000/api
```

## Test

### Unit tests

```sh
npm run test
```

### End-to-end tests

```sh
npm run test:e2e
```

### Test coverage

```sh
npm run test:cov
```

## Configuration

The application can be configured using environment variables. Create a `.env` file in the root directory and add your configuration variables there.

### Example `.env` file

```
DATABASE_URL=your_database_url
```
