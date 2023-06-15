<script lang="ts">
  import { page } from '$app/stores';
  import {
    faCheckCircle,
    faXmarkCircle
  } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { getFlash } from 'sveltekit-flash-message/client';
  const flash = getFlash(page);

  let timeout: ReturnType<typeof setTimeout>;
  $: {
    clearTimeout(timeout);
    if ($flash) {
      timeout = setTimeout(() => {
        $flash = undefined;
      }, 30000);
    }
  }
</script>

{#if $flash}
  <div
    class="alert absolute top-0 flex justify-center py-1"
    class:bg-error={$flash.type === 'error'}
    class:text-error-content={$flash.type === 'error'}
    class:bg-primary={$flash.type === 'success'}
    class:text-primary-content={$flash.type === 'success'}>
    {#if $flash.type === 'error'}
      <Fa icon={faXmarkCircle} />
    {:else if $flash.type === 'success'}
      <Fa icon={faCheckCircle} />
    {/if}
    <span>{$flash.message}</span>
  </div>
{/if}
