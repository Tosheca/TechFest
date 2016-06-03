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
			let recv = recv = io.sockets.in(room).sockets.filter((sock) => sock.program == client)
			console.log(recv)
			console.log(data)
		})
	})
}
