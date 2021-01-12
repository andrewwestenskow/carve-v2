import { useEffect, useState, useMemo, useCallback } from 'react'
import ReactDOM from 'react-dom'
import axios, { AxiosRequestConfig } from 'axios'
import useAuthContext from 'context/auth'
import { AuthResponse, SpotifyRequest } from 'types/util'

function useSpotifyRequest<Response, Return = Response>(
  config: SpotifyRequest
) {
  const [data, setData] = useState<Return[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { access_token, setTokens } = useAuthContext()

  const fullUrl =
    `https://api.spotify.com/v1` +
    config.url +
    (config.queries.length
      ? config.queries.reduce((acc, e) => {
          const [key] = Object.keys(e)
          return `${acc}${key}=${e[key]}&`
        }, '?')
      : '')

  const options: AxiosRequestConfig = useMemo(
    () => ({
      method: config.method,
      url: fullUrl,
      headers: { Authorization: `Bearer ${access_token}` },
    }),
    [config.method, fullUrl, access_token]
  )

  const formatAndSetData = useCallback(
    (items: Response[]) => {
      setData(config.format(items))
    },
    [config]
  )

  useEffect(() => {
    if (access_token) {
      axios(options)
        .then((res) => {
          ReactDOM.unstable_batchedUpdates(() => {
            formatAndSetData(res.data)
            setIsLoading(false)
          })
        })
        .catch(() => {
          console.log('ATTEMPTING AUTH REFRESH')
          axios.post<AuthResponse>('/refresh').then((res) => {
            const newOptions = {
              ...options,
              headers: {
                Authorization: `Bearer ${res.data.tokens.access_token}`,
              },
            }
            setTokens(res.data.tokens)
            console.log(newOptions)
            axios(newOptions)
              .then((res) => {
                ReactDOM.unstable_batchedUpdates(() => {
                  formatAndSetData(res.data)
                  setIsLoading(false)
                })
              })
              .catch(() => {
                console.warn('REQUEST FAILED AFTER ATTEMPTED AUTH REFRESH')
              })
          })
        })
    }
  }, [options, access_token, formatAndSetData, setTokens])

  return { data, isLoading }
}

export default useSpotifyRequest
