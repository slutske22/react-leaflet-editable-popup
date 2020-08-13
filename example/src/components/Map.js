import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, ScaleControl, LayersControl } from 'react-leaflet'
import { EsriLeafletLayer, EsriLeafletGeoSearch } from '../../../components/esrileaflet'

const Map = props => {

   const sidebarTab = useSelector(state => state.sidebarTab)

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

               <LayersControl position="topleft" collapsed={false}>
                  <LayersControl.BaseLayer name="Feature Layer" checked>
                     <EsriLeafletLayer layerType="featureLayer" url="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0" />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Tiled Map Layer">
                     <EsriLeafletLayer layerType="tiledMapLayer" url="https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_WUI_2010_01/MapServer" />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Base Map Layer">
                     <EsriLeafletLayer layerType="basemapLayer" name="Imagery" />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Dynamic Map Layer">
                     <EsriLeafletLayer layerType="dynamicMapLayer" url="https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer" />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Image Map Layer">
                     <EsriLeafletLayer layerType="imageMapLayer" url="https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer" attribution="United States Geological Survey (USGS), National Aeronautics and Space Administration (NASA)" />
                  </LayersControl.BaseLayer>
               </LayersControl>

               <EsriLeafletGeoSearch useMapBounds={false} />

            </>}
   
         </MapContainer>
      )
   }, [sidebarTab])

   return  map

}

export default Map