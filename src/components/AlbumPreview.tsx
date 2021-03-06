import React from 'react'
import { SpotifySimplifiedAlbum } from 'types/spotify'
import HoverWidget from 'components/widgets/HoverWidget'

interface Props {
  album: SpotifySimplifiedAlbum
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
