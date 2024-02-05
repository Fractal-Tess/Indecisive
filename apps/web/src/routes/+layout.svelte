<script lang="ts">
  import '../app.postcss';
  import Header from '$lib/components/Header.svelte';
  import { createUserStore } from '$lib/stores/user';
  import { setContext } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const user = createUserStore();

  user.set(data.user);
  setContext('user', user);
</script>

<Header />
<main class="form-control flex-1">
  <slot />
</main>
