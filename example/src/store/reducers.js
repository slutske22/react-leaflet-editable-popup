import { C } from './actions'

const initialState = {
   sidebarTab: 'home',
   useActiveArea: 'true'
}

export function reducers(state = initialState, action){

   switch(action.type){

      case C.SET_SIDEBAR_TAB:
         return {
            ...state,
            sidebarTab: action.tabId
         }

      case C.TOGGLE_ACTIVE_AREA:
         return {
            ...state,
            useActiveArea: action.status
         }

      default:
         return state

   }

}