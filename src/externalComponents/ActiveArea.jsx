import React from 'react'
import 'leaflet-active-area'
import MapContext from '../Context'

class ActiveArea extends React.Component{

   componentDidMount(){
      const map = this.mapReference
      const recenter = this.props.recenter ? true : false
      const animate = this.props.animate && this.props.recenter ? true : false
      map.setActiveArea('activeArea', recenter, animate);
   }

   render(){
      return(
         <MapContext.Consumer>
            { value => {
               this.mapReference = value.map
               return(
                  <div className="activeArea">{this.props.children}</div>
               )
            }}
         </MapContext.Consumer>
      )
   }
   
}

export default ActiveArea




// // Creating a version that doesn't contain the context itself, but requires the context be wrapped around it when it is declared

// // class ActiveArea extends React.Component{

//    componentDidMount(){
//       const { map } = this.props.map
//       const recenter = this.props.recenter ? true : false
//       const animate = this.props.animate && this.props.recenter ? true : false
//       map.setActiveArea('activeArea', recenter, animate);
//    }

//    render(){
//       return(
//          <div className="activeArea"></div>
//       )
//    }
   
// }


// // Declared in parent like this:

// // Using context external to component itself
//
// <MapContext.Consumer>
//    {(value) => (<ActiveArea map={value} />)}
// </MapContext.Consumer>
