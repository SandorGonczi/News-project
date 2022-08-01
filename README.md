# News Project API

## In Order To Run

This project requries two databases. One for real looking dev data and another for simpler test data.

In order to run the project it needs the environmental variables correctly set up.
The neccecary enrv.env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names).
dotenv documentation : https://www.npmjs.com/package/dotenv

Make sure you install dotenv and other dependencies, see package.json file.
