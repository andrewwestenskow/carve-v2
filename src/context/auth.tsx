import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import { AuthTokens, AuthResponse } from 'types/util'
import axios from 'axios'

type availableActions = 'SET_TOKENS'

interface AuthState extends AuthTokens {
  setTokens: Function
  refreshTokens: Function
}

interface AuthAction {
  type: availableActions
  payload: AuthTokens
}

function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'SET_TOKENS':
      return { ...state, ...action.payload }
    default:
      throw new Error('Unsupported action provided to user context')
  }
}

const initialState: AuthState = {
  access_token: '',
  refresh_token: '',
  setTokens: () => console.warn('No auth provider'),
  refreshTokens: () => console.warn('No auth provider'),
}

const AuthContext = createContext<AuthState>(initialState)
AuthContext.displayName = 'AuthStore'

export const AuthProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setTokens = useCallback((tokens: AuthTokens) => {
    dispatch({
      type: 'SET_TOKENS',
      payload: tokens,
    })
  }, [])

  const refreshTokens = useCallback(() => {
    axios.post<AuthResponse>('/refresh').then((res) => {
      setTokens(res.data.tokens)
    })
  }, [setTokens])

  return (
    <AuthContext.Provider value={{ ...state, setTokens, refreshTokens }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuthContext = (): AuthState => {
  const authState = useContext(AuthContext)
  return authState
}

export default useAuthContext
