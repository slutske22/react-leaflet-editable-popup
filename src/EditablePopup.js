import React from 'react'
import { Popup } from 'react-leaflet'
import ContentEditable from 'react-contenteditable'
import './editable-popup.css'

const prefix = 'leaflet-popup'

class EditablePopup extends React.Component{

   state = {
      editScreenOpen: false,
      inputValue: this.props.children,
      content: this.props.children,
   }



   openEditScreen = () => {
      console.log(this)
      this.setState({editScreenOpen: true})
   }

   closeEditScreen = () => {
      this.setState({editScreenOpen: false})
   }

   handleEdits = (e) => {
      this.setState({inputValue: e.target.value})
      console.log(this.state.inputValue)
   }

   saveEdits = () => {
      this.setState({
         content: this.state.inputValue,
      })
      this.closeEditScreen()
   }

   cancelEdits = () => {
      this.setState({
         inputValue: this.props.children
      })
      this.closeEditScreen()
   }


   render(){

      let Buttons;

      if (this.props.removable && !this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <a className={`${prefix}-remove-button`}>Remove this marker</a>
         </div>
         )
      } else if (!this.props.removable && this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <a className={`${prefix}-edit-button`}>Edit</a>
            </div>
         )
      } else if (this.props.removable && this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <a className={`${prefix}-remove-button`}>Remove this marker</a>
               <a onClick={ this.openEditScreen } className={`${prefix}-edit-button`}>Edit</a>
            </div>
         )
      }

      const contentScreen = (
         <>
            <div>{this.state.content}</div>
            {Buttons}
         </>
      )

      const editScreen = (
         <>
            {/* <div contentEditable className="leaflet-popup-input" onChange={ this.handleEdits }>{this.state.inputValue}</div> */}

            <ContentEditable className="leaflet-popup-input" html={this.state.inputValue} onChange={ this.handleEdits } />

            <div className="leaflet-popup-useraction-buttons">
               <a className={`${prefix}-cancel-button`} onClick={this.cancelEdits} >Cancel</a>
               <a className={`${prefix}-save-button`} onClick={this.saveEdits} >Save</a>
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