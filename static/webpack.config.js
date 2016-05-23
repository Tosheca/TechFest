module.exports = {
	// entry point of our application
	entry: './main.js',
	// where to place the compiled bundle
	output: {
		path: __dirname + '/out',
		filename: 'build.js'
	},
	devtool: "eval-source-map",
	module: {
		// `loaders` is an array of loaders to use.
		// here we are only configuring vue-loader
		loaders: [
			{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					cacheDirectory: true,
					plugins: ["syntax-async-functions","transform-regenerator","transform-runtime"],
					presets: ["es2015"]
				}
			},
			{
				test: /\.vue$/, // a regex for matching all files that end in `.vue`
				loader: 'vue'   // loader to use for matched files
			}
		]
	},
	vue: {
		autoprefixer: true
	},
	autoprefixer: {
		browsers: ['last 2 versions']
	},
}