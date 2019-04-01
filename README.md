# Pebble Test using koa

## Initial setup

Clone this repository:

```shell
git clone https://github.com/SSHS-pebble/pebble-test-with-koa.git
cd pebble-test-with-koa
```

and install all dependencies:

```shell
npm i
```

To bundle, install parcel:

```shell
npm i -g parcel
```

Bundle:

```shell
npm run parcel:build
```

and start server:

```shell
node ./app/index.js
```

[The app](http://localhost:8000) runs on port 8000 on localhost.

You need an env file in the `./` directory. The format is:

```shell
PEBBLE_DB_USER="pebble-db-user"
PEBBLE_DB_PW="pebble-db-pw"
```

### Frontend

The frontend directory is `/app/view`. Parcel bundling with babel is configured to output files in `app/view/dist`.
Bundling while developing:

```shell
npm run parcel:watch
```

Building when deploying:

```shell
npm run parcel:build
```

### Backend

The backend directory is `/app/endpoint/api`, `/app/endpoint/auth`, and `/app/middleware`(Basically `/app` except for `/app/view`).
All endpoints that provides or modifies data in server is in `/app/endpoint/api`, and auth-related are inside `/app/endpoint/auth`.
`/app/middleware` are for koa middlewares that are needed for majority of routes.

## Project setup

`/app` is the app's main directory. `/app/endpoint` is the app's API routes. `/app/view` is the app's main page.
The app from `/app/view` is a SPA and dynamically reloads data by requesting from endpoints, mounted on `/api` or `/auth`, depending on the endpoints.

A directory `/test` will be made in the future for testing purposes.
