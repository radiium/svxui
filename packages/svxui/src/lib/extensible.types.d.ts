/**
 * ColorMap — extend to define custom color aliases.
 *
 * Keys added here become valid values for the `color` prop on every svxui component.
 * Values must be a valid Radix color name (see lists below).
 *
 * @example
 * // src/svxui-colors.d.ts
 * declare global {
 *   namespace Svxui {
 *     export interface ColorMap {
 *       error: 'tomato';
 *       primary: 'blue';
 *     }
 *   }
 * }
 *
 * Built-in aliases: 'neutral' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'
 *
 * Available Radix accent colors:
 * 'gold' | 'bronze' | 'brown' | 'yellow' | 'amber' | 'orange' | 'tomato' | 'red'
 * | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo'
 * | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' | 'lime' | 'mint' | 'sky'
 *
 * Available Radix gray colors:
 * 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand'
 */

declare global {
    namespace Svxui {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        export interface ColorMap {}
    }
}

export {};
