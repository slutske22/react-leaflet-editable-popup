import React from 'react'
import { } from 'leaflet-arrowheads'

class Arrowheads extends React.Component{

   state = {
      parentRef: null
   }

   componentDidUpdate(prevProps){
      if (prevProps.parent !== this.props.parent){
         this.setState({
            parentRef: this.props.parent
         })
      }
      console.log(this.props.parent)
   }

   render(){
      return (
         <div></div>
      )
   }

}

export default Arrowheads