import { it } from 'vitest';

/**
 * Wrapp it test in root effect
 * @param name it test name
 * @param fn test function to execute in root effect
 */
export function itWithEffect(name: string, fn: () => void | Promise<void>): void {
    it(name, () => effectRootScope(fn));
}

/**
 * Wrap function execution in root effect
 * @param fn function to execute in root effect
 * @returns
 */
export function effectRootScope(fn: () => void | Promise<void>): void | Promise<void> {
    let result!: void | Promise<void>;

    const cleanup = $effect.root(() => {
        result = fn();
    });

    return result instanceof Promise //
        ? result.finally(cleanup)
        : cleanup();
}
