require("dotenv").config();
const Koa = require("koa");
const session = require("koa-session");

const endpoint = require("./endpoint");

const app = new Koa();
const PORT = 8000;

app.keys = ["pebble-secret-key"];

app.use(session(app)).use(endpoint.routes()).use(endpoint.allowedMethods());

const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

module.exports = server;
