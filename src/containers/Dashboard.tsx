import React, { useState, useEffect } from 'react'
import AlbumPreview from 'components/AlbumPreview'
import useSpotifyRequest from 'hooks/useSpotifyRequest'
import { getDashboardData } from 'spotify/fetch'
import { SpotifySimplifiedAlbum } from 'types/spotify'

const DashboardContainer: React.FC = (props) => {
  const [recentTracks, setRecentTracks] = useState<SpotifySimplifiedAlbum[]>([])
  const request = useSpotifyRequest()
  useEffect(() => {
    getDashboardData(request)
      .then((data) => setRecentTracks(data))
      .catch((err) => null)
  }, [request])

  return (
    <div>
      <div className="row">
        {recentTracks.map((album) => (
          <AlbumPreview key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}
export default DashboardContainer
