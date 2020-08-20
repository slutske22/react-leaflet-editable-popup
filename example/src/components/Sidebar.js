import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet'

import { setSidebarTab, toggleActiveArea } from '../store/actions'

import { FiHome, FiChevronLeft, FiCompass, FiSettings, FiLayers } from "react-icons/fi";
import { BsReverseLayoutTextSidebarReverse, BsController } from 'react-icons/bs'
import { GoLinkExternal, GoLocation } from 'react-icons/go'
import { RiShapeLine } from 'react-icons/ri'
import { IoIosGlobe } from 'react-icons/io'

import { Sidebar, Tab } from '../../../src'
import { ZoomControlExternal } from '../../../src'
import { ScaleControlExternal } from '../../../src'
import { AttributionControlExternal } from '../../../src'
import { LayersControlExternal } from '../../../src'
import { EsriGeoSearchExternal } from '../../../src'

const SidebarComponent = ({ map }) => {

   const dispatch = useDispatch()

   const useActiveArea = useSelector(state => state.useActiveArea)

   const [openTab, setOpenTab] = useState('home')

   const onClose = () => {
      setOpenTab(false)
      dispatch( setSidebarTab(false) )
   }

   const onOpen = id => {
      setOpenTab(id)
      dispatch( setSidebarTab(id) )
   }

   const setTab = id => {
      setOpenTab(id)
      dispatch( setSidebarTab(id) )
   }

   return (
      <Sidebar
         map={map}
         position="left"
         collapsed={!openTab}
         selected={openTab}
         closeIcon={<FiChevronLeft />}
         onClose={onClose}
         onOpen={onOpen}
         panMapOnChange
         rehomeControls>

         <Tab id="home" header="Home" icon={<FiHome />} active>
            <p>
               Welcome to the React-Leaflet V3 custom components library.  This example page shows off some of the custom components that have been built and adapted for react-leaflet v3.  
            </p>
            <p>
               <button 
                  className="menu btn-link" 
                  onClick={() => setTab('ui')}>
                     Layout Components
               </button>
               <button 
                  className="menu btn-link"
                  onClick={() => setTab('externalConrols')}>
                     Externalized Controls
               </button>
               <button 
                  className="menu btn-link"
                  onClick={() => setTab('layers')}>
                     Custom Layers
               </button>
               <button 
                  className="menu btn-link"
                  onClick={() => setTab('uilayers')}>
                     Markers and Popups
               </button>
               <button 
                  className="menu btn-link"
                  onClick={() => setTab('vectorlayers')}>
                     Custom Path Components
               </button>
               <button 
                  className="menu btn-link"
                  onClick={() => setTab('esrileaflet')}>
                     Esri-Leaflet for React-Leaflet
               </button>
            </p>
            <p>
               Check out the github page for more information.
            </p>
         </Tab>

         <Tab id="ui" header="Layout Components" icon={<BsReverseLayoutTextSidebarReverse />}>
            <h3>Sidebar</h3>
            <p>
               This sidebar is adapted from <a href="https://github.com/eferhatg/react-leaflet-sidetabs" target="_blank" rel="noopener noreferrer">react-leaflet-sidetabs</a> to be compatible with react-leaflet version 3.  It is an external component, so check out the <button className="btn-link" onClick={() => setTab('externalConrols')}>external components</button> tab for more info.
            </p>
            <h3>ActiveArea</h3>
            <p>
               Adapted from <a href="https://github.com/Mappy/Leaflet-active-area" target="_blank" rel="noopener noreferrer">leaflet-active-area</a>, this component uses the <code>{`<div>`}</code> of your choice as the active part of the map, applying all positioning to that div (highlighted in dotted blue when on this tab).
               <button 
               className="toggle-active-area btn"
               onClick={() => dispatch( toggleActiveArea(!useActiveArea) )}>
                  {useActiveArea ? 'Stop using' : 'Use'} the active area
               </button>
            </p>
         </Tab>

         <Tab id="externalConrols" header="External Controls" icon={<GoLinkExternal />}>
            <p>
               Many times it is useful to create components outside of the <code>&lt;MapContainer&gt;</code> component.  In order for them to communicate with the map instance, you must <a href="https://react-leaflet-v3.now.sh/docs/example-external-state" target="_blank" rel="noopener noreferrer">externalize the map context</a>.  An <code>&lt;ExternalComponent&gt;</code> is not a descendant of the <code>&lt;MapContainer&gt;</code> component:
            </p>
            <code className="codeblock"><pre>
            {`
            <App>
               <MapContainer/>
               <ExternalComponent />
            </App>
            `}
            </pre></code>
            <p>
               The standard leaflet controls you see below are not children of the map, but rather a child of this Sidebar.  The activearea div you see with the blue dotted border is also an externalized version of the ActiveArea component.
            </p>
            <div className="external-controls-collection">

               <ZoomControlExternal map={map}/>

               <ScaleControlExternal map={map} />

               <LayersControlExternal map={map}>
                  <LayersControlExternal.BaseLayer name="Esri Grey" checked>
                     <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" attribution='Tiles © Esri' />
                  </LayersControlExternal.BaseLayer>
                  <LayersControlExternal.BaseLayer name="Esri Physical">
                     <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}" attribution='Tiles © Esri — Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />
                  </LayersControlExternal.BaseLayer>
                  <LayersControlExternal.Overlay name="OSM Mapnik">
                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                  </LayersControlExternal.Overlay>
                  <LayersControlExternal.Overlay name="FeatureGroup">
                     <FeatureGroup>
                        <Marker position={map.getCenter()}>
                           <Popup>
                              Marker 1 in a feature group
                           </Popup>
                        </Marker>
                        <Marker position={{lat: map.getCenter().lat + 1, lng: map.getCenter().lng}}>
                           <Popup>
                              Marker 2 in a feature group
                           </Popup>
                        </Marker>
                     </FeatureGroup>
                  </LayersControlExternal.Overlay>
               </LayersControlExternal>

               <AttributionControlExternal className="full-width" map={map} />

               <EsriGeoSearchExternal map={map} expanded={true} useMapBounds={false} collapseAfterResult={false} placeholder="Externalized Esri Leaflet GeoSearch..." />

            </div>
            <p>
               <code className="todo">TODO: External layers control not communicating with native leaflet attribution control...why?</code>
            </p>
         </Tab>


         <Tab id="layers" header="Custom Layer Types" icon={<FiLayers />}>
            <p>Custom layers tab</p>
         </Tab>

         <Tab id="uilayers" header="UI Layers" icon={<GoLocation />}>
            <h3>EditablePopup</h3>
            <p>An popup with user-editable content.  Can also be used to remove its source, and control its own open / closed behavior.  Based on <a href="https://github.com/slutske22/leaflet-popup-modifier" target="_blank" rel="noopener noreferrer">leaflet-popup-modifier</a>.</p>
         </Tab>

         <Tab id="vectorlayers" header="Vector Layers" icon={<RiShapeLine />}>
            <h3>ArrowheadsPolyline</h3>
            <p>
               React-leaflet wrapper for <a href="https://github.com/slutske22/leaflet-arrowheads" target="_blank" rel="noopener noreferrer">leaflet-arrowheads</a>.
            </p>
         </Tab>

         <Tab id="esrileaflet" header="Esri Leaflet" icon={<IoIosGlobe />}>

            <p>react-leaflet components for <a href="https://esri.github.io/esri-leaflet/" target="_blank" rel="noopener noreferrer">esri-leaflet</a></p>

            <h3>EsriLeafletLayer</h3>
            <p>Catch all component to conjure any of the standard <a href="https://esri.github.io/esri-leaflet/api-reference/#layers" target="_blank" rel="noopener noreferrer">esri-leaflet layers</a> (excluding the Cluster and Heat plugin layers).</p>

            <h3>EsriLeafletGeoSearch</h3>
            <p>
               Component to conjure the <a href="https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html" target="_blank" rel="noopener noreferrer">esri-leaflet geocoder GeoSearch plugin</a>.  Requires <code>npm install esri-leaflet-geocoder</code> as well as <a href="https://github.com/Esri/esri-leaflet-geocoder#example" target="_blank" rel="noopener noreferrer">including their css</a>.
            </p>

         </Tab>


         <Tab id="settings" header="Settings" icon={<FiSettings />} anchor="bottom">
            <p>Some content in here</p>
         </Tab>

      </Sidebar>
   )

}

export default SidebarComponent