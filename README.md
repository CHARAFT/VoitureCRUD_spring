# Voiture Application

This project consists of a frontend React application, a backend Spring Boot application, and integrates PostgreSQL as a database. Additionally, it includes Prometheus for monitoring and Grafana for visualization.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Building Docker Images](#building-docker-images)
- [Running the Application](#running-the-application)
- [Accessing Services](#accessing-services)
- [Environment Variables](#environment-variables)


## Technologies

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Monitoring**: Prometheus
- **Visualization**: Grafana
- **Docker**: Containerization of all services

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/voiture-app.git
   cd voiture-app
## Building Docker Images**:
  
  *front

    cd VoitureCRUD_spring\src\main\webapp\reactjs
    docker build -t voiture-app-frontend .
  *back

    cd VoitureCRUD_spring 
    docker build -t my_backend_voiture .
          
## Running the Application**:
  docker-compose up -d
## Accessing Services
Frontend: http://localhost:3000

Backend: http://localhost:8080

PostgreSQL: Accessible internally within the Docker network.

Prometheus: http://localhost:9090

Grafana: http://localhost:3001

## Environment Variables:
You can configure the following environment variables in the docker-compose.yml file:

*PostgreSQL:

POSTGRES_DB: Database name (default: springboot)
POSTGRES_USER: Username for the database (default: postgres)
POSTGRES_PASSWORD: Password for the database user (default: admin)
*Backend:

POSTGRES_HOST: Hostname of the PostgreSQL service (default: postgres)
POSTGRES_PORT: Port for PostgreSQL connection (default: 5432)
POSTGRES_USER: Same as above.
POSTGRES_PASSWORD: Same as above.


