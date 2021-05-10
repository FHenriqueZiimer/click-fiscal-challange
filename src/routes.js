import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewPhrase from './pages/NewPhrase'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/home' exact component={Home} />
        <Route path='/phrase/new' exat component={NewPhrase} />
      </Switch>
    </BrowserRouter>
  )
}
  
export default Routes