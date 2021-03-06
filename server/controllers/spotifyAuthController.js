require('dotenv').config()
const querystring = require('querystring')
const axios = require('axios')
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} = process.env
const extractUserInfo = require('../utils/extractUserInfo')

module.exports = {
  login: (req, res) => {
    console.log('LOGIN')
    const scopes =
      'playlist-read-collaborative playlist-modify-private playlist-modify-public playlist-read-private user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-private user-read-email user-library-modify user-library-read user-follow-modify user-follow-read user-read-recently-played user-top-read streaming app-remote-control'

    res.status(200).send(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: SPOTIFY_CLIENT_ID,
          scope: scopes,
          redirect_uri: SPOTIFY_REDIRECT_URI,
        })
    )
  },
  callback: async (req, res) => {
    console.log('CALLBACK')
    const { code } = req.query
    const body = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    }
    try {
      const options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: querystring.stringify(body),
      }
      const { data: spotifyAuth } = await axios(options)

      const userOptions = {
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: { Authorization: `Bearer ${spotifyAuth.access_token}` },
      }

      const { data: user } = await axios(userOptions)

      res.cookie(
        'tokens',
        {
          access_token: spotifyAuth.access_token,
          refresh_token: spotifyAuth.refresh_token,
        },
        { signed: true }
      )

      res.status(200).send({
        tokens: {
          access_token: spotifyAuth.access_token,
          refresh_token: spotifyAuth.refresh_token,
        },
        user: extractUserInfo(user),
      })
    } catch (error) {
      res.status(500).send({ message: 'Could not authenticate', data: error })
    }
  },
  refresh: async (req, res) => {
    console.log('REFRESHING')
    const { refresh_token } = req.signedCookies.tokens
    try {
      const body = {
        grant_type: 'refresh_token',
        refresh_token,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }
      const options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: querystring.stringify(body),
      }
      const { data: refreshSpotifyAuth } = await axios(options)

      res.cookie(
        'tokens',
        {
          access_token: refreshSpotifyAuth.access_token,
          refresh_token: refreshSpotifyAuth.refresh_token || refresh_token,
        },
        { signed: true }
      )

      const userOptions = {
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: { Authorization: `Bearer ${refreshSpotifyAuth.access_token}` },
      }

      const { data: user } = await axios(userOptions)

      res
        .status(200)
        .send({ tokens: req.signedCookies.tokens, user: extractUserInfo(user) })
    } catch (error) {
      console.log('ERROR REFRESHING')
      res.status(500).send({ message: 'Error refreshing auth', error: error })
    }
  },
  verifyCookie: async (req, res) => {
    const { tokens } = req.signedCookies

    if (!tokens) {
      return res.sendStatus(404)
    }
    console.log('CHECKING TOKEN')
    const { access_token, refresh_token } = tokens

    const options = {
      url: 'https://api.spotify.com/v1/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    try {
      const { data: user } = await axios(options)

      res.status(200).send({ tokens: { access_token, refresh_token }, user })
    } catch (error) {
      module.exports.refresh(req, res)
    }
  },
}
