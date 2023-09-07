import React from 'react'
import { Navigate } from 'react-router-dom'
const Guest = ({children}) => {
    
    if (localStorage.getItem("user")) {
        return <Navigate to="/desk" replace />
      }
    return children
}

export default Guest