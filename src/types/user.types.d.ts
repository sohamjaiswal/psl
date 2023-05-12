export interface IUser {
  username: string
  firstName?: string
  lastName?: string
  profilePicture: string
  password: string
}

export type IExposedUser = Omit<IUser, 'password'>