<script lang="ts">
  import Collection from "$lib/components/Collection.svelte";
  import ContentLayout from "$lib/components/ContentLayout.svelte";
  import { imgSlugToUrl } from "$lib/utils/pocketbase";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<ContentLayout>
  {#each data.collections as collection, i (i)}
    <li>
      <a href="" class="dev block">
        <Collection
          label={collection.label}
          thumbnail={imgSlugToUrl(collection)}
        />
      </a>
    </li>
  {/each}
  {#each data.collections as collection, i (i)}
    <li>
      <a href="" class="dev block">
        <Collection
          label={collection.label}
          thumbnail={imgSlugToUrl(collection)}
        />
      </a>
    </li>
  {/each}
  {#each data.collections as collection, i (i)}
    <li>
      <a href="" class="dev block">
        <Collection
          label={collection.label}
          thumbnail={imgSlugToUrl(collection)}
        />
      </a>
    </li>
  {/each}
</ContentLayout>
