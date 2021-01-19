import React from 'react'
import { SpotifyTrack } from 'types/player'
import { JsxChild } from 'typescript'

interface NowPlayingProps {
  current_track: SpotifyTrack
}

const NowPlaying: React.FC<NowPlayingProps> = (props) => {
  return (
    <div className="NowPlaying">
      <img
        className="album-cover"
        src={props.current_track.album.images[0].url}
      />
      <div className="track-info">
        <p className="track-name">{props.current_track.name}</p>
        <p className="artist-name">{props.current_track.artists[0].name}</p>
      </div>
    </div>
  )
}

export default NowPlaying
