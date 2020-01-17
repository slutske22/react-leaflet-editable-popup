import React from 'react'
import MapContext from '../Context'
import ActiveArea from './ActiveArea'

class ExternalComponents extends React.Component{

   render(){
      return(

         <ActiveArea>
            <code>
               This activeArea is defined outside of the Map component, but communicates with it through the MapContext object.
            </code>
         </ActiveArea>

      )
   }
}

export default ExternalComponents