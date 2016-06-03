var socket = require("socket.io-client")

var io = socket.connect("http://78.83.31.94:3000")
io.on("connected", () => console.log("Connected."))

io.emit("open", { program: true, id: "5744a404a8c7c8e070da275a"})

io.emit("vertex", { id: 1, color: "red" })