import { SpotifyAlbumPreview, RecentTrack } from 'types/player'

export const getDashboardData = async (request: Function) => {
  const { items, next } = await request({
    url: '/me/player/recently-played?limit=50',
    method: 'GET',
  })

  // const data = await request({
  //   url: next,
  //   method: 'GET',
  // })

  // console.log(data)

  const recent = [...items]

  const formattedRecent = recent.reduce(
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
