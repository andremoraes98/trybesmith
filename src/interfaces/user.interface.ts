export interface User {
  id?: number,
  username: string,
  classe: string,
  level: number,
  password: string
}

export interface Credentials {
  username: string,
  password: string
}