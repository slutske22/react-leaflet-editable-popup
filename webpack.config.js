var path = require('path');

module.exports = {
	entry: './src/EditablePopup.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'ReactLeafletEditablePopup.js',
		library: 'ReactLeafletEditablePopup',
		libraryTarget: 'umd',
	},
	mode: 'development',
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
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
		],
	},
	externals: {
		leaflet: {
			commonjs: 'leaflet',
			commonjs2: 'leaflet',
			root: 'L',
		},
		'react-leaflet': {
			commonjs: 'react-leaflet',
			commonjs2: 'react-leaflet',
			root: 'ReactLeaflet',
		},
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			root: 'React',
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			root: 'reactDOM',
		},
		'react-dom-server': {
			commonjs: 'react-dom-server',
			commonjs2: 'react-dom-server',
			root: 'ReactDOMServer',
		},
		'prop-types': {
			root: 'PropTypes',
			commonjs2: 'prop-types',
			commonjs: 'prop-types',
			amd: 'prop-types',
		},
	},
};
