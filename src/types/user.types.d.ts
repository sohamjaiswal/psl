export interface IUser {
  username: string
  password: string
}

export type IExposedUser = Omit<IUser, 'password'>