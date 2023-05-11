<script lang='ts'>
  export let label: string = 'Button Text'
  export let onclick: () => void = () => console.log('Button Clicked')
  export let type: "button" | "submit" | "reset" = "button"
  export let color: "primary" | "secondary" | "tertiary" = "primary"
</script>

<button on:click={() => onclick()} type={type} class={color}>
  {label}
</button>

<style lang="scss">
  button {
    border: none;
    border-radius: 0.25em;
    color: var(--text);
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 1em;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      transform: scale(102%);
    }
    &:focus,
    &:active {
      transform: scale(95%);
    }
    &.primary {
      background-color: var(--primary);
    }
    &.secondary {
      background-color: var(--secondary);
    }
    &.tertiary {
      background-color: var(--tertiary);
    }
  }
</style>