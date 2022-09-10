# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## How to run this project

First, you need create .env file in you root folder of project, with these information:

```
POSTGRES_HOST_AUTH_METHOD=trust
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=magical_user
POSTGRES_PASSWORD=password123
POSTGRES_DB=storefront_dev
POSTGRES_DB_TEST=storefront_test
ENV=dev
BCRYPT_PASSWORD=secret-password
SALT_ROUNDS=10
TOKEN_SECRET=secret-token
```

### 1. Install dependencies

Run this command to install all need dependencies

`npm install`

or using Yarn:

`yarn`

### 2. Run docker and init Database

To start Postgres database in docker, using this command:

`docker-compose -f docker-compose.yml up -d`

After docker container start successfully, you need add an Admin user to database, this user use to authenticate protected API.
Open Postgres terminal in docker and run some commands below:

1. Access postgres database

`psql -U magical_user postgres`

2. Create dev database:

`CREATE DATABASE storefront_dev;`

3. Connect to storefront_dev databse

`\c storefront_dev`

4. Open window cmd or git bash in you root project and run migrate-db

`npm run migrate`

or using yarn:

`yarn migrate`

After you run this command, all relations will be created

5. Create default admin user

Go back to Postgres terminal in docker (mention above).

`INSERT INTO users(firstname, lastname, username, password) VALUES ('admin', 'user', 'admin', '$2b$10$v405FHfhjRnYzJXbRH97iuDOiTTiD3MsXrmCJKAmzU5baQAa5aRAy');`

This will create an user with:
`username: admin`
`password: admin123`

### 3. Test API

First you need JWT token to access some protected route.
Access authenticate API to get token:

1. Authenticate API

- Method: POST
- URL: http://localhost:3000/authenticate
- Body:

```
{
    "username": "admin",
    "password": "admin123"
}
```

- Response:

```
{
    "user": {
        "id": 1,
        "firstname": "admin",
        "lastname": "user",
        "username": "admin",
        "password": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTY2Mjc5NDM1MH0.1y2PYR9JJxLrc3lL5SRmrYq2jXH866j5iVU94yqGyoA"
}
```

Token return from response is used in Authorization in request header.
Example: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTY2Mjc5NDM1MH0.1y2PYR9JJxLrc3lL5SRmrYq2jXH866j5iVU94yqGyoA

** Some others API you can see in Postman collection at folder `api_collections`, import the .json file in your postman **
** Note that you need run API in order like in this collection **

### 4. Test project

You can simply run this command to run unit test of project

`npm run test`

or using yarn:

`yarn test`

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
