import L from 'leaflet'
import { GridLayer, withLeaflet } from 'react-leaflet'

const mapboxAccessToken = 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'

var uniqueId = ( function(){
   var lastId = 0
   return function(){
      return ++lastId
   }
} )()

class TopoLayer extends GridLayer{

   createLeafletElement(props){

      const TopoLayer = L.GridLayer.extend({

         _contexts: {},
         _workers: [],

         beforeAdd: function (map) {

            map._addZoomLimit(this);

            this._contexts = {}
            this._workers = []

            const { topotype } = this.options

            for (let i = 0; i < 16; i++){
               var number = i < 9
                  ? `0${i+1}`
                  : i + 1
                  this._workers[i] = new Worker(
                     `../scripts/worker.${props.topotype}.js`, 
                     {name: `Worker ${props.topotype} ${number}`}
                  )
                  this._workers[i].onmessage = e => this.updateTile(e, this)
            }

         },

         onRemove: function (map) {
            for (let i = 0; i < 16; i++){
               this._workers[i].terminate()
            }
            this._removeAllTiles();
            L.DomUtil.remove(this._container);
            map._removeZoomLimit(this);
            this._container = null;
            this._tileZoom = undefined;
         },

         // createTile method required - creates a new tile of the gridlayer
         createTile: function(coords){

            var tile = L.DomUtil.create('canvas', 'leaflet-tile')
            var size = this.getTileSize()
            tile.width = size.x
            tile.height = size.y

            var ctx = tile.getContext('2d')
            var demCtx
            var id = uniqueId()

            this._contexts[id] = ctx

            // define a new image element and its attributes
            var demImg = new Image()
            var { x, y, z } = coords
            demImg.crossOrigin = "*"
            demImg.src = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}.pngraw?access_token=${mapboxAccessToken}`
            demImg.onload = function(){
               var c = document.createElement('canvas')
               c.width = c.height = 256
               demCtx = c.getContext('2d')
               demCtx.drawImage(demImg, 0, 0)
               redraw()
            }

            const redraw = () => {

               var data = { id: id }
               data.raster = demCtx.getImageData(0, 0, 256, 256)
               var workerIndex = (x + y) % this._workers.length
               this._workers[workerIndex].postMessage(data)

            }

            return tile

         },

         updateTile: function(e, instance){

            var ctx = instance._contexts[e.data.id]
            var imgData = ctx.createImageData(256, 256)
            
            var shades = e.data.shades
            imgData.data.set(shades)
            ctx.putImageData(imgData, 0, 0)

         }

      })

      const topoLayer = new TopoLayer(this.props)
      return topoLayer

   }

   componentDidMount(){

      const { map } = this.props.leaflet;
      this.leafletElement.addTo(map);

   }

}

export default withLeaflet(TopoLayer)