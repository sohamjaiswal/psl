<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "../../components/ui/Button.svelte";
  import Form from "../../components/ui/Form.svelte";
  import TextInput from "../../components/ui/TextInput.svelte";
	import { showErrorToast, showSuccessToast } from "../../helpers/toasts.helper";
	import { isLoggedIn, profilePicture, username as storeUsername, displayName } from "../../stores/me.store";
	import type { IExposedUser } from "../../types/user.types";

  let username = ''
  let password = ''
  const handleSubmit = async(e: Event) => {
    e.preventDefault()
    if (username == '') {
      showErrorToast('Username cannot be empty!', {duration: 3000})
      return
    }
    if (password == '') {
      showErrorToast('Password cannot be empty!', {duration: 3000})
      return
    }
    const response = await fetch('/api/sign-in', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: {
					'Content-Type': 'application/json'
				}
		}).catch((e) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return
    });
    if (response) {
      const res = response.json()
      console.log(res)
      if (response.status == 401) {
        showErrorToast('Invalid username or password!', {duration: 3000})
        return
      }
      showSuccessToast('Sign in successful!', {duration: 3000})
      isLoggedIn.set(true)
      const me = await fetch('/api/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch((e) => {
          showErrorToast('Error connecting to server!', {duration: 3000})
          console.log(e)
          return
        }
      );
      if (me) {
        const loggedIn = $isLoggedIn
        if (response.status === 401 && !loggedIn) {
          isLoggedIn.set(false)
          storeUsername.set('')
          return
        }
        isLoggedIn.set(true)
        const data = (await me.json() as IExposedUser)
        storeUsername.set(data.username)
        profilePicture.set(data.profilePicture)
        console.log('ran')
        displayName.set(`${data.firstName} ${data.lastName}` != ' ' ? `${data.firstName} ${data.lastName}` : data.username)
        window.location.assign('/')
      } else {
        showErrorToast('Could not get updated user', {duration: 3000})
      }
    }
  }
</script>
<Form handleSubmit={handleSubmit}>
  <h1>Sign In</h1>
  <TextInput bind:value={username} placeholder="Username" variant="textbox" />
  <TextInput bind:value={password} placeholder="Password" variant="password" />
  <Button label="Sign In!" type='submit' />
</Form>
