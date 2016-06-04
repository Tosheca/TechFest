var socket = require("socket.io-client")

var io = socket.connect("http://78.83.31.94:3000")
io.on("connect", () => {
	console.log("Connected.")

	io.emit("open", { program: true, id: "5752b376e48e97636c4c812a"}, (error, data) => {
		console.log(error);
    	console.log(data);
		console.log("opened")
		
		io.emit("clear", {}, (res) => {
			console.log("cleared")
			io.emit("vertex", { id: 1, props: { level: 1 } })

			io.emit("vertex", { id: 2, props: { level: 1 } })

			io.emit("vertex", { id: 3, props: { level: 2 } })

			io.emit("vertex", { id: 4, props: { level: 2 } })

			io.emit("save")
		})


	})
})