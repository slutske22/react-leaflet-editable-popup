# React Leaflet Custom Components

This repo is a playground for development of custom components for React-Leaflet.  If you wish to use any of these, copy their source code.  I imagine that most of these components would need to be further customized to suit any given application's needs, so there is currently no npm package available.  If you find you want the ease of writing `import { SomeComponent } from 'react-leaflet-custom-components'`, open up an issue and I'll work on making a package.

## :eyes: [Demo (CodeSandBox)](https://codesandbox.io/s/github/slutske22/react-leaflet-custom-components) :eyes:

## Regular Map Components

All components listed here are designed to be used as direct children of the `<Map />` component.  They are written according to the [react-leaflet: Creating custom components](https://react-leaflet.js.org/docs/en/custom-components.html) guide.



### Editable Popup

<p align="center">
  <img src="https://github.com/slutske22/React-Leaflet-Editable-Popup/raw/master/leaflet-popupMod-gif.gif" width="80%">
</p>

A popup component with additional features.  This component has its own [repo](https://github.com/slutske22/React-Leaflet-Editable-Popup) and [npm package](https://www.npmjs.com/package/react-leaflet-editable-popup).  Check out the documentation there for details on how to install and use.

### Arrowheads

<p align="center">
  <img src="https://github.com/slutske22/react-leaflet-arrowheads/raw/master/images/banner.png" width="80%">
</p>

A react-leaflet wrapper for [leaflet-arrowheads](https://github.com/slutske22/leaflet-arrowheads).  This component has its own [repo](https://github.com/slutske22/react-leaflet-arrowheads) and [npm package](https://www.npmjs.com/package/react-leaflet-arrowheads). Check out the documentation there for details on how to install and use.

### ActiveArea

A react-leaflet wrapper for the [leaflet-active-area](https://github.com/Mappy/Leaflet-active-area) plugin.

### Esri-Leaflet GeoSearch

<p align="center">
  <img src="images/ERG.gif" width="80%">
</p>

A react-leaflet wrapper for the [esri-leaflet-geocoder geosearch](https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html).

### MousePosition

<p align="center">
  <img src="images/mouseposition.gif">
</p>

A small component which gives the user's mouse position in latitude and longitude.  Extended from [Leaflet's Control Class](https://leafletjs.com/reference-1.6.0.html#control).   Duplicated almost exactly from Vadim Gremyachev's answer in https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components.

### RandomMarkerButton

A button to randomly place a marker anywhere within the map's bounds.  Not currently hooked up to any react state objects.
TODO:  Allow for state management callback similar to EditablePopup example.

## Externalized Map Components

The following components are designed to be used *not* as direct children of the `<Map />` component.  This makes it possible for communication between the `<Map />` and components that are not direct descendants of the `<Map />` tree.
