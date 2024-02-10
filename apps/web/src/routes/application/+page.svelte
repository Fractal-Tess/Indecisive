<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  let stepNumb = 0;
  console.log(data.steps);

  function incStep() {
    stepNumb++;
  }
  function decStep() {
    if (stepNumb === 0) {
      goto('/');
    }
    stepNumb--;
  }
</script>

<svelte:head>
  <title>Application</title>
</svelte:head>

<section
  class="mt-20 md:mt-10 flex justify-center flex-col gap-8 h-full container mx-auto">
  <h1 class="text-center text-primary font-extrabold text-3xl italic underline">
    Application
  </h1>
  <ul class="steps max-w-max mx-auto">
    {#each data.steps as step, i}
      <!-- content here -->
      <li
        class="step transition-colors duration-500"
        class:step-neutral={i >= stepNumb}
        class:step-primary={i <= stepNumb}>
        {@html step.label}
      </li>
    {/each}
  </ul>
  <div class="flex-1 flex flex-col items-center justify-center">
    {#if !data.appOpen.enabled}
      <div class="contents [&>h1]:text-4xl [&>p]:text-2xl">
        {@html data.appOpen.content}
      </div>
    {:else}
      <div class="flex-1 flex flex-col pb-4">
        <div
          class="flex-1 max-w-sm md:max-w-md lg:max-w-lg text-center html-content">
          {@html data.steps[stepNumb]?.content}
        </div>
        <div class="mx-auto">
          <button
            on:click={decStep}
            class="btn px-8 py-1 btn-primary btn-outline">Go back</button>
          {#if stepNumb < data.steps.length - 1}
            <button on:click={incStep} class="btn px-8 py-1 btn-primary"
              >Continue</button>
          {:else}
            <!-- else content here -->
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>
