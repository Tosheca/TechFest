//var mongoose = require("mongoose")
var Program = require("./models/user.js")


module.exports = function(io) {
	io.on('connection', function (socket) {
		console.log("connected", socket.id)
		socket.emit('news', { hello: 'world' })

		let room
		let client = false

		socket.on('open', function (data) {
			Program.findById(data.id).exec().then((program) => {
				if(data.program){
					socket.program = true
				}else{
					socket.program = false
					client = true
				}
				room = program.id
				socket.join(program.id)
			})
		})

		socket.on('vertex', function (data) {
			for(let key in io.sockets.in(room).sockets){
				let sock = io.sockets.in(room).sockets[key]
		//		console.log(sock)
				if(sock.program == client){
					console.log("Send to: ", key)
					sock.emit("vertex", data)
				}
			}

			//console.log(recv)
			console.log(data)
		})
	})
}
