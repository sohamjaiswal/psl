<script lang="ts">
  export let handleSubmit: (e: Event) => void = () => console.log('Form Submitted')
</script>

<form on:submit={handleSubmit}>
<slot />
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>