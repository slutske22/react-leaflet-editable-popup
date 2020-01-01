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

   componentDidUpdate(){
      console.log(this.state.randomMarkers)
   }

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
               popupContent: `This randomly generated marker is at latitude ${roundNumber(pointLat)} and longitude ${roundNumber(pointLng)}. <br>
               This popup should be totally editable<br />
               <br />
               These blue popups are generated randomly and added to an array within the map's state object.  They are added to the map using an <code>array.map( (marker, index) => &lt;Marker&gt;)</code> function. In order for the <i><u>Remove this marker</u></i> button to function correctly, the <code>&lt;Popup&gt;</code> component requires a <code><b>sourceIndex={index}</b><code> prop.  This will make sure that your <i><u>Remove</u></i> button removes the correct marker from your array and map.<br>
               <br>
               If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`
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

   render(){

      const randomMarkers = this.state.randomMarkers.map( (markerSpec, index) => (
         <Marker position={markerSpec.coords} key={index} >
            <Popup maxWidth='450' editable removable sourceIndex={index} removeRandomMarker={(e) => this.removeRandomMarker(e)}>
               {markerSpec.popupContent}
            </Popup>
         </Marker>
      ))

      return (
         <LeafletMap id="mapId"  zoom={4} center={[33.852169, -100.5322]} ref={mapRef}  >

            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />



            <Marker position={[32.96176, -117.03529]} icon={greenIcon} ref={markerRef} >
               <Popup removable editable source={markerRef}>
                  {`This popup is totally editable. <br />
                  <br />
                  These green markers are hardcoded into the map, meaning they are not generated from an array.  When you hardcode a marker into your map, you must give it a <code><b>ref</b></code> prop, and create a <code><b><a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">react reference</a></b></code> for it.  You must also give its popup a <code><b>source</b></code> prop which references the marker's <code><b>ref</b></code>.  This will allow the <i><u>Remove this marker</u></i> button to function correctly.<br>
                  <br>
                  If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`}
               </Popup>
            </Marker>

            <Marker position={[32.86176, -100.03529]} icon={greenIcon} ref={markerRef2}>
               <Popup removable editable source={markerRef2}>
               {`This popup is totally editable. <br />
                  <br />
                  These green markers are hardcoded into the map, meaning they are not generated from an array.  When you hardcode a marker into your map, you must give it a <code><b>ref</b></code> prop, and create a <code><b><a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">react reference</a></b></code> for it.  You must also give its popup a <code><b>source</b></code> prop which references the marker's <code><b>ref</b></code>.  This will allow the <i><u>Remove this marker</u></i> button to function correctly.<br>
                  <br>
                  If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`}
               </Popup>
            </Marker>

            <Marker position={[35.86176, -98.03529]} icon={redIcon} ref={markerRef2}>
               <Popup removable editable source={markerRef2}>
               {`This popup is totally editable. <br />
                  <br />
                  These red popups are hardcoded into the map, meaning they are not generated from an array.  When you hardcode a marker into your map, you must give it a <code><b>ref</b></code> prop, and create a <code><b><a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">react reference</a></b></code> for it.  You must also give its popup a <code><b>source</b></code> prop which references the marker's <code><b>ref</b></code>.  This will allow the <i><u>Remove this marker</u></i> button to function correctly.<br>
                  <br>
                  If you are generating markers from an array, the process is slightly different.  Click the <i><u>Place a random marker</u></i> button for details.  Or check out the <a href="https://github.com/slutske22/React-Leaflet-Editable-Popup" target="_blank">github readme</a>.`}
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