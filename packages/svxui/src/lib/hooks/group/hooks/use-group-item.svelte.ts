import { GroupItem } from '../group-item.svelte.js';
import type { GroupItemProps } from '../types.js';

export function useGroupItem(props: GroupItemProps): GroupItem {
    return new GroupItem(props);
}
