import type { PBRecord } from '$lib/utils';
import { getPb, type Fetch } from '$lib/pocketbase';

export type ApplicationState = PBRecord<{
  unit: string;
  label: string;
  enabled: boolean;
  content: string;
  thumbnail: string;
}>;

export async function getApplicationState(unit: string, fetch: Fetch) {
  const pb = getPb();
  const applicationState = await pb
    .collection('applicationState')
    .getFirstListItem<ApplicationState>(`unit = '${unit}'`, { fetch });
  return applicationState;
}
export async function getApplicationSteps(fetch: Fetch) {
  const pb = getPb();
  let steps = await pb
    .collection('applicationState')
    .getFullList<ApplicationState>({ filter: `unit ~ 'step'`, fetch });
  steps = steps
    .filter(a => a.enabled)
    .sort((a, b) => a.unit.localeCompare(b.unit));
  return steps;
}
