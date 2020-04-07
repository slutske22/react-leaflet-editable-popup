// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S LAYER COMPONENTS

import { withLeaflet, MapControl } from "react-leaflet";
import * as EsriLeaflet from "esri-leaflet";

class EsriLeafletLayer extends MapControl {
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

export default withLeaflet(EsriLeafletLayer);

