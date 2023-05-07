<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import TypeIt from 'typeit';

  let pTag1: HTMLHeadingElement;
  let pTag2: HTMLHeadingElement;

  afterNavigate(({ from }) => {
    if (from !== null) {
      pTag1.innerHTML = 'Welcome to <em>Indecisive</em>';
      return;
    }
    const typeHead2 = new TypeIt(pTag2, {
      afterComplete: () => typeHead2.destroy(),
      speed: 70
    })
      .type('This is the place where you lose <i>brain cells</i>', {
        delay: 250
      })
      .delete(11)
      .type('<em>stress</em>', { delay: 250 })
      .type('...', { delay: 500 })
      .break()
      .type('The place where you get to raid with top-ranking <i>pepegas</i>', {
        delay: 250
      })
      .delete(7)
      .type('<em>players</em>...')
      .break()
      .type('Try not to get <i>cancer</i>', { delay: 250 })
      .delete(6)
      .type('carried away, because you will get <i>aids</i>', { delay: 250 })
      .delete(4)
      .type('<em>addicted</em>...');

    const typeHead1 = new TypeIt(pTag1, {
      afterComplete: () => {
        typeHead1.destroy();
        typeHead2.go();
      },
      speed: 70
    })
      .type('Hey there O/', { delay: 500 })
      .delete(14)
      .type('Welcome', { delay: 250 })
      .type('...', { delay: 500 })
      .delete(3)
      .type(' to <em><strong>IndecisiveBG?</strong></em>', { delay: 250 })
      .delete(3)
      .go();
  });
</script>

<section
  class="flex select-none flex-col items-center justify-center gap-40 text-center">
  <p class="text-3xl md:text-4xl [&_em]:text-yellow-400" bind:this={pTag1} />
  <p class="text-3xl md:text-4xl [&_em]:text-yellow-400" bind:this={pTag2} />
</section>
