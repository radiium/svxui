import { nanoid } from 'nanoid/non-secure';

/**
 * Generates a random id
 * @returns
 */
export function generateId(): string {
    return nanoid(10);
}
