import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewPhrase from './pages/NewPhrase'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <PrivateRoute path='/phrase/new' exat component={NewPhrase} />
        <PrivateRoute path='/home' exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
  
export default Routes