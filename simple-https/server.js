const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");

const httpServer = createServer({
  key: readFileSync("/etc/letsencrypt/live/test.veriofisim.com/privkey.pem"),
  cert: readFileSync("/etc/letsencrypt/live/test.veriofisim.com/cert.pem")
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://test.veriofisim.com",
    methods: ["GET", "POST"]
  }
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
