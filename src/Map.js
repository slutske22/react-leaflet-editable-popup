import React from 'react'
import { Map as LeafletMap, TileLayer, LayerGroup, Marker } from 'react-leaflet'
import Popup from './EditablePopup'
import { redIcon, greenIcon, blackIcon, goldIcon, violetIcon} from './Icons'

//  ---- UTILITY FUNCTIONS ----------------------------- //

function randomNumber(min, max){
   return ( Math.random() * (max - min) ) + min
};

function roundNumber(number, tensplace = 10){
   return Math.round( number * tensplace) / tensplace;
}




class Test extends React.Component{
   render(){
      return(
         <div>
            <h3>This is a JSX class component</h3><br />
            <FuncComponent />
            {2 + 3}
         </div>
      )
   }
}

const FuncComponent = () => {
   return <h4>This is a JSX functional component</h4>
}








const mapRef = React.createRef()
const markerRef1 = React.createRef()


class Map extends React.Component{

   state = {
      randomMarkers: []
   }

   placeRandomMarker = () => {

      const bounds = mapRef.current.leafletElement.getBounds()
      const mapTop = bounds._northEast.lat;
      const mapBottom = bounds._southWest.lat;
      const mapRight = bounds._northEast.lng;
      const mapLeft = bounds._southWest.lng;

      const pointLat = randomNumber(mapTop, mapBottom)
      const pointLng = randomNumber(mapLeft, mapRight)

      this.setState({
         randomMarkers: [
            ...this.state.randomMarkers,
            {
               coords: [pointLat, pointLng],
               popupContent: `<h3>This marker is removable and its popup is editable.</h3>
               This randomly generated marker is at ${roundNumber(pointLat, 1000)}° latitude and ${roundNumber(pointLng, 1000)}° longitude. <br>
               <br />
               These blue markers are generated randomly and added to an array within the map's state object.  They are added to the map using an <code>array.map( (marker, index) => &lt;Marker&gt;)</code> function. In order for the <i><u>Remove this marker</u></i> button to function correctly, the <code>&lt;Popup&gt;</code> component requires a <code>sourceKey={index}</code> prop.  A the <code>removalCallback</code> prop is also required, which accepts the callback function of your choosing to communicate with the state where your array is kept, passing the <code>index</code> as the argument.  This will make sure that your <i><u>Remove</u></i> button removes the correct marker from your array and map.  This looks something like: <code>removalCallback={yourCallback(index)}</code><br>
               <br>
               Similarly, if you wish to maintain the popup's edited content within your application state, you can pass <code>saveContentCallback={yourCallback(content, index)}</code> as a prop.<br>
               <br>
               Go to the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">GitHub page</a> for this plugin to read more about it.`
            }
         ]
      })
   }

   removeRandomMarker = (index) => {
      mapRef.current.leafletElement.closePopup()
      this.setState(prevState => {
         prevState.randomMarkers.splice(index, 1)
         return {
            randomMarkers: prevState.randomMarkers
         }
      })
   }

   saveContentToState = (content, index) => {
      this.setState( prevState => {
         const newRandomMarkers = prevState.randomMarkers
         newRandomMarkers[index].popupContent = content
         return {
            ...this.state.newRandomMarkers
         }
      })
      console.log(this.state.randomMarkers)
   }

   render(){

      const randomMarkers = this.state.randomMarkers.map( (markerSpec, index) => (
         <Marker position={markerSpec.coords} key={index} >
            <Popup maxWidth='450' editable removable sourceKey={index} removalCallback={(index) => this.removeRandomMarker(index)} saveContentCallback={(content, index) => this.saveContentToState(content, index)}>
               {markerSpec.popupContent}
            </Popup>
         </Marker>
      ))


      const sampleMarkerText = {

         removableAndEditable: `<h3>This marker is removable and its popup is editable.</h3>
            An <code>&lt;EditablePopup&gt;</code> can be made to be editable, removable, both, or neither.  You can add <code>edtiable</code> or <code>removable</code> to its props to decide what type of popup you want.  A popup can also be made to open on map loading (like this one) by passing in the <code>open</code> prop.  Add <code>autoClose={false}</code> to have multiple popups open at the same time.
            <ul>
            <li>Click on a green popup to learn more about the editable features of an <code>&lt;EditablePopup&gt;</code></li>
            <li>Click on a black marker to learn about using an <code>&lt;EditablePopup&gt;</code> hardcoded into your map.</li>
            <li>Click on the <i><u>Place a Random Marker</u></i> button in the top right corner to learn about using <code>&lt;EditablePopup&gt;</code> with markers generated from an array or object, as is common in most state-managed situations.</li>
            </ul>
            Go to the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">GitHub page</a> for this plugin to read more about it.`,

         removable: `<h3>This marker is removable.</h3>
            These black markers are hardcoded into the map, meaning they are not generated from an array or object.  When you hardcode a marker into your map, you do not need any special props for the <i><u>Remove</u></i> button to target the correct marker.<br>
            <br>
            If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`,

         editable: `<h3>This popup is editable.</h3>
            These green markers are editable but not removable.  An <code>&lt;EditablePopup&gt;</code> uses a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable" target="_blank">contenteditable</a> div to allow the user to edit the popup's content.  It acts as a rich text formatter for simple text editing within a popup.<br>
            <br>
            <code>&lt;EditablePopup&gt;</code> keeps the newly saved content within its own state.  But the <code>saveContentCallback</code> prop is also available, which takes a callback function of your construction to save the content to your preferred state location.  Your callback arguments should be the popup HTML content as a javascript string, as well as the index of the marker (if the marker is being generated from an array - see the random markers for more info).<br>
            <br>
            Once the save button is clicked, the html input is parsed through <a href="https://www.npmjs.com/package/html-react-parser" target="_blank">html-react-parser</a>. The initial input that is hard-coded into the popup content must be a simple string or a React class or functional component.  Read more about the formatting of the initial input in the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">GitHub readme</a>.`
      }




      return (
         <LeafletMap doubleClickZoom={false} id="mapId" zoom={4} center={[33.852169, -100.5322]} ref={mapRef}  >

            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />







            <Marker position={[27.86176, -98.03529]} icon={violetIcon} ref={markerRef1}>
               <Popup maxWidth="600" removable editable source={markerRef1} open autoClose={false}>
               {sampleMarkerText.removableAndEditable}
               </Popup>
            </Marker>






            <Marker position={[20.96176, -117.03529]} icon={blackIcon} >
               <Popup removable>
               {sampleMarkerText.removable}
               </Popup>
            </Marker>

            <Marker position={[22.86176, -100.03529]} icon={blackIcon} >
               <Popup removable>
               {sampleMarkerText.removable}
               </Popup>
            </Marker>

            <Marker position={[15.86176, -90.03529]} icon={blackIcon} >
               <Popup removable>
               {sampleMarkerText.removable}
               </Popup>
            </Marker>





            <Marker position={[25.86176, -112.03529]} icon={greenIcon}>
               <Popup maxWidth="500" editable>
               {sampleMarkerText.editable}
               </Popup>
            </Marker>

            <Marker position={[17.86176, -145.03529]} icon={greenIcon}>
               <Popup maxWidth="500" editable>
               {sampleMarkerText.editable}
               </Popup>
            </Marker>

            <Marker position={[17.86176, -80.03529]} icon={greenIcon}>
               <Popup maxWidth="500" editable >
               {sampleMarkerText.editable}
               </Popup>
            </Marker>




            <button id="placeRandomMarkerButton" onClick={ this.placeRandomMarker }>Place a Random Marker</button>

            <LayerGroup>
               {randomMarkers}
            </LayerGroup>


         </LeafletMap>


      )
   }


}

export default Map
