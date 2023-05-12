<script lang="ts">
	import { onMount } from "svelte";
	import Header from "../components/fragments/Header.svelte";
  import { SvelteToast } from '@zerodevx/svelte-toast'
	import { showErrorToast, showSuccessToast } from "../helpers/toasts.helper";
  import { displayName, isLoggedIn, profilePicture, username } from "../stores/me.store";
  import type { IExposedUser } from "../types/user.types";
  onMount(async() => {
  const response = await fetch('/api/me', {
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
    if (response) {
      const loggedIn = $isLoggedIn
      if (response.status === 401 && !loggedIn) {
        isLoggedIn.set(false)
        username.set('')
        return
      }
      showSuccessToast('Session Load successful!', {duration: 3000})
      isLoggedIn.set(true)
      const data = (await response.json() as IExposedUser)
      const name = data.username
      username.set(name)
      if (data.profilePicture) {
        username.set(data.username)
        displayName.set(`${data.firstName} ${data.lastName}` != 'null null' ? `${data.firstName} ${data.lastName}` : name) 
        profilePicture.set(data.profilePicture)
      }
    }
  }
)
</script>
<main>
  <div class="main">
    {#key $profilePicture}
    <Header />
    {/key}
    <SvelteToast />
    <slot />
  </div>
</main>

<style lang="scss">
  main {
    margin-top: 32px;
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      .main {
        width: 800px;
      }
    } 
  }
</style>