<script lang="ts">
  import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
  import type { PageData } from './$types';
  import Fa from 'svelte-fa';
  import { PUBLIC_ORIGIN_URL } from '$env/static/public';
  import { goto, preloadData } from '$app/navigation';
  import { fade, slide } from 'svelte/transition';
  import Center from '$lib/components/Center.svelte';
  import Spinner from '$lib/components/Spinner.svelte';

  export let data: PageData;
  let armoryData = data.armoryCharacterData;

  data.armoryCharacterData;
  const filter = (
    event: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    const filterString = event.currentTarget.value;

    armoryData = data.armoryCharacterData.filter(
      ({ artifacts, char, discord, stats }) => {
        // Discord username
        if (
          discord?.username
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase())
        )
          return true;

        // Character name
        if (
          char?.name
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase())
        )
          return true;
        // Class
        if (
          char?.class
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase())
        )
          return true;

        // Artifact name
        if (
          artifacts.filter(artifact =>
            artifact.name
              .toLocaleLowerCase()
              .includes(filterString.toLocaleLowerCase())
          ).length
        )
          return true;

        return false;
      }
    );
  };

  type SortingBy = 'name' | 'class' | 'ilvl' | 'user' | 'none' | 'artifact';
  type SortOrder = 'asc' | 'desc';
  let sortOrder: SortOrder = 'asc';
  let sortBy: SortingBy = 'none';

  const sort = () => {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    let temp: typeof armoryData = [];

    switch (sortBy) {
      case 'class':
        temp = armoryData.sort(({ char: char1 }, { char: char2 }) => {
          if (char1.class < char2.class) {
            return -1;
          } else if (char1.class > char2.class) {
            return 1;
          }
          return 0;
        });
        break;

      case 'user':
        temp = armoryData.sort(({ discord: user1 }, { discord: user2 }) => {
          if (!user1 && !user2) return 0;
          else if (!user1) return 1;
          else if (!user2) return -1;
          if (user1.username < user2.username) {
            return -1;
          } else if (user1.username > user2.username) {
            return 1;
          }
          return 0;
        });
        break;

      case 'ilvl':
        temp = armoryData.sort(({ stats: stats1 }, { stats: stats2 }) => {
          if (stats1.ilevel < stats2.ilevel) {
            return -1;
          } else if (stats1.ilevel > stats2.ilevel) {
            return 1;
          }
          return 0;
        });
        break;

      case 'name':
        temp = armoryData.sort(({ char: char1 }, { char: char2 }) => {
          if (char1.name < char2.name) {
            return -1;
          } else if (char1.name > char2.name) {
            return 1;
          }
          return 0;
        });
        break;

      case 'artifact':
        temp = armoryData.sort(
          ({ artifacts: artifact1 }, { artifacts: artifact2 }) => {
            if (!artifact1 && !artifact2) return 0;
            else if (artifact1 && !artifact2) return 1;
            else if (!artifact1 && artifact2) return -1;

            const maxArtifact1 = Math.max(
              ...artifact1.map(artifact => artifact.traits)
            );
            const maxArtifact2 = Math.max(
              ...artifact2.map(artifact => artifact.traits)
            );
            if (maxArtifact1 < maxArtifact2) {
              return -1;
            } else if (maxArtifact1 > maxArtifact2) {
              return 1;
            }
            return 0;
          }
        );
        break;
      default:
        break;
    }

    switch (sortOrder) {
      case 'asc':
        armoryData = temp;
        break;
      case 'desc':
        armoryData = temp.reverse();
    }
  };
</script>

<svelte:head>
  <title>Armory</title>
  <link rel="canonical" href={`${PUBLIC_ORIGIN_URL}/armory`} />
</svelte:head>

<Center>
  <section
    class="form-control min-h-full max-w-full items-center gap-y-4 overflow-hidden">
    <input
      type="text"
      placeholder="Filter..."
      on:input={filter}
      class="input border-primary sticky top-0 z-50 w-full border-[1px]" />
    {#if armoryData.length}
      <div class="w-full overflow-x-auto">
        <table
          class="table-zebra border-primary rounded-box bg-base-100 table min-w-[1000px] border-2">
          <thead>
            <tr>
              <!-- User -->
              <th
                on:click={() => {
                  sortBy = 'user';
                  sort();
                }}
                class="!relative flex cursor-pointer items-center gap-x-4">
                <p>User</p>
                {#if sortBy === 'user'}
                  <div transition:fade>
                    <Fa
                      icon={faArrowDown}
                      size="1.4x"
                      class={`text-primary ${
                        sortOrder === 'asc' ? '' : 'rotate-180'
                      } duration-500`} />
                  </div>
                {/if}
              </th>

              <!-- Name -->
              <th
                on:click={() => {
                  sortBy = 'name';
                  sort();
                }}
                class="cursor-pointer">
                <div class="flex items-center gap-x-2">
                  <p>Name</p>
                  {#if sortBy === 'name'}
                    <div transition:fade>
                      <Fa
                        icon={faArrowDown}
                        size="1.4x"
                        class={`text-primary ${
                          sortOrder === 'asc' ? '' : 'rotate-180'
                        } duration-500`} />
                    </div>
                  {/if}
                </div>
              </th>

              <!-- Class -->
              <th
                on:click={() => {
                  sortBy = 'class';
                  sort();
                }}
                class="cursor-pointer">
                <div class="flex items-center gap-x-2">
                  <p>Class</p>
                  {#if sortBy === 'class'}
                    <div transition:fade>
                      <Fa
                        icon={faArrowDown}
                        size="1.4x"
                        class={`text-primary ${
                          sortOrder === 'asc' ? '' : 'rotate-180'
                        } duration-500`} />
                    </div>
                  {/if}
                </div>
              </th>

              <!-- iLvl -->
              <th
                on:click={() => {
                  sortBy = 'ilvl';
                  sort();
                }}
                class="cursor-pointer">
                <div class="flex items-center gap-x-2">
                  <p>iLvl</p>
                  {#if sortBy === 'ilvl'}
                    <div transition:fade>
                      <Fa
                        icon={faArrowDown}
                        size="1.4x"
                        class={`text-primary ${
                          sortOrder === 'asc' ? '' : 'rotate-180'
                        } duration-500`} />
                    </div>
                  {/if}
                </div>
              </th>

              <!-- Artifact -->
              <th
                on:click={() => {
                  sortBy = 'artifact';
                  sort();
                }}
                class="cursor-pointer">
                <div class="flex items-center gap-x-2">
                  <p>Artifact</p>
                  {#if sortBy === 'artifact'}
                    <div transition:fade>
                      <Fa
                        icon={faArrowDown}
                        size="1.4x"
                        class={`text-primary ${
                          sortOrder === 'asc' ? '' : 'rotate-180'
                        } duration-500`} />
                    </div>
                  {/if}
                </div></th>
              <th>Legos</th>
            </tr>
          </thead>
          <tbody class="text-xs md:text-sm lg:text-base">
            {#each armoryData as { artifacts, char, stats, discord }, i (char.id)}
              {@const charSubPageLink = `/armory/${char.name}`}
              <tr
                class="cursor-pointer"
                on:mouseenter={() => {
                  // This might overload the server
                  // preloadData(charSubPageLink);
                }}
                on:click={() => {
                  goto(charSubPageLink);
                }}>
                <td>
                  {#if discord}
                    <div class="flex items-center gap-x-4">
                      <img
                        src={discord.avatar}
                        alt="discord avatar"
                        class="h-8 w-8 rounded-full" />
                      <p>
                        {discord.username}
                      </p>
                    </div>
                  {:else}
                    <div class="flex items-center rounded-full pl-1">
                      <Fa icon={faUser} size="2x" />
                    </div>
                  {/if}
                </td>
                <td>
                  {char.name}
                </td>
                <td class="capitalize">
                  {char.class}
                </td>
                <td>
                  {stats.ilevel}
                </td>
                <td>
                  {#each artifacts as artifact}
                    <p>
                      <span class="text-primary">{artifact.traits}</span> - {artifact.name}
                    </p>
                  {:else}
                    <p class="text-primary">No data</p>
                  {/each}
                </td>
                <td><Spinner class="w-12" /></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-primary text-center text-4xl font-bold">
        No matches? Madge?
      </p>
    {/if}
  </section>
</Center>
