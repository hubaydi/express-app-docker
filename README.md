# Express App with Docker

## Description

This project is a simple Express.js application containerized with Docker. It connects to MongoDB and Redis, and includes configurations for both development and production environments.

## Features

- Dockerized Express.js application
- MongoDB integration using Mongoose
- Redis integration for caching
- Nginx as a reverse proxy
- Separate Docker Compose files for development and production

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd express-app-docker
    ```

2.  You don't need to create `.env` as it is already in there(included in this repository).

## Development

1.  Start the development environment:

    ```bash
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
    ```

2.  Access the application at `http://localhost:3040`.
    or `http://localhost:80`.


3.  Access Mongo Express at `http://localhost:8081`.

## Production

1.  Build and start the production environment:

    ```bash
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
    ```

2.  Access the application at `http://localhost:80`.

## Docker Compose Files

- `docker-compose.yml`: Main Docker Compose file defining the core services (Node, MongoDB, Redis, Nginx).
- `docker-compose.dev.yml`: Docker Compose file for development environment with volume mounting for live code reloading.
- `docker-compose.prod.yml`: Docker Compose file for production environment, building the production-ready image.

## Nginx Configuration

The Nginx configuration file (`nginx/default.conf`) sets up a reverse proxy to forward requests to the Node.js application.

## Environment Variables

The application uses environment variables for configuration. These are defined in the `.env` file and passed to the Docker containers.

## Contributing

Feel free to contribute to this project by submitting pull requests.


