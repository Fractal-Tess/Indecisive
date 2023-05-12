<script lang="ts">
  import type { PageData } from './$types';
  import { env } from '$env/dynamic/public';
  import { page } from '$app/stores';

  import Image from '$lib/components/Collection.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>{$page.params.expansion}/{$page.params.collection}</title>
</svelte:head>

<section
  class="flex h-full items-center justify-center overflow-hidden text-2xl font-extrabold">
  <ul class="flex flex-col gap-12 md:flex-row">
    {#each data.videos as video}
      <a href={`${$page.url.pathname}/${video.label}`}>
        {#if video.thumbnail}
          {@const thumbnail = `${env.PUBLIC_POCKETBASE_URL}/api/files/${video.collectionId}/${video.id}/${video.thumbnail}?thumb=500x282`}

          <Image {thumbnail} label={video.label} />
        {:else}
          {@const thumbnail = `https://img.youtube.com/vi/${video.yt_url.replace(
            'https://www.youtube.com/watch?v=',
            ''
          )}/hqdefault.jpg`}
          <Image {thumbnail} label={video.label} />
        {/if}
      </a>
    {:else}
      <h1>It's rather empty in here</h1>
    {/each}
  </ul>
</section>
