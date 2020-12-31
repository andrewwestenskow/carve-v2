import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import { AuthTokens } from 'types/util'

type availableActions = 'SET_TOKENS'

interface AuthState extends AuthTokens {
  setTokens: Function
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

  return (
    <AuthContext.Provider value={{ ...state, setTokens }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuthContext = (): AuthState => {
  const authState = useContext(AuthContext)
  return authState
}

export default useAuthContext
