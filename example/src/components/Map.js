import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import { EsriLeafletLayersControl } from './molecules/EsriLeafletLayersControl'
import { path } from './constants'

import { EsriLeafletGeoSearch } from '../../../src'
import { ArrowheadsPolyline } from '../../../src'
import { EditablePopup } from '../../../src'

const Map = props => {

   const sidebarTab = useSelector(state => state.sidebarTab)
   const [popupContent, setPopupContent] = useState('<h2>This popup is editable.</h2>')

   const map = useMemo( () => {
      return  (
         <MapContainer 
            doubleClickZoom={false}
            id="mapId"
            zoom={8}
            center={{lat: 37.773972, lng: -122.431297}}
            whenCreated={props.setMap}>
   
            <TileLayer
               url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
               attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri" />

            {sidebarTab === 'esrileaflet' && <>
               <EsriLeafletLayersControl />
               <EsriLeafletGeoSearch useMapBounds={false} />
            </>}

            {sidebarTab === 'vectorlayers' && <>
               <ArrowheadsPolyline smoothFactor={5} positions={path} arrowheads={{size: '10px'}}  />
            </>}

            {sidebarTab === 'uilayers' && <>
               <Marker position={{lat: 37.773972, lng: -122.431297}}>
                  <EditablePopup 
                     removable editable open
                     saveContentCallback={setPopupContent}>
                     {popupContent}
                  </EditablePopup>
               </Marker>
            </>}
   
         </MapContainer>
      )
   }, [sidebarTab])

   return  map

}

export default Map