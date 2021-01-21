import { useCallback, useMemo } from 'react'
import useAuthContext from 'context/auth'
import axios, { AxiosRequestConfig } from 'axios'

export type Request = <ReturnType>(
  config: AxiosRequestConfig
) => Promise<ReturnType>

function useSpotifyRequest(): Request {
  const { access_token, refreshTokens } = useAuthContext()

  const headers = useMemo(() => ({ Authorization: `Bearer ${access_token}` }), [
    access_token,
  ])

  const request = useCallback<Request>(
    async function <T>(options: AxiosRequestConfig) {
      const fullOptions: AxiosRequestConfig = {
        ...options,
        headers,
      }

      if (!access_token) {
        throw new Error('waiting for token')
      }

      try {
        const { data } = await axios.request<T>(fullOptions)
        return data
      } catch (error) {
        try {
          await refreshTokens()
          const { data } = await axios.request<T>(fullOptions)
          return data
        } catch (error) {
          console.log(error)
          throw new Error('Error fetching after refresh')
        }
      }
    },
    [access_token, refreshTokens, headers]
  )

  return request
}

export default useSpotifyRequest
