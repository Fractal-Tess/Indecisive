<script lang="ts">
  import Fa from 'svelte-fa';
  import { faDiscord } from '@fortawesome/free-brands-svg-icons';
  import { user } from '$lib/pocketbase/user';
  import { goto } from '$app/navigation';

  $: if ($user) goto('/');
</script>

<div
  class="form-control bg-base-100 border-primary h-80 justify-center rounded-md border-2 bg-[url('/blob1.svg')] bg-cover p-8 shadow-2xl">
  <h1 class="text-primary text-center text-xl font-semibold md:text-3xl">
    Sign-in/Register
  </h1>
  <div class="flex flex-1 items-center justify-center">
    <button
      on:click={user.login}
      class="border-primary flex items-center gap-x-4 rounded-md border-[1px] p-8 text-xl font-bold">
      <span class="text-white">
        <Fa icon={faDiscord} size="3x" />
      </span>
      <p>Sign in with Discord</p>
    </button>
  </div>
</div>
