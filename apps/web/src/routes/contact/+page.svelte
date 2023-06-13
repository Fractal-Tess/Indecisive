<script lang="ts">
  import Center from '$lib/components/Center.svelte';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<Center>
  <article class="grid place-items-center px-4 text-xl md:text-2xl">
    <section class="sm:max-sm:max-w-xs [&_h1]:text-3xl">
      {#await data.content.html then html}
        <div
          in:fade
          class="[&_table]:table-zebra [&_table]:!border-primary [&_table]:rounded-box [&_table]:table [&_table]:!border-2 [&_table]:text-2xl">
          {@html html}
        </div>
      {/await}
    </section>
  </article>
</Center>
