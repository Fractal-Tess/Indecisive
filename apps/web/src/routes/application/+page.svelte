<script lang="ts">
  import Center from '$lib/components/Center.svelte';
  import type { ActionData, PageData } from './$types';

  export let form: ActionData;

  export let data: PageData;

  let willingToPlayAnotherClass = false;

  enum Page {
    DISCLAIMER_PAGE,
    WANTED_CLASSES_PAGE,
    SIGNUP_PAGE,
    SUCCESSFUL_PAGE
  }

  let page = Page.DISCLAIMER_PAGE;
  // let page = 2;

  $: {
    if (form?.success) {
      page = Page.SUCCESSFUL_PAGE;
    }
  }
</script>

<svelte:head>
  <title>Application</title>
</svelte:head>

<Center>
  <section class="form-control my-8 items-center justify-between">
    <ul class="steps mb-4">
      <li class="step-primary step duration-500">Disclaimer</li>
      <li class:step-primary={page >= 1} class="step duration-500">
        Wanted Classes
      </li>
      <li class:step-primary={page >= 2} class="step duration-500">
        Application
      </li>
      <li class:step-primary={page >= 3} class="step duration-500">
        Successful submit
      </li>
    </ul>

    {#if page === Page.DISCLAIMER_PAGE}
      <section
        class="max-w-sm text-center md:max-w-md lg:max-w-lg [&>h1]:text-2xl md:[&>h1]:text-3xl">
        {@html data.disclaimerContent}
      </section>
    {:else if page === Page.WANTED_CLASSES_PAGE}
      <section
        class="max-w-sm pt-8 md:max-w-md
      lg:max-w-lg [&>h1>strong]:block [&>h1]:text-2xl
      md:[&>h1]:text-3xl [&_img]:h-10 [&_img]:w-10 [&_p]:flex [&_p]:items-center [&_p]:justify-center [&_strong]:flex">
        {@html data.wantedContent}
      </section>
    {:else if page === Page.SIGNUP_PAGE}
      <div
        class="mx-auto my-20 flex max-w-min flex-col items-center justify-center gap-12 rounded-md bg-black/90 p-8">
        <h1 class="text-center text-3xl font-bold text-white md:text-4xl">
          Application form
        </h1>
        <form
          enctype="multipart/form-data"
          method="POST"
          class="form-control w-60 space-y-8 md:w-96 lg:w-[520px]">
          <label class="form-control">
            <span>Name</span>
            <input
              required
              name="name"
              type="text"
              class="input-bordered input placeholder:opacity-30" />
          </label>

          <label class="form-control">
            <span>Age</span>
            <input
              required
              name="age"
              type="number"
              class="input-bordered input placeholder:opacity-30" />
          </label>

          <label class="form-control">
            <span>Country</span>
            <input
              name="country"
              type="text"
              class="input-bordered input placeholder:opacity-30" />
          </label>

          <label class="form-control">
            <span>Discord</span>
            <input
              required
              name="discord"
              type="text"
              placeholder="example#1234"
              class="input-bordered input placeholder:opacity-30" />
          </label>

          <label class="form-control">
            <span>In-game name</span>
            <input
              required
              name="inGameName"
              type="text"
              class="input-bordered input" />
          </label>

          <label class="form-control">
            <span>Character class and spec</span>
            <input
              required
              type="text"
              name="classAndSpec"
              placeholder="warrior/arms"
              class="input-bordered input placeholder:opacity-50" />
          </label>

          <label class="form-control">
            <span>UI screenshot in a raid environment</span>
            <input
              type="file"
              accept="image/*"
              name="uiScreenshot"
              class="file-input-bordered file-input-primary file-input w-full" />
          </label>

          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="form-control">
            <span class="label-text">Why do you want to join Indecisive?</span>
            <textarea
              name="joinReason"
              class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
          </label>

          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="form-control">
            <span class="label-text">
              What is your raiding experience?
              <br />
              Any retail raid logs?
            </span>
            <textarea
              name="experience"
              class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
          </label>
          <!-- svelte-ignore a11y-label-has-associated-control -->

          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="form-control">
            <span class="label-text"> Additional notes</span>
            <textarea
              name="notes"
              class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
          </label>

          <label class="label cursor-pointer space-x-4">
            <span class="label-text"
              >Willing to play another class/spec if required</span>
            <input
              name="willingToPlayAnotherClass"
              type="checkbox"
              bind:checked={willingToPlayAnotherClass}
              class="checkbox-primary checkbox" />
          </label>
          <div
            class="opacity-0 transition-opacity duration-500 ease-in-out"
            class:opacity-100={willingToPlayAnotherClass}>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="form-control">
              <span class="label-text text-primary"
                >Which other classes are you familiar with?</span>
              <textarea
                name="willingToPlayAnotherClassNotes"
                class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
            </label>
          </div>

          <label class="form-control">
            <span class="label-text text-primary font-bold"
              >Are you able to attend at least 90% of our raid days?
            </span>
            <textarea
              name="attendRaidDaysNotes"
              placeholder="Yes/No/Reason"
              class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
          </label>
          <button type="submit" class="btn-outline btn-primary btn">
            Submit
          </button>
        </form>
      </div>
    {:else if page === Page.SUCCESSFUL_PAGE}
      <div class="grid flex-1 place-items-center">
        <h1 class="text-primary max-w-5xl text-center text-3xl md:text-3xl">
          Your application was submitted successfully!
          <br />
          <br />
          Thank you for applying, we will try to get back to you in a timely manner.
          <br />
          <br />
          GL/HF and take care &lt;3.
        </h1>
      </div>
    {/if}
    {#if page < 2}
      <div class="mt-4 flex gap-x-4">
        <button
          on:click={() => {
            page += 1;
          }}
          class="btn-outline btn-primary btn flex-1">Proceed</button>
        <a href="/" class="btn-outline btn-primary btn flex-1">Cancel</a>
      </div>
    {/if}
  </section>
</Center>
