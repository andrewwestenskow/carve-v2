import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from 'components/Auth/Login'
import HandleCallback from 'components/Auth/HandleCallback'
import AppContainer from 'containers/AppContainer'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/callback" component={HandleCallback} />
    <Route
      path="/user/:email"
      render={() => (
        <AppContainer>
          <div>HI THERE</div>
        </AppContainer>
      )}
    />
  </Switch>
)
