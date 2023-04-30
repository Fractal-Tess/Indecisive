<script lang="ts">
  import Fa from "svelte-fa";
  import { faGithub } from "@fortawesome/free-brands-svg-icons";
  import HeaderLogo from "./HeaderLogo.svelte";
</script>

<header class="relative h-14 bg-base-100 text-2xl font-extrabold shadow-2xl">
  <ul class="flex h-full items-center justify-around">
    <li>
      <a href="/videos" class="link-primary">Videos</a>
    </li>
    <HeaderLogo />

    <li>
      <a href="/application" class="link-primary">Apply</a>
    </li>
  </ul>

  <a
    class="absolute right-4 top-1/2 hidden -translate-y-1/2 md:block"
    href="https://github.com/Fractal-Tess/Indecisive"
    target="_blank"
  >
    <Fa icon={faGithub} />
  </a>
</header>
