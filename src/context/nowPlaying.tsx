import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import useRequest from 'hooks/useSpotifyRequest'
import { BASE_URL } from 'spotify/fetch'
import { SpotifyCurrentlyPlayingContext } from 'types/spotify'

type availableActions = 'SET_NOW_PLAYING'

type nothingPlaying = 'NOTHING_PLAYING'

export const playerFallback = 'NOTHING_PLAYING'

interface NowPlayingState {
  refreshPlayer: Function
  nowPlaying: SpotifyCurrentlyPlayingContext | nothingPlaying
}

interface NowPlayingAction {
  type: availableActions
  payload: SpotifyCurrentlyPlayingContext | nothingPlaying
}

function reducer(state: NowPlayingState, action: NowPlayingAction) {
  switch (action.type) {
    case 'SET_NOW_PLAYING':
      return { ...state, nowPlaying: action.payload }
    default:
      throw new Error('Unsupported action provided to nowPlaying context')
  }
}

const initialState: NowPlayingState = {
  nowPlaying: 'NOTHING_PLAYING',
  refreshPlayer: () => console.warn('No nowPlaying provider'),
}

const NowPlayingContext = createContext<NowPlayingState>(initialState)
NowPlayingContext.displayName = 'NowPlayingStore'

export const NowPlayingProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const request = useRequest()

  const refreshPlayer = useCallback(
    async function () {
      const info = await request<SpotifyCurrentlyPlayingContext>({
        url: BASE_URL + '/me/player',
        method: 'GET',
      })
      dispatch({ type: 'SET_NOW_PLAYING', payload: info })
    },
    [request]
  )

  return (
    <NowPlayingContext.Provider value={{ ...state, refreshPlayer }}>
      {props.children}
    </NowPlayingContext.Provider>
  )
}

const useNowPlayingContext = (): NowPlayingState => {
  const nowPlayingState = useContext(NowPlayingContext)
  return nowPlayingState
}

export default useNowPlayingContext
