//- ALBUMS

type albumTypes = 'album' | 'single' | 'compilation'

export interface SpotifyAlbum {
  album_type: albumTypes
  artists: SpotifyArtist[]
  external_ids: SpotifyExternalId
  external_urls: SpotifyExternalUrl
  available_markets: string[]
  genres: string[]
  id: string
  href: string
  images: SpotifyImage[]
  label: string
  name: string
  popularity: number
  release_date: string
  restrictions?: SpotifyAlbumRestrictions
  tracks: SpotifySimplifiedTrack[]
  type: 'album'
  uri: string
}

interface SpotifySimplifiedAlbum {}

interface SpotifySavedAlbum {
  added_at: string
  album: SpotifyAlbum
}

type availableRestrictions = 'market' | 'product' | 'explicit'

interface SpotifyAlbumRestrictions {
  reason: availableRestrictions
}

//-ARTISTS

interface SpotifyArtist {
  external_urls: SpotifyExternalUrl
  genres: string[]
  followers: SpotifyFollowers
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  popularity: number
  type: 'artist'
  uri: string
}

interface SpotifySimplifiedArtist {}

//-TRACKS

interface SpotifyTrack {}

interface SpotifySimplifiedTrack {}

interface SpotifyPlaylistTrack {
  added_at: string
  added_by: SpotifyPublicUser
  is_local: boolean
  track: SpotifyTrack | SpotifyEpisode
}

interface SpotifySavedShow {
  added_at: string
  track: SpotifyTrack
}

//-SHOWS

interface SpotifyShow {
  available_markets: string[]
  description: string
  episodes: SpotifySimplifiedEpisode[]
  explicit: boolean
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  images: SpotifyImage[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: 'show'
  uri: string
}

interface SpotifySimplifiedShow {}

interface SpotifySavedShow {
  added_at: string
  show: SpotifyShow
}

//-EPISODES

interface SpotifyEpisode {
  audio_preview_url: string
  description: string
  duration_ms: number
  explicit: boolean
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  images: SpotifyImage[]
  is_externally_hosted: boolean
  is_playable: boolean
  languages: string[]
  name: string
  release_date: string
  resume_point: SpotifyResumePoint
  show: SpotifySimplifiedShow
  type: 'episode'
  uri: string
}

interface SpotifySimplifiedEpisode {}

//-PLAYLISTS

interface SpotifyPlaylist {
  collaborative: boolean
  description: string
  external_urls: SpotifyExternalUrl
  followers: SpotifyFollowers
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  owner: SpotifyPublicUser
  public: boolean
  snapshot_id: string
  tracks: SpotifyPlaylistTrack[]
  type: 'playlist'
  uri: string
}

interface SpotifySimplifiedPlaylist {}

//-DEVICES

interface SpotifyDevice {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: number
}

//-NOW PLAYING

type currentlyPlayingTypes = 'track' | 'episode' | 'ad' | 'unknown'

type repeatStates = 'off' | 'track' | 'context'

type onOrOff = 'on' | 'off'

interface SpotifyCurrentlyPlaying {
  context: SpotifyContext
  currently_playing_type: currentlyPlayingTypes
  is_playing: boolean
  item: SpotifyTrack | SpotifyEpisode
  progress_ms: number
  timestamp: number
}

interface SpotifyCurrentlyPlayingContext {
  context: SpotifyContext
  currently_playing_type: currentlyPlayingTypes
  device: SpotifyDevice
  is_playing: boolean
  item: SpotifyTrack | SpotifyEpisode
  progress_ms: number
  repeat_state: repeatStates
  shuffle_state: onOrOff
  timestamp: number
}

//-RECENTLY PLAYED

//* this is called PlayHistoryObject on the docs
interface SpotifyRecentlyPlayed {
  context: SpotifyContext
  played_at: string
  track: SpotifySimplifiedTrack
}

//- USERS

interface SpotifyPublicUser {
  display_name: string
  external_urls: SpotifyExternalUrl
  followers: SpotifyFollowers
  href: string
  id: string
  images: SpotifyImage[]
  type: 'user'
  uri: string
}

interface SpotifyPrivateUser extends SpotifyPublicUser {
  country: string
  email: string
  explicit_content: SpotifyExplicitSettings
  followers: SpotifyFollowers
  product: string
}

//-UTILITY

interface SpotifyImage {
  height: number
  url: string
  width: number
}

interface SpotifyExternalId {
  ean: string
  isrc: string
  ups: string
}

interface SpotifyExternalUrl {
  spotify: string
}

interface SpotifyContext {}

interface SpotifyFollowers {
  href: null
  total: number
}

interface SpotifyResumePoint {
  fully_played: boolean
  resume_position_ms: number
}

interface SpotifyLinkedTrack {
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  type: 'track'
  uri: string
}

interface SpotifyExplicitSettings {
  filter_enabled: boolean
  filter_locked: boolean
}
