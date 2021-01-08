import { useState } from 'react'
import useAuth from 'context/auth'
import {
  SpotifyPlayer,
  defaultSpotifyPlayer,
  DeviceInfo,
  SpotifyPlayerState,
} from 'types/player'

const PlayerContainer: React.FC = (props) => {
  const { access_token } = useAuth()
  const [player, setPlayer] = useState<SpotifyPlayer>(defaultSpotifyPlayer)

  const checkForPlayer = () => {
    if (window.Spotify !== null && !player._options.id && access_token) {
      const newPlayer: SpotifyPlayer = new window.Spotify.Player({
        name: 'Carve',
        getOAuthToken: (cb: Function) => {
          cb(access_token)
        },
      })
      clearInterval(checkInterval)
      newPlayer
        .connect()
        .then()
        .catch((err: any) => console.log(err))

      newPlayer.on('ready', ({ device_id }: DeviceInfo) => {
        setPlayer(newPlayer)
      })

      newPlayer.on('initialization_error', (e: any) => {
        console.error(e)
        console.warn('INITIALIZATION ERROR')
      })

      newPlayer.on('authentication_error', (e: any) => {
        console.error(e)
        console.warn('AUTHENTICATION ERROR')
      })

      newPlayer.on('playback_error', (e: any) => {
        console.error(e)
        console.warn('PLAYBACK ERROR')
      })

      newPlayer.on('player_state_changed', (state: SpotifyPlayerState) => {
        console.log(state)
      })
    }
  }

  const checkInterval = setInterval(() => {
    checkForPlayer()
  }, 1000)

  return <div className="Player">Hello</div>
}

export default PlayerContainer
