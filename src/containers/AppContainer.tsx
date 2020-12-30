import React from 'react'

const AppContainer: React.FC = (props) => {
  return (
    <>
      <div className="app-children">{props.children}</div>
    </>
  )
}

export default AppContainer
