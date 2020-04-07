// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S LAYER COMPONENTS

import { withLeaflet, MapControl } from "react-leaflet";
import * as EsriLeaflet from "esri-leaflet";
import withEsriAuth from './withEsriAuth'
import '../scripts/esrileaflet.activearea.patch.js'

class EsriLeafletAuthLayer extends MapControl {
   createLeafletElement(props) {
      const layer = EsriLeaflet[props.layerType]({
         ...props
      })
      return layer;
   }

   componentDidMount() {
      const { map } = this.props.leaflet;
      this.leafletElement.addTo(map);
   }
}

export default withEsriAuth(withLeaflet(EsriLeafletAuthLayer));

