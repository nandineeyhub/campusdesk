import React from 'react'
import { Navigate } from 'react-router-dom'
const Protected = ({children}) => {
    if (localStorage.getItem("user") == null) {
        return <Navigate to="/" replace />
      }
      return children
}

export default Protected