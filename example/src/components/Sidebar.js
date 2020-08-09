import React, { useState } from 'react'
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
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
            <Tab id="props" header="Props" icon={<FiCompass />}>

               <h3>id</h3>
               <h4>string</h4>
               <p>CSS id of the sidebar element. Defaults to <code>'leaflet-sidebar'</code></p>
               
               <h3>position <span className="required">required</span></h3>
               <h4>string: "left" or "right"</h4>
               <p>determines the placement of the sidebar on the screen</p>

               <h3>closeIcon <span className="required">required</span></h3>
               <h4>string | react element</h4>
               <p>the icon element show in the upper corner to close the sidetabs</p>

               <h3>map</h3>
               <h4>leaflet map instance</h4>
               <p>the leaflet map instance you want to connect to the sidetabs</p>

               <h3>collapsed <span className="required">required</span></h3>
               <h4>boolean</h4>
               <p>the open/close state of the sidetabs</p>

               <h3>selected <span className="required">required</span></h3>
               <h4>string</h4>
               <p>the id of the currently open tab</p>

               <h3>onOpen <span className="required">required</span></h3>
               <h4>function</h4>
               <p>callback function when sidetabs are toggled open</p>

               <h3>onClose <span className="required">required</span></h3>
               <h4>function</h4>
               <p>callback function when sidetabs are toggled closed</p>

               <h3>panMapOnChange</h3>
               <h4>boolean</h4>
               <p>Whether or not to adjust the map center with the opening and closing of the sidetabs. Requires the <code>map</code> prop to work.</p>

               <h3>rehomeControls</h3>
               <h4>boolean</h4>
               <p>Whether or not to automatically adjust control elements to align with the sidetabs</p>

            </Tab>
            <Tab id="settings" header="Settings" icon={<FiSettings />} anchor="bottom">
               <p>The button for this tab can be anchored to the bottom by using the <code>anchor="bottom"</code> props on the <code>Tab</code> component</p>
            </Tab>

         </Sidebar>
      </section>
   )

}

export default SidebarComponent