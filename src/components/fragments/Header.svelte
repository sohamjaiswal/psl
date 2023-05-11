<script lang='ts'>
	import { goto } from "$app/navigation";
	import { showErrorToast, showSuccessToast } from "../../helpers/toasts.helper";
	import { isLoggedIn, username } from "../../stores/me.store";
	import Button from "../ui/Button.svelte";



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

</script>

<header>
  <nav>
    <div class="links">
      <a href="/">Home</a>
    </div>
    <div class="buttons">
      {#if $isLoggedIn}
      <Button label="Logout" onclick={handleLogoutClick} color="tertiary" />
      {:else}
      <Button label="Login" onclick={() => goto('/sign-in')} color="primary" />
      <Button label="Register" onclick={() => goto('register')} color="primary" />
      {/if}
    </div>
  </nav>
</header>

<style>
  header nav {
    width: calc(100% - 64px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 32px;
    /* text-align: center; */
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
</style>