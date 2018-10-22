require("dotenv").config();
const Koa = require("koa");
const serve = require("koa-static");
const session = require("koa-session");
const mount = require("koa-mount");

const api = require("./api.js");

const app = new Koa();
const PORT = 8000;

app.keys = ["pebble-secret-key"];

app.use(serve(__dirname + "/view/dist")).use(session(app)).use(mount("/api", api));

const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

module.exports = server;
