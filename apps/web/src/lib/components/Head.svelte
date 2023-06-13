<script lang="ts">
  import { PUBLIC_ORIGIN_URL } from '$env/static/public';
  export let title = 'Indecisive';
  export let description = 'Indecisive guild website.';

  const logoUrl = `${PUBLIC_ORIGIN_URL}/logo.png`;
</script>

<svelte:head>
  <title>{title}</title>

  <meta name="description" content={description} />

  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta itemprop="image" content={logoUrl} />

  <meta property="og:url" content={PUBLIC_ORIGIN_URL} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={logoUrl} />

  <meta name="twitter:card" content={logoUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={logoUrl} />
</svelte:head>
