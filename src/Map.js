import React from 'react'
import { Map as LeafletMap, TileLayer, LayerGroup, Marker } from 'react-leaflet'
import Popup from './EditablePopup'

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
               popupContent: `This is marker is at latitude ${roundNumber(pointLat)} and longitude ${roundNumber(pointLng)}. 
               This popup should be totally editable`
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
            <Popup editable removable sourceIndex={index} removeRandomMarker={(e) => this.removeRandomMarker(e)}>
               {markerSpec.popupContent}
            </Popup>
         </Marker>
      ))

      return (
         <LeafletMap id="mapId"  zoom={10} center={[32.96176, -117.03529]} ref={mapRef}  >

            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />

            <Marker position={[32.96176, -117.03529]} ref={markerRef} >
               <Popup editable removable source={markerRef}>
                  This popup should be totally editable
               </Popup>
            </Marker>

            <Marker position={[32.86176, -117.03529]} ref={markerRef2}>
               <Popup editable removable source={markerRef2}>
                  This popup should be totally editable
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