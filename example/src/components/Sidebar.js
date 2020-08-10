import React, { useState } from 'react'
import { FiHome, FiChevronLeft, FiCompass, FiSettings, FiLayers } from "react-icons/fi";
import { BsReverseLayoutTextSidebarReverse, BsController } from 'react-icons/bs'
import { GoLinkExternal } from 'react-icons/go'
import { Sidebar, Tab } from '../../../components/external/Sidebar'

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
                  Click the icons on the left to learn more about the various types of custom components offered here.
               </p>
               <p>
                  Check out the github page for more information.
               </p>
            </Tab>

            <Tab id="sidebar" header="Sidebar" icon={<BsReverseLayoutTextSidebarReverse />}>
               <p>
                  This sidebar is adapted from <a href="https://github.com/eferhatg/react-leaflet-sidetabs" target="_blank" rel="noopener noreferrer">react-leaflet-sidetabs</a> to be compatible with react-leaflet version 3.
               </p>
               <p>
                  Typically the <code>&lt;Sidebar&gt;</code> component is writen as a sibling of the <code>&lt;MapContainer&gt;</code> component:
               </p>
               <code className="codeblock"><pre>
               {`
               <App>
                  <MapContainer/>
                  <SideBar />
               </App>
               `}
               </pre></code>
               <p>
                  If you want to be able to influence the map from within the sidebar tabs, you must <a href="https://react-leaflet-v3.now.sh/docs/example-external-state" target="_blank" rel="noopener noreferrer">externalize the map context</a>.  This is also required if you want the map to adjust its center when the sidebar opens as closes, as it does in this example.
               </p>
               <p>
                  <button
                     className="checkoutpropsbutton"
                     onClick={() => setOpenTab('props')}>
                     Check out the second tab&nbsp;
                  </button>
                  to see the <code>props</code> for this component.
               </p>
               <p>
                  For more react-leaflet-v3 custom components, visit my <a href="https://github.com/slutske22/react-leaflet-custom-components" target="_blank" rel="noopener noreferrer">custom components library</a>.
               </p>
            </Tab>

            <Tab id="controls" header="External Components" icon={<GoLinkExternal />}>
               <p>
                  Many times it is useful to create components outside of the <code>&lt;MapContainer&gt;</code> component.
               </p>
            </Tab>


            <Tab id="layers" header="Custom Layer Types" icon={<FiLayers />}>
               <p>Some content in here</p>
            </Tab>

            <Tab id="settings" header="Settings" icon={<FiSettings />}>
               <p>Some content in here</p>
            </Tab>

            <Tab id="settings" header="Settings" icon={<FiSettings />}>
               <p>Some content in here</p>
            </Tab>

            <Tab id="settings" header="Settings" icon={<FiSettings />}>
               <p>Some content in here</p>
            </Tab>


            <Tab id="settings" header="Settings" icon={<FiSettings />} anchor="bottom">
               <p>Some content in here</p>
            </Tab>

         </Sidebar>
      </section>
   )

}

export default SidebarComponent