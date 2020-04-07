import React from 'react'

function withEsriAuth(EsriLayerComponent){

   return class EsriAuthenticatedHOC extends React.Component{

      state = {
         token: null
      }

      componentDidMount(){
         if (!this.state.token){
            this.authenticateEsri()
         } 
      }

      authenticateEsri = () => {

         const authservice = 'https://www.arcgis.com/sharing/rest/oauth2/token'
         const client_id = 'z5qFAApXsxo674A8'
         const client_secret = '5c4d804cedb845fda5b3828f92bc8998'
         const expiration = 100000
      
         const url = `${authservice}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`
         
         fetch(url, {
            method: 'POST',
         })
            .then(res =>  res.json())
            .then(res => { 
               this.setState({token: res.access_token})
            })
            .catch(error => {
               console.error(error)
            })
      
      }

      render(){
         return (
            <>
               {this.state.token && <EsriLayerComponent {...this.state} {...this.props} />}
            </>
         )
      }

   }

}


export default withEsriAuth