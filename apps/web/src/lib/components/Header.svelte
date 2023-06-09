<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import { user } from '$lib/pocketbase/user';
  import { faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
</script>

<navbar class="navbar bg-base-100">
  <div class="navbar-start">
    <a href="/" class="h-12 w-12 md:h-16 md:w-16">
      <Logo class={'h-full object-cover'} />
    </a>
  </div>
  <div class="navbar-end gap-x-4 md:flex-row-reverse md:justify-start md:px-2">
    {#if $user}
      <a href="/user">
        <img
          src={$user.avatarUrl}
          alt="user"
          class="border-primary aspect-square min-w-[2rem] max-w-[2rem] rounded-full border-2 md:min-w-[3rem] md:max-w-[3rem]" />
      </a>
    {:else}
      <a href="/sign-in">
        <Fa icon={faUser} size="1.5x" />
      </a>
    {/if}
    <div class="max-md:dropdown max-md:dropdown-end max-md:dropdown-hover">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost hover:text-primary md:hidden">
        <Fa icon={faBarsStaggered} size="1.5x" />
      </label>
      <!-- TODO: Reduce the amount of links by nesting them in menu groups -->
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="max-md:menu dropdown-content max-md:bg-base-100 max-md:rounded-box
        max-md:[&>li>*:hover]:!text-primary md:text-primary md:link z-[999] flex gap-x-4
        whitespace-nowrap font-bold max-md:w-52">
        <li><a href="/videos">Videos</a></li>
        <li><a href="/application">Application</a></li>
        <li><a href="/raid-schedule">Raid Schedule</a></li>
        <li><a href="/armory">Armory</a></li>
        <li><a href="/addons">Addons</a></li>
        <li><a href="/weakauras">WeakAuras</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li class="divider md:divider-horizontal md:-mx-2" />
        {#if $user}
          <li><button on:click={user.logout}>Logout</button></li>
        {:else}
          <li><a href="/sign-in">Login/Register</a></li>
        {/if}
      </ul>
    </div>
  </div>
</navbar>
