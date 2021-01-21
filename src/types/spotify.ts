//- ALBUMS

type albumTypes = 'album' | 'single' | 'compilation'
type precisions = 'year' | 'month' | 'day'
interface SpotifySimplifiedAlbum {
  album_type: albumTypes
  artists: SpotifySimplifiedArtist[]
  available_markets: string[]
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  release_date: string
  release_date_precision: precisions
  restrictions?: SpotifyAlbumRestrictions
  type: 'album'
  uri: string
}

export interface SpotifyAlbum extends SpotifySimplifiedAlbum {
  artists: SpotifyArtist[]
  external_ids: SpotifyExternalId
  available_markets: string[]
  genres: string[]
  label: string
  popularity: number
  tracks: SpotifySimplifiedTrack[]
}

interface SpotifySavedAlbum {
  added_at: string
  album: SpotifyAlbum
}

type availableRestrictions = 'market' | 'product' | 'explicit'

interface SpotifyAlbumRestrictions {
  reason: availableRestrictions
}

//-ARTISTS

interface SpotifySimplifiedArtist {
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  name: string
  type: 'artist'
  uri: string
}

interface SpotifyArtist extends SpotifySimplifiedArtist {
  genres: string[]
  followers: SpotifyFollowers
  images: SpotifyImage[]
  popularity: number
}

//-TRACKS

interface SpotifySimplifiedTrack {
  artists: SpotifySimplifiedArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  is_local: boolean
  is_playable: boolean
  linked_from: SpotifyLinkedTrack
  name: string
  preview_url: string
  track_number: number
  type: 'track'
  uri: string
}

interface SpotifyTrack extends SpotifySimplifiedTrack {
  album: SpotifySimplifiedAlbum
  artists: SpotifyArtist[]
  external_ids: SpotifyExternalId
  popularity: number
}

interface SpotifyPlaylistTrack {
  added_at: string
  added_by: SpotifyPublicUser
  is_local: boolean
  track: SpotifyTrack | SpotifyEpisode
}

interface SpotifyPlaylistTracksRef {
  href: string
  total: number
}

//-SHOWS

interface SpotifySavedShow {
  added_at: string
  track: SpotifyTrack
}

interface SpotifySimplifiedShow {
  available_markets: string[]
  description: string
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

interface SpotifyShow extends SpotifySimplifiedShow {
  episodes: SpotifySimplifiedEpisode[]
}

interface SpotifySavedShow {
  added_at: string
  show: SpotifyShow
}

//-EPISODES

interface SpotifySimplifiedEpisode {
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
  release_date_precision: precisions
  resume_point: SpotifyResumePoint
  type: 'episode'
  uri: string
}

interface SpotifyEpisode extends SpotifySimplifiedEpisode {
  show: SpotifySimplifiedShow
}

//-PLAYLISTS

interface SpotifySimplifiedPlaylist {
  collaborative: boolean
  description: string
  external_urls: SpotifyExternalUrl
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  owner: SpotifyPublicUser
  public: boolean
  snapshot_id: string
  tracks: SpotifyPlaylistTracksRef
  type: 'playlist'
  uri: string
}

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
