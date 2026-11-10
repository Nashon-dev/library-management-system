# Library Management System

A backend API for managing a library, built with NestJS, Prisma ORM, and PostgreSQL.

## Technologies Used

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL (hosted on Neon)

## Database Schema

The database contains three main models:

- User: Stores library users and their roles (PATRON or LIBRARIAN).
- Genre: Stores book genres.
- Book: Stores book information and references its genre.

## Schema Decisions

The Book model references the Genre model through a foreign key (genreId) instead of embedding genre information directly inside each book record.

This relational approach avoids unnecessary duplication because multiple books can belong to the same genre. It also makes genre management easier: a genre can be updated in one place without changing every associated book record.

The relationship is one-to-many: one genre can have many books, while each book belongs to one genre.

## Database Seeding

The Prisma seed script creates four genres and fifteen sample books distributed across those genres.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Returns a welcome message |
| GET | /books | Retrieves all books with their associated genres |

## Running the API

Navigate to the API directory:

    cd api

Install dependencies:

    npm install

Start the application:

    npm run start
