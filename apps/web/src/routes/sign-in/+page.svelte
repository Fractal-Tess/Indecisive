<script lang="ts">
  import Center from '$lib/components/Center.svelte';
  import { getContext } from 'svelte';
  import type { createUserStore } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { faDiscord } from '@fortawesome/free-brands-svg-icons';
  import Fa from 'svelte-fa';
  const user = getContext('user') as ReturnType<typeof createUserStore>;

  $: if ($user) goto('/');
</script>

<Center>
  <section
    class="form-control bg-base-100 border-primary rounded-box h-80 gap-y-4 border-2 bg-[url('/blob1.svg')] bg-cover px-20 pt-8 md:px-32">
    <h1 class="text-primary text-center text-xl font-semibold md:text-3xl">
      Sign-in
    </h1>
    <div class="form-control flex-1 items-center justify-center">
      <button
        on:click={user.login.discord}
        class="border-primary rounded-box flex items-center gap-x-2 whitespace-nowrap border-[1px] p-4 text-lg font-bold md:p-8 md:text-2xl">
        <span class="text-white">
          <Fa icon={faDiscord} size="2x" />
        </span>
        <p>Sign in with Discord</p>
      </button>
    </div>
  </section>
</Center>
