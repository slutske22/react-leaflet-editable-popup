import React from 'react'
import L from 'leaflet'
import 'leaflet-active-area'
import './ActiveArea.scss'

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


      const map = this.props.map
      const recenter = this.props.recenter ? true : false
      const animate = this.props.animate && this.props.recenter ? true : false
      map.setActiveArea('ActiveArea', recenter, animate);
      // Correction is here, using the actual div instead of creating a new one
      const activeAreaDiv = document.querySelector('#ActiveArea')
      map._viewport = activeAreaDiv
   }

   render(){

      // remove map from props, use the rest
      const {map, ...activeProps} = this.props

      return(
         <div className="ActiveArea" id="ActiveArea" {...activeProps}>
            {this.props.children}
         </div>
      )
   }
   
}

export default ActiveArea