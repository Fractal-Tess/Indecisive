<script lang="ts">
  import { goto } from '$app/navigation';
  import Center from '$lib/components/Center.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import type { createUserStore } from '$lib/stores/user';
  import { getContext } from 'svelte';
  const user = getContext('user') as ReturnType<typeof createUserStore>;
  $: if (!$user) goto('/sign-in');
</script>

<Center>
  <section
    class="form-control border-primary bg-base-100 rounded-box max-w-md gap-y-8 border-[1px] p-8">
    <h1 class="text-primary text-5xl font-bold">User Interface</h1>
    <div class="flex items-center">
      <img
        src={$user?.avatarUrl}
        alt="discord avatar"
        class="max-w-[5rem] rounded-full" />

      <p class="text-3xl font-bold text-white">
        {$user?.username}
      </p>
    </div>

    <div>
      <h2>
        If you have an active application here you will be able to view the
        status of it
      </h2>
      <Spinner />
    </div>

    <h2 class="text-primary">
      If you are in the guild your chars will appear here
      <br />
      <Spinner />
    </h2>

    <button on:click={user.logout} class="btn btn-primary btn-outline"
      >Logout</button>
  </section>
</Center>
