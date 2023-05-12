import Database from 'better-sqlite3';

const users = new Database('./src/database/users.sqlite')
const sessions = new Database('./src/database/sessions.sqlite')


users.prepare(`CREATE TABLE IF NOT EXISTS users (username  not null primary key, password string, firstName string, lastName string, profilePicture string DEFAULT '/poop.png')`).run()
sessions.prepare(`CREATE TABLE IF NOT EXISTS sessions (session not null primary key, username string)`).run()

