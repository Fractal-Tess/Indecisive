<script lang="ts">
  import '$styles';
</script>

<div
  class=" h-screen w-screen -z-50 bg-ind_bg bg-cover bg-fixed bg-center fixed"
/>
<div class="flex min-h-screen flex-col bg-transparent">
  <main class="flex-1">
    <slot />
  </main>
</div>
