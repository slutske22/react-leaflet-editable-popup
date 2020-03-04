// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S L.ESRI.FEATURELAYER

import { withLeaflet, MapControl } from "react-leaflet";
import * as EsriLeaflet from "esri-leaflet";

class EsriLeafletFeatureLayer extends MapControl {
   createLeafletElement(props) {
      const featureLayer = EsriLeaflet.featureLayer({
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

export default withLeaflet(EsriLeafletFeatureLayer);
