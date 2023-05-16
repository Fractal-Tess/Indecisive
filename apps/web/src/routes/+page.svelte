<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Logo from '$lib/components/Logo.svelte';
  import { onMount } from 'svelte';
  import TypeIt from 'typeit';

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
  TypeIt;

  const typeit = (node: HTMLParagraphElement) => {
    let typeHead: undefined | typeof TypeIt;
    let destroyed = false;

    afterNavigate(({ from }) => {
      if (from === null) {
        typeHead = new TypeIt(node, {
          afterComplete: () => {
            if (!destroyed) {
              typeHead.destroy();
              destroyed = true;
            }
          },
          speed: 80
        }).go();
      }
    });
    return {
      destroy() {
        if (!destroyed && typeHead) {
          typeHead.destroy();
          destroyed = true;
        }
      }
    };
  };
</script>

<section
  class="flex select-none flex-col items-center justify-center gap-y-8 text-center">
  <p use:typeit class="text-3xl md:text-4xl [&_em]:text-yellow-400">
    Welcome to <em><strong>Indecisive</strong></em>
  </p>
  <Logo
    class={`${
      mounted ? 'opacity-100' : 'opacity-0'
    } h-60 transition-opacity duration-[3000]`} />
</section>
