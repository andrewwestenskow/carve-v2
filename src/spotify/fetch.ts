import { SpotifyAlbumPreview, RecentTrack, AvailableDevice } from 'types/player'

const BASE_URL = 'https://api.spotify.com/v1'

export const getCurrentlyPlaying = async (request: Function) => {
  const info = await request({ url: BASE_URL + '/me/player', method: 'GET' })
  return info
}

export const getUserDevices = async (request: Function) => {
  const { devices }: { devices: AvailableDevice[] } = await request({
    url: BASE_URL + '/me/player/devices',
  })

  devices.sort((a, b) => (a.is_active ? -1 : 1))
  return devices
}

export const getDashboardData = async (request: Function) => {
  const { items } = await request({
    url: BASE_URL + '/me/player/recently-played?limit=50',
    method: 'GET',
  })

  const formattedRecent = items.reduce(
    (acc: SpotifyAlbumPreview[], track: RecentTrack) => {
      const inArray = acc.some(
        (e: SpotifyAlbumPreview) => e.uri === track.track.album.uri
      )

      if (!inArray) {
        acc.push(track.track.album)
      }
      return acc
    },
    []
  )

  return formattedRecent
}
