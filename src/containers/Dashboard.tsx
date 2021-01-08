import React from 'react'
import useSpotifyRequest from 'hooks/useSpotifyRequest'
import { SpotifyAlbum, RecentTrack } from 'types/player'
import { recentTracks } from 'spotify/requests'

const DashboardContainer: React.FC = (props) => {
  const { data: recentAlbums, isLoading: isLoadingRecent } = useSpotifyRequest<
    RecentTrack,
    SpotifyAlbum
  >(recentTracks)

  console.log(recentAlbums)

  return (
    <div>
      {recentAlbums.map((album) => (
        <p>{album.name}</p>
      ))}
    </div>
  )
}
export default DashboardContainer
