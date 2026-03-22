/**
 * Wrapp it test in root effect
 * @param name it test name
 * @param fn test function to execute in root effect
 */
export declare function itWithEffect(name: string, fn: () => void | Promise<void>): void;
/**
 * Wrap function execution in root effect
 * @param fn function to execute in root effect
 * @returns
 */
export declare function effectRootScope(fn: () => void | Promise<void>): void | Promise<void>;
