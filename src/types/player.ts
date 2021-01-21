//- Allow for necessary global variables

declare global {
  interface Window {
    Spotify: any
    isSpotifyReady: boolean
  }
}

//- Options for spotify player
interface SpotifyPlayerOptions {
  name: string
  id: string
  get0AuthToken: Function
  volume: number
}

//- Default value for player object and fallback callback

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

//- Player type with available actions

type playerActions =
  | 'ready'
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error'
  | 'player_state_changed'

export interface SpotifyPlayer {
  _options: SpotifyPlayerOptions
  on: (action: playerActions, cb: Function) => void
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

//- Returned when player is ready
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

//- State returned by player_state_changed event
export interface SpotifyPlayerState {
  bitrate: number
  context: PlayerContext
  duration: number
  paused: boolean
  position: number
  repeat_mode: 0 | 1 | 2 | 3
  shuffle: boolean
  timestamp: number
  // track_window: {
  //   current_track: SpotifyTrack
  //   next_tracks: SpotifyTrack[]
  //   previous_tracks: SpotifyTrack[]
  // }
  track_window: any
}

interface PlayerContext {
  uri: string
  metadata: { context_description: string }
}

type availableErrors =
  | 'NO_PREV_TRACK'
  | 'NO_NEXT_TRACK'
  | 'NO_SPECIFIC_TRACK'
  | 'ALREADY_PAUSED'
  | 'NOT_PAUSED'
  | 'NOT_PLAYING_LOCALLY'
  | 'NOT_PLAYING_TRACK'
  | 'NOT_PLAYING_CONTEXT'
  | 'ENDLESS_CONTEXT'
  | 'CONTEXT_DISALLOW'
  | 'ALREADY_PLAYING'
  | 'RATE_LIMITED'
  | 'REMOTE_CONTROL_DISALLOW'
  | 'DEVICE_NOT_CONTROLLABLE'
  | 'VOLUME_CONTROL_DISALLOW'
  | 'NO_ACTIVE_DEVICE'
  | 'PREMIUM_REQUIRED'
  | 'UNKNOWN'

export interface SpotifyPlayerError {
  message: string
  reason: availableErrors
  status: number
}
