"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const expressApp = (0, express_1.default)();
const server = (0, http_1.createServer)(expressApp);
const port = process.env.PORT || 8080;
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
expressApp.get("/", (req, res) => {
    res.send({ app: "vercel-server" });
});
expressApp.get("/test", (req, res) => {
    res.send({ app: "test-vercel-server" });
});
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("[server] started on port " + port);
});
//# sourceMappingURL=index.js.map