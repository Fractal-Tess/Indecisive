<script lang="ts">
  import { user } from '$lib/pocketbase/user';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';

  $: if (!$user) goto('/login');
</script>

{#if $user}
  <section
    class="form-control border-primary bg-base-100 rounded-box gap-y-8 border-[1px] p-8">
    <h1 class="text-primary text-5xl font-bold">User Interface</h1>
    <div class="flex items-center">
      <img
        src={$user.avatarUrl}
        alt="discord avatar"
        class="max-w-[5rem] rounded-full" />

      <p class="text-3xl font-bold">
        {$user.username}
      </p>
    </div>

    <div>
      <h2>Applicaiton(s)</h2>
      <ul>
        <li>
          <a class="link link-primary" href="#/">Link to appliaiton </a>
        </li>
      </ul>
    </div>

    <ul class="text-primary">
      <li>Character1</li>
      <li>Character2</li>
    </ul>

    <button on:click={user.logout} class="btn btn-primary btn-outline"
      >Logout</button>
  </section>
{/if}
