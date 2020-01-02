# React Leaflet Editable Popup
A small plugin for leaflet which allows the author to make a popup editable.  You can also use the popup to remove its source.  This is adapted from [leaflet-popup-modifier](https://github.com/slutske22/leaflet-popup-modifier) to work with React-Leaflet.


<p align="center">
  <img src="leaflet-popupMod-gif.gif">
</p>

## Demo

See this codesandbox for examples.  Click on the popups for explanations.

## Installation


## Using the plugin

Import into your map component like so:
````javascript
import Popup from 'react-leaflet-editable-popup'
````

Use within your map just like you would with a regular `react-leaflet` popup.  However, several new props are available to you.  For example:
````jsx
<Marker position={position}>
  <Popup removable editable open>
    Your stylable content here.
  </Popup>
</Marker>
````

## Props

EditablePopup inherits all props from [react-leaflets's Popup component](https://react-leaflet.js.org/docs/en/components#popup), which in turn inherits all options from [Leaflet's Popup](https://leafletjs.com/reference-1.6.0.html#popup) component.  An EditablePopup also offers the following props:

<table>
  
  <tr>
    <td  width="40%"> <b>Prop</b> </td>
    <td> <b> Description and Use</b> </td>
  </tr>
  
  <tr>
    <td> <code>open</code> </td>
    <td> Opens the popup when map is loaded.  You can use `autoClose={false}` to open multiple popups at once (this is not specific to EditablePopup, but its good to know!) </td>
  </tr>
  
  <tr>
    <td> <code>removable</code> </td>
    <td> Renders a "Remove this Marker" button inside the popup.  When clicked, this will remove the popup's source (as well as the popup) from your map.  It will not delete your marker or popup instance from the map.  See `removalCallback` on how to do this. </td>
  </tr>
  
  <tr>
    <td> <code>editable</code> </td>
    <td> Renders an "Edit" button on the popup.  When clicked, this will allow the user to edit the content of the popup.  This is done with a <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content" target="_blank">contenteditable</a> div.  See below for more on that.</td>
  </tr>
  
  <tr>
    <td colspan="2"><br> The following two props are used when generating markers (or any other popup source) dynamically from an array or object.  Enables you to pass the popup content and index (or key) of the popup's source to somewhere else in your application, i.e. a global state in parent component or to a redux store.<br>. </td>
  </tr>
  
  <tr>
    <td> <code>removalCallback={ index => yourCallback(index) }</code> </td>
    <td> Enables you to pass the key or index of the rendered source from the 'Remove this Marker' button to your own callback function.  Useful to connect to a more global state and remove the correct source marker.  See examples below. </td>
  </tr>
  
  <tr>
    <td> <code>saveContentCallback={ (content, index) => yourCallback(content, index) }</code> </td>
    <td> Enables you to pass the new popup content and index (or key) of the rendered source back to your own callback function.  This enables the author to save user edits into a more globally managed state.  See examples below. </td>
  </tr>

</table>


## Planned improvements:
Currently the removal button says "Remove this marker," but not every popup originates from a marker.  Plans to change the word 'marker' to 'circle,' 'polygon,' 'line,' etc., automatically based on the source type in the works.

## License
GNU GENERAL PUBLIC LICENSE Version 3
