<script lang='ts'>
	import { onMount } from "svelte";
	import Button from "../components/ui/Button.svelte";
	import { showErrorToast, showSuccessToast } from "../helpers/toasts.helper";
	import { isLoggedIn, username } from "../stores/me.store";
	import type { IExposedUser } from "../types/user.types";

  $: displayName = ''

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
      isLoggedIn.set(true)
      const data = (await response.json() as IExposedUser)
      const name = data.username
      username.set(name)
      displayName = `${data.firstName} ${data.lastName}` != ' ' ? `${data.firstName} ${data.lastName}` : name
    }
  }
)

  const handleCreateClassClick = () => {
    console.log('Create new class clicked!')
  }
</script>

<h1>Pure Svelte Login!</h1>

{#if $username != ''}
  <h2>Welcome, {displayName}!</h2>
{:else}
  <h2>Welcome, Guest!</h2>
{/if}

<Button label="Create Class" onclick={handleCreateClassClick} />
