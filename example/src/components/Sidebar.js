import React, { useState } from 'react'

import { FiHome, FiChevronLeft, FiCompass, FiSettings, FiLayers } from "react-icons/fi";
import { BsReverseLayoutTextSidebarReverse, BsController } from 'react-icons/bs'
import { GoLinkExternal, GoLocation } from 'react-icons/go'
import { RiShapeLine } from 'react-icons/ri'
import { IoIosGlobe } from 'react-icons/io'

import { Sidebar, Tab } from '../../../components/external/Sidebar'
import { ExternalZoomControl } from '../../../components/external/ExternalZoomControl'
import { ExternalScaleControl } from '../../../components/external/ExternalScaleControl'
import { ExternalAttributionControl } from '../../../components/external/ExternalAttributionControl'

const SidebarComponent = ({ map }) => {

   const [openTab, setOpenTab] = useState('home')

   const onClose = () => {
      setOpenTab(false)
   }

   const onOpen = id => {
      setOpenTab(id)
   }

   return (
      <section className="Sidebar">
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
                     onClick={() => setOpenTab('ui')}>
                        Layout Components
                  </button>
                  <button 
                     className="menu btn-link"
                     onClick={() => setOpenTab('externalConrols')}>
                        Externalized Controls
                  </button>
                  <button 
                     className="menu btn-link"
                     onClick={() => setOpenTab('layers')}>
                        Custom Layers
                  </button>
                  <button 
                     className="menu btn-link"
                     onClick={() => setOpenTab('uilayers')}>
                        Markers and Popups
                  </button>
                  <button 
                     className="menu btn-link"
                     onClick={() => setOpenTab('vectorlayers')}>
                        Custom Path Components
                  </button>
                  <button 
                     className="menu btn-link"
                     onClick={() => setOpenTab('esrileaflet')}>
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
                  This sidebar is adapted from <a href="https://github.com/eferhatg/react-leaflet-sidetabs" target="_blank" rel="noopener noreferrer">react-leaflet-sidetabs</a> to be compatible with react-leaflet version 3.  It is an external component, so check out the <button className="btn-link" onClick={() => setOpenTab('externalConrols')}>external components</button> tab for more info.
               </p>
               <h3>ActiveArea</h3>
               <p>
                  Adapted from <a href="https://github.com/Mappy/Leaflet-active-area" target="_blank" rel="noopener noreferrer">leaflet-active-area</a>, this component uses the <code>{`<div>`}</code> of your choice as the active part of the map, applying all positioning to that div.
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
                  The standard leaflet controls you see below are not children of the map, but rather a child of this Sidebar.  The activearea div you see with the blue border is also an externalized version of the ActiveArea component.
               </p>
               <div className="external-controls-collection">
                  <ExternalZoomControl map={map}/>
                  <ExternalScaleControl map={map} />
                  <ExternalAttributionControl map={map} />
               </div>
            </Tab>


            <Tab id="layers" header="Custom Layer Types" icon={<FiLayers />}>
               <p>Custom layers tab</p>
            </Tab>

            <Tab id="uilayers" header="UI Layers" icon={<GoLocation />}>
               <p>Custom popups, markers, etc.</p>
            </Tab>

            <Tab id="vectorlayers" header="Vector Layers" icon={<RiShapeLine />}>
               <p>Custom vector layers</p>
            </Tab>

            <Tab id="esrileaflet" header="Esri Leaflet" icon={<IoIosGlobe />}>
               <p>Custom vector layers</p>
            </Tab>


            <Tab id="settings" header="Settings" icon={<FiSettings />} anchor="bottom">
               <p>Some content in here</p>
            </Tab>

         </Sidebar>
      </section>
   )

}

export default SidebarComponent