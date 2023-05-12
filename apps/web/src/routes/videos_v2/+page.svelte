<script lang="ts">
  import Collection from '$lib/components/Collection.svelte';
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import { recordImageToUrl } from '$lib/pocketbase/publicUtils';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ContentLayout>
  {#each data.collections as collection, i (i)}
    <li>
      <a href="" class="dev block">
        <Collection
          label={collection.label}
          thumbnail={recordImageToUrl(collection, collection.thumbnail)} />
      </a>
    </li>
  {/each}
  {#each data.collections as collection, i (i)}
    <li>
      <a href="" class="dev block">
        <Collection
          label={collection.label}
          thumbnail={recordImageToUrl(collection, collection.thumbnail)} />
      </a>
    </li>
  {/each}
  {#each data.collections as collection, i (i)}
    <li>
      <a href="" class="dev block">
        <Collection
          label={collection.label}
          thumbnail={recordImageToUrl(collection, collection.thumbnail)} />
      </a>
    </li>
  {/each}
</ContentLayout>
