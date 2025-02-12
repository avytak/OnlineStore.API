# API documentation for online store

[https://online-store-api-fazp.onrender.com/docs](https://online-store-api-fazp.onrender.com/docs)

Since this server operates on a free plan, please be patient with
the waiting time during the initial run or after periods of inactivity

or use `Local machine` to run the application on port `3000`

<http://localhost:3000/docs>

## Installation

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [GNU Make](https://www.gnu.org/software/make/) (Optional for Makefile)

## How to Use

1. **Clone the repository:**

2. Install all required packages in `Requirements` section.

3. Run `npm install`

4. Run `make app`

### Implemented Commands

- `make app` - up application
- `make app-down` - down application

## Start application without Makefile

docker-compose -f docker/docker-compose.yml up --build
