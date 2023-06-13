<script>
  import { fade } from 'svelte/transition';

  export let ANIMATION_SPEED = 250;
</script>

<div
  transition:fade={{ duration: ANIMATION_SPEED }}
  class="form-control items-center justify-center [grid-area:stack]">
  <span class="loading loading-infinity text-primary w-24" />
</div>
