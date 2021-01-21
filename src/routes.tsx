import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from 'components/Auth/Login'
import HandleCallback from 'components/Auth/HandleCallback'
import AppContainer from 'containers/AppContainer'
import DashboardContainer from 'containers/Dashboard'
import { DeviceProvider } from 'context/device'
import { NowPlayingProvider } from 'context/nowPlaying'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/callback" component={HandleCallback} />
    <Route
      path="/user/:name"
      render={() => (
        <DeviceProvider>
          <NowPlayingProvider>
            <AppContainer>
              <Switch>
                <Route
                  path="/user/:name/spotify/dashboard"
                  component={DashboardContainer}
                />
              </Switch>
            </AppContainer>
          </NowPlayingProvider>
        </DeviceProvider>
      )}
    />
  </Switch>
)
