// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S L.ESRI.GEOCODING.GEOSEARCH
// For use as an external component (not as a child of the map - must have a MapContext Provider somewhere up the DOM)

// NOTE:  Must load esri-leaflet-geocoder css through CDN in index.html
// <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css">

import React from 'react'
import MapContext from '../Context'
import * as ELG from "esri-leaflet-geocoder";
import './EsriGeoSearch.css'

class EsriGeoSearch extends React.Component {
   constructor(props){
      super(props)

      this.containerName = this.props.className ? this.props.className : 'geocoder-control-wrapper'
   }

   componentDidMount() {

      const map = this.mapReference

      const searchOptions = {
         ...this.props,
        providers: this.props.providers ? this.props.providers.map( provider => ELG[provider]()) : null
      };
      const GeoSearch = new ELG.Geosearch(searchOptions);
   
      const searchContainer = GeoSearch.onAdd(map);
      document.querySelector(`.${this.containerName}`).appendChild(searchContainer);

   }


  render() {
     return (
        <MapContext.Consumer>
           { ({map}) => {
              this.mapReference = map
              return <div className={`${this.containerName} EsriGeoSearch`} ref={this.geocoder} />
           }}
        </MapContext.Consumer>
     )
  }
}

export default EsriGeoSearch;
