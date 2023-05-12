import Database from 'better-sqlite3'
import { sendRes } from '../../../helpers/server.helper.js'
import type { IUser } from '../../../types/user.types'
import type { ISession } from '../../../types/session.types'

const users = new Database('./src/database/users.sqlite')
const sessions = new Database('./src/database/sessions.sqlite')

export const GET = ({cookies}) => {
  const session = cookies.get('session')
  if (!session) {
    cookies.delete('session')
    return sendRes({message: 'No session'}, 401)
  }
  const userSession = sessions.prepare(`select * from sessions where session = ?`).get([session]) as ISession | undefined
  console.log('here', userSession)
  if (!userSession) {
    cookies.delete('session')
    return sendRes({message: 'No user'}, 401)
  }
  let userData: Omit<IUser, 'profilePicture'> = {username: '', password: ''}
  if (userSession.username) {
    const query = users.prepare(`select * from users where username = ?`).get([userSession.username]) as IUser | undefined
    if (query) {
      userData = query
    }
  }
  if (userData.username) {
    const sendData: Partial<IUser> = userData
    delete sendData.password
    return sendRes(sendData, 200)
  } 
  cookies.delete('session')
  return sendRes({message: 'No user'}, 401)
}

export const PATCH = async({cookies, request}) => {
  const session = cookies.get('session')
  if (!session) {
    cookies.delete('session')
    return sendRes({message: 'No session'}, 401)
  }
  const userSession = sessions.prepare(`select * from sessions where session = ?`).get([session]) as ISession | undefined
  if (!userSession) {
    cookies.delete('session')
    return sendRes({message: 'No user'}, 401)
  }
  let userData: IUser = {username: '', password: '', profilePicture: ''}
  if (userSession.username) {
    const query = users.prepare(`select * from users where username = ?`).get([userSession.username]) as IUser | undefined
    if (query) {
      userData = query
    }
  }
  if (userData.username) {
    const {firstName, lastName, profilePicture} = await request.json()
    if (firstName) {
      users.prepare(`update users set firstName = ? where username = ?`).run([firstName, userData.username])
    }
    if (lastName) {
      users.prepare(`update users set lastName = ? where username = ?`).run([lastName, userData.username])
    }
    if (profilePicture) {
      users.prepare(`update users set profilePicture = ? where username = ?`).run([profilePicture, userData.username])
    }
    return sendRes({message: 'Updated'}, 200)
  }
}

export const DELETE = async({cookies}) => {
  const session = cookies.get('session')
  if (!session) {
    cookies.delete('session')
    return sendRes({message: 'No session'}, 401)
  }
  const userSession = sessions.prepare(`select * from sessions where session = ?`).get([session]) as ISession | undefined
  if (!userSession) {
    cookies.delete('session')
    return sendRes({message: 'No user'}, 401)
  }
  let userData: IUser = {username: '', password: '', profilePicture: ''}
  if (userSession.username) {
    const query = users.prepare(`select * from users where username = ?`).get([userSession.username]) as IUser | undefined
    if (query) {
      userData = query
    }
  }
  if (userData.username) {
    users.prepare(`delete from users where username = ?`).run([userData.username])
    sessions.prepare(`delete from sessions where username = ?`).run([userData.username])
    cookies.delete('session')
    return sendRes({message: 'User Deleted'}, 200)
  }
}