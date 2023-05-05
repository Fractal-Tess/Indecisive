<script lang="ts">
  import type { PageData } from './$types';
  import { env } from '$env/dynamic/public';
  import { page } from '$app/stores';

  import Image from '$lib/components/Image.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>Videos/Expansions</title>
</svelte:head>

<section
  class="flex h-full items-center justify-center overflow-hidden text-2xl font-extrabold">
  <ul class="flex flex-col gap-12 md:flex-row">
    {#each data.videoCollection as collection}
      {@const src = `${env.PUBLIC_POCKETBASE_URL}/api/files/${collection.collectionId}/${collection.id}/${collection.thumbnail}?thumb=500x282`}
      <a href={`${$page.url.href}/${collection.label}`}>
        <Image {src} label={collection.label} />
      </a>
    {:else}
      <h1>It's rather empty in here</h1>
    {/each}
  </ul>
</section>
