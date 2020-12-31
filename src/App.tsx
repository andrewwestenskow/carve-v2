import routes from 'routes'
import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useAuthContext from 'context/auth'
import useUserContext from 'context/user'
import axios from 'axios'
import { AuthResponse } from 'types/util'
import 'styles/App.scss'

function App() {
  const { access_token, setTokens } = useAuthContext()
  const { setUser } = useUserContext()
  const history = useHistory()
  const handleRender = useCallback(async () => {
    if (access_token) {
      return
    } else {
      try {
        const {
          data: { tokens, user },
        } = await axios.get<AuthResponse>('/session')
        setTokens(tokens)
        setUser(user)
        history.push(`/user/${user.name}/spotify/dashboard`)
      } catch (error) {
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')
        if (
          access_token &&
          access_token !== 'undefined' &&
          refresh_token &&
          refresh_token !== 'undefined'
        ) {
          try {
            const {
              data: { tokens, user },
            } = await axios.post<AuthResponse>('/token', {
              access_token,
              refresh_token,
            })
            setTokens(tokens)
            setUser(user)
            history.push(`/user/${user.name}/spotify/dashboard`)
          } catch (error) {
            history.push('/')
          }
        } else {
          history.push('/')
        }
      }
    }
  }, [access_token, setTokens, setUser, history])

  useEffect(() => {
    handleRender()
  }, [handleRender])

  return <div className="App">{routes}</div>
}

export default App
