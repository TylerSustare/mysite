// Importing the required modules
const WebSocketServer = require("ws");

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 });

let globalCount = 0;
// Creating connection using websocket
wss.on("connection", (ws) => {
  console.log("new client connected");
  // sending & receiving message
  ws.on("message", (data) => {
    console.log(`Client has sent us: ${data}`);
    if (JSON.parse(data)?.operation === "+") {
      globalCount++;
    }
    if (JSON.parse(data)?.operation === "-") {
      globalCount--;
    }
    // send message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocketServer.OPEN) {
        client.send(JSON.stringify({ count: globalCount }));
      }
    });
  });
  // returned when a client connects
  return ws.send(JSON.stringify({ count: globalCount }));
});
console.log("The WebSocket server is running on port 8080");
