import {
  SpotifyHistory,
  SpotifyDevices,
  SpotifyCursorPaging,
  SpotifySimplifiedAlbum,
} from 'types/spotify'
import { Request } from 'hooks/useSpotifyRequest'

export const BASE_URL = 'https://api.spotify.com/v1'

export const getUserDevices = async (request: Request) => {
  const { devices } = await request<SpotifyDevices>({
    url: BASE_URL + '/me/player/devices',
  })

  devices.sort((a, b) => (a.is_active ? -1 : 1))
  return devices
}

export const getDashboardData = async (request: Request) => {
  const { items } = await request<SpotifyCursorPaging<SpotifyHistory>>({
    url: BASE_URL + '/me/player/recently-played?limit=50',
    method: 'GET',
  })

  const formattedRecent = items.reduce(
    (acc: SpotifySimplifiedAlbum[], track: SpotifyHistory) => {
      const inArray = acc.some((e: any) => e.uri === track.track.album.uri)

      if (!inArray) {
        acc.push(track.track.album)
      }
      return acc
    },
    []
  )

  return formattedRecent
}
