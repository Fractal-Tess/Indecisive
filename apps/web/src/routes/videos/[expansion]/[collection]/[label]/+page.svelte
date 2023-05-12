<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const src = `https://www.youtube.com/embed/${data.video.yt_url.replace(
    "https://www.youtube.com/watch?v=",
    ""
  )}`;
</script>

<svelte:head>
  <title>{data.video.label}</title>
</svelte:head>

<section
  class="flex h-full items-center justify-center overflow-hidden text-2xl font-extrabold"
>
  <ul class="flex flex-col gap-12 md:flex-row">
    <iframe
      width="1250"
      height="703"
      {src}
      title={data.video.label}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </ul>
</section>
