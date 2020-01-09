// MAP CONTROL TO SHOW LAT LNG POSITION OF MOUSE CURSOR

// Almost duplicated from Vadim Gremyachev's answer in https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components

import L from 'leaflet'
import { withLeaflet, MapControl } from 'react-leaflet'

import './MousePosition.css'

class MousePosition extends MapControl{
   constructor(props){
      super(props)
      props.leaflet.map.addEventListener("mousemove", e => {
         this.container.innerHTML = `
            <span>Lat: ${e.latlng.lat.toFixed(4)}</span> | <span>Lng: ${e.latlng.lng.toFixed(4)}</span>
         `
      })
   }

   createLeafletElement(props){
      const MousePosition = L.Control.extend({
         onAdd: map => {
            this.container = L.DomUtil.create("div", "mouse-position")
            this.container.innerHTML = `
            <span>Lat: XXXXXX</span> | <span>Lng: XXXXXX</span>
         `
            return this.container
         }
      })
      return new MousePosition(props)
   }

   componentDidMount(){
      this.leafletElement.addTo(this.props.leaflet.map)
   }

}

export default withLeaflet(MousePosition)
