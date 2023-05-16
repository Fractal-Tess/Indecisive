<script lang="ts">
  import '$styles';
  import Header from '$lib/components/Header.svelte';
  import { env } from '$env/dynamic/public';
</script>

<svelte:head>
  <meta name="description" content="Guild web portal." />

  <meta itemprop="name" content="Indecisive" />
  <meta itemprop="description" content="Guild web portal." />
  <meta itemprop="image" content={`${env.PUBLIC_ORIGIN_URL}/logo.png`} />

  <meta property="og:url" content={env.PUBLIC_ORIGIN_URL} />
  <meta property="og:type" content="Website" />
  <meta property="og:title" content="Indecisive" />
  <meta property="og:description" content="Community/Guild web portal." />
  <meta property="og:image" content={`${env.PUBLIC_ORIGIN_URL}/logo.png`} />

  <meta name="twitter:card" content={`${env.PUBLIC_ORIGIN_URL}/logo.png`} />
  <meta name="twitter:title" content="Indecisive" />
  <meta name="twitter:description" content="Community/Guild web portal." />
  <meta name="twitter:image" content={`${env.PUBLIC_ORIGIN_URL}/logo.png`} />
</svelte:head>

<div class="heropattern-topography-white/10 form-control min-h-screen">
  <Header />
  <main class="grid flex-1 place-items-center px-2 py-8">
    <slot />
  </main>
</div>
