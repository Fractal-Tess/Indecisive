<script lang="ts">
  import '$styles';
  import { fade } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import Head from '$lib/components/Head.svelte';
  import { user } from '$lib/pocketbase/user';
</script>

<Head />

<div class="heropattern-topography-white/10 grid min-h-screen">
  {#await user.init()}
    <div
      transition:fade={{ duration: 250 }}
      class="form-control absolute inset-0 flex-1 items-center justify-center">
      <span class="loading loading-infinity text-primary w-24" />
    </div>
  {:then}
    <div in:fade={{ delay: 250 }} class="form-control">
      <Header />
      <main class="grid flex-1 place-items-center">
        <slot />
      </main>
    </div>
  {/await}
</div>
