<script lang="ts">
	import Button from "../../components/ui/Button.svelte";
	import Form from "../../components/ui/Form.svelte";
	import TextInput from "../../components/ui/TextInput.svelte";
	import AvatarInput from "../../components/ui/AvatarInput.svelte";
	import { showErrorToast } from "../../helpers/toasts.helper";
	import { goto } from "$app/navigation";
	import type { IExposedUser } from "../../types/user.types";
	import { isUpdateAvailable } from "../../stores/helper.store";
  import { username as storeUsername, profilePicture as storeProfilePicture } from "../../stores/me.store";

  export let data: false | IExposedUser

  if (!data) {
    showErrorToast('Error loading user data!', {duration: 3000})
    goto('/sign-in')
  }


  let profilePicture = ''
  let firstName = ''
  let lastName = ''
  let username = ''

  if (data) {
    profilePicture = data.profilePicture
    if (data.firstName) firstName = data.firstName
    if (data.lastName) lastName = data.lastName
    username = data.username
  }

  const handleSubmit = async() => {
    const useFirstName = firstName != '' ? firstName : null
    const useLastName = lastName != '' ? lastName : null
    const useProfilePicture = profilePicture != '' ? profilePicture : null
    const response = await fetch('/api/me', {
				method: 'PATCH',
				body: JSON.stringify({ firstName: useFirstName, lastName: useLastName, profilePicture: useProfilePicture }),
				headers: {
					'Content-Type': 'application/json'
				}
		}).catch((e) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return
    });
    const me = await fetch('/api/me', {
				method: 'PATCH',
				body: JSON.stringify({ firstName: useFirstName, lastName: useLastName, profilePicture: useProfilePicture }),
				headers: {
					'Content-Type': 'application/json'
				}
		}).catch((e) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return
    });
    if (!me) {
      showErrorToast('Could not get updated user', {duration: 3000})
    } else {
      const res = await me.json()
      storeUsername.set(res.username)
      storeProfilePicture.set(res.profilePicture)
    }
    return
  }

  const handleDeleteAccount = async() => {
    const response = await fetch('/api/me', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    }).catch((e) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return
    });
    isUpdateAvailable.set(true)
    return
  }

</script>
<Form handleSubmit={handleSubmit}>
  <h1>Your Settings!</h1>
  <h2>
    Username: {username}
  </h2>
  <div class="mainSettings">
    <div class="avatar">
      <h2>Avatar</h2>
      <AvatarInput bind:avatar={profilePicture} />
    </div>
    <div class="nameContainer">
      <h2>Name</h2>
      <div class="name">
        <TextInput bind:value={firstName} placeholder="First Name" variant="textbox" />
        <TextInput bind:value={lastName} placeholder="Last Name" variant="textbox" />
      </div>
    </div>

  </div>
  <Button label="Update!" type="submit" />
  <h2>Delete Account</h2>
  <Button label="Delete Account" type="button" onclick={handleDeleteAccount} color="tertiary" />
</Form>

<style lang="scss">
  h1 {
    margin: 8px 0px;
  }
  h2 {
    margin: 4px 0px;
  }
  .mainSettings {
    display: flex;
    justify-content: space-around;
  }
  .name {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
  }
</style>