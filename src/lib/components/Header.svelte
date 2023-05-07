<script lang="ts">
  import Fa from 'svelte-fa';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import Logo from '$lib/components/Logo.svelte';
</script>

<header class="flex justify-between bg-base-100 md:px-8">
  <a href="/" class="block aspect-square h-20 md:h-16">
    <Logo class={'h-full object-cover'} />
  </a>

  <ul
    class="navbar justify-end gap-4 whitespace-nowrap font-bold [&_a]:link-primary md:gap-8">
    <li>
      <a href="/videos">Videos</a>
    </li>
    <li>
      <a href="/application">Application</a>
    </li>
    <li>
      <a href="/about">About us</a>
    </li>

    <li>
      <a href="/contact">Contact</a>
    </li>
  </ul>
</header>
