export function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function toPascalCase(value?: string) {
    return (value ?? '').split('-').map(capitalize).join('');
}

export function slugFromPath(path: string) {
    return path.replace('/content/', '').replace('.svx', '');
}

export function slugFromPathname(pathname: string) {
    return pathname.split('/').pop() ?? '';
}

export function isTitleActive(currentSlug: string, title: string) {
    const slugifiedTitle = title.toLowerCase().replaceAll(' ', '-');
    return currentSlug === slugifiedTitle;
}
