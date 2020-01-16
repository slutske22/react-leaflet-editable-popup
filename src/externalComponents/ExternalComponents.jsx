import React from 'react'

class ExternalComponents extends React.Component{

  componentDidMount(){
     console.log(this.props.mapReference)
  }
   
   render(){
      return(
         <div></div>
      )
   }
}

export default ExternalComponents