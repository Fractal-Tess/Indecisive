<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';
  import Center from './Center.svelte';
</script>

<Center>
  <div class="form-control">
    <h1 class="text-primary text-2xl font-extrabold md:text-4xl">
      Under development
      <span class="ml-2 text-white"> &lt;/&gt; </span>
    </h1>
    <Spinner />
  </div>
</Center>
