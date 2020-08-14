import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './scripts/esri-leaflet-active-area-patch'

import App from './components/App'

ReactDOM.render(
   <App />,
   document.getElementById('root')
)