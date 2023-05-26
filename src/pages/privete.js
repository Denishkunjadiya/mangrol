import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Privete = (props) => {
    const auth = localStorage.getItem('token')

    return auth ? <Outlet /> : <Navigate to='/signUp' />
}

export default Privete
