import React from 'react'
import { Popup } from 'react-leaflet'

class EditablePopup extends React.Component{

   state = {
      editScreenOpen: false,
      inputValue: this.props.children,
      content: this.props.children,
   }


   openEditScreen = () => {
      this.setState({editScreenOpen: true})
   }

   closeEditScreen = () => {
      this.setState({editScreenOpen: false})
   }

   handleEdits = (e) => {
      console.log(e)
      this.setState({inputValue: e.target.value})
   }


   render(){

      let Buttons;

      if (this.props.removable && !this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <a>Remove this marker</a>
         </div>
         )
      } else if (!this.props.removable && this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <a>Edit</a>
            </div>
         )
      } else if (this.props.removable && this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <a>Remove this marker</a>
               <a onClick={ this.openEditScreen }>Edit</a>
            </div>
         )
      }

      const contentScreen = (
         <>
            <div>{this.props.children}</div>
            {Buttons}
         </>
      )

      const editScreen = (
         <>
            <div contentEditable className="leaflet-popup-edit-screen" onChange={ this.handleEdits }>{this.state.inputValue}</div>
            <div className="leaflet-popup-useraction-buttons">
               <a>Cancel</a>
               <a>Save</a>
            </div>
         </>
      )

      return(
         <Popup>
            {this.state.editScreenOpen ? editScreen : contentScreen}
         </Popup>
      )
   }
}



export default EditablePopup