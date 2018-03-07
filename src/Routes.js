import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  </main>
)

export default Routes
