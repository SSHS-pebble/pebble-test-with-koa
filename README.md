# Pebble Test using koa
## Prerequisites

Make sure you installed [Node.js](https://nodejs.org/) and [npm](https://npmjs.com).
When using windows, install unix tools and git bash from [git](https://git-scm.com/download/win).

## Initial setup

Clone this repository and install all dependencies: 

``` shell
$ git clone https://github.com/SSHS-pebble/pebble-test-with-koa.git
$ cd pebble-test-with-koa
$ npm i
```

Bundle all frontend assets with [parcel](https://parceljs.org):

``` shell
$ # If you don't have parcel installed:
$ npm i -g parcel
$ npm run build
```

You need an env file for features that use the database.
Make a database account first and make a `.env` file with credentials.

``` shell
$ touch .env
$ cat <<EOF > .env
PEBBLE_DB_USER="your-db-username"
PEBBLE_DB_PW="your-db-password"
EOF
```

Start the server:

``` shell
$ node ./app/index.js
```

[The app](http://localhost:8000) runs on port 8000 on localhost.

