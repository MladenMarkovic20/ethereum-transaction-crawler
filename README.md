# ethereum-transaction-crawler

The "ethereum-transaction-crawler" repository hosts code for a web application that fetches and presents transaction data from the Ethereum blockchain for a given wallet address and block range, with bonus features for ETH balance calculation and token amounts.

## Welcome to my Web App

Welcome to my web application repository! This guide will help you set up and run the application for the first time. The application is built using Node.js and TypeORM for the backend, React for the frontend, and PostgreSQL for the database. Both the frontend and backend are written in TypeScript.

## Prerequisites

Before you get started, make sure you have the following installed on your system:

Node.js (LTS version recommended)
PostgreSQL (with a database created for the application)
Git

# 1. Clone the Repository

To get started, clone this repository to your local machine using Git

# 2. Backend Setup

Navigate to the backend directory ("./ethereum-transaction-crawler/server/src")
Create a .env file in the backend directory and configure the following environment variables:
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=etc_db
DB_HOST=localhost
DB_PORT=5432
API_KEY=EGEDG6V89URD48THJSVB15TFC2YWU37GMJ
WALLET_ADDRESS=0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f
FIRST_BLOCK=9000000

# 3. Install Dependencies

Install the backend dependencies.

# 4. Run Migrations

Run the database migrations to create the necessary tables.

# 5. Start the Backend Server

Start the backend server (npm start)
The backend should now be running at http://localhost:4000.

# 6. Configure the Frontend

Navigate to the frontend directory(./ethereum-transaction-crawler/client/src)

# 7. Install Dependencies

Install the frontend dependencies.

# 8. Start the Frontend

Start the frontend development server(npm run)
The frontend should now be running at http://localhost:3000.

## Testing the Application

You can now access the web application by opening your web browser and visiting http://localhost:3000. You should be able to interact with the application's user interface.

## Database Schema

The application uses a PostgreSQL database with a single transaction table. You can find the database schema and entity definition in the backend codebase.

Happy testing!
