<script lang="ts">
  import { faDiscord } from '@fortawesome/free-brands-svg-icons';
  import Logo from '$lib/components/Logo.svelte';
  import { faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { getContext } from 'svelte';
  import type { createUserStore } from '$lib/stores/user';
  import Nav from './Nav.svelte';

  const user = getContext('user') as ReturnType<typeof createUserStore>;
</script>

<navbar
  class="navbar border-primary/50 sticky top-0 z-50 flex h-14 items-center justify-between border-b shadow-lg backdrop-blur">
  <a href="/" class="h-12 w-12 md:h-16 md:w-16">
    <Logo class={'h-full object-cover'} />
  </a>
  <div
    class="max-md:dropdown max-md:dropdown-end max-md:dropdown-hover inline-flex gap-x-2">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label tabindex="0" class="btn btn-ghost hover:text-primary md:hidden">
      <Fa icon={faBarsStaggered} size="1.5x" />
    </label>
    <!-- TODO: Reduce the amount of links by nesting them in menu groups -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->

    <Nav />
    <div class="border-primary/50 h-6 w-[1px] border-l" />
    {#if !$user}
      <button
        class="text-primary inline-flex items-center gap-x-2 font-bold"
        on:click={user.login.discord}>
        Sign In
        <Fa icon={faDiscord} size="1.3x" class="text-white" />
      </button>
    {:else}
      <a href="/profile" class="text-lg font-extrabold">
        {$user.username}
      </a>
      <img src={$user.avatarUrl} alt="user avatar" class="h-10 rounded-full" />
    {/if}
  </div>
</navbar>
