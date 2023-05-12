<script lang='ts'>
	import Button from "../components/ui/Button.svelte";
	import { showErrorToast, showSuccessToast } from "../helpers/toasts.helper";
	import { displayName, isLoggedIn, username } from "../stores/me.store";

  const handleCreateClassClick = () => {
    console.log('Create new class clicked!')
  }
</script>

<h1>Pure Svelte Login!</h1>

{#if $username != ''}
  <h2>Welcome, {$displayName}!</h2>
{:else}
  <h2>Welcome, Guest!</h2>
{/if}

<Button label="Create Class" onclick={handleCreateClassClick} />
