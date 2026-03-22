/**
 * Convert kebab-case string to PascalCase
 * @example toPascalCase('foo-bar') // 'FooBar'
 */
export function toPascalCase(str: string): string {
    return str
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}
