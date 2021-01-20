declare global {
  interface Window {
    Spotify: any
    isSpotifyReady: boolean
  }
}

export interface DeviceInfo {
  device_id: string
}

export interface AvailableDevice {
  id: string
  is_active: boolean
  is_private_session: boolean
  name: string
  type: string
  volume_percent: number
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
  disconnect: async () => playerFallback(),
}

export interface SpotifyPlayer {
  _options: SpotifyPlayerOptions
  on: (action: playerActions, cb: Function) => void
  connect: () => Promise<void>
  disconnect: () => Promise<void>
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

export interface SpotifyTrack {
  album: SpotifyTrackAlbum
  artists: SpotifyTrackArtistPreview[]
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

export interface RecentTrack {
  track: SpotifyTrack
}

export interface SpotifyAlbumPreview {
  uri: string
  name: string
  images: SpotifyImage[]
}

export interface SpotifyAlbum extends SpotifyAlbumPreview {
  release_date: string
  total_tracks: number
  id: string
  album_type: string
  artists: SpotifyTrackArtist[]
}

interface SpotifyTrackArtistPreview {
  name: string
  uri: string
}

export interface SpotifyTrackArtist extends SpotifyTrackArtistPreview {
  id: string
}
