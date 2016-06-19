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
			console.log("open")
			Program.findById(data.id).exec().then(function(program) {
				console.log("open (" + socket.id + "):", program.id)
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

		socket.on('vertex', function (data, fn) { //Depricated - Do Not Use
			prog.graphs[prog.graphs.length - 1].story.push({
				id: data.id,
				props: data.props
			})

			// console.log(data)

			sendOthers(io, room, client, "verex", data)

			//console.log(prog.graphs[prog.graphs.length - 1].story)
		})

		socket.on("story", (data, fn) => { //TODO: don't send the whole array just the diff
			prog.graphs[prog.graphs.length - 1].story = data
			console.log(data)
			prog.save(() => {
				fn("saved")
			})

			sendOthers(io, room, client,"story", data)
		})

		socket.on("getGraph", (data, fn) => {
			console.log("getGraph")
			Program.findById(prog.id).exec().then(function(program) {

				prog = program
				switch(data.type){
					case 1: //Array for nodes and edges
						fn(prog.graphs[prog.graphs.length - 1])

					break
					case 2: //Children array
						console.log("prog: ", program, data)

						let {vertices ,edges, story} = prog.graphs[prog.graphs.length - 1]
						//console.log(vertices ,edges, story)
						let res = vertices.map(e => e.toObject())

						edges.forEach(edge => {
							let idx_from = edge.from - 1
							let idx_to = edge.to - 1

							if(res[idx_from].children == null){
								res[idx_from].children = []
							}
							res[idx_from].children.push(edge)

							if(res[idx_to].children == null){
								res[idx_to].children = []
							}
							res[idx_to].children.push(edge)

						})

						console.log("vert: ", res)
						fn({ vertices : res, story: story })
					break
				}
			})
		})

		socket.on("graph", (data) => {
			let graph = prog.graphs.push(data)
			prog.save()

			sendOthers(io, room, client, "graph", graph)
		})

		socket.on("disconnect", (data) => {
			console.log("disconnected", socket.id)

		})
	})
}

function sendOthers(io, room, client, event, data){ //TODO: curry
	for(let key in io.sockets.in(room).sockets){
		let sock = io.sockets.in(room).sockets[key]
//		console.log(sock)
		console.log("sock: ", key)

		if(sock.program == client){

			console.log("Send to: (" +event +") ", key)
			sock.emit(event, data)
		}
	}
}
