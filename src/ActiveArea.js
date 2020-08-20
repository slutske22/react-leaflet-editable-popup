import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet-active-area'

export const ActiveArea  = props => {

   const map = useMap()

   useEffect( () => {
      const recenter = props.recenter ? true : false
      const animate = props.animate && props.recenter ? true : false
      map.setActiveArea('ActiveArea', recenter, animate);
      console.log(map.getContainer())

      return () => {
         const originalContainer = map.getContainer()
         map.setActiveArea(originalContainer)
      }

   })

   return (
      <div className={`${props.className} ActiveArea`}>
         {props.children}
      </div>
   )

}