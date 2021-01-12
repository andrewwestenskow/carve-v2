import React from 'react'
import AlbumPreview from 'components/AlbumPreview'
import useSpotifyRequest from 'hooks/useSpotifyRequest'
import { SpotifyAlbum, RecentTrack } from 'types/player'
import { recentTracks } from 'spotify/requests'

const DashboardContainer: React.FC = (props) => {
  const { data: recentAlbums } = useSpotifyRequest<RecentTrack, SpotifyAlbum>(
    recentTracks
  )

  return (
    <div>
      <div className="row">
        {recentAlbums.map((album) => (
          <AlbumPreview key={album.uri} album={album} />
        ))}
      </div>
    </div>
  )
}
export default DashboardContainer
