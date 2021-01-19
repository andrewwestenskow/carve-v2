import React from 'react'

const withSpotify = (Component: React.FC) => {
  return (props: Record<any, any>) => {
    return window.isSpotifyReady ? (
      <Component {...props} />
    ) : (
      <p>Connecting to spotify</p>
    )
  }
}

export default withSpotify
