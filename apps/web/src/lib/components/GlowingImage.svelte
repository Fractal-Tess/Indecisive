<script lang="ts">
  let _class = '';
  export { _class as class };
  export let src: string;
  export let alt: string;
  export let color: '--p' | '--s' | 'infer';
  export let label = '';
</script>

{#if color === 'infer'}
  <div
    class="relative z-0 aspect-video max-h-72 max-w-sm text-center text-white transition-all duration-500 hover:scale-110 md:max-w-4xl">
    <!-- Bloom effect -->
    <img {src} {alt} class={`absolute -z-50 scale-110 blur-3xl ${_class}`} />
    <!-- Link -->

    {#if label}
      <!-- content here -->
      <span
        class="card-title bg-base-100/80 absolute max-w-max rounded-br-box px-2 py-1 text-xl">
        {label}
      </span>
    {/if}
    <img {src} {alt} class={_class} />
  </div>
{:else}
  <img
    {src}
    {alt}
    class={`${_class}`}
    style={`filter:drop-shadow(0 0 10px oklch(var(${color})));`} />
{/if}

<style lang="postcss">
  img {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
