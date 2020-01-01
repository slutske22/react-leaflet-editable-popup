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



const mapRef = React.createRef()

const markerRef = React.createRef()
const markerRef2 = React.createRef()
 
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
               These blue markers are generated randomly and added to an array within the map's state object.  They are added to the map using an <code>array.map( (marker, index) => &lt;Marker&gt;)</code> function. In order for the <i><u>Remove this marker</u></i> button to function correctly, the <code>&lt;Popup&gt;</code> component requires a <code><b>sourceKey={index}</b></code> prop.  A the <code><b>removalCallback</b></code> prop is also required, which accepts the callback function of your choosing to communicate with the state where your array is kept, passing the <code>index</code> as the argument.  This will make sure that your <i><u>Remove</u></i> button removes the correct marker from your array and map.<br>
               <br>
               Similarly, if you wish to maintain the popup's edited content within your application state, you can pass <code><b>saveContentCallback={yourCallback(content, index)}</b></code> as a prop.`
            }
         ]
      })
   }

   removeRandomMarker = (index) => {
      mapRef.current.leafletElement.closePopup()
      console.log(index)
      this.setState(prevState => {
         prevState.randomMarkers.splice(index, 1)
         return {
            randomMarkers: prevState.randomMarkers
         }
      })
   }

   saveContentToState = (content, index) => {
      console.log(content, index)

      this.setState( prevState => {
         const newRandomMarkers = prevState.randomMarkers
         newRandomMarkers[index].popupContent = content
         return {
         ...this.state.randomMarkers
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

      return (
         <LeafletMap doubleClickZoom={false} id="mapId" zoom={4} center={[33.852169, -100.5322]} ref={mapRef}  >

            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />







            <Marker position={[27.86176, -98.03529]} icon={violetIcon} ref={markerRef2}>
               <Popup maxWidth="450" removable editable source={markerRef2}>
               {`<h3>This marker is removable and its popup is editable.</h3>
                  An <code><b>&lt;EditablePopup&gt;</b></code> can be made to be editable, removable, both, or neither.  You can add <code><b>edtiable</b></code> or <code><b>removable</b></code> to its props to decide what type of popup you want.</br>
                  </br>
                  Click on a green popup to learn more about the editable features of an <code><b>&lt;EditablePopup&gt;</b></code><br>
                  </br>
                  Click on a black marker to learn about using an <code><b>&lt;EditablePopup&gt;</b></code> hardcoded into your map.<br>
                  </br>
                  Click on the <i><u>Place a Random Marker</u></i> button in the top right corner to learn about using <code><b>&lt;EditablePopup&gt;</b></code>s generated from an array, as is commong in most state-managed situations.<br>
                  </br>
                  Go to the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">GitHub page</a> for this plugin to read more about it.`}
               </Popup>
            </Marker>






            <Marker position={[32.96176, -117.03529]} icon={blackIcon} ref={markerRef} >
               <Popup removable source={markerRef}>
               {`<h3>This marker is removable.</h3> 
                  These black markers are hardcoded into the map, meaning they are not generated from an array.  When you hardcode a marker into your map, you must give it a <code><b>ref</b></code> prop, and create a <code><b><a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">react reference</a></b></code> for it.  You must also give its popup a <code><b>source</b></code> prop which references the marker's individual <code><b>ref</b></code>.  This will allow the <i><u>Remove this marker</u></i> button to function correctly.  This is not the best choice if you will have a large number of markers, as each marker requires its own unique <code><b>ref</b></code>.<br>
                  <br>
                  If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`}
               </Popup>
            </Marker>

            <Marker position={[32.86176, -100.03529]} icon={blackIcon} ref={markerRef2}>
               <Popup removable source={markerRef2}>
               {`<h3>This marker is removable.</h3> 
                  These black markers are hardcoded into the map, meaning they are not generated from an array.  When you hardcode a marker into your map, you must give it a <code><b>ref</b></code> prop, and create a <code><b><a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">react reference</a></b></code> for it.  You must also give its popup a <code><b>source</b></code> prop which references the marker's <code><b>ref</b></code>.  This will allow the <i><u>Remove this marker</u></i> button to function correctly.<br>
                  <br>
                  If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`}
               </Popup>
            </Marker>










            <Marker position={[30.86176, -112.03529]} icon={greenIcon} ref={markerRef2}>
               <Popup maxWidth="450" editable source={markerRef2}>
               {`<h3>This marker is editable.</h3>
                  These green markers are editable but not removable.  An <code><b>&lt;EditablePopup&gt;</b></code> uses a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable" target="_blank">contenteditable</a> div to allow the user to edit the popup's content.  It acts as a rich text formatter for simple text editing within a popup.<br>
                  <br>
                  <code><b>&lt;EditablePopup&gt;</b></code> keeps the newly saved content within its own state.  But the <code><b>saveContentCallback</b></code> prop is also available, which receives the popup HTML content as a javascript string, as well as the index of the marker (if the marker is being generated from an array - see the random markers for more info).  This can be fed to a function of your construction to save the popup content to a parent component, or a redux store, or any other state management system of your choosing. <br>
                  <br>
                  Once the save button is clicked, the html input is parsed through <a href="https://www.npmjs.com/package/html-react-parser" target="_blank">html-react-parser</a>. For this reason, the initial input that is hard-coded into the popup content must be a simple string.  If you wish to include javascript statements, use a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank">template string</a> rather than a <a href="https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx" target="_blank">JSX expression</a>.  React components within an editable <code>&lt;EditablePopup&gt;</code> are not yet supported, but stay tuned!

                  Go to the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">GitHub page</a> for this plugin to read more about it.`}
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