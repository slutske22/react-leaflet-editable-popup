import L, { Util, ImageOverlay, DomUtil, CRS } from 'leaflet';
import * as EL from 'esri-leaflet'

var Overlay = ImageOverlay.extend({
   onAdd: function (map) {
     this._topLeft = map.getPixelBounds().min;
     ImageOverlay.prototype.onAdd.call(this, map);
   },
   _reset: function () {
     if (this._map.options.crs === CRS.EPSG3857) {
       ImageOverlay.prototype._reset.call(this);
     } else {
       DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()));
     }
   }
 });

EL.RasterLayer.include({

   getOriginalMapBounds: function() {
      var bounds = this._map.getPixelBounds(),
      sw = this._map.unproject(bounds.getBottomLeft()),
      ne = this._map.unproject(bounds.getTopRight());
      return new L.LatLngBounds(sw, ne);
   },


   onAdd: function (map) {
      // include 'Powered by Esri' in map attribution
      EL.Util.setEsriAttribution(map);
  
      if (this.options.zIndex) {
        this.options.position = null;
      }
  
      this._update = Util.throttle(this._update, this.options.updateInterval, this);
  
      map.on('moveend', this._update, this);
  
      // if we had an image loaded and it matches the
      // current bounds show the image otherwise remove it
      if (this._currentImage && this._currentImage._bounds.equals(this.getOriginalMapBounds())) {
        map.addLayer(this._currentImage);
      } else if (this._currentImage) {
        this._map.removeLayer(this._currentImage);
        this._currentImage = null;
      }
  
      this._update();
  
      if (this._popup) {
        this._map.on('click', this._getPopupData, this);
        this._map.on('dblclick', this._resetPopupState, this);
      }
  
      // add copyright text listed in service metadata
      this.metadata(function (err, metadata) {
        if (!err && !this.options.attribution && map.attributionControl && metadata.copyrightText) {
          this.options.attribution = metadata.copyrightText;
          map.attributionControl.addAttribution(this.getAttribution());
        }
      }, this);
    },





    _renderImage: function (url, bounds, contentType) {
      if (this._map) {
        // if no output directory has been specified for a service, MIME data will be returned
        if (contentType) {
          url = 'data:' + contentType + ';base64,' + url;
        }
  
        // if server returns an inappropriate response, abort.
        if (!url) return;
  
        // create a new image overlay and add it to the map
        // to start loading the image
        // opacity is 0 while the image is loading
        var image = new Overlay(url, bounds, {
          opacity: 0,
          crossOrigin: this.options.useCors,
          alt: this.options.alt,
          pane: this.options.pane || this.getPane(),
          interactive: this.options.interactive
        }).addTo(this._map);
  
        var onOverlayError = function () {
          this._map.removeLayer(image);
          this.fire('error');
          image.off('load', onOverlayLoad, this);
        };
  
        var onOverlayLoad = function (e) {
          image.off('error', onOverlayLoad, this);
          if (this._map) {
            var newImage = e.target;
            var oldImage = this._currentImage;
  
            // if the bounds of this image matches the bounds that
            // _renderImage was called with and we have a map with the same bounds
            // hide the old image if there is one and set the opacity
            // of the new image otherwise remove the new image
            if (newImage._bounds.equals(bounds) && newImage._bounds.equals(this.getOriginalMapBounds())) {
              this._currentImage = newImage;
  
              if (this.options.position === 'front') {
                this.bringToFront();
              } else if (this.options.position === 'back') {
                this.bringToBack();
              }
  
              if (this.options.zIndex) {
                this.setZIndex(this.options.zIndex);
              }
  
              if (this._map && this._currentImage._map) {
                this._currentImage.setOpacity(this.options.opacity);
              } else {
                this._currentImage._map.removeLayer(this._currentImage);
              }
  
              if (oldImage && this._map) {
                this._map.removeLayer(oldImage);
              }
  
              if (oldImage && oldImage._map) {
                oldImage._map.removeLayer(oldImage);
              }
            } else {
              this._map.removeLayer(newImage);
            }
          }
  
          this.fire('load', {
            bounds: bounds
          });
        };
  
        // If loading the image fails
        image.once('error', onOverlayError, this);
  
        // once the image loads
        image.once('load', onOverlayLoad, this);
      }
    },
  
    _update: function () {
      if (!this._map) {
        return;
      }
  
      var zoom = this._map.getZoom();
      var bounds = this.getOriginalMapBounds();
  
      if (this._animatingZoom) {
        return;
      }
  
      if (this._map._panTransition && this._map._panTransition._inProgress) {
        return;
      }
  
      if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
        if (this._currentImage) {
          this._currentImage._map.removeLayer(this._currentImage);
          this._currentImage = null;
        }
        return;
      }
  
      var params = this._buildExportParams();
      Util.extend(params, this.options.requestParams);
  
      if (params) {
        this._requestExport(params, bounds);
  
        this.fire('loading', {
          bounds: bounds
        });
      } else if (this._currentImage) {
        this._currentImage._map.removeLayer(this._currentImage);
        this._currentImage = null;
      }
    }



})