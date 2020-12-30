import axios from 'axios'
import { EmptyProps } from 'types/util'

const Login: React.FunctionComponent<EmptyProps> = (props) => {
  const handleLogin = async () => {
    const response = await axios.get('/login')
    window.location.href = response.data
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
