<script lang="ts">
  export let thumbnail: string;
  export let label = "";
</script>

<li
  class="devb relative z-0 aspect-video max-h-72 max-w-sm text-center text-white transition-all duration-500 hover:scale-110 md:max-w-4xl"
>
  <!-- Bloom effect -->
  <img
    src={thumbnail}
    alt="bloom effect"
    class="absolute -z-50 h-full scale-110 blur-3xl"
  />
  <!-- Link -->

  <span
    class="card-title absolute m-2 max-w-max rounded-md bg-base-100/80 p-1 text-xl"
  >
    {label}
  </span>
  <img
    src={thumbnail}
    alt="expansion"
    class="h-full w-full rounded-lg object-cover"
  />
</li>
