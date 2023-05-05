<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;

  let willingToPlayAnotherClass = false;
</script>

<svelte:head>
  <title>Application</title>
</svelte:head>

{#if form?.success}
  <div class="flex items-center justify-center">
    <h1 class="min-w-max text-center text-3xl text-primary md:text-5xl">
      Your application was sent successfully!
    </h1>
  </div>
{:else}
  <div
    class="mx-auto my-20 flex max-w-min flex-col items-center justify-center gap-12 rounded-md bg-black/90 p-8">
    <h1 class="text-center text-3xl font-bold text-white md:text-4xl">
      Application form
    </h1>
    <form
      method="POST"
      class="form-control w-60 space-y-8 md:w-96 lg:w-[520px]">
      <label class="form-control">
        <span>Name</span>
        <input
          required
          type="text"
          name="name"
          class="input-bordered input placeholder:opacity-30" />
      </label>
      <label class="form-control">
        <span>Age</span>
        <input
          type="number"
          name="age"
          class="input-bordered input placeholder:opacity-30" />
      </label>
      <label class="form-control">
        <span>Country</span>
        <input
          type="text"
          name="country"
          class="input-bordered input placeholder:opacity-30" />
      </label>

      <label class="form-control">
        <span>Discord</span>
        <input
          type="text"
          name="discord"
          required
          placeholder="example#1234"
          class="input-bordered input placeholder:opacity-30" />
      </label>

      <label class="form-control">
        <span>In-game name</span>
        <input
          required
          type="text"
          name="ign_name"
          placeholder=""
          class="input-bordered input" />
      </label>
      <label class="form-control">
        <span>Character class and spec</span>
        <input
          required
          type="text"
          name="class/spec"
          placeholder="warrior/arms"
          class="input-bordered input placeholder:opacity-50" />
      </label>

      <label class="form-control">
        <span>UI screenshot in a raid environment </span>
        <input
          type="url"
          name="ui_screenshot"
          placeholder="https://imgur.com/your_image"
          class="input-bordered input placeholder:opacity-50" />
      </label>

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="form-control">
        <span class="label-text"> Why do you want to join Indecisive?</span>
        <textarea
          name="join_reason"
          class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
      </label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="form-control">
        <span class="label-text"> What is your raiding experience?</span>
        <textarea
          name="experience"
          class="textarea-bordered textarea h-24 w-full placeholder:opacity-30" />
      </label>

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
            class="textarea-bordered textarea h-24 w-full placeholder:opacity-30"
            placeholder="mage/fire" />
        </label>
      </div>

      <button type="submit" class="btn-outline btn-primary btn">
        Submit
      </button>
    </form>
  </div>
{/if}
