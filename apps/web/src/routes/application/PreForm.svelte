<script lang="ts">
  import type { ApplicationState } from '$lib/pocketbase';

  export let steps: ApplicationState[];
  export let currentStep: number;
</script>

<div class="flex-1 flex flex-col pb-4 mx-auto text-balance text-center">
  <div class="flex-1 max-w-sm md:max-w-md lg:max-w-lg html-content">
    {@html steps.at(currentStep)?.content}
  </div>
</div>
