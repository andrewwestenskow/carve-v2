import { useCallback, useMemo } from 'react'
import useAuthContext from 'context/auth'
import axios, { AxiosRequestConfig } from 'axios'

const useSpotifyRequest = () => {
  const { access_token, refreshTokens } = useAuthContext()

  const headers = useMemo(() => ({ Authorization: `Bearer ${access_token}` }), [
    access_token,
  ])

  const request = useCallback(
    async (options: AxiosRequestConfig) => {
      const fullOptions: AxiosRequestConfig = {
        ...options,
        url: `https://api.spotify.com/v1${options.url}`,
        headers,
      }

      if (!access_token) {
        throw new Error('waiting for token')
      }

      try {
        const { data } = await axios(fullOptions)
        return data
      } catch (error) {
        try {
          await refreshTokens()
          const { data } = await axios(fullOptions)
          return data
        } catch (error) {
          console.log(error)
          console.warn('Error fetching after refresh')
        }
      }
    },
    [access_token, refreshTokens, headers]
  )

  return request
}

export default useSpotifyRequest
