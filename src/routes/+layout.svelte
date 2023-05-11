<script>
	import Header from "../components/fragments/Header.svelte";
  import { SvelteToast } from '@zerodevx/svelte-toast'
</script>
<main>
  <div class="main">
    <Header />
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