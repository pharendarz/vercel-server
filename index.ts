import express from "express";
import mongoose from "mongoose";

import { createServer } from "http";
import { Server } from "socket.io";
import { DatabaseDefault } from "./database.model";
import { DataDefaultModel } from "./data.model";

export const config = {
  vercelDeploy: false,
  cloudDevDatabaseConnectionString:
    "mongodb+srv://pharendarz:uJAbCuSkLaZ1xaty@vercel-cluster.xhsxwqj.mongodb.net/?retryWrites=true&w=majority&appName=vercel-cluster",
};

const expressApp = express();
const server = createServer(expressApp);

const port = process.env.PORT || 4100;
// websocket
// const isServer = createServer(expressApp);
// const socketio = new Server(server, {
//   cors: { origin: "*" },
// });
// monogdb
const dbString = config.vercelDeploy
  ? process.env.MONGODB_URI
  : config.cloudDevDatabaseConnectionString;
// mongoose.connect(dbString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

expressApp.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

expressApp.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*"); // || 'port'
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // @ts-ignore
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// // # WEBSOCKETS
// socketio.on("connection", (client: any) => {
//   console.log("[websocket] connected");

//   client.on("test event", (data: any) => {
//     console.log("[websocket] event", data);
//   });
//   client.emit("test event", "[server-websocket] test event data");
//   client.on("disconnect", () => {
//     console.log("[websocket] disconnected");
//   });
// });

expressApp.get("/", (req, res) => {
  res.send({ app: "vercel-server" });
});
expressApp.get("/test", (req, res) => {
  // const io = req.app.get("socketio");
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
  const database = new DatabaseDefault(DataDefaultModel);
  database.create(data);
  res.send({ create: data });
});
server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log("[server] started on port " + port);
});

// "scripts": {
//   "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
//   "build": "tsc",
//   "prestart": "npm run build",
//   "start1": "node .",
//   "start": "node --inspect=5858 -r ts-node/register ./api/index.ts",
//   "server": "nodemon ./api/index.js",
//   "start:watch": "nodemon",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
