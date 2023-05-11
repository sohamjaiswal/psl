<script lang='ts'>
	import { onMount } from "svelte";
	import Button from "../components/ui/Button.svelte";
	import { showErrorToast, showSuccessToast } from "../helpers/toasts.helper";
	import { isLoggedIn, username } from "../stores/me.store";
	import type { IExposedUser } from "../types/user.types";
	import { goto } from "$app/navigation";

  const handleLogoutClick = () => {
    fetch('/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch((e) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return
    })
    username.set('')
    isLoggedIn.set(false)
    showSuccessToast('Logout successful!', {duration: 3000})
  }

  const handleSignInClick = () => {
    goto('/sign-in')
  }

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
        console.log($isLoggedIn)
        showErrorToast('Session Load failed!', {duration: 3000})
        isLoggedIn.set(false)
        username.set('')
        return
      }
      showSuccessToast('Session Load successful!', {duration: 3000})
      isLoggedIn.set(true)
      const name = (await response.json() as IExposedUser).username
      console.log(name)
      username.set(name)
    }
  }
)

  const handleCreateClassClick = () => {
    console.log('Create new class clicked!')
  }
</script>

<h1>Pure Svelte Login!</h1>

{#if $username != ''}
  <h2>Welcome, {$username}!</h2>
{:else}
  <h2>Welcome, Guest!</h2>
{/if}

<Button label="Create Class" onclick={handleCreateClassClick} />
<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
