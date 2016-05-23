

module.exports = function(io) {
	io.on('connection', function (socket) {
		console.log("connected", socket.id)
		socket.emit('news', { hello: 'world' })
		socket.on('shit', function (data) {
			console.log(data)
		})
	})
}
