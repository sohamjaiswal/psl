<script lang='ts'>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { showErrorToast, showSuccessToast } from "../../helpers/toasts.helper";
	import { isLoggedIn, profilePicture, username } from "../../stores/me.store";
	import Button from "../ui/Button.svelte";
	import Avatar from "../ui/Avatar.svelte";
	import { isUpdateAvailable } from "../../stores/helper.store";
  export let displayName: string
  let isActionsModalVisible = false

  const handleAvatarClick = () => {
    isActionsModalVisible = !isActionsModalVisible
  }
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
    profilePicture.set('')
    isLoggedIn.set(false)
    showSuccessToast('Logout successful!', {duration: 3000})
    goto('/')
  }
</script>
<header>
  <nav>
    <div class="links">
      <a href="/">Home</a>
    </div>
    <div class="buttons" on:mouseenter={() => isActionsModalVisible = true} on:mouseleave={() => isActionsModalVisible = false}>
      {#if $isLoggedIn}
      <button on:click={handleAvatarClick}>
          <Avatar userFullName={displayName} width={48} round src={$profilePicture} />
      </button>
      <div class="actions" class:visible={isActionsModalVisible}>
        <h4>
          Hi, {displayName}
        </h4>
        <Button label="Settings" onclick={() => goto('/settings')} color="primary" />
        <Button label="Logout" onclick={handleLogoutClick} color="tertiary" />
      </div>
      {:else}
      <Button label="Login" onclick={() => goto('/sign-in')} color="primary" />
      <Button label="Register" onclick={() => goto('register')} color="primary" />
      {/if}
    </div>
  </nav>
</header>

<style lang="scss">
  header nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  nav a {
    margin: 0 0.25em;
    padding: 0.25em 1em;
    text-decoration: none;
    border-radius: 0.25em;
    border: 2px solid transparent;
    color: var(--text);
  }

  nav a:hover,
  nav a:focus,
  nav a:active {
    border-color: var(--text);
  }

  .buttons {
    display: flex;
    gap: 8px;
    button {
      border: none;
      background: none;
      cursor: pointer;
      outline: none;
    }
    .actions {
      margin-top: 50px;
      h4 {
        margin: 8px 0px;
      }
      position: absolute;
      width: 150px;
      outline: var(--border) solid 2px;
      padding: 8px;
      border-radius: 8px;
      background: var(--background);
      display: none;
      &.visible {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    }
}
  
</style>