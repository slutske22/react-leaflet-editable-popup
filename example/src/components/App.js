import React, { useState } from 'react'
import Map from './Map'

const App = () => {

   const [map, setMap] = useState()

   return (

      <div className="App">
         <Map setMap={setMap} />
      </div>

   )

}

export default App