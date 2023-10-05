import React from 'react'
import ValidatePermission from './ValidatePermission'
import { Navigate } from 'react-router-dom'
const AuthCheck = ({children, access}) => {
     if(ValidatePermission(access)) return children
     else  return <Navigate to="/" replace />
}

export default AuthCheck