export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

export function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function toPascalCase(value?: string) {
    return (value ?? '').split('-').map(capitalize).join('');
}

export function slugFromPath(path: string) {
    return path.replace('/content/', '').replace('.svx', '').replace('..', '');
}

export function slugFromPathname(pathname: string) {
    return pathname.split('/').pop() ?? '';
}

export function getSlugFromPath(filePath: string) {
    const normalized = filePath.replace(/\\/g, '/');

    // Cas 1 : .../itemName/index.svx
    const folderMatch = normalized.match(/\/([^/]+)\/index\.svx$/);
    if (folderMatch) {
        return folderMatch[1];
    }

    // Cas 2 : .../itemName.svx
    const fileMatch = normalized.match(/\/([^/]+)\.svx$/);
    if (fileMatch) {
        return fileMatch[1];
    }

    throw new Error(`Impossible d'extraire itemName depuis : ${filePath}`);
}

export function stringToId(str: string, suffix?: string): string {
    const base = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return [base, suffix].filter(Boolean).join('-');
}
