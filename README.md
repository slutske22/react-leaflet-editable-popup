# React Leaflet Editable Popup
A small plugin for leaflet which allows the author to make a popup editable.  You can also use the popup to remove its source.  This is adapted from [leaflet-popup-modifier](https://github.com/slutske22/leaflet-popup-modifier) to work with React-Leaflet.

See the [GitHub](https://github.com/slutske22/React-Leaflet-Editable-Popup) for more information.

## Demo

See this codesandbox for examples.  Click on the popups for explanations.

## Installation

Install via npm:

`npm install react-leaflet-editable-popup`

Or just grab the EditablePopup.js and .css files from the src folder and stick them in your project.

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
    <td> Opens the popup when map is loaded.  You can use <code>autoClose={false}</code> to open multiple popups at once (this is not specific to EditablePopup, but its good to know!) </td>
  </tr>

  <tr>
    <td> <code>removable</code> </td>
    <td> Renders a "Remove this Marker" button inside the popup.  When clicked, this will remove the popup's source (as well as the popup) from your map.  It will not delete your marker or popup instance from the map.  See <code>removalCallback</code> on how to do this. </td>
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

## Contenteditable

<!-- In order for the user's input to be properly processed as HTML, user input is routed through <a href="https://www.npmjs.com/package/html-react-parser" target="_blank">html-react-parser</a>.  For this reason, the initial value of the popup's content that you code in must be in the form of a javascript string.  This is similar to Leaflet's [setContent](https://leafletjs.com/reference-1.6.0.html#popup-setcontent) function. -->

<!-- If you wish to include javascript statements, use a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank">template string</a> rather than a <a href="https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx" target="_blank">JSX expression</a> -->

Your initial value for the popup's content can be raw JSX, a React class or functional component, or an HTML string.  The only requirement when using JSX is that it all must be wrapped in a single node, exactly like in React's `render` function.  When a user edits the content and saves it, it is always saved as an HTML string.

## Examples

Check out the codesandbox for some examples in action.

### Without state management

Using the `editable` and `removable` props without a state management structure is very simple.  Just add them as props to your `<Popup>` and they will work.  See the simple example in the *Using this Plugin* section above.  Each popup will keep newly edited content within its own state.

### With state management

A very common react pattern is to render a series of components from an array using a `.map` statement.  For example:

````jsx
class MapWithMarkers extends React.Component{

  state = {
    markers: [
      {
        coords: [coords],
        popupContent: 'Popup content is usually an HTML string.'
      },
      {
        coords: ...,
        popupContent: ...
      },
      {...},
      {...},
      ...
    ]
  }

  render(){

    const mapMarkers = this.state.markers.map( (markerSpec, index) => {
      return {
        <Marker position={markerSpec.coords} key={index}>
          <Popup removable editable>
            {markerSpec.popupContent}
          </Popup>
        </Marker>
      }
    })

    return(
      <Map center={center} zoom={zoom}>
        {mapMarkers}
      </Map>
    )
  }


}
````

In the above example, markers are rendered from an array held in the `<MapWithMarkers />`'s state.  This example will allow the user to remove markers from the map or edit their content, but these changes do not communicate with the application's state.  In order to do this, you need to pass functions to the `removalCallback` and `saveContentCallback` props:

````jsx
  const mapMarkers = this.state.markers.map( (markerSpec, index) => {
    return {
      <Marker position={markerSpec.coords} key={index}>
        <Popup removable editable
        removalCallback={(index) => this.removeMarkerFromState(index)}
        saveContentCallback={(content, index) => this.saveContentToState(content, index)} >
          {markerSpec.popupContent}
        </Popup>
      </Marker>
    }
  })
````
In this case, your callback functions can be defined like this:
````jsx
class MapWithMarkers extends React.Component{

  removeMarkerFromState = (index) => {
    this.setState(prevState => {
      prevState.markers.splice(index, 1)
      return {
        markers: prevState.markers
      }
    })
  }

  saveContentToState = (content, index) => {
    this.setState( prevState => {
      const newMarkers = prevState.markers
      newMarkers[index].popupContent = content
      return {
        markers: newMarkers
      }
    })
  }

  state = {...}

  render(){...}

}
````
So using our callback functions, we can reflect our changes in the application's global state.  This example involved a case where state is stored in a parent component, but your callback functions could just as easily communicate with a redux store, or any other state management system of your choice.  The following is an example for an application using redux:

````jsx
import { removeMarkerFromState, saveContentToState } from '.../actions/mapActions.js'

// Inside <MapWithMarkers>'s render function:
    <Popup removable editable
    removalCallback={(index) => this.props.removeMarkerFromState(index)}
    saveContentCallback={(content, index) => this.props.saveContentToState(content, index)} >
      {markerSpec.popupContent}
    </Popup>

// Using redux dispatch:
const mapDispatchToProps = dispatch => ({
  removeMarkerFromState: (index) => store.dispatch( removeMarkerFromState(index) )
  saveContentToState: (content, index) => store.dispatch( saveContentToState(content, index) )
})
````

## Planned improvements:
Currently the removal button says "Remove this marker," but not every popup originates from a marker.  Plans to change the word 'marker' to 'circle,' 'polygon,' 'line,' etc., automatically based on the source type in the works.

## License
GNU GENERAL PUBLIC LICENSE Version 3
