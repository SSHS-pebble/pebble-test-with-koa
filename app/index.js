const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const Koa = require("koa");
const serve = require("koa-static");
const session = require("koa-session");

const endpoint = require("./endpoint");

const app = new Koa();
const PORT = process.env.PORT || 8000;

app.keys = ["pebble-secret-key"];

app.use(serve(__dirname + "/view/dist")).use(session(app)).use(endpoint.routes()).use(endpoint.allowedMethods());

const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

module.exports = server;
