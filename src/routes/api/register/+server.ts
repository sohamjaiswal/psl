import Database from 'better-sqlite3';
import argon2 from 'argon2';
import { sendRes } from '../../../helpers/server.helper';

const salt = import.meta.env.SALT

const users = new Database('./src/database/users.sqlite', )

export const POST = async({request}: {request: any}) => {
  const {username, password} = await request.json()
  if (!username || !password) {
    return new Response(JSON.stringify({message: 'Username or password is empty'}), {status: 401})
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return new Response(JSON.stringify({message: 'Username or password is not a string'}), {status: 401})
  }
  const userExists = users.prepare(`SELECT * FROM users WHERE username = '${username}'`).get()
  if (userExists) {
    return sendRes({message: 'User already exists'}, 401)
  }
  const hashedPass = await argon2.hash(password, {type: argon2.argon2i, salt})
  const user = users.prepare(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPass}')`).run()
  console.log(user, typeof user)
  return new Response(JSON.stringify({username, password}), {status: 201})
}
