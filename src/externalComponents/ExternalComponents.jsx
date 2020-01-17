import React from 'react'
import MapContext from '../Context'
import ActiveArea from './ActiveArea'
import ZoomControl from './ZoomControl'

import './ExternalComponents.css'

class ExternalComponents extends React.Component{

   render(){
      return(

         <>
            <div className="ExternalComponents">
            
               <h4>External components</h4>
               <p>All components in this panel are not children of the <code>&lt;Map /&gt;</code> component.</p>

               <ZoomControl />

            </div>

            <ActiveArea>
               <code style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                  This activeArea is defined outside of the Map component, but communicates with it through the MapContext object.
               </code>
            </ActiveArea>
         </>

      )
   }
}

export default ExternalComponents