import React, { useEffect, useRef } from 'react'
import { LayersControl } from 'react-leaflet'
import { EsriLeafletLayer } from '../../../../src'


export const EsriLeafletLayersControl = () => {

   // fancy magic to remove layers associated with LayersControl when LayersControl dismounts:
   const esriLeafletLayersControlRef = useRef()
   useEffect(() => {
      return () => {
         const layers = esriLeafletLayersControlRef.current._layers
         layers.forEach( layer => layer.layer.remove() )
      }
   }, [esriLeafletLayersControlRef])

   return (

      <LayersControl position="topleft" collapsed={false} ref={esriLeafletLayersControlRef}>
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

   )
   
}