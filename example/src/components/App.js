import React, { useState } from 'react'
import Map from './Map'
import UIOverlay from './UIOverlay'

const App = () => {

   const [map, setMap] = useState()

   return (

      <div className="App">
         <Map setMap={setMap} />
         {map && <UIOverlay map={map} />}
      </div>

   )

}

export default App