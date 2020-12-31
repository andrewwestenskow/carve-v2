require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const { SERVER_PORT, SESSION_SECRET } = process.env
const spotifyAuthCtrl = require('./controllers/spotifyAuthController')

app.use(express.json())
app.use(cookieParser(SESSION_SECRET))

app.get('/login', spotifyAuthCtrl.login)
app.post('/callback', spotifyAuthCtrl.callback)
app.post('/refresh', spotifyAuthCtrl.refresh)
app.get('/cookie', spotifyAuthCtrl.verifyCookie)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
