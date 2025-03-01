type SortItem = {
    name: string;
};
const priorityKeywords = ['root', 'item', 'list', 'trigger', 'content'];

export function sortByNameWithPriority(a: SortItem, b: SortItem): number {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    // Find priority indices for both objects (-1 if no keyword found)
    const aPriorityIndex = priorityKeywords.findIndex((keyword) => aName.includes(keyword.toLowerCase()));
    const bPriorityIndex = priorityKeywords.findIndex((keyword) => bName.includes(keyword.toLowerCase()));

    // If both have priority keywords
    if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
        // Sort by priority order first
        if (aPriorityIndex !== bPriorityIndex) {
            return aPriorityIndex - bPriorityIndex;
        }
        // If same priority, sort alphabetically
        return aName.localeCompare(bName);
    }

    // If only 'a' has priority keyword, it comes first
    if (aPriorityIndex !== -1 && bPriorityIndex === -1) {
        return -1;
    }

    // If only 'b' has priority keyword, it comes first
    if (aPriorityIndex === -1 && bPriorityIndex !== -1) {
        return 1;
    }

    // If neither has priority keywords, sort alphabetically
    return aName.localeCompare(bName);
}
