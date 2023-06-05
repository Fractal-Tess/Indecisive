<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  import Fa from 'svelte-fa';
  import { faCode } from '@fortawesome/free-solid-svg-icons';
</script>

<section class="form-control items-center justify-center gap-y-20">
  <h1 class="text-primary flex items-center gap-x-4 text-4xl font-bold">
    Page is under development
    <span class="text-blue-400">
      <Fa icon={faCode} size="1.4x" />
    </span>
  </h1>
  <a href="/armory" class="btn btn-outline btn-md btn-primary w-40">
    Go Back
  </a>
</section>
