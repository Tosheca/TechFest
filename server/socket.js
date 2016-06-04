//var mongoose = require("mongoose")
var Program = require("./models/program.js")


module.exports = function(io) {
	io.on('connection', function (socket) {
		console.log("connect", socket.id)
		socket.emit('news', { hello: 'world' })

		let room
		let client = false
		let prog

		socket.on('open', function (data, fn) {

			Program.findById(data.id).exec().then(function(program) {

				if(data.program){
					socket.program = true
				}else{
					socket.program = false
					client = true
				}

				room = program.id
				prog = program
				socket.join(room)
				fn(prog.id)

			})
		})

		socket.on("clear", function(data, fn) {
			prog.graphs[prog.graphs.length - 1].story = new Array()
			prog.save((res) => {
				fn(res)
			})
		})

		socket.on("save", function(data) {
			prog.save()

		})

		socket.on('vertex', function (data, fn) {
			prog.graphs[prog.graphs.length - 1].story.push({
				id: data.id,
				props: data.props
			})

			// console.log(data)
			


			for(let key in io.sockets.in(room).sockets){
				let sock = io.sockets.in(room).sockets[key]
		//		console.log(sock)
				console.log("sock: ", key)

				if(sock.program == client){

					console.log("Send to: ", key)
					sock.emit("vertex", data)
				}
			}

			//console.log(prog.graphs[prog.graphs.length - 1].story)
		})

		socket.on("disconnect", (data) => {
			console.log("disconnected", socket.id)

		})
	})
}
