import React, { useState, useEffect } from 'react'
import NowPlaying from 'components/Player/NowPlaying'
import AvailableDevices from 'components/Player/AvailableDevices'
import useAuth from 'context/auth'
import useDevice from 'context/device'
import useRequest from 'hooks/useSpotifyRequest'
import useNowPlaying, { playerFallback } from 'context/nowPlaying'

import {
  SpotifyPlayer,
  defaultSpotifyPlayer,
  DeviceInfo,
  SpotifyPlayerError,
} from 'types/player'
import withSpotify from 'hocs/withSpotify'

const PlayerContainer: React.FC = (props) => {
  const { access_token, refreshTokens } = useAuth()
  const { setDeviceId } = useDevice()
  const { refreshPlayer, nowPlaying } = useNowPlaying()
  const [player, setPlayer] = useState<SpotifyPlayer>(defaultSpotifyPlayer)

  const request = useRequest()

  useEffect(() => {
    const connectToPlayer = () => {
      if (window.Spotify !== null && !player._options.id && access_token) {
        const newPlayer: SpotifyPlayer = new window.Spotify.Player({
          name: 'Carve',
          getOAuthToken: (cb: Function) => {
            cb(access_token)
          },
        })

        newPlayer
          .connect()
          .then()
          .catch((err: SpotifyPlayerError) => console.log(err))

        newPlayer.on('ready', ({ device_id }: DeviceInfo) => {
          setPlayer(newPlayer)
          setDeviceId(device_id)
          refreshPlayer()
        })

        newPlayer.on('initialization_error', (e: SpotifyPlayerError) => {
          console.error(e)
          console.warn('INITIALIZATION ERROR')
        })

        newPlayer.on('authentication_error', (e: SpotifyPlayerError) => {
          console.error(e)
          console.warn('AUTHENTICATION ERROR')
          newPlayer.disconnect()
          refreshTokens().then(() => {
            connectToPlayer()
          })
        })

        newPlayer.on('playback_error', (e: SpotifyPlayerError) => {
          console.error(e)
          console.warn('PLAYBACK ERROR')
        })
      }
    }
    connectToPlayer()
  }, [access_token, player._options.id, refreshTokens, request, setDeviceId])

  return nowPlaying === playerFallback ? (
    <div className="Player">
      Nothing playing
      <AvailableDevices />
    </div>
  ) : (
    <div className="Player">
      <NowPlaying current_track={nowPlaying.item} />
      <AvailableDevices />
    </div>
  )
}

export default withSpotify(PlayerContainer)
