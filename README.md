# Evolute User Management & Statistics Platform

This project consists of a backend API (`apps/api`) for managing users and manufacturers, and providing user statistics, and a frontend admin dashboard (`apps/admin`) to interact with the API.

## Prerequisites

- Node.js (v18 or later recommended)
- npm package manager
- Docker and Docker Compose (for running MongoDB)

## Project Structure

```
evolute/
├── apps/
│   ├── api/        # Backend API (Express.js, Mongoose)
│   └── admin/      # Frontend Admin Dashboard (Next.js, React)
└── packages/
    ├── dto/        # Shared Data Transfer Objects
    └── logger/     # Shared logger utility
    └── eslint-config/ # Shared ESLint configurations
    └── tsconfig/   # Shared TypeScript configurations
```

## Installation and Setup

Follow these steps to get the project up and running locally:

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/ihor-n/evolute.git
    cd evolute
    ```

2.  **Install Dependencies**

    This project uses a monorepo structure. Install dependencies from the root directory.

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables for the API**

    Navigate to the API directory and create a `.env` file from the example:

    ```bash
    cd apps/api
    cp .env.example .env
    ```

    The default `MONGODB_URI` in `.env` is `mongodb://localhost:27017/evolute`, which should work with the Docker setup below.

4.  **Start MongoDB with Docker**

    Ensure Docker is running on your system. From the **root** of the project:

    ```bash
    docker-compose up --build -d
    ```

5.  **Seed the Database**

    Once MongoDB is running, seed the database with initial data. From the **root** of the project:

    ```bash
    npm run seed
    ```

    This script will connect to your MongoDB instance, clear existing data (if any), and insert sample users and manufacturers.

6.  **Run the Application**

    From the **root** of the project:

    ```bash
    npm run dev
    ```

    The API should now be running, typically on `http://localhost:5001`.
    The admin dashboard should now be running, typically on `http://localhost:3002`.

## Accessing the Applications

- **API**: `http://localhost:5001/api/users`
- **Dashboard**: `http://localhost:3002`

## Bonus Commands

These commands can be run from the **root** of the project or within specific `apps/*` or `packages/*` directories if they have corresponding scripts in their `package.json`.

- **Type Checking**:
  ```bash
  npm run check-types
  ```
- **Linting**:
  ```bash
  npm run lint
  ```
- **Formatting**:
  ```bash
  npm run format
  ```
- **Testing**:
  ```bash
  npm run test
  ```
