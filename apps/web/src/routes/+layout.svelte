<script lang="ts">
  import '$styles';
  import Header from '$lib/components/Header.svelte';
  import { createUserStore } from '$lib/stores/user';
  import { setContext } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const user = createUserStore();

  user.set(data.user);
  setContext('user', user);
</script>

<div
  class="heropattern-topography-white/10 grid min-h-screen [grid-template-areas:'stack']">
  <div class="form-control [grid-area:stack]">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</div>
