const BASE_URL = 'https://api.spotify.com/v1'

export const transferPlayback = async (request: Function, deviceId: string) => {
  try {
    await request({
      url: BASE_URL + '/me/player',
      method: 'PUT',
      data: { device_ids: [deviceId] },
    })
  } catch (error) {
    console.error(error)
  }
}
