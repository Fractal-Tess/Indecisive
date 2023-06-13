<script lang="ts">
  import { fade } from 'svelte/transition';
  import Center from '$lib/components/Center.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<Center>
  <article class="p-8 text-xl md:text-2xl [&>section>h1]:text-5xl">
    {#await data.content.html then html}
      <div in:fade>
        {@html html}
      </div>
    {/await}
  </article>
</Center>
