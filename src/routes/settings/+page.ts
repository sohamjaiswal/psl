import { showErrorToast } from "../../helpers/toasts.helper";
import { isLoggedIn, username } from "../../stores/me.store";
import type { IExposedUser } from "../../types/user.types";

export const load: ({fetch}: {fetch: any}) => Promise<false | IExposedUser> = async ({fetch}: {fetch:any}) => {
  
  const response = await fetch('/api/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch((e: any) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return null
    }
  );
  if (response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let loggedIn
    isLoggedIn.subscribe((value) => {
      loggedIn = value
    })
    if (response.status === 401) {
      showErrorToast('Session Load failed!', {duration: 3000})
      isLoggedIn.set(false)
      username.set('')
      return false
    }
    isLoggedIn.set(true)
    const userDetails = await response.json() as IExposedUser
    username.set(userDetails.username)
    return {
      username: userDetails.username,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      profilePicture: userDetails.profilePicture
    } as IExposedUser
  }
  return false
}