<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Videos/Expansions</title>
</svelte:head>

<section class="my-20 md:my-10 h-full">
  <ul
    class="flex flex-col md:flex-row flex-wrap h-full items-center justify-center flex-1 md:grid-cols-2 container mx-auto gap-10 md:gap-20">
    {#each data.videos as video}
      <li class="contents">
        {@html video.ytEmbedCode}
      </li>
    {:else}
      <h1 class="text-primary font-extrabold italic underline text-3xl">
        It's rather empty in here...
      </h1>
    {/each}
  </ul>
</section>
