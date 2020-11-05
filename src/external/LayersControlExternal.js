import React, { useEffect } from 'react'
import { LayersControl } from 'react-leaflet'
import { LeafletContext } from '@react-leaflet/core'

/*
Externalizing the LayersControl is a bit hacky but it does work as expected:
The parent <LayersControl> creates a new L.control.layers() with no arguments
In the cdm of <LayersConrol>, the L.control.layers() is not initialized and its container is not yetready
<LayersControl> keeps track of how many of its children have rendered in its state
<LayersControl.BaseLayer> and <LayersControl.Overlay> update the parent state on their CDMs
<LayersControl> tracks these updates in componentDidUpdate, and performed rehoming logic once all children are rendered
There must be a better way to do this using the built in component creation hooks
https://react-leaflet-v3.now.sh/docs/core-architecture#supporting-children
*/

export class LayersControlExternal extends React.Component{
   constructor(props){
      super(props)
      this.containerName = this.props.containerName || 'layers-control-container'
   }

   state = {
      childrenRendered: 0
   }

   componentDidUpdate(){

      if (this.props.children.length === this.state.childrenRendered) {
         const container = this.controlRef.getContainer()
         const desinationRef = document.querySelector(`.${this.containerName}`)
         desinationRef.appendChild(container)
      }

   }

   updateParent = () => {
      this.setState(prevState => {
         return {
            childrenRendered: prevState.childrenRendered + 1
         }
      })
   }

   render() {

      const originalChildren = React.Children.toArray(this.props.children)
      const newChildren = originalChildren.map( element => React.cloneElement(element, { updateParent: this.updateParent }))

      return (
         <>
            <LeafletContext.Provider value={{map: this.props.map}}>
               <LeafletContext.Consumer>
                  {  
                     () => (
                        <LayersControl className={`${this.containerName}-original`} ref={controlRef => this.controlRef = controlRef} {...this.props} >
                           {newChildren}
                        </LayersControl>
                     )
                  }
               </LeafletContext.Consumer>
            </LeafletContext.Provider>
            <div className={this.containerName} />
         </>
      )
   }

}


const BaseLayer = props => {

   useEffect(() => {
      props.updateParent()
   }, [])

   const { children, updateParent, ...passedProps } = props

   return (
      <LayersControl.BaseLayer {...passedProps}>
         {props.children}
      </LayersControl.BaseLayer>
   )
}

const Overlay = props => {

   const { children, updateParent, ...passedProps } = props

   useEffect(() => {
      props.updateParent()
   }, [])

   return (
      <LayersControl.Overlay {...passedProps}>
         {props.children}
      </LayersControl.Overlay>
   )
}

LayersControlExternal.BaseLayer = BaseLayer
LayersControlExternal.Overlay = Overlay