import React, { useEffect } from 'react'
import axios from 'axios'
import { EmptyProps } from 'types/util'
import { useLocation, useHistory } from 'react-router-dom'
import useAuthContext from 'context/auth'
import useUserContext from 'context/user'

const HandleCallback: React.FunctionComponent<EmptyProps> = (props) => {
  const location = useLocation()
  const history = useHistory()
  const { setUser } = useUserContext()
  const { setTokens } = useAuthContext()

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search)
    const code = urlQuery.get('code')
    axios
      .post(`/callback?code=${code}`)
      .then((res) => {
        setTokens(res.data.tokens)
        setUser(res.data.user)
        history.push(`/user/${res.data.user.name}/spotify/dashboard`)
      })
      .catch((err) => {
        console.log(err)
        history.push('/')
      })
  }, [location, history, setTokens, setUser])

  return <div>Logging you in</div>
}
export default HandleCallback
