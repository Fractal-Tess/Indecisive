import { getApplicationState, getApplicationSteps } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const appOpen = await getApplicationState('open', fetch);
  const steps = await getApplicationSteps(fetch);

  return { appOpen, steps };
}) satisfies PageLoad;
