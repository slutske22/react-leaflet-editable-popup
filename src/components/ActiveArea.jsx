import L from 'leaflet'
import { withLeaflet, DivOverlay } from "react-leaflet";
import 'leaflet-active-area'

class ActiveArea extends DivOverlay{

   createLeafletElement(props){
      const ActiveArea = L.Layer.extend({
         onAdd: map => {
            this.container = L.DomUtil.create("div", "activeArea")
         }
      })
      return new ActiveArea(props)
   }

   componentDidMount(){
      const { map } = this.props.leaflet
      this.leafletElement.addTo(map)

      const recenter = this.props.recenter ? true : false
      const animate = this.props.animate && this.props.recenter ? true : false
      map.setActiveArea('activeArea', recenter, animate);
   }
   
}

export default withLeaflet(ActiveArea)