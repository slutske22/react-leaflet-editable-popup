import React from "react";
import MapContext from "./Context";

class MapProvider extends React.Component {
  state = { map: null };

  setMap = map => {
    this.setState({ map });
  };

  render() {
    return (
      <MapContext.Provider value={{ map: this.state.map, setMap: this.setMap }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}

export default MapProvider;
