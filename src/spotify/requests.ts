import { SpotifyRequest } from 'types/util'
import { RecentTrack, SpotifyAlbum } from 'types/player'

export const recentTracks: SpotifyRequest = {
  url: '/me/player/recently-played',
  method: 'GET',
  queries: [{ limit: '50' }],
  format: (items: any) => {
    return items.reduce((acc: SpotifyAlbum[], track: RecentTrack) => {
      const inArray = acc.some(
        (e: SpotifyAlbum) => e.uri === track.track.album.uri
      )

      if (!inArray) {
        acc.push(track.track.album)
      }
      return acc
    }, [])
  },
}
