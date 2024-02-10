import { getApplicationState, getApplicationSteps } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const appOpen = await getApplicationState('open', fetch);
  let steps = await getApplicationSteps(fetch);
  steps = steps
    .filter(a => a.enabled)
    .sort((a, b) => a.unit.localeCompare(b.unit));

  return { appOpen, steps };
}) satisfies PageLoad;
