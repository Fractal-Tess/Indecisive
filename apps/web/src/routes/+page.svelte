<script lang="ts">
  import Head from '$lib/components/Head.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import { onMount } from 'svelte';

  let mounted = false;
  onMount(() => (mounted = true));
</script>

<Head />

<section
  class="flex min-h-full select-none flex-col items-center justify-center gap-y-8 text-center
  [&>*]:transition-opacity [&>*]:duration-500">
  <p
    class={`text-3xl delay-1000 duration-1000 md:text-4xl
   ${mounted ? 'opacity-100' : 'opacity-0'} `}>
    Welcome to <span class="text-primary font-bold italic"> Indecisive</span>
  </p>
  <Logo
    class={`${mounted ? 'opacity-100' : 'opacity-0'} h-60 md:h-80 lg:h-96`} />
</section>
