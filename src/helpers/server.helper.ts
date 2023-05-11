import {json} from '@sveltejs/kit'
export const sendRes = ( data: any, status: number, headers?: HeadersInit ) => {
  return json(data, {status, headers: {'Content-Type': 'application/json', ...headers}})
}