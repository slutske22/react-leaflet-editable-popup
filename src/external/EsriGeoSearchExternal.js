import React from 'react'
import * as ELG from 'esri-leaflet-geocoder'

export class EsriGeoSearchExternal extends React.Component {

   constructor(props){
      super(props)
      this.containerName = this.props.className || 'geocoder-control-wrapper'
   }

   componentDidMount(){

      const { map } = this.props

      const searchOptions = {
         ...this.props,
        providers: this.props.providers ? this.props.providers.map( provider => ELG[provider]()) : null
      };
      const GeoSearch = new ELG.Geosearch(searchOptions);
   
      const searchContainer = GeoSearch.onAdd(map);
      document.querySelector(`.${this.containerName}`).appendChild(searchContainer);

   }

   render(){

      return (
         <div className={`${this.containerName} EsriGeoSearchExternal`} />
      )

   }

}