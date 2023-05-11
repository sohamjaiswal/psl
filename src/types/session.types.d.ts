import { v4 as uuidv4 } from 'uuid';
export interface ISession {
  username: string
  session: typeof uuidv4
}