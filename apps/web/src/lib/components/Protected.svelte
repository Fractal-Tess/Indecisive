<script lang="ts">
  import SignIn from './SignIn.svelte';
  import { getContext } from 'svelte';
  import type { createUserStore } from '$lib/stores/user';
  const user = getContext('user') as ReturnType<typeof createUserStore>;
</script>

{#if $user}
  <slot />
{:else}
  <SignIn />
{/if}
