<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  import PreForm from './PreForm.svelte';

  export let data: PageData;

  let step = 0;

  function incStep() {
    step++;
  }
  function decStep() {
    if (step === 0) {
      goto('/');
    }
    step--;
  }
</script>

<svelte:head>
  <title>Application</title>
</svelte:head>

<section
  class="my-20 md:my-10 flex justify-center flex-col gap-8 h-full container mx-auto">
  {#if data.appOpen.enabled}
    <!-- Heading text -->
    <h1
      class="text-center text-primary font-extrabold text-3xl italic underline">
      Application
    </h1>

    <!-- Steps outline progress -->
    <ul class="steps max-w-max mx-auto">
      {#each data.steps as { label }, i}
        <li
          class="step transition-colors duration-500"
          class:step-neutral={i >= step}
          class:step-primary={i <= step}>
          {@html label}
        </li>
      {/each}
    </ul>
    <!-- Preform - Database text entries before actual application form -->
    {#if data.steps.at(step)}
      <PreForm steps={data.steps} bind:currentStep={step} />
    {:else}
      <h1>Login</h1>
    {/if}
  {:else}
    <div class="contents [&>h1]:text-4xl [&>p]:text-2xl">
      {@html data.appOpen.content}
    </div>
  {/if}

  <!-- Control buttons -->
  <div class="mx-auto">
    <button on:click={decStep} class="btn px-8 py-1 btn-primary btn-outline"
      >Go back</button>
    {#if step < data.steps.length}
      <button on:click={incStep} class="btn px-8 py-1 btn-primary"
        >Continue</button>
    {/if}
  </div>
</section>
