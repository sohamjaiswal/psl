import Database from 'better-sqlite3';
import argon2 from 'argon2';
import {v4 as uuidv4} from 'uuid';
import {json} from '@sveltejs/kit'
import { sendRes } from '../../../helpers/server.helper.js';

const salt = import.meta.env.SALT

const users = new Database('./src/database/users.sqlite')
const sessions = new Database('./src/database/sessions.sqlite')

interface IUser {
  username: string
  password: string
}

const isUniqueSession = (session: string) => {
  const sessionFromDb = sessions.prepare(`select * from sessions where session = ?`).get([session])
  return !sessionFromDb
}

const newUserSession = (username: string) => {
  let session = uuidv4()
  let isUnique = isUniqueSession(session)
  while (!isUnique) {
    session = uuidv4()
    isUnique = isUniqueSession(session)
  }
  sessions.prepare(`INSERT INTO sessions (session, username) VALUES ('${session}', '${username}')`).run()
  return session
}

export const POST = async({request, cookies}) => {
  const {username, password} = await request.json()
  console.log(username, password)
  if (!username || !password) {
    return json({message: 'Username or password is empty'}, {status: 401})
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return json({message: 'Username or password is not a string'}, {status: 401})
  }
  const user = users.prepare(`select * from users where username = ?`).get([username]) as IUser | undefined
  if (!user) {
    return sendRes({message: 'User does not exist'}, 401)
  }
  const isCorrectPassword = await argon2.verify(user.password, password, {salt})
  console.log(isCorrectPassword)
  if (!isCorrectPassword) {
    return json({message: 'Incorrect password'}, {status: 401})
  }
  const currSession = cookies.get('session')
  console.log(currSession)
  if (currSession) {
    console.log('ran')
    sessions.prepare(`DELETE FROM sessions WHERE session = '${currSession}'`).run()
  }
  console.log('here')
  const session = newUserSession(username)
  console.log(session)
  cookies.set('session', session, {path: '/'})
  return sendRes({session}, 201)
}
