<script lang="ts">
  let _class = '';
  export { _class as class };
</script>

<img
  src="/logo.png"
  alt="logo"
  class={`${_class}`}
  style={`filter:drop-shadow(0 0 10px hsl(var(--p)));`} />

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
