import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import Map from './Map'
import UIOverlay from './UIOverlay'

const App = () => {

   const [map, setMap] = useState()

   return (

      <Provider store={store}>
         <div className="App">
            <Map setMap={setMap} />
            {map && <UIOverlay map={map} />}
         </div>
      </Provider>


   )

}

export default App