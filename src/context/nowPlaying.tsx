import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'

type availableActions = 'SET_DEVICE_ID'

interface NowPlayingState {
  setNowPlayingId: Function
  nowPlaying_id: string
}

interface NowPlayingAction {
  type: availableActions
  payload: string
}

function reducer(state: NowPlayingState, action: NowPlayingAction) {
  switch (action.type) {
    case 'SET_DEVICE_ID':
      return { ...state, nowPlaying_id: action.payload }
    default:
      throw new Error('Unsupported action provided to nowPlaying context')
  }
}

const initialState: NowPlayingState = {
  nowPlaying_id: '',
  setNowPlayingId: () => console.warn('No auth provider'),
}

const NowPlayingContext = createContext<NowPlayingState>(initialState)
NowPlayingContext.displayName = 'NowPlayingStore'

export const NowPlayingProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setNowPlayingId = useCallback((id: string) => {
    dispatch({
      type: 'SET_DEVICE_ID',
      payload: id,
    })
  }, [])

  return (
    <NowPlayingContext.Provider value={{ ...state, setNowPlayingId }}>
      {props.children}
    </NowPlayingContext.Provider>
  )
}

const useNowPlayingContext = (): NowPlayingState => {
  const nowPlayingState = useContext(NowPlayingContext)
  return nowPlayingState
}

export default useNowPlayingContext
