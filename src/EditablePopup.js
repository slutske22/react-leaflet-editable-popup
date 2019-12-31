import React from 'react'
import { Popup } from 'react-leaflet'
import ContentEditable from 'react-contenteditable'
import Parser from 'html-react-parser';
import './editable-popup.css'

const prefix = 'leaflet-popup-button'


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
      // console.log(e.target.value.toString())
      this.setState({inputValue: e.target.value})
   }

   saveEdits = () => {
      this.setState({
         content: this.state.inputValue,
      })
      this.closeEditScreen()
   }

   cancelEdits = () => {
      this.setState({
         inputValue: this.state.content
      })
      this.closeEditScreen()
   }

   removeSource = () => {
      if (this.props.source){
         this.props.source.current.leafletElement.remove()
      } else if(this.props.sourceIndex.toString()){
         this.props.removeRandomMarker(this.props.sourceIndex)
      }
   }


   render(){

      let Buttons;

      if (this.props.removable && !this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <button className={`${prefix} remove`} onClick={this.removeSource} >Remove this marker</button>
            </div>
         )
      } else if (!this.props.removable && this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <button className={`${prefix} edit`}>Edit</button>
            </div>
         )
      } else if (this.props.removable && this.props.editable){
         Buttons = (
            <div className="leaflet-popup-useraction-buttons">
               <button className={`${prefix} remove`} onClick={this.removeSource} >Remove this marker</button>
               <button onClick={ this.openEditScreen } className={`${prefix} edit`}>Edit</button>
            </div>
         )
      }

      const contentScreen = (
         <>
            {Parser(this.state.content)}
            {Buttons}
         </>
      )

      const editScreen = (
         <>
            {/* <div contentEditable className="leaflet-popup-input" onChange={ this.handleEdits }>{this.state.inputValue}</div> */}

            <ContentEditable className="leaflet-popup-input" html={this.state.inputValue} ref="editableDiv" onChange={ this.handleEdits } />

            <div className="leaflet-popup-useraction-buttons">
               <button className={`${prefix} cancel`} onClick={this.cancelEdits} >Cancel</button>
               <button className={`${prefix} save`} onClick={this.saveEdits} >Save</button>
            </div>
         </>
      )

      return(
         <Popup minWidth="160">
            {this.state.editScreenOpen ? editScreen : contentScreen}
         </Popup>
      )
   }
}



export default EditablePopup