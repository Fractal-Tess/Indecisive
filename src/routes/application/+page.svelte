<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;
  let willingToPlayAnotherClass: boolean = false;
</script>

<div
  class="flex items-center justify-center py-8 bg-black/90 p-8 rounded-md max-w-min mx-auto my-20"
>
  <form method="POST" class="form-control space-y-8 w-60 md:w-96 lg:w-[520px]">
    <label class="form-control">
      <span>Name</span>
      <input
        type="text"
        name="name"
        class="input input-bordered placeholder:opacity-30"
      />
    </label>
    <label class="form-control">
      <span>Age</span>
      <input
        type="number"
        name="age"
        class="input input-bordered placeholder:opacity-30"
      />
    </label>
    <label class="form-control">
      <span>Country</span>
      <input
        type="text"
        name="country"
        class="input input-bordered placeholder:opacity-30"
      />
    </label>

    <label class="form-control">
      <span>Discord</span>
      <input
        type="text"
        name="discord"
        placeholder="example#1234"
        class="input input-bordered placeholder:opacity-30"
      />
    </label>

    <label class="form-control">
      <span>In-game name</span>
      <input
        type="text"
        name="ign_name"
        placeholder=""
        class="input input-bordered"
      />
    </label>
    <label class="form-control">
      <span>Character class and spec</span>
      <input
        type="text"
        name="class/spec"
        placeholder="warrior/arms"
        class="input input-bordered placeholder:opacity-50"
      />
    </label>

    <label class="form-control">
      <span>UI screenshot in a raid environment </span>
      <input
        type="url"
        name="ui_screenshot"
        placeholder="https://imgur.com/your_image"
        class="input input-bordered placeholder:opacity-50"
      />
    </label>

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-control">
      <span class="label-text"> Why do you want to join Indecisive?</span>
      <textarea
        name="join_reason"
        class="textarea textarea-bordered h-24 w-full placeholder:opacity-30"
      />
    </label>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-control">
      <span class="label-text"> What is your raiding experience?</span>
      <textarea
        name="experience"
        class="textarea textarea-bordered h-24 w-full placeholder:opacity-30"
      />
    </label>

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-control">
      <span class="label-text"> Additional notes</span>
      <textarea
        name="notes"
        class="textarea textarea-bordered h-24 w-full placeholder:opacity-30"
      />
    </label>

    <label class="label cursor-pointer space-x-4">
      <span class="label-text"
        >Willing to play another class/spec if required</span
      >
      <input
        type="checkbox"
        bind:checked={willingToPlayAnotherClass}
        class="checkbox checkbox-primary"
      />
    </label>
    <div
      class="opacity-0 transition-opacity duration-500 ease-in-out"
      class:opacity-100={willingToPlayAnotherClass}
    >
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="form-control">
        <span class="label-text text-primary"
          >Which other classes are you familiar with?</span
        >
        <textarea
          class="textarea textarea-bordered h-24 w-full placeholder:opacity-30"
          placeholder="mage/fire"
        />
      </label>
    </div>

    <button type="submit" class="btn btn-primary btn-outline"> Submit </button>
  </form>
</div>
