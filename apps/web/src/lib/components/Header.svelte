<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
</script>

<header class="bg-base-100 flex justify-between md:px-8">
  <a href="/" class="aspect-square h-20 md:h-16">
    <Logo class={'h-full object-cover'} />
  </a>

  <ul
    class="navbar [&_a]:link-primary justify-end gap-4 whitespace-nowrap font-extrabold md:gap-8 md:text-xl">
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
      <a href="/contact">Contacts</a>
    </li>
  </ul>
</header>
