const WebSocket = require("ws")
const http = require("http")
const server = http.createServer()
const wss = new WebSocket.Server({ server })

wss.on("connection", (ws) => {
  console.log("New Client connection")

  ws.on("message", (message) => {
    console.log(`Reviewed: ${message}`)
    // Broadcasting the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
