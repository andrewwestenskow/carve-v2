import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import { User } from 'types/util'

type availableActions = 'SET_USER'

interface UserState extends User {
  setUser: Function
}

interface UserAction {
  type: availableActions
  payload: User
}

function reducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload }
    default:
      throw new Error('Unsupported action provided to user context')
  }
}

const initialState: UserState = {
  name: '',
  email: '',
  image: '',
  setUser: () => console.warn('No user provider'),
}

const UserContext = createContext<UserState>(initialState)
UserContext.displayName = 'UserStore'

export const UserProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setUser = useCallback((user: User) => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    })
  }, [])

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUserContext = (): UserState => {
  const userState = useContext(UserContext)
  return userState
}

export default useUserContext
