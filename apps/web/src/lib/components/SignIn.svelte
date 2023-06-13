<script lang="ts">
  import { faDiscord } from '@fortawesome/free-brands-svg-icons';
  import Fa from 'svelte-fa';
  import { getContext } from 'svelte';
  import type { createUserStore } from '$lib/stores/user';
  const user = getContext('user') as ReturnType<typeof createUserStore>;
</script>

<section
  class="form-control bg-base-100 border-primary rounded-box gap-y-4 border-2 bg-[url('/blob1.svg')] bg-cover px-20 py-10 md:px-32 md:py-20">
  <h1 class="text-primary text-center text-xl font-semibold md:text-3xl">
    Sign-in/Register
  </h1>
  <button
    on:click={user.login.discord}
    class="border-primary rounded-box flex items-center gap-x-2 whitespace-nowrap border-[1px] p-4 text-lg font-bold md:p-8 md:text-2xl">
    <span class="text-white">
      <Fa icon={faDiscord} size="2x" />
    </span>
    <p>Sign in with Discord</p>
  </button>
</section>
