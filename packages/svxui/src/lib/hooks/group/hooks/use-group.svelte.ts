import { Group } from '../group.svelte.js';
import type { GroupProps } from '../types.js';

export function useGroup(props: GroupProps): Group {
    return new Group(props);
}
