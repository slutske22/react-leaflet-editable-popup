# React Leaflet Editable Popup
A small plugin for leaflet which allows the author to make a popup editable.  You can also use the popup to remove its source.  This is adapted from [leaflet-popup-modifier](https://github.com/slutske22/leaflet-popup-modifier) to work with React-Leaflet.


<p align="center">
  <img src="leaflet-popupMod-gif.gif">
</p>

## [React Only Demo](https://codesandbox.io/s/github/slutske22/React-Leaflet-Editable-Popup) / [React Redux Demo](https://codesandbox.io/s/editable-popup-redux-example-9u0t2)

See this [codesandbox](https://codesandbox.io/s/github/slutske22/React-Leaflet-Editable-Popup) for examples.  Click on the popups for explanations.

See [another example](https://codesandbox.io/s/editable-popup-redux-example-9u0t2), using react-redux and with a separate component for array-generated markers and popups.

## Installation

Install via npm:

`npm install react-leaflet-editable-popup`

Or just grab the EditablePopup.js and .css files from the src folder and stick them in your project.


## Using the plugin

Import into your map component like so:
````javascript
import Popup from 'react-leaflet-editable-popup'
import Popup from '...wherever/components/EditablePopup'
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
    <td> Renders a "Remove this {leaflet element}" button inside the popup.  When clicked, this will remove the popup's source (as well as the popup) from your map.  It will not delete your element or popup instance from the map.  See <code>removalCallback</code> on how to do this. </td>
  </tr>

  <tr>
    <td> <code>editable</code> </td>
    <td> Renders an "Edit" button on the popup.  When clicked, this will allow the user to edit the content of the popup.  This is done with a <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content" target="_blank">contenteditable</a> div (specifically with <a href="https://github.com/lovasoa/react-contenteditable" target="_blank">react-contenteditable</a>).  See below for more on that.</td>
  </tr>
  
  <tr>
    <td> <code>nametag={<i>'yourNametag'</i>}</code> </td>
    <td> Gives authors the option to change the 'Remove this {leaflet element}' to 'Remove this {nametag}'.  For all layers that can have a popup, this plugin installs names equivalent to the type of layer, and uses that as a nametag.  For example, a removable popup attached to a polyline will say 'Remove this polyline', whereas for a circle, it will say 'Remove this circle'.  The nametag prop allows you to customize that.</td>
  </tr>

  <tr>
    <td colspan="2"><br> The following two props are used when generating markers (or any other popup source) dynamically from an array or object.  Enables you to pass the popup content and index (or key) of the popup's source to somewhere else in your application, i.e. a global state in parent component or to a redux store.<br>. </td>
  </tr>

  <tr>
    <td> <code>removalCallback={ index => this.yourCallback(index) }</code> </td>
    <td> Enables you to pass the key or index of the rendered source from the 'Remove this Marker' button to your own callback function.  Useful to connect to a more global state and remove the correct source marker.  See examples below. </td>
  </tr>

  <tr>
    <td> <code>saveContentCallback={ (content, index) => this.yourCallback(content, index) }</code> </td>
    <td> Enables you to pass the new popup content and index (or key) of the rendered source back to your own callback function.  This enables the author to save user edits into a more globally managed state.  See examples below. </td>
  </tr>

</table>

## Contenteditable

Your initial value for the popup's content can be raw JSX, a React class or functional component, or an HTML string.  The only requirement when using JSX is that it all must be wrapped in a single node, exactly like in React's `render` function.  When a user edits the content and saves it, it is always saved as an HTML string.

## Examples

Check out the [codesandbox](https://codesandbox.io/s/github/slutske22/React-Leaflet-Editable-Popup) for some examples in action.

See [another example](https://codesandbox.io/s/editable-popup-redux-example-9u0t2), using react-redux and with a separate component for array-generated markers and popups.

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
        popupContent: '<p>Popup content is usually an HTML string.</p>'
      },
      {
        coords: [coords],
        popupContent: <h3>Popup content can also be JSX or a React component</h3>
      },
      {...},
      {...},
      ...
    ]
  }

  render(){

    const mapMarkers = this.state.markers.map( (markerSpec, index) => {
      return {
        <Marker position={markerSpec.coords} key={uuidv4()}>
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
      <Marker position={markerSpec.coords} key={uuidv4()}>
        <Popup removable editable
        removalCallback={ () => {this.removeMarkerFromState(index)} }
        saveContentCallback={ content => {this.saveContentToState(content, index)} } >
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

    // Close popup on leafletmap first - you'll need to define a map reference to do this
    mapRef.current.leafletElement.closePopup()

    // Create a new array identical to the old one, and modify it - immutability!
    const newRandomMarkers = [...this.state.randomMarkers]
    newRandomMarkers.splice(index, 1)

    // ...and save to state
    this.setState({
        randomMarkers: newRandomMarkers
    })
  }

  saveContentToState = (content, index) => {

      const newRandomMarkers = this.state.randomMarkers.map( (marker, i) => {
         if (i === index) {
            return {
               ...marker,
               popupContent: content,
            }
         } else {
            return marker
         }
      })

      this.setState({
         randomMarkers: newRandomMarkers
      })

  }

  state = {...}

  render(){...}

}
````
So using our callback functions, we can reflect our changes in the application's global state.  *(Note the use of `uuid4()`, from [uuid](https://www.npmjs.com/package/uuid).  This is a scenario where using the index as the key is a very bad idea - wierd things will happen when you use `key={index}` and try to edit popup contents)* This example involved a case where state is stored in a parent component, but your callback functions could just as easily communicate with a redux store, or any other state management system of your choice.  The following is an example for an application using redux:

````jsx
import { removeMarkerFromState, saveContentToState } from '.../actions/mapActions.js'

// Inside <MapWithMarkers>'s render function:
    <Popup removable editable
    removalCallback={ () => {this.props.removeMarkerFromState(index)} }
    saveContentCallback={ content => {this.props.saveContentToState(content, index)} } >
      {markerSpec.popupContent}
    </Popup>

// Using redux dispatch:
const mapDispatchToProps = dispatch => ({
  removeMarkerFromState: (index) => store.dispatch( removeMarkerFromState(index) )
  saveContentToState: (content, index) => store.dispatch( saveContentToState(content, index) )
})
````

### Managing Open and Close state in state managed scenarios

This next part goes a little in depth, but you may find it useful if you will be using `EditablePopups` in a state-managed scenario.  One thing to consider is that when a popup's content is saved, it will update the parent state.  When the parent state is updated, the parent component will rerender.  This means that the popup you were editing will likely close when hitting the `Save` button, unless it happened to be set to `open` when you defined it.  We need a way to communicate with the parent state about which popup(s) should be open for each rerender.  We can use the built in `onOpen` and `onClose` functions that a regular react-leaflet `Popup` offers:

````jsx

  state = {
    markers: [
      {
        coords: [coords],
        popupContent: '<p>Popup content is usually an HTML string.</p>',
        open: false
      },
      {
        coords: [coords],
        popupContent: <h3>Popup content can also be JSX or a React component</h3>
        open: false
      },
      {...},
      {...},
      ...
    ]
  }

  // Inside render():
  const mapMarkers = this.state.markers.map( (markerSpec, index) => {
    return {
      <Marker position={markerSpec.coords} key={uuidv4()}>
        <Popup removable editable open={markerSpec.open}
          removalCallback={ () => {this.removeMarkerFromState(index)} }
          saveContentCallback={ content => {this.saveContentToState(content, index)} }
          onOpen={ () => {this.onOpenPopup(index)} }
          onClose={ () => {this.onClosePopup(index)} } >

          {markerSpec.popupContent}

        </Popup>
      </Marker>
    }
  })
````

We can define these callbacks to altar the `open` property of each array item:

````jsx
   onOpenPopup = index => {

      const newRandomMarkers = this.state.randomMarkers.map( (marker, i) => {
         if (i === index) {
            return {
               ...marker,
               open: true
            }
         } else {
            return {...marker}
         }
      })

      this.setState({
         randomMarkers: newRandomMarkers
      })

   }

   onClosePopup = index => {

      const newRandomMarkers = this.state.randomMarkers.map( (marker, i) => {
         if (i === index) {
            return {
               ...marker,
               open: false
            }
         } else {
            return {...marker}
         }
      })

      this.setState({
         randomMarkers: newRandomMarkers
      })
      
   }
````

Now when a popup is opened or closed, the parent's state will know to rerender it as such when anything is changed.  Considering you need to open a popup to edit it, clicking `save` on an open popup will rerender the map with that popup still open.

### Problem / Limitation - Leaflet vs. React state management

A strange problem occurs when using the `open` prop: on popup open, the map rerenders, as the state has changed.  When the map rerenders, Leaflets `map.closePopup()` function fires, effectively closing whatever popup is open.  So although react fires the `onOpen` function, Leaflet causes the `onClose` function to fire immediately after.  A possible solution to this problem is to use react's `shouldComponentUpdate`, and prevent any rerendering of the map when a `Marker`'s `open` or `popupContent` property changes.  Rather, we can ask the map to only rerender if the number of markers in an array has changed:

````jsx
   shouldComponentUpdate(nextProps, nextState) {

      if (this.state.randomMarkers.length !== nextState.randomMarkers.length){
         return true
      } else {
         if (!isEqual(this.state.randomMarkers, nextState.randomMarkers)){
            return false
         } else {
            return true
         }
      }

   }
````

Note the use of `isEqual` from [react-fast-compare](https://www.npmjs.com/package/react-fast-compare) for deep object / array comparison.  This `shouldComponentUpdate` function prevents the map from rerendering when a popup's `open` status or `popupContent` has changed, leaving `EditablePopup` to handle these state changes internally.  You may need to force an update if you want to update your state at some point (saving user activity to localStorage or a server for future reference, for example). Despite its hackiness, this does indeed wor and create a group of popups that function as expect, with good performance and UX.  If you find another solution to this problem, open an issue or PR.

Whew!  That's a lot of boilerplate!  You may consider moving each array of markers to its own component, along with all of the callbacks and rendering logic for that array group.  You can find an example of that [here](https://codesandbox.io/s/editable-popup-redux-example-9u0t2).


## License
GNU GENERAL PUBLIC LICENSE Version 3
