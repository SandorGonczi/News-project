# Salford News Project API

## Summary

A simple news API built with the Express framework on Node.js. The project sets up the basic back end infrastructure for news style website with endpoints allow the client to query the articles from the database, fetch, post and delete comments.

The server is hosted at https://salford-news.herokuapp.com/api where you can check the endpoints' descriptions.

## In Order to Run Locally

To run locally the server needs postgreSQL to be installed and the database seeded.

Once the database is installed run the "setup-dbs" script to create the databases in in the postgres.

Before seeding the databse the the environmental variables correctly need to be set up. The neccecary .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (nc_news_test and nc_news respectively). These files should be included in your .gitignore file.

Make sure you install all the dependencies.

## Frontend repo and app

https://github.com/SandorGonczi/salford-news-fe.git

https://salford-news.netlify.app/
