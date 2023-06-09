<script lang="ts">
  import { env } from '$env/dynamic/public';
  export let title = 'Indecisive';
  export let description = 'Indecisive guild website.';

  const logoUrl = `${env.PUBLIC_ORIGIN_URL}/logo.png`;
</script>

<svelte:head>
  <meta name="description" content={description} />

  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta itemprop="image" content={logoUrl} />

  <meta property="og:url" content={env.PUBLIC_ORIGIN_URL} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={logoUrl} />

  <meta name="twitter:card" content={logoUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={logoUrl} />
</svelte:head>
