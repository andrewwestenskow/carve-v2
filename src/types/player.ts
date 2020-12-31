declare global {
  interface Window {
    Spotify: any
  }
}

export interface DeviceInfo {
  device_id: string
}

interface SpotifyPlayerOptions {
  name: string
  id: string
  get0AuthToken: Function
  volume: number
}

type playerActions =
  | 'ready'
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error'
  | 'player_state_changed'

const playerFallback = () => console.warn('Player state not set')

export const defaultSpotifyPlayer: SpotifyPlayer = {
  _options: {
    name: '',
    id: '',
    get0AuthToken: () => playerFallback(),
    volume: 1,
  },
  on: (action, cb) => playerFallback(),
  connect: async () => playerFallback(),
}

export interface SpotifyPlayer {
  _options: SpotifyPlayerOptions
  on: (action: playerActions, cb: Function) => void
  connect: () => Promise<void>
}

interface PlayerContext {
  uri: string
  metadata: { context_description: string }
}

interface SpotifyImage {
  height: number
  width: number
  url: string
}

interface SpotifyTrack {
  album: SpotifyTrackAlbum
  artists: SpotifyTrackArtist[]
  duration_ms: number
  id: string
  is_playable: boolean
  media_type: string
  name: string
  type: string
  uri: string
}

interface SpotifyTrackAlbum {
  images: SpotifyImage[]
  name: string
  uri: string
}

interface SpotifyTrackArtist {
  name: string
  uri: string
}

export interface SpotifyPlayerState {
  bitrate: number
  context: PlayerContext
  duration: number
  paused: boolean
  position: number
  repeat_mode: 0 | 1 | 2 | 3
  shuffle: boolean
  timestamp: number
  track_window: {
    current_track: SpotifyTrack
    next_tracks: SpotifyTrack[]
    previous_tracks: SpotifyTrack[]
  }
}
