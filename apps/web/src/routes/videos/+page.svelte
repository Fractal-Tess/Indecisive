<script lang="ts">
  import GlowingImage from '$lib/components/GlowingImage.svelte';
  import { pocketbaseImageToUrl } from '$lib/utils';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Videos</title>
</svelte:head>

<section
  class="grid place-items-center mx-auto container h-full my-20 md:my-10">
  <ul class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
    {#each data.expansions as expansion}
      <li class="contents">
        <a href={`/videos/${expansion.label}`}>
          <GlowingImage
            label={expansion.label}
            alt="expansion"
            color="infer"
            class="h-full w-full object-cover aspect-video bg-base-300/10"
            src={pocketbaseImageToUrl(expansion, expansion.thumbnail)} />
        </a>
      </li>
    {:else}
      <h1>It's rather empty in here</h1>
    {/each}
  </ul>
</section>
