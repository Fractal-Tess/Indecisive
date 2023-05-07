<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<article class="grid place-items-center px-4 text-xl md:text-2xl">
  <section class="sm:max-sm:max-w-xs lg:max-w-lg [&_h1]:text-3xl">
    {@html data.content}
  </section>
</article>
