import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'

type availableActions = 'SET_DEVICE_ID'

interface DeviceState {
  setDeviceId: Function
  device_id: string
}

interface DeviceAction {
  type: availableActions
  payload: string
}

function reducer(state: DeviceState, action: DeviceAction) {
  switch (action.type) {
    case 'SET_DEVICE_ID':
      return { ...state, device_id: action.payload }
    default:
      throw new Error('Unsupported action provided to device context')
  }
}

const initialState: DeviceState = {
  device_id: '',
  setDeviceId: () => console.warn('No device provider'),
}

const DeviceContext = createContext<DeviceState>(initialState)
DeviceContext.displayName = 'DeviceStore'

export const DeviceProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setDeviceId = useCallback((id: string) => {
    dispatch({
      type: 'SET_DEVICE_ID',
      payload: id,
    })
  }, [])

  return (
    <DeviceContext.Provider value={{ ...state, setDeviceId }}>
      {props.children}
    </DeviceContext.Provider>
  )
}

const useDeviceContext = (): DeviceState => {
  const deviceState = useContext(DeviceContext)
  return deviceState
}

export default useDeviceContext
