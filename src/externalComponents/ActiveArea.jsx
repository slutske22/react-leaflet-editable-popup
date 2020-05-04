import React from 'react'
import L from 'leaflet'
import 'leaflet-active-area'
import MapContext from '../Context'

class ActiveArea extends React.Component{

   componentDidMount(){

      // Correction for the bug within leaflet-active-area
      L.Map.include({

         getViewportBounds: function() {
            var vp = this._viewport,
               // Correction term is here with getBoundingRectClient
                topleft = L.point(vp.getBoundingClientRect().left, vp.getBoundingClientRect().top),
                vpsize = L.point(vp.clientWidth, vp.clientHeight);
    
            if (vpsize.x === 0 || vpsize.y === 0) {
                //Our own viewport has no good size - so we fallback to the container size:
                vp = this.getContainer();
                if(vp){
                  topleft = L.point(0, 0);
                  vpsize = L.point(vp.clientWidth, vp.clientHeight);
                }
    
            }
    
            return L.bounds(topleft, topleft.add(vpsize));
        }
        
      })



      const map = this.mapReference
      const recenter = this.props.recenter ? true : false
      const animate = this.props.animate && this.props.recenter ? true : false
      map.setActiveArea('activeArea', recenter, animate);
      // Correction is here, using the actual div instead of creating a new one
      const activeAreaDiv = document.querySelector('#activeArea')
      console.log(activeAreaDiv)
      map._viewport = activeAreaDiv
   }

   render(){
      return(
         <MapContext.Consumer>
            { value => {
               this.mapReference = value.map
               return(
                  <div className="activeArea" id="activeArea">{this.props.children}</div>
               )
            }}
         </MapContext.Consumer>
      )
   }
   
}

export default ActiveArea




// // Creating a version that doesn't contain the context itself, but requires the context be wrapped around it when it is declared

// // class ActiveArea extends React.Component{

//    componentDidMount(){
//       const { map } = this.props.map
//       const recenter = this.props.recenter ? true : false
//       const animate = this.props.animate && this.props.recenter ? true : false
//       map.setActiveArea('activeArea', recenter, animate);
//    }

//    render(){
//       return(
//          <div className="activeArea"></div>
//       )
//    }
   
// }


// // Declared in parent like this:

// // Using context external to component itself
//
// <MapContext.Consumer>
//    {(value) => (<ActiveArea map={value} />)}
// </MapContext.Consumer>
