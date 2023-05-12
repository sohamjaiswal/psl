<script lang="ts">
  export let userFullName: string;
  export let width = 32;
  export let round = true;
  export let src = "";
</script>

<style>
  img {
    object-fit: cover;
  }
  .round {
      border-radius: 50%;
  }
</style>

<img
  src={src}
  class:round={round}
  {width}
  height={width}
  alt={userFullName} 
  />