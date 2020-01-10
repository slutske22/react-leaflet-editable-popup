// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S L.ESRI.GEOCODING.GEOSEARCH

// NOTE:  Must load esri-leaflet-geocoder css through CDN in index.html
// <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css">

import { withLeaflet, MapControl } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";

class GeoSearch extends MapControl {
  createLeafletElement(props) {
    const searchOptions = {
       ...props,
      providers: props.providers.map( provider => ELG[provider]())
    };

    const GeoSearch = new ELG.Geosearch(searchOptions);
    return GeoSearch;
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(GeoSearch);
