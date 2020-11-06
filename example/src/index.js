import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map';
import './index.css';
import '../node_modules/leaflet/dist/leaflet.css';

function App() {
	return <Map />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
