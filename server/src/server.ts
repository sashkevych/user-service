import http from 'http';
import { app } from "./app.js";
import WebSocketServer from './wss.js';











const server = http.createServer(app)
const PORT = 8000;



const wss = new WebSocketServer(server)

server.listen(PORT, () =>
  console.log("Server running and listen on port " + PORT)
);
