<script lang="ts">
  import type { PageData } from './$types';
  import Image from '$lib/components/Collection.svelte';
  import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
  export let data: PageData;
</script>

<svelte:head>
  <title>Videos</title>
</svelte:head>

<section
  class="flex h-full items-center justify-center overflow-hidden text-2xl font-extrabold text-white">
  <ul class="flex flex-col gap-12 md:flex-row">
    {#each data.expansions as expansion}
      {@const thumbnail = `${PUBLIC_POCKETBASE_URL}/api/files/${expansion.collectionId}/${expansion.id}/${expansion.thumbnail}?thumb=500x282`}
      <a href={`/videos/${expansion.name}`}>
        <Image {thumbnail} label={expansion.name} />
      </a>
    {:else}
      <h1>It's rather empty in here</h1>
    {/each}
  </ul>
</section>
