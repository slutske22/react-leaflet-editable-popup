// This works.  But the problem with it is that I cannot use my custom popup component with this.  But its fine just for testing purposes.

import L from 'leaflet'
import { withLeaflet, MapControl } from 'react-leaflet'

function randomNumber(min, max){
   return ( Math.random() * (max - min) ) + min
};

class RandomMarkersButtonLNative extends MapControl{
   createLeafletElement(props){
      const RandomMarkersButton = L.Control.extend({
         onAdd: map => {
            this.container = L.DomUtil.create("button", "random-markers-button")
            this.container.innerHTML = `Generate a Random Marker`
            this.container.addEventListener('click', () => {

               const { map } = this.props.leaflet

               const bounds = map.getBounds()
               const mapTop = bounds._northEast.lat;
               const mapBottom = bounds._southWest.lat;
               const mapRight = bounds._northEast.lng;
               const mapLeft = bounds._southWest.lng;
            
               const pointLat = randomNumber(mapTop, mapBottom)
               const pointLng = randomNumber(mapLeft, mapRight)
               const pointLatlng = {lat: pointLat, lng: pointLng}

               const marker = L.marker(pointLatlng)
               if (props.icon){
                  marker.setIcon(props.icon)
               }
               marker.addTo(map)

            })
            return this.container
         }
      })
      return new RandomMarkersButton(props)
   }

   componentDidMount(){
      this.leafletElement.addTo(this.props.leaflet.map)
   }

}

export default withLeaflet(RandomMarkersButtonLNative)
