export type EmptyProps = Record<any, never>

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface User {
  name: string
  image: string
  email: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}
