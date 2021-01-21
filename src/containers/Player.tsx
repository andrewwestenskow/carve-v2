import React, { useState, useEffect } from 'react'

import NowPlaying from 'components/Player/NowPlaying'
import AvailableDevices from 'components/Player/AvailableDevices'
import useAuth from 'context/auth'
import useDevice from 'context/device'
import useRequest from 'hooks/useSpotifyRequest'
import { getCurrentlyPlaying } from 'spotify/fetch'

import {
  SpotifyPlayer,
  defaultSpotifyPlayer,
  DeviceInfo,
  SpotifyPlayerState,
} from 'types/player'
import withSpotify from 'hocs/withSpotify'

const PlayerContainer: React.FC = (props) => {
  const { access_token, refreshTokens } = useAuth()
  const { setDeviceId } = useDevice()
  const [player, setPlayer] = useState<SpotifyPlayer>(defaultSpotifyPlayer)
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(
    null
  )

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
          .catch((err: any) => console.log(err))

        newPlayer.on('ready', ({ device_id }: DeviceInfo) => {
          setPlayer(newPlayer)
          setDeviceId(device_id)
          // getCurrentlyPlaying(request).then((res) => {
          //   console.log(res)
          // })
        })

        newPlayer.on('initialization_error', (e: any) => {
          console.error(e)
          console.warn('INITIALIZATION ERROR')
        })

        newPlayer.on('authentication_error', (e: any) => {
          console.error(e)
          console.warn('AUTHENTICATION ERROR')
          newPlayer.disconnect()
          refreshTokens().then(() => {
            connectToPlayer()
          })
        })

        newPlayer.on('playback_error', (e: any) => {
          console.error(e)
          console.warn('PLAYBACK ERROR')
        })

        newPlayer.on('player_state_changed', (state: SpotifyPlayerState) => {
          // if (state?.track_window) {
          //   document.title = `${state.track_window.current_track.artists[0].name} - ${state.track_window.current_track.name}`
          //   let favicon: any = document.querySelector("link[rel*='icon']")
          //   favicon.href = state.track_window.current_track.album.images[0].url
          // }
          // setPlayerState(state)
        })
      }
    }
    connectToPlayer()
  }, [access_token, player._options.id, refreshTokens, request, setDeviceId])

  return playerState ? (
    <div className="Player">
      <NowPlaying current_track={playerState.track_window.current_track} />
      <AvailableDevices />
    </div>
  ) : (
    <div className="Player">
      Nothing playing
      <AvailableDevices />
    </div>
  )
}

export default withSpotify(PlayerContainer)
