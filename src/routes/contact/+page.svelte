<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<article
  class="grid place-items-center text-xl md:text-2xl [&>section>h1]:text-2xl">
  <section class="max-w-xs md:max-w-md lg:max-w-lg">
    {@html data.content}
  </section>
</article>
