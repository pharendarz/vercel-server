"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const database_model_1 = require("./database.model");
const data_model_1 = require("./data.model");
exports.config = {
    vercelDeploy: true,
    cloudDevDatabaseConnectionString: "mongodb+srv://pharendarz:z3iduibUFn96NVX4@vercel-app.6qvdqiy.mongodb.net/?retryWrites=true&w=majority&appName=vercel-app",
};
const expressApp = (0, express_1.default)();
const server = (0, http_1.createServer)(expressApp);
const port = process.env.PORT || 8080;
// websocket
const isServer = (0, http_1.createServer)(expressApp);
const socketio = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
// monogdb
const dbString = exports.config.vercelDeploy
    ? process.env.MONGODB_URI
    : exports.config.cloudDevDatabaseConnectionString;
mongoose_1.default.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
expressApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
expressApp.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*"); // || 'port'
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // @ts-ignore
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});
// // # WEBSOCKETS
socketio.on("connection", (client) => {
    console.log("[websocket] connected");
    client.on("test event", (data) => {
        console.log("[websocket] event", data);
    });
    client.emit("test event", "[server-websocket] test event data");
    client.on("disconnect", () => {
        console.log("[websocket] disconnected");
    });
});
expressApp.get("/", (req, res) => {
    res.send({ app: "vercel-server" });
});
expressApp.get("/test", (req, res) => {
    const io = req.app.get("socketio");
    // io.emit("test event", "[server] test event data");
    res.send({ app: "test-vercel-server" });
});
expressApp.get("/api/data", (req, res) => {
    res.send({ data: [1, 2, 3, 4, 5, 6, 7, 8] });
});
expressApp.get("/api/create-data", (req, res) => {
    const data = {
        user: "user_id",
        name: "name",
        surname: "surname",
    };
    const database = new database_model_1.DatabaseDefault(data_model_1.DataDefaultModel);
    database.create(data);
    res.send({ create: data });
});
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("[server] started on port " + port);
});
//# sourceMappingURL=index.js.map