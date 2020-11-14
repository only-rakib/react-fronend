import React from 'react'
import { Route,Redirect } from "react-router-dom";
const Protected = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('login')
        ? <Component {...props} />
        : <Redirect to='/auth/login' />
    )} />
  )

export default Protected
