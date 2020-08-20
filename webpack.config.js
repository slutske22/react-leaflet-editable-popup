var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		library: "ReactLeafletCustomComponents",
		libraryTarget: 'umd'
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components|build)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},
			{ 
				test : /\.css$/, 
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]  
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
		]
	},
	externals: {
		'react-dom': 'commonjs react-dom',
		leaflet: {
			commonjs: 'leaflet',
			commonjs2: 'leaflet',
			root: 'L'
		},
		'react-leaflet': {
			commonjs: 'react-leaflet',
			commonjs2: 'react-leaflet',
			root: 'ReactLeaflet'
		},
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			root: 'React'
		}
	}
}