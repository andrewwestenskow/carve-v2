import React from 'react'
import { SpotifyAlbum } from 'types/player'
import HoverWidget from 'components/widgets/HoverWidget'

interface Props {
  album: SpotifyAlbum
}

const AlbumPreview: React.FC<Props> = (props) => {
  return (
    <div className="album-preview">
      <div
        style={{ backgroundImage: `url(${props.album.images[0].url})` }}
        className="album-preview-image"
      >
        <HoverWidget />
      </div>
      <p className="secondary-label">{props.album.artists[0].name}</p>
      <p className="primary-label">{props.album.name}</p>
    </div>
  )
}

export default AlbumPreview
