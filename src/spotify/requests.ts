import { SpotifyRequest } from 'types/util'
import { RecentTrack, SpotifyAlbumPreview } from 'types/player'

export const currentlyPlaying: SpotifyRequest = {
  url: '/me/player',
  method: 'GET',
  queries: [],
  format: (item: any) => {
    return item
  },
}

export const recentTracks: SpotifyRequest = {
  url: '/me/player/recently-played',
  method: 'GET',
  queries: [{ limit: '50' }],
  format: ({ items }: any) => {
    return items.reduce((acc: SpotifyAlbumPreview[], track: RecentTrack) => {
      const inArray = acc.some(
        (e: SpotifyAlbumPreview) => e.uri === track.track.album.uri
      )

      if (!inArray) {
        acc.push(track.track.album)
      }
      return acc
    }, [])
  },
}
