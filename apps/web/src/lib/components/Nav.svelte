<script lang="ts">
  import { page } from '$app/stores';
  import type { createUserStore } from '$lib/stores/user';
  import { cn } from '$lib/utils';
  import { getContext } from 'svelte';

  type Route = {
    href: string;
    label: string;
    protected: boolean;
  };
  const routes: Route[] = [
    {
      href: '/videos',
      label: 'Videos',
      protected: false
    },
    {
      href: '/application',
      label: 'Application',
      protected: false
    },
    {
      href: '/raid-schedule',
      label: 'Raid Schedule',
      protected: false
    },
    {
      href: '/about',
      label: 'About',
      protected: false
    },
    {
      href: '/contact',
      label: 'Contact',
      protected: true
    },
    {
      href: '/logs',
      label: 'Logs',
      protected: true
    },
    {
      href: '/armory',
      label: 'Armory',
      protected: true
    },
    {
      href: '/addons',
      label: 'Addons',
      protected: true
    },
    {
      href: '/weakauras',
      label: 'WeakAuras',
      protected: true
    }
  ];

  const user = getContext('user') as ReturnType<typeof createUserStore>;
  console.log($page.url.pathname);
</script>

<nav class="text-primary inline-flex gap-x-4 font-bold">
  {#each routes as { href, label, protected: prot }}
    {#if prot && $user}
      <a
        {href}
        class={cn(
          'transition-colors hover:opacity-80',
          href === $page.url.pathname ? '' : 'opacity-60'
        )}>{label}</a>
    {:else if !prot}
      <a
        {href}
        class={cn(
          'transition-colors hover:opacity-80',
          href === $page.url.pathname ? '' : 'opacity-60'
        )}>{label}</a>
    {/if}
  {/each}
</nav>
