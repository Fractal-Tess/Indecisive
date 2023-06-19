<script lang="ts">
  import { fade } from 'svelte/transition';

  import type { PageData } from './$types';
  import Center from '$lib/components/Center.svelte';
  export let data: PageData;
</script>

<Center>
  <article class="select-none p-8 text-xl md:text-2xl [&_h2]:text-4xl">
    {#await data.content.html then html}
      <div in:fade>
        {@html html}
      </div>
    {/await}
  </article>
</Center>
