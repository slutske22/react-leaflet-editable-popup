// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S L.ESRI.IMAGELAYER

import { withLeaflet, MapControl } from "react-leaflet";
import * as EsriLeaflet from "esri-leaflet";

class EsriLeafletImageLayer extends MapControl {
   createLeafletElement(props) {
      const featureLayer = EsriLeaflet.imageMapLayer({
         url: props.url,
         ...props
      })
      return featureLayer;
   }

   componentDidMount() {
      const { map } = this.props.leaflet;
      this.leafletElement.addTo(map);
   }
}

export default withLeaflet(EsriLeafletImageLayer);
