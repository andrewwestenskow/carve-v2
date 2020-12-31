import React from 'react'
import PlayerContainer from 'containers/Player'

const AppContainer: React.FC = (props) => {
  return (
    <>
      <div className="app-children">{props.children}</div>
      <PlayerContainer />
    </>
  )
}

export default AppContainer
